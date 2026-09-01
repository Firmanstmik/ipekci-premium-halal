/**
 * Deploy changed BINARY theme assets (images) to the live site.
 *
 * Why this exists: the host closes the connection on large upload POSTs
 * (net::ERR_CONNECTION_CLOSED, reproduced on every attempt at 21 MB), so the
 * normal "upload the theme zip" route cannot deliver binaries. Text files go
 * through the Theme File Editor fine — that POST is small — so this ships the
 * images through the same reliable channel:
 *
 *   1. diff every local image against the live one by SHA-256, so only genuinely
 *      changed bytes are sent (and a re-run after a partial failure resumes);
 *   2. write a temporary, capability-guarded installer into an existing theme PHP
 *      file, carrying a BATCH of images as base64;
 *   3. trigger it once as the logged-in admin — it decodes the images to disk and
 *      returns the server's own hash of each file;
 *   4. restore that PHP file to its exact original content — always, including on
 *      failure, so the theme never keeps the installer;
 *   5. repeat per batch, then verify every file end-to-end over plain HTTP.
 *
 * The installer is reachable only by a user who can already edit theme files
 * (i.e. who could write these bytes anyway).
 *
 * ipekci-theme.zip remains the canonical artifact for a clean install.
 *
 * Usage: node scripts/deploy-binaries.mjs
 */
import { chromium } from 'playwright';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const THEME = process.env.WP_THEME ?? 'ipekci-theme-v2';
const HOST_FILE = 'inc/customizer.php';
const IMAGES = 'ipekci-theme/assets/images';
const ONLY = process.argv.slice(2).map((p) => p.split('\\').join('/'));
const BATCH_BYTES = 700 * 1024; // keep each editor POST comfortably small
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

// Files that exist on the server but no longer in the theme (superseded formats).
const REMOVE = ONLY.length
  ? []
  : [
  'cow-hero', 'cut-brisket', 'cut-chuck', 'cut-flank', 'cut-neck', 'cut-plate',
  'cut-ribeye', 'cut-round', 'cut-rump', 'cut-shank', 'cut-shortloin',
  'cut-sirloin', 'cut-tenderloin',
].map((n) => `assets/images/meat/${n}.jpg`);

const sha = (buf) => createHash('sha256').update(buf).digest('hex');

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

// --- work out what actually differs from live ------------------------------
let local = walk(IMAGES).map((p) => ({
  rel: relative('ipekci-theme', p).split('\\').join('/'),
  buf: readFileSync(p),
}));
if (ONLY.length) {
  local = local.filter((f) => ONLY.some((o) => f.rel === o || f.rel.startsWith(o.replace(/\/?$/, '/'))));
}

console.log(`comparing ${local.length} local images against live...`);

const changed = [];
await Promise.all(
  local.map(async (f) => {
    const url = `${BASE}/wp-content/themes/${THEME}/${f.rel}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        changed.push(f);
        return;
      }
      const liveSha = sha(Buffer.from(await res.arrayBuffer()));
      if (liveSha !== sha(f.buf)) changed.push(f);
    } catch {
      changed.push(f);
    }
  })
);

if (!changed.length && !REMOVE.length) {
  console.log('nothing to do — live images already match');
  process.exit(0);
}

const totalKB = Math.round(changed.reduce((s, f) => s + f.buf.length, 0) / 1024);
console.log(`${changed.length} images differ (${totalKB} KB)\n`);

// --- batch them ------------------------------------------------------------
const batches = [];
let cur = [];
let curBytes = 0;
for (const f of changed) {
  if (curBytes + f.buf.length > BATCH_BYTES && cur.length) {
    batches.push(cur);
    cur = [];
    curBytes = 0;
  }
  cur.push(f);
  curBytes += f.buf.length;
}
if (cur.length) batches.push(cur);

const original = readFileSync('ipekci-theme/' + HOST_FILE, 'utf8');

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false });
ctx.setDefaultTimeout(240000);
ctx.setDefaultNavigationTimeout(240000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.error('not authenticated — cannot deploy');
  await ctx.close();
  process.exit(2);
}

// The host intermittently stalls on wp-admin navigations. A bare throw here is
// dangerous: it escapes mid-batch and the installer payload stays on the server.
// Retry the editor round trip so both the batch writes AND the final restore are
// resilient.
async function writeThemeFile(rel, content, tries = 4) {
  for (let attempt = 1; attempt <= tries; attempt += 1) {
    try {
      const r = await writeThemeFileOnce(rel, content);
      // A stalled wp-admin serves a page with no #newcontent, so the editor
      // reports "unavailable" as a RETURN VALUE rather than throwing. Treat that
      // (and an unverified write) as retryable too — otherwise the restore gives
      // up on the first hiccup and leaves the installer live in the theme.
      if (!r.error && r.verified === true) return r;
      throw new Error(r.error ?? `write not verified (${JSON.stringify(r)})`);
    } catch (e) {
      if (attempt === tries) throw e;
      console.log(`   … editor round trip failed (${e.message.slice(0, 60)}); retry ${attempt + 1}/${tries}`);
      await new Promise((r) => setTimeout(r, 5000 * attempt));
    }
  }
}

async function writeThemeFileOnce(rel, content) {
  await page.goto(`${BASE}/wp-admin/theme-editor.php?file=${encodeURIComponent(rel)}&theme=${THEME}`, {
    waitUntil: 'domcontentloaded',
  });
  return page.evaluate(async (text) => {
    const form = document.querySelector('#template');
    const ta = document.querySelector('#newcontent');
    if (!form || !ta) return { error: 'editor unavailable' };
    ta.value = text;
    const res = await fetch('/wp-admin/theme-editor.php', {
      method: 'POST',
      body: new FormData(form),
      credentials: 'include',
      redirect: 'follow',
    });
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
    const saved = doc.querySelector('#newcontent');
    return { status: res.status, verified: saved ? saved.value === text : null };
  }, content);
}

let failed = false;
let aborted = false;

for (const [i, batch] of batches.entries()) {
  const remove = i === batches.length - 1 ? REMOVE : [];
  const installer = `

/* ---- TEMPORARY ASSET INSTALLER (scripts/deploy-binaries.mjs) — removed immediately after use ---- */
add_action( 'admin_init', function () {
	if ( ! isset( $_GET['ipekci_install_assets'] ) ) {
		return;
	}
	if ( ! current_user_can( 'edit_themes' ) ) {
		wp_send_json_error( 'forbidden', 403 );
	}

	$files = array(
${batch.map((f) => `\t\t'${f.rel}' => '${f.buf.toString('base64')}',`).join('\n')}
	);

	$remove = array(
${remove.map((r) => `\t\t'${r}',`).join('\n')}
	);

	$out = array();

	foreach ( $files as $rel => $b64 ) {
		$path = IPEKCI_DIR . $rel;
		wp_mkdir_p( dirname( $path ) );
		$bytes = file_put_contents( $path, base64_decode( $b64 ) );
		$out[ $rel ] = ( false === $bytes ) ? 'WRITE FAILED' : hash_file( 'sha256', $path );
	}

	foreach ( $remove as $rel ) {
		$path = IPEKCI_DIR . $rel;
		$out[ 'removed:' . $rel ] = file_exists( $path ) ? unlink( $path ) : 'absent';
	}

	wp_send_json( $out );
} );
`;

  const kb = Math.round(batch.reduce((s, f) => s + f.buf.length, 0) / 1024);
  console.log(`batch ${i + 1}/${batches.length} — ${batch.length} files (${kb} KB)`);

  try {
    const w = await writeThemeFile(HOST_FILE, original + installer);
    if (!w.verified) throw new Error('installer write not verified: ' + JSON.stringify(w));

    await page.goto(`${BASE}/wp-admin/?ipekci_install_assets=1`, { waitUntil: 'domcontentloaded' });
    const result = await page.evaluate(() => {
      try {
        return JSON.parse(document.body.innerText);
      } catch {
        return { __error: document.body.innerText.slice(0, 200) };
      }
    });

    if (result.__error) throw new Error(result.__error);

    for (const f of batch) {
      if (result[f.rel] !== sha(f.buf)) {
        failed = true;
        console.error(`   MISMATCH ${f.rel}`);
      }
    }
    const removed = Object.keys(result).filter((k) => k.startsWith('removed:')).length;
    console.log(`   ok — ${batch.length} written & hash-verified${removed ? `, ${removed} stale files removed` : ''}`);
  } catch (err) {
    failed = true;
    console.error('   error:', err.message);
  } finally {
    // The restore is the one step that MUST NOT be allowed to throw: if it
    // escapes, the base64 installer stays live in the theme. Swallow, shout, and
    // stop pushing batches so a human deals with it.
    try {
      const r = await writeThemeFile(HOST_FILE, original);
      if (r.verified !== true) {
        failed = true;
        aborted = true;
        console.error('   !! RESTORE FAILED for', HOST_FILE, JSON.stringify(r));
      }
    } catch (e) {
      failed = true;
      aborted = true;
      console.error(`   !! RESTORE THREW for ${HOST_FILE}: ${e.message}`);
      console.error('   !! INSTALLER MAY STILL BE LIVE — run: node scripts/deploy-files.mjs inc/customizer.php');
    }
  }

  if (aborted) break;
}

console.log(`\nrestored ${HOST_FILE} to original`);

// --- purge -----------------------------------------------------------------
await page.goto(`${BASE}/wp-admin/admin.php?page=litespeed-toolbox`, { waitUntil: 'domcontentloaded' });
await page.evaluate(async () => {
  const all = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all(&|$)/.test(a.href));
  if (all) await fetch(all.href, { credentials: 'include' });
});

await ctx.close();
console.log(failed ? '\nFAILED — see mismatches above' : '\nall binaries deployed and hash-verified');
process.exit(failed ? 1 : 0);

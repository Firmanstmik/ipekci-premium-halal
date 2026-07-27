/**
 * Create theme files that do not exist on the server yet.
 *
 * The Theme File Editor can only edit files it can already see, and the full zip
 * upload is not deliverable on this host (the connection closes on large POSTs).
 * So a brand-new include has no route onto the server. This ships it the same way
 * scripts/deploy-binaries.mjs ships images: a temporary, capability-guarded
 * installer is appended to an existing theme file, triggered once as the admin,
 * and then removed again — always, including on failure.
 *
 * Once the file exists, ordinary edits go through scripts/deploy-files.mjs.
 *
 * Usage: node scripts/deploy-new-file.mjs inc/media.php [...]
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const THEME = 'ipekci-theme';
const HOST_FILE = 'inc/customizer.php';
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node scripts/deploy-new-file.mjs <rel-path> [...]');
  process.exit(1);
}

const sha = (b) => createHash('sha256').update(b).digest('hex');
const payload = files.map((rel) => ({ rel, buf: readFileSync(resolve('ipekci-theme', rel)) }));
const original = readFileSync('ipekci-theme/' + HOST_FILE, 'utf8');

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(240000);
ctx.setDefaultNavigationTimeout(240000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.error('not authenticated — cannot deploy');
  await ctx.close();
  process.exit(2);
}

async function writeThemeFile(rel, content) {
  await page.goto(
    `${BASE}/wp-admin/theme-editor.php?file=${encodeURIComponent(rel)}&theme=${THEME}`,
    { waitUntil: 'domcontentloaded' }
  );
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

// Restore is attempted until it verifies — a transient 508 on this host must not
// leave the installer behind.
async function restore() {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const r = await writeThemeFile(HOST_FILE, original);
    if (r.verified === true) return true;
    console.error(`   restore attempt ${attempt} failed (${JSON.stringify(r)}) — retrying`);
    await page.waitForTimeout(3000);
  }
  return false;
}

const installer = `

/* ---- TEMPORARY FILE INSTALLER (scripts/deploy-new-file.mjs) — removed immediately after use ---- */
add_action( 'admin_init', function () {
	if ( ! isset( $_GET['ipekci_install_files'] ) ) {
		return;
	}
	if ( ! current_user_can( 'edit_themes' ) ) {
		wp_send_json_error( 'forbidden', 403 );
	}

	$files = array(
${payload.map((f) => `\t\t'${f.rel}' => '${f.buf.toString('base64')}',`).join('\n')}
	);

	$out = array();

	foreach ( $files as $rel => $b64 ) {
		$path = IPEKCI_DIR . $rel;
		wp_mkdir_p( dirname( $path ) );
		$bytes = file_put_contents( $path, base64_decode( $b64 ) );
		$out[ $rel ] = ( false === $bytes ) ? 'WRITE FAILED' : hash_file( 'sha256', $path );
	}

	wp_send_json( $out );
} );
`;

let failed = false;

try {
  console.log(`installing ${payload.length} new file(s) via ${HOST_FILE}`);
  const w = await writeThemeFile(HOST_FILE, original + installer);
  if (!w.verified) throw new Error('installer write not verified: ' + JSON.stringify(w));

  await page.goto(`${BASE}/wp-admin/?ipekci_install_files=1`, { waitUntil: 'domcontentloaded' });
  const result = await page.evaluate(() => {
    try {
      return JSON.parse(document.body.innerText);
    } catch {
      return { __error: document.body.innerText.slice(0, 300) };
    }
  });

  if (result.__error) throw new Error(result.__error);

  for (const f of payload) {
    const ok = result[f.rel] === sha(f.buf);
    console.log(`  ${ok ? '✔' : '✘'} ${f.rel} (${f.buf.length} bytes)${ok ? ' — written & hash-verified' : ` — MISMATCH: ${result[f.rel]}`}`);
    if (!ok) failed = true;
  }
} catch (err) {
  failed = true;
  console.error('  error:', err.message);
} finally {
  if (!(await restore())) {
    failed = true;
    console.error(`   !! RESTORE FAILED for ${HOST_FILE} — the installer may still be live, fix immediately`);
  } else {
    console.log(`restored ${HOST_FILE} to original`);
  }
}

await ctx.close();
process.exit(failed ? 1 : 0);

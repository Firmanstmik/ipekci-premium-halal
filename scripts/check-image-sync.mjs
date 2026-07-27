/**
 * Verify every local theme image matches the live one byte-for-byte (SHA-256),
 * and that the superseded meat JPEGs are gone from the server.
 * Usage: node scripts/check-image-sync.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const sha = (b) => createHash('sha256').update(b).digest('hex');

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const local = walk('ipekci-theme/assets/images').map((p) => ({
  rel: relative('ipekci-theme', p).split('\\').join('/'),
  buf: readFileSync(p),
}));

let same = 0;
const diff = [];
const missing = [];

await Promise.all(
  local.map(async (f) => {
    try {
      const r = await fetch(`${BASE}/wp-content/themes/ipekci-theme/${f.rel}`);
      if (!r.ok) return void missing.push(`${f.rel} (${r.status})`);
      if (sha(Buffer.from(await r.arrayBuffer())) === sha(f.buf)) same++;
      else diff.push(f.rel);
    } catch (e) {
      missing.push(`${f.rel} ERR ${e.message}`);
    }
  })
);

console.log(`local images : ${local.length}`);
console.log(`IN SYNC      : ${same}`);
console.log(`DIFFERENT    : ${diff.length}`, diff.slice(0, 15));
console.log(`MISSING/404  : ${missing.length}`, missing.slice(0, 15));

const stale = ['cow-hero', 'cut-brisket', 'cut-ribeye', 'cut-tenderloin', 'cut-chuck'];
const staleFound = [];
for (const s of stale) {
  const r = await fetch(`${BASE}/wp-content/themes/ipekci-theme/assets/images/meat/${s}.jpg`);
  if (r.ok) staleFound.push(`${s}.jpg`);
}
console.log(`STALE JPEGs  : ${staleFound.length ? staleFound.join(', ') : 'none (good)'}`);

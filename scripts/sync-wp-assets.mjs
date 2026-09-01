/**
 * Copy React source assets into ipekci-theme for WordPress deploy.
 * Usage: node scripts/sync-wp-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'src/assets/ayat');
const DST = path.join(ROOT, 'ipekci-theme/assets/images/ayat');
const SRC_OG = path.join(ROOT, 'src/assets/og');
const DST_OG = path.join(ROOT, 'ipekci-theme/assets/images/og');

function copyDir(srcDir, dstDir) {
  if (!fs.existsSync(srcDir)) {
    console.warn('skip missing', srcDir);
    return 0;
  }
  fs.mkdirSync(dstDir, { recursive: true });
  let n = 0;
  for (const name of fs.readdirSync(srcDir)) {
    const from = path.join(srcDir, name);
    const to = path.join(dstDir, name);
    if (fs.statSync(from).isDirectory()) continue;
    fs.copyFileSync(from, to);
    n++;
  }
  return n;
}

const ayat = copyDir(SRC, DST);
const og = copyDir(SRC_OG, DST_OG);
console.log(`Synced ${ayat} ayat images, ${og} og images → ipekci-theme/`);

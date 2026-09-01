/**
 * Download official Ayat Food producten images from ayatfood.nl
 * and copy to src/assets/ayat + ipekci-theme/assets/images/ayat.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE = 'https://ayatfood.nl/wp-content/uploads';

/** [remote path after /uploads/, local filename in assets/ayat/] */
const ASSETS = [
  ['2024/04/Producten-sfeer.jpg', 'producten-sfeer.jpg'],
  ['2024/04/background.jpg', 'hero-backdrop.jpeg'],
  ['2024/04/Producten-Doner.jpg', 'product-doner.jpg'],
  ['2024/04/Producten-shoarma.jpg', 'product-shoarma.jpg'],
  ['2023/06/chicken-thighs-on-a-dark-background-e1626152281260.jpg', 'product-gevogelte.jpg'],
  ['2024/04/Producten-Vlees.jpg', 'product-vleessoorten.jpg'],
  ['2024/04/Producten-Diepvriesproducten.jpg', 'product-diepvries.jpg'],
  ['2023/06/Producten-turkse-pizza.jpg', 'product-turkse-pizza.jpg'],
  ['2023/06/Producten-Gegrilde-producten.jpg', 'product-gegrild.jpg'],
  ['2023/06/Producten-Turtilla-durum.jpg', 'product-durum.jpg'],
  ['2024/04/Hero-Doner.jpg', 'hero-doner.jpg'],
  ['2024/04/Hero-Shoarma.jpg', 'hero-shoarma.jpg'],
  ['2024/04/Hero-Gevogelte.jpg', 'hero-gevogelte.jpg'],
  ['2024/04/Hero-Vleessoorten.jpg', 'hero-vleessoorten.jpg'],
  ['2024/04/Hero-Diepvriesproducten.jpg', 'hero-coldstorage.jpg'],
  ['2024/04/Hero-turkse-pizza.jpg', 'hero-turkse-pizza.jpg'],
  ['2024/04/Hero-Gegrilde.jpg', 'hero-gegrild.jpg'],
  ['2023/06/Hero-Tortilla-Durum.jpg', 'hero-tortilla-durum.jpg'],
  ['2023/06/raw-meat-1.jpg', 'raw-meat-1.jpg'],
  ['2023/06/raw-fresh-marbled-meat-steak-seasonings-and-meat-fork-on-dark-marble-background.jpg', 'product-spotlight-marbled.jpg'],
  ['2023/06/raw-meat-beef-steak-with-seasoning-on-chopping-board-on-dark-background-with-rosemary-.jpg', 'product-spotlight-steak.jpg'],
  ['2023/07/Spare-ribs.jpg', 'product-spotlight-ribs.jpg'],
];

const DESTS = [
  path.join(ROOT, 'src/assets/ayat'),
  path.join(ROOT, 'ipekci-theme/assets/images/ayat'),
];

for (const dir of DESTS) {
  fs.mkdirSync(dir, { recursive: true });
}

let ok = 0;
let fail = 0;

for (const [remote, local] of ASSETS) {
  const url = `${BASE}/${remote}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${local} — HTTP ${res.status}`);
    fail++;
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  for (const dir of DESTS) {
    fs.writeFileSync(path.join(dir, local), buf);
  }
  console.log(`OK   ${local} (${(buf.length / 1024).toFixed(0)} KB)`);
  ok++;
}

// OG previews — use category hero crops for social cards
const OG_DIR = path.join(ROOT, 'ipekci-theme/assets/images/og');
fs.mkdirSync(OG_DIR, { recursive: true });
const ogMap = [
  ['hero-doner.jpg', 'doner.jpg'],
  ['hero-shoarma.jpg', 'shoarma.jpg'],
  ['hero-gevogelte.jpg', 'gevogelte.jpg'],
  ['hero-vleessoorten.jpg', 'vleessoorten.jpg'],
  ['hero-coldstorage.jpg', 'diepvriesproducten.jpg'],
  ['hero-turkse-pizza.jpg', 'turkse-pizza.jpg'],
  ['hero-gegrild.jpg', 'gegrilde-producten.jpg'],
  ['hero-tortilla-durum.jpg', 'tortilla-durum.jpg'],
  ['producten-sfeer.jpg', 'producten.jpg'],
];
for (const [src, dest] of ogMap) {
  const srcPath = path.join(DESTS[0], src);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(OG_DIR, dest));
    console.log(`OG   ${dest}`);
  }
}

console.log(`\nDone: ${ok} downloaded, ${fail} failed`);

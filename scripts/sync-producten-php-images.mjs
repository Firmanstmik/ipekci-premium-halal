/**
 * Sync producten gallery + hero image refs in producten-data.php
 * to match src/lib/producten-content.ts (official ayatfood.nl assets).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PHP = path.join(ROOT, 'ipekci-theme/inc/producten-data.php');

let src = fs.readFileSync(PHP, 'utf8');

const replacements = [
  ["ipekci_ayat_img( 'explorer-stage.webp' )", "ipekci_ayat_img( 'producten-sfeer.jpg' )"],

  // doner gallery
  [
    `'gallery'          => array(
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'explorer-doner.webp' ),
\t\t\t\t\t'alt'     => __( 'Döner kebab aan de verticale spies', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'De verticale spies, laagje voor laagje geroosterd.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-doner-bak.jpg' ),
\t\t\t\t\t'alt'     => __( 'Gesneden döner in een bak', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Vers gesneden, direct verpakt voor levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-slide-1-premium.jpg' ),
\t\t\t\t\t'alt'     => __( 'Döner geserveerd in pitabrood', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Van onze spies naar uw toonbank.', 'ipekci' ),
\t\t\t\t),
\t\t\t),`,
    `'gallery'          => array(
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-doner.jpg' ),
\t\t\t\t\t'alt'     => __( 'Döner kebab productie', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'De verticale spies, laagje voor laagje geroosterd.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'product-doner.jpg' ),
\t\t\t\t\t'alt'     => __( 'Döner kebab assortiment', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Vers gesneden, direct verpakt voor levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'raw-meat-1.jpg' ),
\t\t\t\t\t'alt'     => __( 'Halal productie onder NVWA-normen en ECC Halal-toezicht', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Onder toezicht, van productie tot levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t),`,
  ],
];

// Simpler: regex replacements for image filenames
const fileMap = [
  ['explorer-stage.webp', 'producten-sfeer.jpg'],
  ['explorer-doner.webp', 'hero-doner.jpg'],
  ['hero-doner-bak.jpg', 'product-doner.jpg'],
  ['hero-slide-1-premium.jpg', 'raw-meat-1.jpg'],
  ['explorer-shoarma.webp', 'hero-shoarma.jpg'],
  ['hero-shoarma-bak.jpg', 'product-shoarma.jpg'],
  ['hero-slide-2-premium.jpg', 'raw-meat-1.jpg'],
  ['explorer-gevogelte.webp', 'hero-gevogelte.jpg'],
  ['hero-home2.jpg', 'product-gevogelte.jpg'],
  ['ayat-eind-kipburger.webp', 'raw-meat-1.jpg'],
  ['explorer-vleessoorten.webp', 'hero-vleessoorten.jpg'],
  ['hero-vlees.jpg', 'product-vleessoorten.jpg'],
  ['ayat-eind-hamburger.webp', 'raw-meat-1.jpg'],
  ['explorer-diepvries.webp', 'hero-coldstorage.jpg'],
  ['hero-processing.jpg', 'product-diepvries.jpg'],
  ['hero-home1.jpg', 'raw-meat-1.jpg'],
  ['explorer-turkse-pizza.webp', 'hero-turkse-pizza.jpg'],
  ['hero-slide-3-premium.jpg', 'product-turkse-pizza.jpg'],
  ['ayat-eind-adana.webp', 'raw-meat-1.jpg'],
  ['explorer-gegrild.webp', 'hero-gegrild.jpg'],
  ['ayat-eind-merquez.webp', 'product-gegrild.jpg'],
  ['ayat-eind-sucuk.webp', 'raw-meat-1.jpg'],
  ['explorer-durum.webp', 'hero-tortilla-durum.jpg'],
  ['ayat-eind-kip-merquez.webp', 'raw-meat-1.jpg'],
];

// Order matters — apply in sequence per category blocks only once
// Use targeted block updates instead

const blocks = [
  {
    slug: 'doner',
    gallery: `array(
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-doner.jpg' ),
\t\t\t\t\t'alt'     => __( 'Döner kebab productie', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'De verticale spies, laagje voor laagje geroosterd.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'product-doner.jpg' ),
\t\t\t\t\t'alt'     => __( 'Döner kebab assortiment', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Vers gesneden, direct verpakt voor levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'raw-meat-1.jpg' ),
\t\t\t\t\t'alt'     => __( 'Halal productie onder NVWA-normen en ECC Halal-toezicht', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Onder toezicht, van productie tot levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t)`,
  },
  {
    slug: 'shoarma',
    gallery: `array(
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-shoarma.jpg' ),
\t\t\t\t\t'alt'     => __( 'Shoarma productie', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Gemarineerd, gestapeld, draaiend gegaard.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'product-shoarma.jpg' ),
\t\t\t\t\t'alt'     => __( 'Shoarma assortiment', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Op maat gesneden voor de professionele keuken.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'raw-meat-1.jpg' ),
\t\t\t\t\t'alt'     => __( 'Halal productie onder NVWA-normen en ECC Halal-toezicht', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Onder toezicht, van productie tot levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t)`,
  },
  {
    slug: 'gevogelte',
    gallery: `array(
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-gevogelte.jpg' ),
\t\t\t\t\t'alt'     => __( 'Gevogelte productie', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Kip en kalkoen: mager, mals en veelzijdig.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'product-gevogelte.jpg' ),
\t\t\t\t\t'alt'     => __( 'Gevogelte assortiment', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Eigen productie, consistente kwaliteit.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'raw-meat-1.jpg' ),
\t\t\t\t\t'alt'     => __( 'Halal productie onder NVWA-normen en ECC Halal-toezicht', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Onder toezicht, van productie tot levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t)`,
  },
  {
    slug: 'vleessoorten',
    gallery: `array(
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-vleessoorten.jpg' ),
\t\t\t\t\t'alt'     => __( 'Vleessoorten productie', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Geselecteerd op versheid, textuur en marmering.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'product-vleessoorten.jpg' ),
\t\t\t\t\t'alt'     => __( 'Vleessoorten assortiment', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Zorgvuldig versneden in eigen productie.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'raw-meat-1.jpg' ),
\t\t\t\t\t'alt'     => __( 'Halal productie onder NVWA-normen en ECC Halal-toezicht', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Onder toezicht, van productie tot levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t)`,
  },
  {
    slug: 'diepvriesproducten',
    gallery: `array(
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-coldstorage.jpg' ),
\t\t\t\t\t'alt'     => __( 'Diepvriesproducten', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Snel ingevroren op het hoogtepunt van versheid.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'product-diepvries.jpg' ),
\t\t\t\t\t'alt'     => __( 'Diepvries assortiment', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Met zorg ingepakt voor de vriesketen.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'raw-meat-1.jpg' ),
\t\t\t\t\t'alt'     => __( 'Halal productie onder NVWA-normen en ECC Halal-toezicht', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Onder toezicht, van productie tot levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t)`,
  },
  {
    slug: 'turkse-pizza',
    hero: 'hero-turkse-pizza.jpg',
    gallery: `array(
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-turkse-pizza.jpg' ),
\t\t\t\t\t'alt'     => __( 'Turkse pizza (lahmacun)', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Flinterdun deeg, hartige topping.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'product-turkse-pizza.jpg' ),
\t\t\t\t\t'alt'     => __( 'Turkse pizza assortiment', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Opgerold als wrap of plat geserveerd.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'raw-meat-1.jpg' ),
\t\t\t\t\t'alt'     => __( 'Halal productie onder NVWA-normen en ECC Halal-toezicht', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Onder toezicht, van productie tot levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t)`,
  },
  {
    slug: 'gegrilde-producten',
    hero: 'hero-gegrild.jpg',
    gallery: `array(
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-gegrild.jpg' ),
\t\t\t\t\t'alt'     => __( 'Gegrilde producten', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Voorgegaard en gegrild, direct leverbaar.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'product-gegrild.jpg' ),
\t\t\t\t\t'alt'     => __( 'Gegrild assortiment', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Rokerig aroma, sappige textuur.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'raw-meat-1.jpg' ),
\t\t\t\t\t'alt'     => __( 'Halal productie onder NVWA-normen en ECC Halal-toezicht', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Onder toezicht, van productie tot levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t)`,
  },
  {
    slug: 'tortilla-durum',
    hero: 'hero-tortilla-durum.jpg',
    gallery: `array(
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'hero-tortilla-durum.jpg' ),
\t\t\t\t\t'alt'     => __( 'Tortilla dürüm', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Dun, flexibel platbrood. Letterlijk ‘opgerold’.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'product-durum.jpg' ),
\t\t\t\t\t'alt'     => __( 'Tortilla Durum assortiment', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Elke vulling uit ons assortiment past erin.', 'ipekci' ),
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'src'     => ipekci_ayat_img( 'raw-meat-1.jpg' ),
\t\t\t\t\t'alt'     => __( 'Halal productie onder NVWA-normen en ECC Halal-toezicht', 'ipekci' ),
\t\t\t\t\t'caption' => __( 'Onder toezicht, van productie tot levering.', 'ipekci' ),
\t\t\t\t),
\t\t\t)`,
  },
];

for (const block of blocks) {
  const slugRe = new RegExp(
    `'slug'\\s*=>\\s*'${block.slug.replace(/-/g, '\\-')}'[\\s\\S]*?'gallery'\\s*=>\\s*array\\([\\s\\S]*?\\),`,
    'm',
  );
  if (!slugRe.test(src)) {
    console.warn('Block not found:', block.slug);
    continue;
  }
  src = src.replace(slugRe, (match) => {
    let out = match.replace(/'gallery'\s*=>\s*array\([\s\S]*?\),/, `'gallery'          => ${block.gallery},`);
    if (block.hero) {
      out = out.replace(
        /'hero_image'\s*=>\s*ipekci_ayat_img\(\s*'[^']+'\s*\)/,
        `'hero_image'       => ipekci_ayat_img( '${block.hero}' )`,
      );
    }
    return out;
  });
  console.log('Updated', block.slug);
}

src = src.replace(
  /'hero_image'\s*=>\s*ipekci_ayat_img\(\s*'explorer-stage\.webp'\s*\)/,
  "'hero_image' => ipekci_ayat_img( 'producten-sfeer.jpg' )",
);

fs.writeFileSync(PHP, src);
console.log('Wrote', PHP);

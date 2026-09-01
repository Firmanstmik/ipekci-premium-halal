import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PHP = path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), 'ipekci-theme/inc/producten-data.php');
let s = fs.readFileSync(PHP, 'utf8');

const before = s.length;
s = s.replace(
  /\t\t\t\),\n\t\t\t\t\t'alt'[\s\S]*?\n\t\t\t\),\n\t\t\t'products'/g,
  "\t\t\t),\n\t\t\t'products'",
);

fs.writeFileSync(PHP, s);
console.log('Removed', before - s.length, 'chars of duplicate gallery junk');

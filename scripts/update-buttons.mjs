import fs from 'fs';
import path from 'path';

const THEME_DIR = path.resolve('ipekci-theme');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith('.php') || file.endsWith('.css') || file.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk(THEME_DIR);
let count = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('ipek-btn-premium')) {
    content = content.replace(/ipek-btn-premium/g, 'hero-cta hero-cta--primary');
    changed = true;
  }
  if (content.includes('ipek-btn-ghost')) {
    content = content.replace(/ipek-btn-ghost/g, 'hero-cta hero-cta--ghost');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated: ${path.relative(THEME_DIR, file)}`);
    count++;
  }
}

console.log(`\nUpdated ${count} files.`);
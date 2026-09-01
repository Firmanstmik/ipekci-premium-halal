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

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('hero-cta hero-cta--primary')) {
    content = content.replace(/hero-cta hero-cta--primary/g, 'ipek-btn-premium');
    changed = true;
  }
  if (content.includes('hero-cta hero-cta--ghost')) {
    content = content.replace(/hero-cta hero-cta--ghost/g, 'ipek-btn-ghost');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
  }
}

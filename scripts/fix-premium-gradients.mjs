import fs from 'fs';
import path from 'path';

const files = [
  'ipekci-theme/assets/css/design-system.css',
  'ipekci-theme/assets/css/home.css'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(
    /background:\s*linear-gradient\([^,]+,\s*#[a-fA-F0-9]+\s+0%,\s*#[a-fA-F0-9]+\s+55%,\s*#[a-fA-F0-9]+\s+100%\);/g,
    'background: linear-gradient(135deg, #ef3b3c 0%, #da292a 48%, #b01e20 100%);'
  );
  
  content = content.replace(
    /background:\s*linear-gradient\([^,]+,\s*#[a-fA-F0-9]+\s+0%,\s*#[a-fA-F0-9]+\s+48%,\s*#[a-fA-F0-9]+\s+100%\);/g,
    'background: linear-gradient(135deg, #ef3b3c 0%, #da292a 48%, #b01e20 100%);'
  );

  fs.writeFileSync(file, content);
}

console.log('Fixed .ipek-btn-premium gradients.');

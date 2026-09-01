import fs from 'fs';
import path from 'path';

const stylesPath = path.resolve('src/styles.css');
const dsPath = path.resolve('ipekci-theme/assets/css/design-system.css');
const homePath = path.resolve('ipekci-theme/assets/css/home.css');

const stylesContent = fs.readFileSync(stylesPath, 'utf8');

// Extract .hero-cta rules
const startIdx = stylesContent.indexOf('/* ── Hero CTA (premium hover + wipe) ── */');
const endIdx = stylesContent.indexOf('/* ── Loading state ── */');
const heroCtaCSS = stylesContent.substring(startIdx, endIdx);

// Remove old .ipek-btn-premium from design-system.css
let dsContent = fs.readFileSync(dsPath, 'utf8');
const dsStart = dsContent.indexOf('/**\n * .ipek-btn-premium');
const dsEnd = dsContent.indexOf('/**\n * .lux-btn');
if (dsStart !== -1 && dsEnd !== -1) {
  dsContent = dsContent.substring(0, dsStart) + heroCtaCSS + '\n' + dsContent.substring(dsEnd);
  fs.writeFileSync(dsPath, dsContent);
}

// Remove old .ipek-btn-premium from home.css
let homeContent = fs.readFileSync(homePath, 'utf8');
const homeStart = homeContent.indexOf('/* ==========================================================================\n   Premium CTA (home.css)');
const homeEnd = homeContent.indexOf('/* ==========================================================================\n   Dual CTA Row');
if (homeStart !== -1 && homeEnd !== -1) {
  homeContent = homeContent.substring(0, homeStart) + homeContent.substring(homeEnd);
  fs.writeFileSync(homePath, homeContent);
}

console.log('Copied hero-cta CSS to WP and removed ipek-btn-premium');

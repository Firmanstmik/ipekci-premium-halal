const res = await fetch('https://ayatfood.nl/vacatures/');
const html = await res.text();
const urls = [...html.matchAll(/https:\/\/ayatfood\.nl\/wp-content\/uploads\/[^"'\\s)]+/g)].map((m) => m[0]);
console.log('UPLOADS IN HTML:');
[...new Set(urls)].forEach((u) => console.log(u));

// Elementor inline styles often carry background-image URLs
const cssLinks = [...html.matchAll(/href=['"]([^'"]*elementor[^'"]*\.css[^'"]*)['"]/gi)].map((m) => m[1]);
console.log('\nELEMENTOR CSS:', cssLinks.slice(0, 5));

for (const link of cssLinks.slice(0, 3)) {
  const cssUrl = link.startsWith('http') ? link : `https://ayatfood.nl${link.startsWith('/') ? '' : '/'}${link}`;
  const cssRes = await fetch(cssUrl);
  if (!cssRes.ok) continue;
  const css = await cssRes.text();
  const bgUrls = [...css.matchAll(/url\(["']?(https:\/\/ayatfood\.nl\/wp-content\/uploads\/[^"')]+)["']?\)/g)].map((m) => m[1]);
  if (bgUrls.length) {
    console.log(`\nFROM ${cssUrl}:`);
    [...new Set(bgUrls)].forEach((u) => console.log(u));
  }
}

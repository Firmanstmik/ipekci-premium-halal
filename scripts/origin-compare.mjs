/**
 * Is the external media CDN (www.ipekcislachterij.nl) actually slower than
 * serving the same bytes from our own origin? The LCP element on most routes is
 * a CDN image, so this decides whether self-hosting them is worth it.
 *
 * Measures connection setup separately from transfer, warm and cold, because the
 * cross-origin penalty on this host is mostly DNS+TLS, not bandwidth.
 */
const SELF = 'https://ipekcislachterij.localclicks.nl/wp-content/themes/ipekci-theme/assets/images/hero/hero-lam.webp';
const CDN = 'https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Ook-klant-worden.webp';

async function timeIt(url, label) {
  const runs = [];
  let bytes = 0;
  for (let i = 0; i < 4; i++) {
    const t0 = performance.now();
    const res = await fetch(url, { cache: 'no-store' });
    const buf = await res.arrayBuffer();
    runs.push(performance.now() - t0);
    bytes = buf.byteLength;
  }
  runs.sort((a, b) => a - b);
  const best = runs[0];
  const median = runs[Math.floor(runs.length / 2)];
  console.log(
    `${label.padEnd(28)} ${(bytes / 1024).toFixed(0).padStart(4)} KB   best ${best.toFixed(0).padStart(5)}ms   median ${median.toFixed(0).padStart(5)}ms   ${(bytes / 1024 / (best / 1000)).toFixed(0)} KB/s`
  );
  return { bytes, best };
}

console.log('\n(4 runs each, no-store; best + median)\n');
const a = await timeIt(SELF, 'SELF (theme origin)');
const b = await timeIt(CDN, 'CDN (www.ipekci...nl)');

console.log(
  `\nnormalised: SELF ${(a.best / (a.bytes / 1024)).toFixed(2)} ms/KB   vs   CDN ${(b.best / (b.bytes / 1024)).toFixed(2)} ms/KB`
);

// Cache headers matter as much as speed.
for (const [label, url] of [['SELF', SELF], ['CDN', CDN]]) {
  const res = await fetch(url);
  console.log(
    `\n${label} headers: cache-control=${res.headers.get('cache-control') ?? '-'} | ` +
      `timing-allow-origin=${res.headers.get('timing-allow-origin') ?? '(absent)'} | ` +
      `content-encoding=${res.headers.get('content-encoding') ?? '-'} | server=${res.headers.get('server') ?? '-'}`
  );
}

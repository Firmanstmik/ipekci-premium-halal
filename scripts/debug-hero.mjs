import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

page.on('console', (m) => console.log('  [console]', m.type(), m.text().slice(0, 160)));
page.on('requestfailed', (r) => {
  if (r.url().includes('.webm')) console.log('  [reqfailed]', r.url().slice(-40), r.failure()?.errorText);
});
page.on('response', (r) => {
  if (r.url().includes('.webm')) console.log('  [response]', r.status(), r.url().slice(-40));
});

await page.goto('https://ipekcislachterij.localclicks.nl/', { waitUntil: 'domcontentloaded' });

for (const t of [1000, 3000, 6000, 9000]) {
  await page.waitForTimeout(t === 1000 ? 1000 : 3000);
  const s = await page.evaluate(() => {
    const v = document.getElementById('ipekci-hero-video');
    if (!v) return { missing: true };
    return {
      src: (v.getAttribute('src') || '').slice(-30),
      readyState: v.readyState,
      networkState: v.networkState,
      paused: v.paused,
      currentTime: +v.currentTime.toFixed(2),
      duration: v.duration,
      error: v.error ? v.error.code + ':' + v.error.message : null,
      buffered: v.buffered.length ? v.buffered.end(0).toFixed(1) : 0,
      videoActive: !!document.getElementById('ipekci-hero')?.classList.contains('is-video-active'),
    };
  });
  console.log(`t=${t}ms`, JSON.stringify(s));
}

await browser.close();

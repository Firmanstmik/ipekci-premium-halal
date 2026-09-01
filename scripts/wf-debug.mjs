import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();
await page.goto('https://ipekcislachterij.localclicks.nl/ons-verhaal/?bust=4', { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(4000);

const data = await page.evaluate(() => {
  const section = document.querySelector('section[aria-labelledby="ons-verhaal-workflow-heading"]');
  const heroImg = section?.querySelector('.ipekci-ov2-wf__hero-media img, .ipekci-ov2-wf__hero-bg img');
  const stepImgs = [...(section?.querySelectorAll('.ipekci-ov2-wf__step-img img') || [])];
  const cs = (el) => (el ? getComputedStyle(el) : null);
  return {
    hero: heroImg ? {
      src: heroImg.getAttribute('src'),
      complete: heroImg.complete,
      naturalWidth: heroImg.naturalWidth,
      naturalHeight: heroImg.naturalHeight,
      display: cs(heroImg).display,
      opacity: cs(heroImg).opacity,
      visibility: cs(heroImg).visibility,
      width: cs(heroImg).width,
      height: cs(heroImg).height,
      position: cs(heroImg).position,
    } : null,
    heroMedia: (() => {
      const el = section?.querySelector('.ipekci-ov2-wf__hero-media');
      return el ? {
        width: cs(el).width,
        height: cs(el).height,
        left: cs(el).left,
        right: cs(el).right,
        overflow: cs(el).overflow,
        zIndex: cs(el).zIndex,
      } : null;
    })(),
    heroBg: (() => {
      const el = section?.querySelector('.ipekci-ov2-wf__hero-bg');
      return el ? {
        width: cs(el).width,
        height: cs(el).height,
        minHeight: cs(el).minHeight,
        opacity: cs(el).opacity,
      } : null;
    })(),
    steps: stepImgs.map((img, i) => ({
      i,
      src: img.getAttribute('src'),
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      stepImgBox: (() => {
        const wrap = img.closest('.ipekci-ov2-wf__step-img');
        return wrap ? { height: cs(wrap).height, display: cs(wrap).display, overflow: cs(wrap).overflow } : null;
      })(),
      img: { height: cs(img).height, maxHeight: cs(img).maxHeight, display: cs(img).display },
    })),
    watermark: (() => {
      const el = section?.querySelector('.ipekci-ov2-wf__watermark');
      return el ? { display: cs(el).display, opacity: cs(el).opacity, color: cs(el).color } : null;
    })(),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();

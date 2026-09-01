import { chromium } from 'playwright';

const REACT_URL = 'http://localhost:3001';
const WP_URL = 'https://ipekcislachterij.localclicks.nl';
const VIEWPORTS = [
  { width: 1920, height: 1080, name: 'Desktop' },
  { width: 1024, height: 768, name: 'Tablet' },
  { width: 390, height: 844, name: 'Mobile' }
];

async function extractStyles(page, selector, elementsToExtract) {
  return await page.evaluate(({ sel, elementsToExtract }) => {
    const root = document.querySelector(sel);
    if (!root) return null;
    
    function getStyles(el) {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        classes: el.className,
        text: el.innerText.substring(0, 30).replace(/\n/g, ' '),
        width: rect.width,
        height: rect.height,
        display: computed.display,
        flexDirection: computed.flexDirection,
        gap: computed.gap,
        padding: computed.padding,
        margin: computed.margin,
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        lineHeight: computed.lineHeight,
      };
    }

    const data = {
      root: getStyles(root),
      children: []
    };

    if (elementsToExtract) {
       for (const childSel of elementsToExtract) {
           const children = root.querySelectorAll(childSel);
           data.children.push({
               selector: childSel,
               styles: Array.from(children).map(getStyles)
           });
       }
    }
    return data;
  }, { sel: selector, elementsToExtract });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const reactPage = await context.newPage();
  const wpPage = await context.newPage();

  console.log('Loading pages...');
  await reactPage.goto(REACT_URL, { waitUntil: 'domcontentloaded' });
  await wpPage.goto(WP_URL, { waitUntil: 'domcontentloaded' });

  for (const vp of VIEWPORTS) {
    console.log(`\n--- Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    await reactPage.setViewportSize(vp);
    await wpPage.setViewportSize(vp);
    await reactPage.waitForTimeout(1000);
    await wpPage.waitForTimeout(1000);

    // Navbar
    const reactNavbar = await extractStyles(reactPage, 'nav, header, .navbar', ['.nav-link', '.menu-item', 'a', 'button']);
    const wpNavbar = await extractStyles(wpPage, 'nav, header, .ipekci-navbar', ['.nav-link', '.menu-item', 'a', 'button']);
    
    console.log('React Navbar Root:', reactNavbar?.root);
    console.log('WP Navbar Root:', wpNavbar?.root);
  }

  await browser.close();
}

run().catch(console.error);
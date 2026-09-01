import https from 'https';

const urls = [
  '/',
  '/ons-verhaal/',
  '/contact/',
  '/assortiment/',
  '/assortiment/lamsvlees/',
  '/assortiment/rundvlees/',
  '/assortiment/kip/',
  '/assortiment/eindproducten/',
  '/voor-wie/',
  '/voor-wie/slagerijen/',
  '/voor-wie/groothandels/',
  '/voor-wie/supermarkten/',
  '/voor-wie/restaurants/',
  '/vacatures/',
  '/non-existent-page-404/'
];

const BASE = 'https://ipekcislachterij.localclicks.nl';

async function checkUrl(path) {
  return new Promise((resolve) => {
    https.get(BASE + path + '?bust=' + Date.now(), (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          hasError: /fatal error/i.test(data) || /white screen/i.test(data),
          length: data.length,
          title: data.match(/<title[^>]*>([^<]+)<\/title>/)?.[1] || 'No title'
        });
      });
    }).on('error', (err) => {
      resolve({ path, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log('Starting remote verification (Phase 6)...');
  let hasFailures = false;
  for (const path of urls) {
    const res = await checkUrl(path);
    const ok = (res.status === 200 && path !== '/non-existent-page-404/') || (res.status === 404 && path === '/non-existent-page-404/');
    if (!ok || res.hasError) hasFailures = true;
    console.log(`[${ok && !res.hasError ? 'OK' : 'FAIL'}] ${path} - Status: ${res.status}, Length: ${res.length}, Title: ${res.title}`);
  }
  if (hasFailures) {
    console.error('Validation failed. Some pages returned incorrect status or fatal errors.');
    process.exit(1);
  } else {
    console.log('All pages verified successfully.');
  }
}

run();
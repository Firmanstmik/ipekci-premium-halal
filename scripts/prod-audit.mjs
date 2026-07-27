/**
 * Technical SEO + security-hardening + architecture sweep of the live site.
 *
 * Runs anonymously against the cached, public site — this is what a crawler or an
 * attacker actually sees, which is the only view that matters for these checks.
 *
 * Usage: node scripts/prod-audit.mjs
 */
const BASE = 'https://ipekcislachterij.localclicks.nl';

const ROUTES = [
  '/', '/ons-verhaal/', '/contact/',
  '/assortiment/', '/assortiment/lamsvlees/', '/assortiment/rundvlees/',
  '/assortiment/kip/', '/assortiment/eindproducten/',
  '/voor-wie/', '/voor-wie/slagerijen/', '/voor-wie/groothandels/',
  '/voor-wie/supermarkten/', '/voor-wie/restaurants/',
];

const get = async (path, opts = {}) => {
  const res = await fetch(BASE + path, { redirect: 'manual', ...opts });
  const body = res.headers.get('content-type')?.includes('image') ? '' : await res.text();
  return { status: res.status, headers: res.headers, body, location: res.headers.get('location') };
};

const pick = (html, re) => (html.match(re) || [])[1] || null;

console.log('=========== TECHNICAL SEO ===========\n');

const seo = [];
for (const route of ROUTES) {
  const r = await get(route);
  seo.push({
    route,
    status: r.status,
    title: pick(r.body, /<title>([^<]*)<\/title>/),
    desc: pick(r.body, /<meta name="description" content="([^"]*)"/),
    canonical: pick(r.body, /<link rel="canonical" href="([^"]*)"/),
    ogTitle: pick(r.body, /<meta property="og:title" content="([^"]*)"/),
    ogImage: pick(r.body, /<meta property="og:image" content="([^"]*)"/),
    h1: (r.body.match(/<h1[\s>]/g) || []).length,
    jsonld: (r.body.match(/application\/ld\+json/g) || []).length,
    lang: pick(r.body, /<html[^>]*lang="([^"]*)"/),
    robots: pick(r.body, /<meta name="robots" content="([^"]*)"/),
  });
}

const titles = new Map();
const descs = new Map();
const canons = new Map();
for (const s of seo) {
  titles.set(s.title, (titles.get(s.title) || 0) + 1);
  descs.set(s.desc, (descs.get(s.desc) || 0) + 1);
  canons.set(s.canonical, (canons.get(s.canonical) || 0) + 1);
  const issues = [];
  if (s.status !== 200) issues.push('status ' + s.status);
  if (!s.title) issues.push('NO TITLE');
  if (!s.desc) issues.push('NO DESCRIPTION');
  if (s.desc && s.desc.length > 160) issues.push(`desc ${s.desc.length} chars (>160)`);
  if (!s.canonical) issues.push('NO CANONICAL');
  if (s.h1 !== 1) issues.push(`h1 count = ${s.h1}`);
  if (!s.jsonld) issues.push('NO JSON-LD');
  if (s.lang !== 'nl-NL') issues.push(`lang=${s.lang}`);
  if (s.robots && /noindex/.test(s.robots)) issues.push('NOINDEX!');
  console.log(
    `${issues.length ? 'WARN' : ' ok '}  ${s.route.padEnd(30)} h1:${s.h1} ld:${s.jsonld} desc:${s.desc ? s.desc.length : 0}ch` +
      (issues.length ? `  <<< ${issues.join(', ')}` : '')
  );
}

const dupT = [...titles].filter(([, n]) => n > 1);
const dupD = [...descs].filter(([, n]) => n > 1);
const dupC = [...canons].filter(([, n]) => n > 1);
console.log('\nduplicate titles:', dupT.length ? dupT : 'none');
console.log('duplicate descriptions:', dupD.length ? dupD : 'none');
console.log('duplicate canonicals:', dupC.length ? dupC : 'none');

// Sitemap + robots.
console.log('\n--- crawl infrastructure ---');
const robots = await get('/robots.txt');
console.log('robots.txt:', robots.status);
console.log(robots.body.trim().split('\n').map((l) => '   ' + l).join('\n'));

const sitemap = await get('/wp-sitemap.xml');
console.log('wp-sitemap.xml:', sitemap.status);
const sitemaps = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log('   sub-sitemaps:', sitemaps.length ? sitemaps.join('\n                 ') : 'NONE');

let sitemapUrls = [];
for (const sm of sitemaps) {
  const r = await fetch(sm);
  const t = await r.text();
  sitemapUrls.push(...[...t.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}
console.log('   total URLs advertised:', sitemapUrls.length);
sitemapUrls.forEach((u) => console.log('     ', u));

const missing = ROUTES.map((r) => BASE + r).filter(
  (u) => !sitemapUrls.some((s) => s.replace(/\/$/, '') === u.replace(/\/$/, ''))
);
console.log('   routes MISSING from sitemap:', missing.length ? missing : 'none');

// 404 handling.
console.log('\n--- 404 handling ---');
const nf = await get('/deze-pagina-bestaat-niet/');
console.log('bogus URL status:', nf.status, '(want 404)');
console.log('has branded 404 body:', /ipekci|Pagina niet gevonden|404/i.test(nf.body));

console.log('\n=========== SECURITY HARDENING ===========\n');

const home = await get('/');
const H = (n) => home.headers.get(n) || '(absent)';
console.log('--- response headers ---');
for (const h of [
  'strict-transport-security', 'x-content-type-options', 'x-frame-options',
  'referrer-policy', 'content-security-policy', 'permissions-policy', 'x-powered-by', 'server',
]) {
  console.log(`   ${h.padEnd(28)} ${H(h)}`);
}

console.log('\n--- version / info disclosure ---');
console.log('   generator meta:', /<meta name="generator"/.test(home.body) ? 'PRESENT (leak)' : 'absent (good)');
console.log('   readme.html:', (await get('/readme.html')).status, '(want 403/404)');

console.log('\n--- user enumeration ---');
const users = await get('/wp-json/wp/v2/users');
console.log('   /wp-json/wp/v2/users:', users.status, users.status === 200 ? 'EXPOSED: ' + users.body.slice(0, 120) : '(good)');
const authr = await get('/?author=1');
console.log('   /?author=1:', authr.status, authr.location ? '-> ' + authr.location : '');

console.log('\n--- xmlrpc ---');
const xr = await fetch(BASE + '/xmlrpc.php', { method: 'POST', body: '<methodCall><methodName>system.listMethods</methodName><params></params></methodCall>' });
const xrBody = await xr.text();
console.log('   xmlrpc.php POST:', xr.status, /methodResponse/.test(xrBody) ? 'ENABLED (attack surface)' : 'blocked');

console.log('\n--- debug output ---');
const phpErr = /Warning:|Notice:|Deprecated:|Fatal error:|<b>Warning<\/b>/i.test(home.body);
console.log('   PHP notices/warnings in HTML:', phpErr ? 'PRESENT' : 'none');

console.log('\n--- directory listing ---');
for (const d of ['/wp-content/themes/ipekci-theme/', '/wp-content/uploads/', '/wp-content/themes/ipekci-theme/inc/']) {
  const r = await get(d);
  const listing = /Index of|<title>Index/i.test(r.body);
  console.log(`   ${d.padEnd(48)} ${r.status} ${listing ? 'LISTING EXPOSED' : '(no listing)'}`);
}

console.log('\n--- sensitive theme files reachable over HTTP ---');
for (const f of ['functions.php', 'inc/seo.php', 'style.css', '../../../wp-config.php']) {
  const r = await get('/wp-content/themes/ipekci-theme/' + f);
  const leaked = r.status === 200 && /<\?php|DB_PASSWORD/.test(r.body);
  console.log(`   ${f.padEnd(28)} ${r.status} ${leaked ? 'SOURCE LEAKED' : r.status === 200 ? '(served, no source)' : '(blocked)'}`);
}

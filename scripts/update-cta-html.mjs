import fs from 'fs';
import path from 'path';

const THEME_DIR = path.resolve('ipekci-theme');

const files = [
  '404.php',
  'templates/page-voor-wie.php',
  'templates/page-vacatures.php',
  'templates/page-contact.php',
  'templates/page-producten.php',
  'template-parts/home/section-storytelling.php',
  'template-parts/home/section-speerpunten.php',
  'template-parts/home/section-premium-meat-showcase.php',
  'template-parts/home/section-hero.php',
  'template-parts/home/section-eindproducten.php'
];

for (const file of files) {
  const filePath = path.join(THEME_DIR, file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace ipek-btn-premium block
  content = content.replace(
    /<a ([^>]+)class="ipek-btn-premium([^"]*)"([^>]*)>\s*<span class="[^"]*__sheen"[^>]*><\/span>\s*<span class="relative z-10([^"]*)">([\s\S]*?)<\/span>\s*<svg[^>]*class="ipek-btn-premium__arrow[^"]*"[^>]*>[\s\S]*?<\/svg>\s*<\/a>/g,
    (match, p1, p2, p3, p4, innerContent) => {
      return `<a ${p1}class="hero-cta hero-cta--primary${p2}"${p3}>
	<span class="hero-cta-wipe" aria-hidden="true"></span>
	<span class="hero-cta-border-glow" aria-hidden="true"></span>
	<span class="hero-cta-shine" aria-hidden="true"></span>
	<span class="relative z-10${p4}">${innerContent}</span>
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:text-[#da292a] shrink-0" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
</a>`;
    }
  );

  // Replace ipek-btn-ghost block
  content = content.replace(
    /<a ([^>]+)class="ipek-btn-ghost([^"]*)"([^>]*)>\s*<span class="relative z-10([^"]*)">([\s\S]*?)<\/span>\s*(?:<svg[^>]*class="ipek-btn-ghost__arrow[^"]*"[^>]*>[\s\S]*?<\/svg>\s*)?<\/a>/g,
    (match, p1, p2, p3, p4, innerContent) => {
      return `<a ${p1}class="hero-cta hero-cta--ghost${p2}"${p3}>
	<span class="hero-cta-wipe" aria-hidden="true"></span>
	<span class="hero-cta-ghost-ring" aria-hidden="true"></span>
	<span class="relative z-10${p4}">${innerContent}</span>
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 transition-transform duration-500 group-hover:translate-x-1.5 text-foreground/50 group-hover:text-[#da292a] shrink-0" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
</a>`;
    }
  );

  // Update classes in CSS files
  fs.writeFileSync(filePath, content);
}
console.log('Done replacing CTA HTML in PHP templates.');
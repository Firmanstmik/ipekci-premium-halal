"""Download the two webfont families locally and emit a self-hosted @font-face sheet."""
import os, re, urllib.request

UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
      'Chrome/131.0.0.0 Safari/537.36')
OUT_DIR = 'ipekci-theme/assets/fonts'
os.makedirs(OUT_DIR, exist_ok=True)

SOURCES = {
    'cormorant': 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap',
    'generalsans': 'https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap',
}

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    return urllib.request.urlopen(req, timeout=60).read()

blocks = []
for key, url in SOURCES.items():
    css = get(url).decode('utf-8')
    print(f'--- {key}: {len(css)} bytes of CSS')

    # Split into @font-face blocks so each face keeps its own descriptors.
    for face in re.findall(r'@font-face\s*\{[^}]+\}', css):
        # Only keep latin / latin-ext subsets from Google (it emits many scripts).
        # Google uses absolute https URLs; Fontshare uses protocol-relative ones.
        m_url = re.search(r"""url\(['"]?((?:https:)?//[^)'"]+?\.woff2)['"]?\)""", face)
        if not m_url:
            continue
        font_url = m_url.group(1)
        if font_url.startswith('//'):
            font_url = 'https:' + font_url

        family = re.search(r"font-family:\s*['\"]([^'\"]+)", face).group(1)
        weight = re.search(r'font-weight:\s*([^;]+);', face)
        weight = weight.group(1).strip() if weight else '400'
        style = re.search(r'font-style:\s*([^;]+);', face)
        style = style.group(1).strip() if style else 'normal'
        unicode_range = re.search(r'unicode-range:\s*([^;]+);', face)

        # Google ships one face per subset; skip the non-latin ones by their range.
        if key == 'cormorant' and unicode_range:
            ur = unicode_range.group(1)
            if 'U+0301' in ur or 'U+0460' in ur or 'U+0370' in ur or 'U+1F00' in ur:
                continue  # cyrillic / greek

        slug = f"{key}-{weight.replace(' ', '_')}-{style}"
        # Multiple latin subsets can collide (latin + latin-ext); suffix if needed.
        n, fname = 0, f'{slug}.woff2'
        while os.path.exists(os.path.join(OUT_DIR, fname)):
            n += 1
            fname = f'{slug}-{n}.woff2'

        data = get(font_url)
        with open(os.path.join(OUT_DIR, fname), 'wb') as fh:
            fh.write(data)
        print(f'  {fname:38} {len(data)/1024:6.1f} KB  ({family} {weight} {style})')

        ur_line = f'\n\tunicode-range: {unicode_range.group(1)};' if unicode_range else ''
        blocks.append(
            f"@font-face {{\n"
            f"\tfont-family: '{family}';\n"
            f"\tfont-style: {style};\n"
            f"\tfont-weight: {weight};\n"
            f"\tfont-display: swap;\n"
            f"\tsrc: url('../fonts/{fname}') format('woff2');{ur_line}\n"
            f"}}"
        )

header = """/**
 * Self-hosted webfonts.
 *
 * Replaces the two render-blocking third-party stylesheets (fonts.googleapis.com
 * + api.fontshare.com). Serving the faces from our own origin removes two
 * cross-origin round trips from the critical path and keeps visitor IP addresses
 * off Google's servers — the Google Fonts CDN is a documented GDPR exposure for
 * EU sites. Faces are byte-identical to the CDN's latin subsets.
 *
 * Generated — do not hand-edit; see scripts/fetch_fonts.py.
 */

"""

with open('ipekci-theme/assets/css/fonts.css', 'w', encoding='utf-8') as fh:
    fh.write(header + '\n\n'.join(blocks) + '\n')

total = sum(os.path.getsize(os.path.join(OUT_DIR, f)) for f in os.listdir(OUT_DIR))
print(f'\n{len(blocks)} faces, {total/1024:.0f} KB total -> assets/css/fonts.css')

"""Localize every remaining hot-linked CDN asset: site chrome + content images.

Companion to localize-cdn-media.py, which handles the big LCP hero backdrops and
deliberately re-encodes them. These assets do NOT go through that pipeline:

  - The logo, halal badge and product shots carry an alpha channel.
    localize-cdn-media.py does `.convert('RGB')`, which flattens transparency.
  - The category stickers/icons are SVG. PIL cannot open them at all.
  - Re-encoding product photography risks a visible change; a byte-for-byte copy
    guarantees the site renders exactly as it does today.

Why this matters: at go-live this theme REPLACES www.ipekcislachterij.nl, so every
`https://www.ipekcislachterij.nl/wp-content/uploads/...` reference resolves against
the new install -- which need not hold these files. Hot-linking them leaves the
catalog one DNS change away from broken images.

Destination mirrors the CDN's own path layout (assets/images/cdn/<same path>),
which is what lets inc/media.php map each CDN URL to its local copy structurally:
dropping the file in IS the change -- no code edit, no manifest.

Idempotent: a file already present is left alone unless --force.
"""
import os
import sys
import time
import urllib.request


def fetch(url, tries=4):
    """Download url, retrying: the legacy CDN stalls on the larger product shots.

    Returns the complete body or raises. Callers only ever write a fully-read
    body, so an aborted attempt can never leave a truncated file on disk.
    """
    for attempt in range(1, tries + 1):
        try:
            with urllib.request.urlopen(url, timeout=180) as r:
                return r.read()
        except Exception:
            if attempt == tries:
                raise
            time.sleep(3 * attempt)

CDN = 'https://www.ipekcislachterij.nl/wp-content/uploads'
DEST = 'ipekci-theme/assets/images/cdn'
FORCE = '--force' in sys.argv

PATHS = [
    '/2025/11/Adana-Kebab.png',
    '/2025/11/categorie_gevogelte_icon.svg',
    '/2025/11/categorie_lamsvlees-icon.svg',
    '/2025/11/categorie_rundvlees_icon.svg',
    '/2025/12/100-proces-halal.webp',
    '/2025/12/2-5-duizend-dieren-pw.webp',
    '/2025/12/20-plus-wagens-en-chauffeurs.webp',
    '/2025/12/50-duizen-kilo-rundvlees-per-week.webp',
    '/2025/12/Hamburger.png',
    '/2025/12/Kalkoensshoarma.png',
    '/2025/12/Kip-Merquez-1.png',
    '/2025/12/Kip-burger.png',
    '/2025/12/Lamsbout-met-bot.png',
    '/2025/12/Lamsbout-zonder-bot.png',
    '/2025/12/Lamscotelet-lamsvlees.png',
    '/2025/12/Lamsentricote.png',
    '/2025/12/Lamshaas.png',
    '/2025/12/Lamsnek.png',
    '/2025/12/Lamsrack.png',
    '/2025/12/Lamsrib.png',
    '/2025/12/Lamsschenkel.png',
    '/2025/12/Lamsschouder-met-bot.png',
    '/2025/12/Lamsschouder-zonder-bot.png',
    '/2025/12/Lamsshoarma.png',
    '/2025/12/Onze-geschiedenis.webp',
    '/2025/12/Persoonlijke-service.webp',
    '/2025/12/Rib-eye.png',
    '/2025/12/Runder-Merquez.png',
    '/2025/12/Turkse-Worst-Sucuk.png',
    '/2025/12/eindproducten-van-eigen-vlees.webp',
    '/2025/12/halal-certificaat.webp',
    '/2025/12/placeholder.webp',
    '/2025/12/premium-kwaliteit.webp',
    '/2025/12/shortribs.png',
    '/2025/12/werken-bij-ayat.webp',
]

total = 0
for path in PATHS:
    dest = DEST + path
    os.makedirs(os.path.dirname(dest), exist_ok=True)

    if os.path.exists(dest) and not FORCE:
        print(f'  {path:48} exists, skipped')
        continue

    raw = fetch(CDN + path)

    with open(dest, 'wb') as fh:
        fh.write(raw)

    total += len(raw)
    print(f'  {path:48} {len(raw) / 1024:8.1f} KB')

if total:
    print(f'\n  localized {total / 1024 / 1024:.1f} MB across {len(PATHS)} assets')

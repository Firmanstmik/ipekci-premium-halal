"""Pull the LCP hero images off the external media CDN and serve them ourselves.

Why: on 10 of the 13 routes the LCP element is an <img> hosted on
www.ipekcislachterij.nl, a *different origin* from the site. Measured
(scripts/origin-compare.mjs), that origin runs ~6.08 ms/KB against our own
origin's 4.24 ms/KB, and reaching it costs a whole extra DNS+TLS handshake on a
host where a round trip is already ~1s. It also ships the files at a needlessly
high bitrate (Ook-klant-worden.webp is 249 KB).

These are full-bleed hero backdrops sitting behind a heavy dark scrim, so they
tolerate aggressive re-encoding with no perceptible loss. They are NOT
downscaled: measured intrinsic widths (1218-1440px) are already at or below the
box they paint into at 1440px, so there is no resolution headroom to give back.

Files land under assets/images/cdn/<same path as the CDN>, which is what lets
inc/media.php map a CDN URL to its local copy structurally, with no manifest to
keep in sync.

Idempotent: an image already present locally is left alone unless --force.
"""
import io
import os
import sys
import urllib.request
from PIL import Image

CDN = 'https://www.ipekcislachterij.nl/wp-content/uploads'
DEST = 'ipekci-theme/assets/images/cdn'
FORCE = '--force' in sys.argv

# Every CDN image that is an LCP element on some route (scripts/lcp-images.mjs),
# plus the two that heroes fall back to.
PATHS = [
    '/2025/12/Ook-klant-worden.webp',                    # front-page backdrop, /assortiment, /voor-wie, klant CTA
    '/2025/12/over-ons-40-jaar-ervaring.webp',           # /ons-verhaal video poster
    '/2026/03/Contact-Ayat.webp',                        # /contact
    '/2026/03/Lamsvlees-overzicht.webp',                 # /assortiment/lamsvlees
    '/2026/01/rundvlees.webp',                           # /assortiment/rundvlees
    '/2025/12/Menu-kip.webp',                            # /assortiment/kip
    '/2025/11/Altijd-dezelfde-smaak-en-kwaliteit.webp',  # /assortiment/eindproducten
    '/2025/11/Voor-wie-slagerijen.webp',                 # /voor-wie/slagerijen
    '/2025/11/Voor-wie-groothandels.webp',               # /voor-wie/groothandels
    '/2025/11/voor-supermarkten.webp',                   # /voor-wie/supermarkten
    '/2025/11/Voor-restaurants.webp',                    # /voor-wie/restaurants
]

MAX_W = 1600   # widest box any of these paints into is ~1551px
QUALITY = 76   # they all sit behind a dark scrim

total_before = total_after = 0

for path in PATHS:
    dest = DEST + path
    os.makedirs(os.path.dirname(dest), exist_ok=True)

    if os.path.exists(dest) and not FORCE:
        print(f'  {path:48} exists, skipped')
        continue

    with urllib.request.urlopen(CDN + path, timeout=120) as r:
        raw = r.read()

    im = Image.open(io.BytesIO(raw))
    w, h = im.size
    if w > MAX_W:
        im = im.resize((MAX_W, round(h * MAX_W / w)), Image.LANCZOS)

    buf = io.BytesIO()
    im.convert('RGB').save(buf, 'WEBP', quality=QUALITY, method=6)

    # Never ship a file bigger than the CDN's own.
    out = buf.getvalue() if buf.tell() < len(raw) else raw
    with open(dest, 'wb') as fh:
        fh.write(out)

    before, after = len(raw) / 1024, len(out) / 1024
    total_before += before
    total_after += after
    note = '' if out is not raw else '  (kept CDN original — already smaller)'
    print(f'  {path:48} {w}x{h}  {before:6.0f} KB -> {after:6.0f} KB{note}')

if total_before:
    print(f'\n  {len(PATHS)} LCP images localized: {total_before:.0f} KB -> {total_after:.0f} KB '
          f'(saved {total_before - total_after:.0f} KB, {100 * total_after / total_before:.0f}%)')

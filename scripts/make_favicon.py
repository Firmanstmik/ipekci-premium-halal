"""Generate the Ipekci favicon set from the bull-head mark in the official logo."""
import os
from PIL import Image

SRC = 'ipekci-theme/assets/images/logo-ipekci-new.webp'
OUT = 'ipekci-theme/assets/images/favicon'
os.makedirs(OUT, exist_ok=True)

im = Image.open(SRC).convert('RGBA')
W, H = im.size

# The bull head sits in the right-hand third of the lockup. Find its exact bbox by
# scanning that region for non-transparent, non-white (i.e. inked) pixels.
px = im.load()
x0, y0, x1, y1 = W, H, 0, 0
for y in range(H):
    for x in range(int(W * 0.68), W):
        r, g, b, a = px[x, y]
        if a > 40 and not (r > 235 and g > 235 and b > 235):
            if x < x0: x0 = x
            if y < y0: y0 = y
            if x > x1: x1 = x
            if y > y1: y1 = y
print('mark bbox:', (x0, y0, x1, y1), 'size:', (x1 - x0, y1 - y0))

mark = im.crop((x0, y0, x1 + 1, y1 + 1))
mw, mh = mark.size

# Build an alpha mask from the ink (dark pixels + the logo's red accent), so the
# mark can be recoloured cleanly onto the dark brand ground.
mask = Image.new('L', (mw, mh), 0)
mp, kp = mask.load(), mark.load()
for y in range(mh):
    for x in range(mw):
        r, g, b, a = kp[x, y]
        if a < 40:
            continue
        lum = (0.299 * r + 0.587 * g + 0.114 * b)
        # Ink = anything meaningfully darker than the white plate.
        if lum < 225:
            mp[x, y] = int(min(255, (225 - lum) / 225 * 255 * 1.6))

BRAND_RED = (179, 15, 11)
GROUND = (20, 17, 15)

def build(size, pad_ratio=0.14, ground=GROUND):
    canvas = Image.new('RGBA', (size, size), ground + (255,))
    inner = int(size * (1 - pad_ratio * 2))
    scale = min(inner / mw, inner / mh)
    nw, nh = max(1, int(mw * scale)), max(1, int(mh * scale))
    m = mask.resize((nw, nh), Image.LANCZOS)
    ink = Image.new('RGBA', (nw, nh), BRAND_RED + (255,))
    canvas.paste(ink, ((size - nw) // 2, (size - nh) // 2), m)
    return canvas

for s in (512, 192, 180, 32, 16):
    name = {180: 'apple-touch-icon.png'}.get(s, f'favicon-{s}.png')
    build(s).save(os.path.join(OUT, name))
    print('wrote', name)

# Multi-resolution .ico for legacy /favicon.ico requests.
build(64).save(os.path.join(OUT, 'favicon.ico'),
               sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print('wrote favicon.ico')

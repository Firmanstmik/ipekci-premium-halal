"""Re-encode the hero showcase slide images.

All five slides live in the hero card and are fetched on every homepage visit
(~1.5 MB). They are displayed in a 516x212 CSS box via object-fit: cover, so
1040px on the long edge still covers DPR2 with headroom; the sources are up to
1280px and encoded well above what that box can resolve.

Quality 82 with Lanczos downscaling is visually indistinguishable at the display
size. Idempotent: skips a file that is already at or below the target width.
"""
import os
from PIL import Image

SRC = 'ipekci-theme/assets/images/hero'
MAX_W = 1040
QUALITY = 82

total_before = total_after = 0

for name in sorted(os.listdir(SRC)):
    if not name.endswith('.webp'):
        continue

    path = os.path.join(SRC, name)
    before = os.path.getsize(path)
    im = Image.open(path)

    if im.size[0] <= MAX_W:
        print(f'  {name:24} {im.size[0]}x{im.size[1]}  skipped (already <= {MAX_W}px)')
        total_before += before
        total_after += before
        continue

    h = round(im.size[1] * MAX_W / im.size[0])
    im.resize((MAX_W, h), Image.LANCZOS).save(path, 'WEBP', quality=QUALITY, method=6)

    after = os.path.getsize(path)
    total_before += before
    total_after += after
    print(
        f'  {name:24} {im.size[0]}x{im.size[1]} -> {MAX_W}x{h}   '
        f'{before/1024:6.0f} KB -> {after/1024:6.0f} KB  ({100*after/before:.0f}%)'
    )

print(
    f'\n  TOTAL  {total_before/1024:.0f} KB -> {total_after/1024:.0f} KB  '
    f'(saved {(total_before-total_after)/1024:.0f} KB)'
)

import os
from PIL import Image

SRC = 'ipekci-theme/assets/images/ayat'
MAX_W = 1200
QUALITY = 80

total_before = total_after = 0

print("Optimizing large webp/jpg images in ayat folder...")

for name in sorted(os.listdir(SRC)):
    if not (name.endswith('.webp') or name.endswith('.jpg') or name.endswith('.jpeg')):
        continue

    path = os.path.join(SRC, name)
    before = os.path.getsize(path)
    im = Image.open(path)

    if im.size[0] <= MAX_W and before < 500 * 1024:
        print(f'  {name:30} {im.size[0]:4d}x{im.size[1]:4d}  skipped (small enough)')
        total_before += before
        total_after += before
        continue

    # Resize if larger than MAX_W, otherwise just re-encode to lower quality
    if im.size[0] > MAX_W:
        w = MAX_W
        h = round(im.size[1] * MAX_W / im.size[0])
        im = im.resize((w, h), Image.Resampling.LANCZOS)
    else:
        w, h = im.size

    fmt = 'WEBP' if name.endswith('.webp') else 'JPEG'
    kw = {'quality': QUALITY}
    if fmt == 'WEBP':
        kw['method'] = 6

    # Convert RGBA to RGB for JPEG if needed
    if fmt == 'JPEG' and im.mode == 'RGBA':
        im = im.convert('RGB')

    im.save(path, fmt, **kw)

    after = os.path.getsize(path)
    total_before += before
    total_after += after
    print(
        f'  {name:30} {w:4d}x{h:4d}   '
        f'{before/1024:6.0f} KB -> {after/1024:6.0f} KB  ({100*after/before:3.0f}%)'
    )

print(
    f'\n  TOTAL  {total_before/1024/1024:.1f} MB -> {total_after/1024/1024:.1f} MB  '
    f'(saved {(total_before-total_after)/1024/1024:.1f} MB)'
)
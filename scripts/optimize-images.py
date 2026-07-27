"""Optimize the theme's remaining heavy imagery.

Every decision here comes from scripts/oversized-images.mjs, which measured each
image's intrinsic resolution against the largest box it is actually rendered in
(at 390px and 1440px). Two distinct problems, treated differently:

  * OVERSIZED — intrinsic resolution far above what any breakpoint can show. The
    logo is the worst: 1536px wide, rendered at 184px. These are downscaled to 2x
    their largest rendered width, which is the most a retina display can resolve.

  * OVER-ENCODED — correctly sized but written at a needlessly high bitrate (the
    trust stills are 0.41 bytes/px; the same shot at q82 is ~0.2). These keep
    their dimensions — they are already slightly under 2x at their display size,
    so downscaling them would visibly soften the carousel — and are only re-encoded.

The meat cuts are correctly sized but are JPEG; WebP at the same quality is far
smaller. They are the one set whose references must change (.jpg -> .webp).

Idempotent: re-running will not degrade an already-processed file, because each
target is compared against its own budget before being rewritten.
"""
import io
import os
from PIL import Image

THEME = 'ipekci-theme/assets/images/'


def kb(path):
    return os.path.getsize(path) / 1024


def save_if_smaller(im, path, fmt, **opts):
    """Write the re-encode only if it actually beats the file already on disk.

    Some sources are already encoded below our quality target — re-encoding those
    both grows the file AND stacks a second lossy pass on top of the first. Encode
    to memory, compare, and keep the original when it wins. (trust-koeling.webp
    grew 114 KB -> 122 KB before this guard existed.)
    """
    buf = io.BytesIO()
    im.save(buf, fmt, **opts)
    if buf.tell() >= os.path.getsize(path):
        return False
    with open(path, 'wb') as fh:
        fh.write(buf.getvalue())
    return True


def report(label, before, after):
    saved = before - after
    pct = (100 * after / before) if before else 100
    print(f'  {label:34} {before:7.0f} KB -> {after:7.0f} KB   (saved {saved:6.0f} KB, {pct:.0f}%)')
    return saved


total_saved = 0

# --- 1. Logo: 1536px wide, rendered at 184px (4.17x oversized). Used on every page.
path = THEME + 'logo-ipekci-new.webp'
before = kb(path)
im = Image.open(path)
if im.size[0] > 400:
    h = round(im.size[1] * 400 / im.size[0])
    im.resize((400, h), Image.LANCZOS).save(path, 'WEBP', quality=86, method=6)
total_saved += report('logo-ipekci-new.webp (4.2x)', before, kb(path))

# --- 2. Trust carousel: correctly sized, over-encoded. Re-encode only.
print()
for name in sorted(os.listdir(THEME + 'trust')):
    if not name.endswith('.webp'):
        continue
    path = THEME + 'trust/' + name
    before = kb(path)
    if before < 100:
        continue
    im = Image.open(path)
    if not save_if_smaller(im, path, 'WEBP', quality=82, method=6):
        print(f'  {("trust/" + name):34} {before:7.0f} KB    kept (already better encoded)')
        continue
    total_saved += report('trust/' + name, before, kb(path))

# --- 3. Assortiment AVIFs: 1024px wide, rendered at 277px (1.85x oversized).
print()
for name in sorted(os.listdir(THEME + 'assortiment')):
    path = THEME + 'assortiment/' + name
    before = kb(path)
    if before < 100:
        continue
    im = Image.open(path)
    target = 560 if name.endswith('.avif') else 900
    if im.size[0] > target:
        h = round(im.size[1] * target / im.size[0])
        im = im.resize((target, h), Image.LANCZOS)
    fmt = 'AVIF' if name.endswith('.avif') else 'WEBP'
    if not save_if_smaller(im, path, fmt, quality=80):
        print(f'  {("assortiment/" + name):34} {before:7.0f} KB    kept (already better encoded)')
        continue
    total_saved += report('assortiment/' + name, before, kb(path))

# --- 4. Meat cuts: correctly sized but JPEG. Convert to WebP (references updated).
print()
converted = 0
for name in sorted(os.listdir(THEME + 'meat')):
    if not name.endswith('.jpg'):
        continue
    src = THEME + 'meat/' + name
    dst = src[:-4] + '.webp'
    before = kb(src)
    Image.open(src).convert('RGB').save(dst, 'WEBP', quality=82, method=6)
    total_saved += report('meat/' + name + ' -> webp', before, kb(dst))
    os.remove(src)
    converted += 1

print(f'\n  converted {converted} meat JPEGs to WebP (update the two .jpg references in')
print('  template-parts/home/section-premium-meat-showcase.php)')
print(f'\n  TOTAL SAVED: {total_saved:.0f} KB')

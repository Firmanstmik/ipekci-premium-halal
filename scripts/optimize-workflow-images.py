"""Resize + WebP encode workflow/stats/highlight PNGs for fast ons-verhaal loads."""
import os
from PIL import Image

TARGETS = [
    # (filename, max_width) — sized for actual CSS display boxes
    ('workflow-hero-meat.png', 1400),
    ('workflow-step-zoek.png', 480),
    ('workflow-step-bestel.png', 480),
    ('workflow-step-bezorgen.png', 480),
    ('workflow-step-geniet.png', 480),
    ('stats-hero-kebab.png', 1200),
    ('highlight-beste-vlees.png', 640),
    ('highlight-kwaliteit.png', 640),
    ('highlight-verzending.png', 640),
    ('highlight-halal.png', 640),
]

DIRS = [
    'src/assets/ayat',
    'ipekci-theme/assets/images/ayat',
]

total_before = total_after = 0

for d in DIRS:
    if not os.path.isdir(d):
        continue
    print(f'\n=== {d} ===')
    for name, max_w in TARGETS:
        src = os.path.join(d, name)
        if not os.path.isfile(src):
            print(f'  skip missing {name}')
            continue
        im = Image.open(src)
        before = os.path.getsize(src)
        w, h = im.size
        if w > max_w:
            h = round(h * max_w / w)
            w = max_w
            im = im.resize((w, h), Image.Resampling.LANCZOS)
        out = os.path.join(d, os.path.splitext(name)[0] + '.webp')
        im.save(out, 'WEBP', quality=82, method=6)
        after = os.path.getsize(out)
        total_before += before
        total_after += after
        print(f'  {name:32} {w:4}x{h:<4}  {before/1024:7.0f} KB png -> {after/1024:5.0f} KB webp')

print(f'\nTOTAL saved: {(total_before - total_after)/1024/1024:.1f} MB ({total_before/1024/1024:.1f} -> {total_after/1024/1024:.1f} MB webp)')

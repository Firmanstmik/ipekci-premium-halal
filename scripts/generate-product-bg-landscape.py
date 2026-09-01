"""
Generate 16:9 landscape background plates for Beste producten sections.

Preferred workflow (premium AI):
  1. Generate with Cursor GenerateImage (16:9), one per slug → assets/product-bg-{slug}.jpg
  2. python scripts/install-ai-product-backgrounds.py

Fallback (composites from hero photos):
  python scripts/generate-product-bg-landscape.py
"""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "assets" / "ayat"
OUT_DIRS = [
    SRC,
    ROOT / "ipekci-theme" / "assets" / "images" / "ayat",
]

TARGET_W = 1920
TARGET_H = 1080

# slug -> source filename (hero preferred when landscape; product otherwise)
CATEGORY_SOURCES: dict[str, str] = {
    "doner": "hero-doner.jpg",
    "shoarma": "hero-shoarma.jpg",
    "gevogelte": "hero-gevogelte.jpg",
    "vleessoorten": "hero-vleessoorten.jpg",
    "diepvriesproducten": "hero-coldstorage.jpg",
    "turkse-pizza": "hero-turkse-pizza.jpg",
    "gegrilde-producten": "hero-gegrild.jpg",
    "tortilla-durum": "hero-tortilla-durum.jpg",
}


def _radial_mask(size: tuple[int, int], cx: float, cy: float, radius: float) -> Image.Image:
    w, h = size
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    for step in range(int(radius), 0, -2):
        alpha = int(255 * (step / radius) ** 1.8)
        draw.ellipse(
            (cx - step, cy - step, cx + step, cy + step),
            fill=min(255, alpha),
        )
    return mask.filter(ImageFilter.GaussianBlur(8))


def build_landscape(source: Path) -> Image.Image:
    canvas = Image.new("RGB", (TARGET_W, TARGET_H), (18, 16, 14))

    # Warm stone wash on the left (mockup cream zone bleeds into photo)
    stone = Image.new("RGB", (TARGET_W, TARGET_H), (245, 235, 218))
    stone_mask = Image.new("L", (TARGET_W, TARGET_H), 0)
    sm = ImageDraw.Draw(stone_mask)
    sm.rectangle((0, 0, int(TARGET_W * 0.52), TARGET_H), fill=255)
    sm.rectangle((int(TARGET_W * 0.38), 0, int(TARGET_W * 0.62), TARGET_H), fill=180)
    sm.rectangle((int(TARGET_W * 0.52), 0, int(TARGET_W * 0.72), TARGET_H), fill=90)
    stone_mask = stone_mask.filter(ImageFilter.GaussianBlur(48))
    canvas = Image.composite(stone, canvas, stone_mask)

    photo = Image.open(source).convert("RGB")

    # Fit photo into right ~68% of frame
    zone_w = int(TARGET_W * 0.72)
    zone_h = int(TARGET_H * 0.92)
    scale = min(zone_w / photo.width, zone_h / photo.height)
    nw = int(photo.width * scale)
    nh = int(photo.height * scale)
    photo = photo.resize((nw, nh), Image.Resampling.LANCZOS)

    # Soft blurred duplicate for depth
    blur = photo.copy().resize((int(nw * 1.15), int(nh * 1.15)), Image.Resampling.LANCZOS)
    blur = blur.filter(ImageFilter.GaussianBlur(28))
    bx = TARGET_W - int(nw * 1.08)
    by = (TARGET_H - blur.height) // 2
    canvas.paste(blur, (bx, by))

    px = TARGET_W - nw - int(TARGET_W * 0.04)
    py = (TARGET_H - nh) // 2
    canvas.paste(photo, (px, py))

    # Dark board vignette under product (second reference — charcoal studio)
    vignette = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    board_w = int(nw * 1.08)
    board_h = int(nh * 1.06)
    bx0 = px - (board_w - nw) // 2
    by0 = py - (board_h - nh) // 2
    vd.rounded_rectangle(
        (bx0, by0, bx0 + board_w, by0 + board_h),
        radius=32,
        fill=(12, 10, 8, 110),
    )
    warm = Image.new("RGBA", (TARGET_W, TARGET_H), (255, 210, 160, 0))
    warm_draw = ImageDraw.Draw(warm)
    warm_draw.ellipse(
        (px - 40, py - 60, px + nw + 40, py + nh + 60),
        fill=(255, 200, 140, 38),
    )
    canvas = Image.alpha_composite(canvas.convert("RGBA"), vignette)
    canvas = Image.alpha_composite(canvas, warm)
    canvas = canvas.convert("RGB")

    # Left cream fade (CSS also applies — baked-in helps WP/static)
    fade = Image.new("RGBA", (TARGET_W, TARGET_H), (243, 237, 228, 0))
    fd = ImageDraw.Draw(fade)
    for i in range(int(TARGET_W * 0.58)):
        alpha = int(220 * (1 - i / (TARGET_W * 0.58)) ** 1.1)
        fd.line([(i, 0), (i, TARGET_H)], fill=(243, 237, 228, alpha))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), fade).convert("RGB")

    # Subtle top/bottom vignette
    edge = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    ed = ImageDraw.Draw(edge)
    ed.rectangle((0, 0, TARGET_W, 80), fill=(0, 0, 0, 35))
    ed.rectangle((0, TARGET_H - 80, TARGET_W, TARGET_H), fill=(0, 0, 0, 45))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), edge).convert("RGB")

    return canvas


def main() -> None:
    for slug, filename in CATEGORY_SOURCES.items():
        source = SRC / filename
        if not source.exists():
            print(f"SKIP {slug}: missing {filename}")
            continue

        out_name = f"product-bg-{slug}.jpg"
        plate = build_landscape(source)

        for out_dir in OUT_DIRS:
            out_dir.mkdir(parents=True, exist_ok=True)
            dest = out_dir / out_name
            plate.save(dest, "JPEG", quality=86, optimize=True)
            print(f"  {out_name:32} <- {filename}  ->  {dest.relative_to(ROOT)}")

    print("\nDone — 8 landscape backgrounds.")


if __name__ == "__main__":
    main()

"""
Install AI-generated product-bg-*.jpg files into React + WordPress asset folders.

Source: project assets/ (from GenerateImage) or pass --src.
Outputs 1920x1080 JPEG at quality 88 to:
  src/assets/ayat/
  ipekci-theme/assets/images/ayat/
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SRC = ROOT / "assets"
OUT_DIRS = [
    ROOT / "src" / "assets" / "ayat",
    ROOT / "ipekci-theme" / "assets" / "images" / "ayat",
]
TARGET = (1920, 1080)
SLUGS = (
    "doner",
    "shoarma",
    "gevogelte",
    "vleessoorten",
    "diepvriesproducten",
    "turkse-pizza",
    "gegrilde-producten",
    "tortilla-durum",
)


def install(src: Path) -> None:
    for slug in SLUGS:
        name = f"product-bg-{slug}.jpg"
        source = src / name
        if not source.exists():
            print(f"SKIP missing: {source}")
            continue

        img = Image.open(source).convert("RGB")
        if img.size != TARGET:
            img = img.resize(TARGET, Image.Resampling.LANCZOS)

        for out_dir in OUT_DIRS:
            out_dir.mkdir(parents=True, exist_ok=True)
            dest = out_dir / name
            img.save(dest, "JPEG", quality=88, optimize=True)
            print(f"  {name} -> {dest.relative_to(ROOT)}")

    print("\nDone — 8 AI backgrounds installed.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--src", type=Path, default=DEFAULT_SRC)
    args = parser.parse_args()
    install(args.src.resolve())


if __name__ == "__main__":
    main()

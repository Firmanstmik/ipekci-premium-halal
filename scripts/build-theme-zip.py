"""Build ipekci-theme.zip for upload via Appearance > Themes > Add New.

Windows' Compress-Archive writes backslash path separators, which WordPress's
unzip can flatten into literal `ipekci-theme\\inc\\setup.php` filenames. The zip
spec requires forward slashes, so build the archive explicitly.

Usage: python scripts/build-theme-zip.py
"""

from __future__ import annotations

import os
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THEME = ROOT / "ipekci-theme"
OUT = ROOT / "ipekci-theme.zip"

# Never ship editor/OS noise into the theme.
EXCLUDE_NAMES = {".DS_Store", "Thumbs.db", "desktop.ini"}
EXCLUDE_DIRS = {".git", "node_modules", "__pycache__"}


def main() -> None:
    if not THEME.is_dir():
        raise SystemExit(f"theme directory not found: {THEME}")

    if OUT.exists():
        OUT.unlink()

    count = 0
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for dirpath, dirnames, filenames in os.walk(THEME):
            dirnames[:] = sorted(d for d in dirnames if d not in EXCLUDE_DIRS)
            for filename in sorted(filenames):
                if filename in EXCLUDE_NAMES:
                    continue
                abs_path = Path(dirpath) / filename
                # Arcname is relative to the repo root, so the archive contains a
                # single top-level `ipekci-theme/` folder as WordPress expects.
                arcname = abs_path.relative_to(ROOT).as_posix()
                zf.write(abs_path, arcname)
                count += 1

    size_mb = OUT.stat().st_size / (1024 * 1024)
    print(f"{OUT.name}: {count} files, {size_mb:.1f} MB")


if __name__ == "__main__":
    main()

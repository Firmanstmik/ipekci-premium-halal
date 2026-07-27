from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
src = ROOT / "src/assets/ayat/logo.jpg"
ai = Path(r"C:\Users\HYPE AMD\.cursor\projects\d-UKONNECT-COMPANY-BISMILLAH-WORKSPACE-IPEKCI-grand-route-studio\assets\ayat-logo-transparent.png")
out = ROOT / "src/assets/ayat/logo-transparent.png"
public = ROOT / "public/ayat-logo.png"
favicon = ROOT / "public/favicon.png"


def remove_white(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r > 235 and g > 235 and b > 235:
                pixels[x, y] = (r, g, b, 0)
            elif r > 205 and g > 205 and b > 205:
                whiteness = min(r, g, b)
                alpha = int(max(0, min(255, (248 - whiteness) * 7)))
                # keep red tint if present
                if r > g + 20 and r > b + 20:
                    pixels[x, y] = (r, g, b, max(a, 180))
                else:
                    pixels[x, y] = (r, g, b, alpha)
    return img


def finalize(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    pad = 24
    canvas = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(img, (pad, pad), img)
    return canvas


# Prefer AI transparent if available, else process original
if ai.exists():
    result = Image.open(ai).convert("RGBA")
    # scrub any leftover near-white
    result = remove_white(result)
    result = finalize(result)
    print("using AI logo + cleanup")
else:
    result = finalize(remove_white(Image.open(src)))
    print("using processed original")

# Also create a precise original-based version for fidelity
original = finalize(remove_white(Image.open(src)))
original_out = ROOT / "src/assets/ayat/logo-original-transparent.png"
original.save(original_out, "PNG")

# Use original processed for brand fidelity (exact letterforms)
result = original
result.save(out, "PNG")
result.save(public, "PNG")

side = max(result.size)
fav = Image.new("RGBA", (side, side), (0, 0, 0, 0))
fav.paste(result, ((side - result.width) // 2, (side - result.height) // 2), result)
fav.resize((256, 256), Image.Resampling.LANCZOS).save(favicon, "PNG")

# Keep AI variant too
if ai.exists():
    ai_clean = finalize(remove_white(Image.open(ai)))
    ai_clean.save(ROOT / "src/assets/ayat/logo-ai-transparent.png", "PNG")

print("saved", out, result.size)
print("saved", original_out, original.size)

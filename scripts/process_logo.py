"""Extract and generate SHU ANTA logo variants into public/brand/."""
from __future__ import annotations

import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "brand"
OUT.mkdir(parents=True, exist_ok=True)

srcs = sorted((ROOT / "photos").glob("logo.*"))
if not srcs:
    raise SystemExit("photos/logo.* missing")
src = srcs[0]
im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
arr = np.array(im).astype(float)
lum = arr.mean(axis=2)
h, w = lum.shape
ys, xs = np.ogrid[:h, :w]
cy, cx = h / 2.0, w / 2.0
mask_disk = lum > 40
yy, xx = np.where(mask_disk)
r = max(abs(yy.max() - cy), abs(yy.min() - cy), abs(xx.max() - cx), abs(xx.min() - cx)) * 1.01
circ = np.sqrt((xs - cx) ** 2 + (ys - cy) ** 2) <= r

# Full color seal (opaque disk)
a_full = np.where(circ, 255, 0).astype(np.uint8)
color = Image.fromarray(np.dstack([arr.astype(np.uint8), a_full]), "RGBA")
color.putalpha(Image.fromarray(a_full, "L").filter(ImageFilter.GaussianBlur(1.2)))

# Ink-only alpha for monochrome variants (text + thin ring)
ink = np.clip((160 - lum) / 120, 0, 1)
ink = np.where(circ, ink, 0)
alpha = (ink * 255).astype(np.uint8)
edge = circ & (np.sqrt((xs - cx) ** 2 + (ys - cy) ** 2) > r * 0.97)
alpha = np.maximum(alpha, np.where(edge, 220, 0).astype(np.uint8))
ink_im = Image.fromarray(
    np.dstack([np.zeros_like(alpha), np.zeros_like(alpha), np.zeros_like(alpha), alpha]),
    "RGBA",
)

PALETTE = {
    "green": (47, 58, 38),
    "cream": (244, 240, 232),
    "sage": (141, 154, 124),
}


def trim(img: Image.Image, pad: float = 0.06) -> Image.Image:
    box = img.split()[3].point(lambda v: 255 if v > 8 else 0).getbbox()
    if not box:
        return img
    img = img.crop(box)
    p = int(max(img.size) * pad)
    out = Image.new("RGBA", (img.width + 2 * p, img.height + 2 * p), (0, 0, 0, 0))
    out.paste(img, (p, p))
    return out


def mono(alpha_img: Image.Image, rgb: tuple[int, int, int]) -> Image.Image:
    out = Image.new("RGBA", alpha_img.size, rgb + (0,))
    out.putalpha(alpha_img.split()[3])
    return out


color = trim(color)
ink_im = trim(ink_im)
color.save(OUT / "logo-color.png")
color.save(OUT / "logo-mark-color.png")
for name, rgb in PALETTE.items():
    m = mono(ink_im, rgb)
    m.save(OUT / f"logo-{name}.png")
    m.save(OUT / f"logo-mark-{name}.png")


def make_sa_mark(rgb: tuple[int, int, int], size: int = 512) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    draw.ellipse([8, 8, size - 8, size - 8], outline=rgb + (255,), width=10)
    try:
        font = ImageFont.truetype("arial.ttf", size // 3)
    except OSError:
        font = ImageFont.load_default()
    text = "SA"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size - tw) / 2, (size - th) / 2 - size * 0.04), text, fill=rgb + (255,), font=font)
    return canvas


make_sa_mark(PALETTE["green"]).save(OUT / "logo-sa-green.png")


def on_bg(mark: Image.Image, bg: tuple[int, int, int], size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), bg + (255,))
    m = mark.copy()
    m.thumbnail((int(size * 0.78), int(size * 0.78)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


mark_green = Image.open(OUT / "logo-mark-green.png")
on_bg(mark_green, (238, 236, 232), 32).save(OUT / "favicon-32.png")
on_bg(mark_green, (238, 236, 232), 180).save(OUT / "apple-touch-icon.png")
on_bg(mark_green, (238, 236, 232), 192).save(OUT / "icon-192.png")
on_bg(Image.open(OUT / "logo-mark-cream.png"), (47, 58, 38), 512).save(OUT / "icon-512.png")

svg_full = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor">
  <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" stroke-width="3"/>
  <text x="100" y="108" text-anchor="middle" font-family="Georgia, serif" font-size="26">SHU ANTA</text>
</svg>
"""
(OUT / "logo-full.svg").write_text(svg_full, encoding="utf-8")
(OUT / "favicon.svg").write_text(svg_full, encoding="utf-8")

og = Image.new("RGB", (1200, 630), (238, 236, 232))
mark = color.copy()
mark.thumbnail((420, 420), Image.Resampling.LANCZOS)
og_rgba = og.convert("RGBA")
og_rgba.alpha_composite(mark, ((1200 - mark.width) // 2, (630 - mark.height) // 2))
og_rgba.convert("RGB").save(OUT / "og-image.png")

try:
    import vtracer

    mask = Image.new("RGB", ink_im.size, "white")
    mask.paste((0, 0, 0), mask=ink_im.split()[3])
    mask_path = OUT / "_mask.png"
    mask.save(mask_path)
    vtracer.convert_image_to_svg_py(
        str(mask_path),
        str(OUT / "logo-traced.svg"),
        colormode="binary",
        mode="spline",
        filter_speckle=4,
    )
    svg = (OUT / "logo-traced.svg").read_text(encoding="utf-8")
    svg = re.sub(r'fill="#0{6}"', 'fill="currentColor"', svg)
    (OUT / "logo-full.svg").write_text(svg, encoding="utf-8")
    mask_path.unlink(missing_ok=True)
    print("vtracer ok")
except Exception as e:  # noqa: BLE001
    print("vtracer skipped:", e, file=sys.stderr)

print("logo variants written to", OUT)

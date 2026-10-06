"""Process SHU ANTA product photos into public/images/ slots."""
from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)
SLOTS = json.loads((ROOT / "assets" / "slots.json").read_text(encoding="utf-8"))

WIDTHS = [640, 1024, 1600, 2400]

try:
    from rembg import remove, new_session

    SESSION = new_session("isnet-general-use")
    HAS_REMBG = True
except Exception as e:  # noqa: BLE001
    print("rembg unavailable:", e, file=sys.stderr)
    SESSION = None
    HAS_REMBG = False


def open_src(pattern: str, mode: str) -> Image.Image:
    photos = ROOT / "photos"
    path = next(iter(sorted(photos.glob(pattern))), None)
    if path is None:
        # exact filename
        candidate = photos / pattern
        if candidate.exists():
            path = candidate
    if path is None:
        raise FileNotFoundError(f"photos/{pattern}")
    return ImageOps.exif_transpose(Image.open(path)).convert(mode)


def cover(im: Image.Image, ratio: float, width: int, focus=(0.5, 0.5)) -> Image.Image:
    w, h = im.size
    if w / h < ratio:
        tw, th = w, int(w / ratio)
    else:
        tw, th = int(h * ratio), h
    tw = max(1, min(tw, w))
    th = max(1, min(th, h))
    x = int((w - tw) * focus[0])
    y = int((h - th) * focus[1])
    x = max(0, min(x, w - tw))
    y = max(0, min(y, h - th))
    out_h = max(1, int(width / ratio))
    return im.crop((x, y, x + tw, y + th)).resize((width, out_h), Image.Resampling.LANCZOS)


def cutout(im: Image.Image) -> Image.Image:
    if not HAS_REMBG:
        # crude corner-based alpha if rembg missing
        arr_im = im.convert("RGBA")
        return arr_im
    out = remove(
        im,
        session=SESSION,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
    )
    bbox = out.split()[3].getbbox()
    return out.crop(bbox) if bbox else out


def add_shadow(im: Image.Image, dx: int, dy: int, blur: int, opacity: float, pad_ratio: float = 0.3) -> Image.Image:
    w, h = im.size
    pad = int(max(w, h) * pad_ratio)
    canvas = Image.new("RGBA", (w + 2 * pad, h + 2 * pad), (0, 0, 0, 0))
    sh = Image.new("RGBA", im.size, (45, 30, 20, 255))
    sh.putalpha(im.split()[3].point(lambda a: int(a * opacity)))
    canvas.alpha_composite(sh, (pad + dx, pad + dy))
    canvas = canvas.filter(ImageFilter.GaussianBlur(blur))
    canvas.alpha_composite(im, (pad, pad))
    return canvas


def studio(
    im: Image.Image,
    ratio: float,
    width: int,
    scale: float = 0.62,
    bg_top=(236, 236, 233),
    bg_bottom=(208, 208, 204),
) -> Image.Image:
    import numpy as np

    prod = cutout(im.convert("RGBA"))
    W, H = width, max(1, int(width / ratio))
    yy, xx = np.mgrid[0:H, 0:W]
    t = np.clip((yy / H) * 0.7 + (xx / W) * 0.3, 0, 1)[..., None]
    top = np.array(bg_top, dtype=np.float32)
    bot = np.array(bg_bottom, dtype=np.float32)
    bg_arr = (top + (bot - top) * t).astype(np.uint8)
    bg = Image.fromarray(bg_arr, "RGB")
    d = np.abs((xx - W * 0.35) - (yy * 0.45)) / W
    light_arr = np.clip(60 - d * 320, 0, 255).astype(np.uint8)
    light = Image.fromarray(light_arr, "L").filter(ImageFilter.GaussianBlur(max(1, W // 25)))
    bg = Image.composite(Image.new("RGB", (W, H), (255, 255, 255)), bg, light)
    prod.thumbnail((int(W * 0.7), int(H * scale)), Image.Resampling.LANCZOS)
    canvas = bg.convert("RGBA")
    x0 = (W - prod.width) // 2
    y0 = int(H * 0.88) - prod.height
    shadow = Image.new("RGBA", (prod.width, max(8, prod.height // 14)), (40, 30, 20, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(max(1, prod.width // 18)))
    canvas.alpha_composite(shadow, (x0, int(H * 0.88) - shadow.height // 2))
    canvas.alpha_composite(prod, (x0, max(0, y0)))
    return canvas.convert("RGB")


def grade(im: Image.Image, saturation: float = 1.0, contrast: float = 1.0) -> Image.Image:
    im = ImageEnhance.Color(im).enhance(saturation)
    return ImageEnhance.Contrast(im).enhance(contrast)


def placeholder(slot: str, ratio: float, width: int) -> Image.Image:
    h = max(1, int(width / ratio))
    im = Image.new("RGB", (width, h), (238, 236, 232))
    draw = ImageDraw.Draw(im)
    label = f"{slot}\n{width}×{h}"
    draw.rectangle([(20, 20), (width - 20, h - 20)], outline=(141, 154, 124), width=3)
    draw.multiline_text((40, 40), label, fill=(47, 58, 38))
    return im


def save_responsive(im: Image.Image, slot: str, max_width: int, fmt_base: str = "jpg") -> None:
    for w in WIDTHS:
        if w > max_width and w != WIDTHS[0]:
            continue
        tw = min(w, im.width, max_width)
        if tw <= 0:
            continue
        th = max(1, int(im.height * (tw / im.width)))
        resized = im.resize((tw, th), Image.Resampling.LANCZOS)
        if fmt_base == "png" or im.mode == "RGBA":
            out = resized.convert("RGBA") if resized.mode != "RGBA" else resized
            out.save(OUT / f"{slot}-{tw}.png", optimize=True)
            out.save(OUT / f"{slot}-{tw}.webp", quality=90)
            if tw == min(max_width, im.width) or w == max([x for x in WIDTHS if x <= max_width] or [tw]):
                out.save(OUT / f"{slot}.png", optimize=True)
                out.save(OUT / f"{slot}.webp", quality=90)
        else:
            rgb = resized.convert("RGB")
            rgb.save(OUT / f"{slot}-{tw}.webp", quality=88)
            rgb.save(OUT / f"{slot}-{tw}.jpg", quality=90)
            # also write un-suffixed primary at max processed width
    # primary aliases at largest available
    largest = max([w for w in WIDTHS if w <= min(max_width, im.width)] or [min(im.width, max_width)])
    if fmt_base == "png" or im.mode == "RGBA":
        pass  # already saved above
    else:
        src = OUT / f"{slot}-{largest}.jpg"
        if src.exists():
            Image.open(src).save(OUT / f"{slot}.jpg", quality=90)
            Image.open(src).save(OUT / f"{slot}.webp", quality=88)


def process_slot(slot: str, cfg: dict) -> None:
    ratio = float(cfg.get("ratio", 1.0))
    width = int(cfg.get("width", 1200))
    try:
        src = open_src(cfg["src"], "RGBA" if cfg["mode"] in ("cutout", "studio") else "RGB")
    except FileNotFoundError as e:
        print("MISSING", slot, e)
        im = placeholder(slot, ratio if ratio else 1.0, min(width, 1200))
        save_responsive(im, slot, width, "jpg")
        return

    short = min(src.size)
    if short < 800:
        print(f"WARN {slot}: short side {short}px < 800 (upscaling may be needed)")

    if cfg["mode"] == "cutout":
        im = cutout(src)
        if cfg.get("shadow"):
            s = cfg["shadow"]
            im = add_shadow(
                im,
                s.get("dx", -40),
                s.get("dy", 50),
                s.get("blur", 28),
                s.get("opacity", 0.45),
            )
        im.thumbnail((cfg.get("width", 1400),) * 2, Image.Resampling.LANCZOS)
        im.save(OUT / f"{slot}.png", optimize=True)
        im.save(OUT / f"{slot}.webp", quality=90)
        # also sized variants
        for w in [640, 1024, 1400]:
            if w > im.width:
                continue
            th = max(1, int(im.height * (w / im.width)))
            r = im.resize((w, th), Image.Resampling.LANCZOS)
            r.save(OUT / f"{slot}-{w}.png", optimize=True)
            r.save(OUT / f"{slot}-{w}.webp", quality=90)
    elif cfg["mode"] == "studio":
        im = studio(src, ratio, width, cfg.get("scale", 0.62))
        im = grade(im, cfg.get("saturation", 1.0), cfg.get("contrast", 1.0))
        save_responsive(im, slot, width, "jpg")
        # ensure 1200 alias for care slots
        tw = min(1200, im.width)
        th = max(1, int(im.height * (tw / im.width)))
        r = im.resize((tw, th), Image.Resampling.LANCZOS)
        r.save(OUT / f"{slot}-1200.jpg", quality=90)
        r.save(OUT / f"{slot}-1200.webp", quality=88)
    else:
        focus = tuple(cfg.get("focus", (0.5, 0.5)))
        im = cover(src, ratio, min(width, max(src.size[0], 1)), focus)
        # if source smaller than target width, cover already sized to available
        if im.width < width:
            print(f"WARN {slot}: output {im.width}px < target {width}px (no silent upscale beyond 1.5x)")
            if width / max(im.width, 1) <= 1.5:
                im = im.resize((width, max(1, int(width / ratio))), Image.Resampling.LANCZOS)
                print(f"  upscaled to {width}px (within 1.5x)")
            else:
                print(f"  kept {im.width}px — quality insufficient for {width}px")
        im = grade(im, cfg.get("saturation", 1.0), cfg.get("contrast", 1.0))
        save_responsive(im, slot, im.width, "jpg")
        # named aliases used by components
        for alias_w in [640, 1024, 1200, 1600, 2400]:
            if alias_w > im.width:
                continue
            th = max(1, int(im.height * (alias_w / im.width)))
            r = im.resize((alias_w, th), Image.Resampling.LANCZOS)
            r.save(OUT / f"{slot}-{alias_w}.jpg", quality=90)
            r.save(OUT / f"{slot}-{alias_w}.webp", quality=88)
    print("ok", slot)


def main() -> None:
    for slot, cfg in SLOTS.items():
        process_slot(slot, cfg)


if __name__ == "__main__":
    main()

"""Crop design/reference.jpg → design/reference-card.png and copy to public for DevOverlay."""
from pathlib import Path
from PIL import Image
import shutil

ROOT = Path(__file__).resolve().parent.parent
src = ROOT / "design" / "reference.jpg"
if not src.exists():
    raise SystemExit("Place design/reference.jpg first (maquette fournie).")

im = Image.open(src)
# x=57, y=37, w=622, h=1398
card = im.crop((57, 37, 57 + 622, 37 + 1398))
out = ROOT / "design" / "reference-card.png"
card.save(out)
pub = ROOT / "public" / "design"
pub.mkdir(parents=True, exist_ok=True)
shutil.copy(out, pub / "reference-card.png")
print("wrote", out, "and public/design/reference-card.png", card.size)

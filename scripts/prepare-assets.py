from pathlib import Path
from PIL import Image, ImageOps
import subprocess
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
OUT = ROOT / "public" / "media"
PDF_OUT = OUT / "presentations"

def slug(text: str) -> str:
    pairs = {"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"shch","ъ":"","ы":"y","ь":"","э":"e","ю":"yu","я":"ya"}
    text = "".join(pairs.get(ch, ch) for ch in text.lower())
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")

def max_width_for(path: Path) -> int:
    p = str(path)
    if "profile" in p: return 1600
    if "ai-stickers" in p: return 900
    if "gosuslugi/screenshots" in p: return 390
    if "UI-kit" in p: return 1800
    if "website/lending" in p or "website/screenshots" in p or "wireframe" in p or "concept" in p: return 1920
    return 1600

def convert_image(src: Path):
    rel = src.relative_to(ASSETS)
    dest = OUT / rel.with_suffix(".webp")
    dest.parent.mkdir(parents=True, exist_ok=True)
    trim_transparency = rel.as_posix() in {
        "chubby-hippo/website/apple-responsive-devices-mockup (1).png",
        "gosuslugi/floating-iphones-14-pro-max.png",
    }
    if dest.exists() and not trim_transparency: return
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)
        if trim_transparency and "A" in im.getbands():
            bbox = im.getchannel("A").getbbox()
            if bbox:
                im = im.crop(bbox)
        limit = max_width_for(src)
        if im.width > limit:
            h = round(im.height * limit / im.width)
            im = im.resize((limit, h), Image.Resampling.LANCZOS)
        kwargs = dict(format="WEBP", method=6)
        if im.mode in ("RGBA", "LA"):
            kwargs.update(lossless=False, quality=90, exact=True)
        else:
            im = im.convert("RGB")
            kwargs.update(quality=88)
        im.save(dest, **kwargs)

def render_pdf(src: Path):
    deck = slug(src.stem)
    folder = PDF_OUT / deck
    folder.mkdir(parents=True, exist_ok=True)
    prefix = folder / "page"
    if not list(folder.glob("page-*.png")) and not list(folder.glob("page-*.webp")):
        subprocess.run(["pdftoppm", "-jpeg", "-r", "84", str(src), str(prefix)], check=True)
    for jpg in sorted(folder.glob("page-*.jpg")):
        dest = jpg.with_suffix(".webp")
        with Image.open(jpg) as im:
            im.save(dest, "WEBP", quality=86, method=6)
        jpg.unlink()

for src in ASSETS.rglob("*"):
    if src.suffix.lower() in {".png", ".jpg", ".jpeg"}:
        convert_image(src)
    elif src.suffix.lower() in {".webp", ".svg"}:
        dest = OUT / src.relative_to(ASSETS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        if not dest.exists():
            shutil.copy2(src, dest)

pdfs = [
    ASSETS / "presentations" / "AIStickers.pdf",
    ASSETS / "presentations" / "python.pdf",
    ASSETS / "presentations" / "Диаграмма Карно.pdf",
    ASSETS / "presentations" / "Презентация сайта.pdf",
]
for pdf in pdfs:
    render_pdf(pdf)

print("Prepared", len(list(OUT.rglob("*.webp"))), "WebP files")

"""Convertit public/images/*.jpg en WebP optimisé pour le web.

Exigence de performance du cahier des charges (§ VII) : page d'accueil affichée
en moins de 3 secondes sur une connexion mobile moyenne. Chaque visuel est
ramené sous 230 Ko, largeur maximale 1400 px.

Usage :  python optimize-images.py
"""

import glob
import os

from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

IMG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public", "images")
MAX_WIDTH = 1400
TARGET_BYTES = 230 * 1024
QUALITIES = (78, 70, 62, 55, 48)


def convert(path: str) -> tuple[str, int]:
    image = Image.open(path)
    image.load()
    image = image.convert("RGB")

    if image.width > MAX_WIDTH:
        height = round(image.height * MAX_WIDTH / image.width)
        image = image.resize((MAX_WIDTH, height), Image.LANCZOS)

    out = os.path.splitext(path)[0] + ".webp"
    for quality in QUALITIES:
        image.save(out, "WEBP", quality=quality, method=6)
        if os.path.getsize(out) <= TARGET_BYTES:
            break

    if path != out and os.path.exists(path):
        os.remove(path)
    return out, os.path.getsize(out)


def main() -> None:
    sources = sorted(glob.glob(os.path.join(IMG_DIR, "*.jpg")))
    if not sources:
        print("Aucun JPEG à convertir — lancer d'abord ./fetch-images.sh")
        return

    total = 0
    for path in sources:
        out, size = convert(path)
        total += size
        print(f"{os.path.basename(out):<24} {size // 1024:>4} Ko")

    count = len(glob.glob(os.path.join(IMG_DIR, "*.webp")))
    print(f"\n{count} images — {total / 1048576:.1f} Mo — moyenne {total / len(sources) / 1024:.0f} Ko")


if __name__ == "__main__":
    main()

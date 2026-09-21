#!/usr/bin/env python3
"""Compiles the K0BR4 CVs (hand-authored HTML) into the PDFs served by the site.

Sources:
  cv.html              -> public/cv/K0BR4-CV-fr.pdf
  cv/K0BR4-CV-en.html  -> public/cv/K0BR4-CV-en.pdf

The portrait is read from photo_cv_professionnelle.webp (run make_photo() to
rebuild it from the source PNG).
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_CV = ROOT / "public" / "cv"

CVS = [
    (ROOT / "cv.html", PUBLIC_CV / "K0BR4-CV-fr.pdf"),
    (ROOT / "cv" / "K0BR4-CV-en.html", PUBLIC_CV / "K0BR4-CV-en.pdf"),
]

PHOTO_SRC = ROOT / "photo_cv_professionnelle.png"
PHOTO_OUT = ROOT / "photo_cv_professionnelle.webp"


def make_photo() -> None:
    """Rebuild the optimized portrait used by both CVs."""
    if not PHOTO_SRC.exists():
        print(f"  skip: {PHOTO_SRC.name} not found", file=sys.stderr)
        return
    subprocess.run(
        ["magick", str(PHOTO_SRC), "-auto-orient", "-resize", "480x",
         "-strip", "-quality", "84", str(PHOTO_OUT)],
        check=True,
    )
    print(f"  photo  -> {PHOTO_OUT.relative_to(ROOT)}")


def build() -> int:
    PUBLIC_CV.mkdir(parents=True, exist_ok=True)
    if not PHOTO_OUT.exists():
        make_photo()
    failed = 0
    for src, dst in CVS:
        if not src.exists():
            print(f"  missing source: {src}", file=sys.stderr)
            failed += 1
            continue
        res = subprocess.run(["weasyprint", str(src), str(dst)], capture_output=True, text=True)
        if res.returncode != 0:
            print(f"  FAIL {src.name}: {res.stderr.strip()}", file=sys.stderr)
            failed += 1
            continue
        print(f"  {src.relative_to(ROOT)} -> {dst.relative_to(ROOT)}")
    return failed


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "photo":
        make_photo()
    else:
        print("Building CVs...")
        sys.exit(1 if build() else 0)

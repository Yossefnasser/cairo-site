import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(BASE, "images", "sinai-diorama")
os.makedirs(OUT, exist_ok=True)

# Placeholder images for the Sinai Diorama case study.
# Each file is a labelled grey placeholder — replace these files (same names)
# with real photos and the site picks them up with no code changes.
# NOTE: only run this when you want to (re)generate placeholders — it overwrites.

NAMES = [
    "hero", "diorama-turtle", "exhibit-coral-reef", "museum-render",
    "aquarium-tank", "hall-walkway", "rockwork-hall", "diorama-wolf",
    "diorama-antelope", "model-monastery", "rockwork-interior", "ramp-interior",
    "visit1", "visit2", "bronze-construction", "bronze-construction2",
    "dome-finished", "dome-landscape", "kiosk-sketch", "bronze-right",
    "bronze-large-left", "bronze-large-right", "peace-exterior", "peace-shell",
    "peace-doves", "peace-room-round", "peace-exhibit", "peace-panels",
    "peace-klid-dark",
]

W, H = 1200, 800
BG = (186, 178, 168)          # warm grey
ACCENT = (122, 106, 88)       # brown accent line
TEXT = (74, 66, 56)

for name in NAMES:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([24, 24, W - 24, H - 24], outline=ACCENT, width=4)
    d.rectangle([0, H - 14, W, H], fill=ACCENT)

    try:
        f_title = ImageFont.load_default(size=52)
        f_sub = ImageFont.load_default(size=30)
    except TypeError:
        f_title = f_sub = ImageFont.load_default()

    title = name.replace("-", " ").upper()
    sub = f"images/sinai-diorama/{name}.jpg"

    def center(draw, y, text, font, fill):
        bb = draw.textbbox((0, 0), text, font=font)
        draw.text(((W - (bb[2] - bb[0])) / 2, y), text, font=font, fill=fill)

    center(d, H / 2 - 70, title, f_title, TEXT)
    center(d, H / 2 + 10, sub, f_sub, TEXT)
    center(d, H / 2 + 70, "replace with real photo (same file name)", f_sub, TEXT)

    out = os.path.join(OUT, f"{name}.jpg")
    img.save(out, quality=85)
    print("placeholder ->", os.path.basename(out))

# ---------------------------------------------------------------------------
# OPTIONAL: re-crop the real photos out of the rendered portfolio PDF pages.
# This OVERWRITES the placeholders above — only set DO_CROPS = True if you want
# the PDF versions back instead of your own photos.
# ---------------------------------------------------------------------------
DO_CROPS = False

if DO_CROPS:
    # Coordinates were measured on the 1786x1263 small renders (_pdf_small) and
    # are scaled here to whatever resolution the source render has.
    SW, SH = 1786.0, 1263.0

JOBS = {
    "_pdf_pages/page08.png": [
        ("hero", 60, 990, 1725, 1240),            # museum exterior w/ green dome door
        ("diorama-turtle", 55, 148, 330, 328),     # sea-turtle diorama
        ("exhibit-coral-reef", 340, 148, 578, 333),# artificial coral reef w/ dolphins
        ("museum-render", 610, 150, 853, 327),     # exterior view render
        ("aquarium-tank", 938, 152, 1170, 323),    # reef aquarium tank
        ("hall-walkway", 1203, 152, 1430, 323),    # visitors' walkway
        ("rockwork-hall", 1458, 152, 1688, 323),   # rockwork exhibition hall
        ("diorama-wolf", 55, 350, 333, 533),       # wolf diorama
        ("diorama-antelope", 1492, 560, 1723, 723),# antelope desert diorama
        ("model-monastery", 1480, 765, 1720, 938), # historic monastery architectural model
        ("rockwork-interior", 55, 558, 333, 743),  # interior rock formations
        ("ramp-interior", 55, 770, 333, 948),      # circular ramp walkway
        ("visit1", 462, 730, 777, 962),            # officials touring the diorama
        ("visit2", 1018, 730, 1347, 953),          # officials touring (2)
    ],
    "_pdf_pages/page09.png": [
        ("bronze-construction", 70, 172, 388, 403),   # bronze building under construction
        ("bronze-construction2", 1445, 170, 1718, 398),
        ("dome-finished", 70, 448, 368, 666),         # finished elliptical dome close-up
        ("dome-landscape", 432, 448, 768, 666),       # dome in landscape
        ("kiosk-sketch", 1000, 448, 1345, 666),       # architectural sketch
        ("bronze-right", 1440, 448, 1718, 666),       # finished building view
        ("bronze-large-left", 57, 690, 888, 1238),    # large finished building w/ palm
        ("bronze-large-right", 897, 690, 1728, 1238), # large building w/ street lamp
    ],
    "_pdf_pages/page10.png": [
        ("peace-exterior", 57, 985, 1728, 1240),      # Peace Park Botanical Garden facade
        ("peace-shell", 925, 150, 1178, 323),         # shell monument
        ("peace-doves", 1205, 150, 1438, 323),        # doves sculpture
        ("peace-room-round", 1465, 150, 1698, 325),   # round exhibition room
        ("peace-exhibit", 55, 148, 298, 318),         # exhibition hall w/ display case
        ("peace-panels", 320, 148, 553, 318),         # exhibit panels
        ("peace-klid-dark", 580, 148, 808, 318),      # KLID dark exhibition room
    ],
}

for rel, crops in (JOBS.items() if DO_CROPS else []):
    src = os.path.join(BASE, rel)
    img = Image.open(src).convert("RGB")
    sx = img.width / SW
    sy = img.height / SH
    for name, x0, y0, x1, y1 in crops:
        box = (int(x0 * sx), int(y0 * sy), int(x1 * sx), int(y1 * sy))
        crop = img.crop(box)
        out = os.path.join(OUT, name + ".jpg")
        crop.save(out, quality=88)
        print(name, crop.width, "x", crop.height, "->", os.path.basename(out))



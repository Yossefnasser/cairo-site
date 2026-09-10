import os
import fitz

SRC = r"c:/Users/w.i/Downloads/Cairo International Company Portfolio - Copy_compressed (1).pdf"
OUT = r"d:/CODE/cairo site/_pdf_small"
os.makedirs(OUT, exist_ok=True)

doc = fitz.open(SRC)
count = 0
for i, page in enumerate(doc, 1):
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
    path = os.path.join(OUT, f"page{i:02d}.jpg")
    try:
        pix.save(path, jpg_quality=72)
    except Exception:
        path = os.path.join(OUT, f"page{i:02d}.png")
        pix.save(path)
    count += 1
print("rendered", count, "pages to", OUT)

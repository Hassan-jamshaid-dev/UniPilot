"""Generate UniPilot app icon: cream tile, navy U, mustard plane."""
from PIL import Image, ImageDraw

SIZE = 1024
out = r"C:\Users\Solar Turbines User\UniPilot\assets\images\icon.png"

img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

cream = (253, 248, 240, 255)  # #FDF8F0
navy = (10, 25, 47, 255)  # #0A192F
mustard = (232, 175, 80, 255)  # #E8AF50
mustard_soft = (240, 197, 110, 255)  # #F0C56E

draw.rounded_rectangle([0, 0, SIZE - 1, SIZE - 1], radius=int(SIZE * 0.22), fill=cream)


def sx(x: float) -> float:
    return x / 100 * SIZE


def sy(y: float) -> float:
    return y / 100 * SIZE


stroke = int(SIZE * 0.14)

# Left stem
draw.line([(sx(22), sy(14)), (sx(22), sy(68))], fill=navy, width=stroke)

# Bottom U arc (PIL: 0° at 3 o'clock, counterclockwise; bottom from left=180 to right=0)
cx, cy, r = sx(50), sy(68), sx(28)
bbox = [cx - r, cy - r, cx + r, cy + r]
draw.arc(bbox, start=0, end=180, fill=navy, width=stroke)

# Right stem (partial opening for plane)
draw.line([(sx(78), sy(68)), (sx(78), sy(42))], fill=navy, width=stroke)

r_cap = stroke // 2
for x, y in [(sx(22), sy(14)), (sx(78), sy(42))]:
    draw.ellipse([x - r_cap, y - r_cap, x + r_cap, y + r_cap], fill=navy)

# Mustard paper plane
draw.polygon(
    [(sx(70), sy(18)), (sx(94), sy(28)), (sx(78), sy(36)), (sx(74), sy(48))],
    fill=mustard,
)
draw.polygon(
    [(sx(70), sy(18)), (sx(78), sy(36)), (sx(74), sy(30))],
    fill=mustard_soft,
)

img.save(out, "PNG")
print("wrote", out, img.size)

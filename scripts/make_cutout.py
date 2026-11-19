from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

src = Path(r"f:\sachin-jariyal.github.io\public\images\avatar-source.jpg")
out = Path(r"f:\sachin-jariyal.github.io\public\images\avatar-cutout.png")

img = Image.open(src).convert("RGBA")
arr = np.asarray(img).astype(np.float32)
rgb = arr[..., :3]
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
whiteness = np.minimum(np.minimum(r, g), b)
spread = np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b)

# Soft white key — aggressive enough to kill studio white + fringe
alpha = np.clip((252.0 - whiteness) / 22.0, 0.0, 1.0)
# Near-neutral bright pixels → more transparent
neutral = spread < 20
alpha = np.where(neutral & (whiteness > 235), alpha * 0.35, alpha)
alpha = np.where(whiteness >= 250, 0.0, alpha)

arr[..., 3] = (alpha * 255.0).astype(np.uint8)
result = Image.fromarray(arr.astype(np.uint8), "RGBA")

# Clean jagged edges
a = result.getchannel("A")
a = a.filter(ImageFilter.MinFilter(3))
a = a.filter(ImageFilter.GaussianBlur(0.6))
result.putalpha(a)

# Despill: pull residual white fringe toward nearby subject color
pixels = np.asarray(result).astype(np.float32)
alpha_ch = pixels[..., 3] / 255.0
edge = (alpha_ch > 0.05) & (alpha_ch < 0.92)
for c in range(3):
    channel = pixels[..., c]
    # Darken near-white fringe slightly so it doesn't glow on dark theme
    fringe = edge & (channel > 220)
    channel[fringe] = channel[fringe] * 0.82
    pixels[..., c] = channel
result = Image.fromarray(pixels.astype(np.uint8), "RGBA")

bbox = result.getbbox()
if bbox:
    pad = 16
    left, top, right, bottom = bbox
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(result.width, right + pad)
    bottom = min(result.height, bottom + pad)
    result = result.crop((left, top, right, bottom))

max_w = 1200
if result.width > max_w:
    height = int(result.height * (max_w / result.width))
    result = result.resize((max_w, height), Image.Resampling.LANCZOS)

result.save(out, optimize=True)
print(f"saved {out} size={result.size} bytes={out.stat().st_size}")

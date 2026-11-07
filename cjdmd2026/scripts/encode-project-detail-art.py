"""Encode a Figma PNG strip export into responsive, lossless WebP tiles.

Usage: python scripts/encode-project-detail-art.py manifest.json /path/to/output

Manifest: {"project":"apuchika","mode":"pc","width":3840,"height":35716,
"baseWidth":1920,"strips":[{"file":"pc00.png","top":0,"bottom":6400}, ...],
"tiles":[{"name":"pc-01.webp","top":0,"bottom":2280}, ...]}.
All coordinates are in native export pixels. Both partitions must cover the full
height; input PNG files are relative to the manifest. The full-resolution output
must decode identically to its source. Smaller variants are filtered in RGB
before lossless encoding, with a gutter for seamless resampling across tiles.
"""
import argparse
import json
import re
from pathlib import Path
from PIL import Image, ImageChops


def encode(manifest, output, *, tile_names=None):
    m = json.loads(manifest.read_text(encoding="utf-8"))
    width, height, base = m["width"], m["height"], m["baseWidth"]
    if width != 2 * base or not re.fullmatch(r"[a-z0-9-]+", m["project"]):
        raise ValueError("Invalid source dimensions or project ID")
    root = manifest.resolve().parent
    dest = output / m["project"]
    dest.mkdir(parents=True, exist_ok=True)
    for rows in (m["strips"], m["tiles"]):
        if not rows or rows[0]["top"] != 0 or rows[-1]["bottom"] != height:
            raise ValueError("Incomplete image coverage")
        if any(r["bottom"] <= r["top"] or (i and rows[i-1]["bottom"] != r["top"]) for i, r in enumerate(rows)):
            raise ValueError("Overlapping or missing rows")
    last_path, last_img, profile = None, None, None

    def crop(top, bottom):
        nonlocal last_path, last_img, profile
        result = Image.new("RGB", (width, bottom-top))
        for r in m["strips"]:
            a, b = max(top, r["top"]), min(bottom, r["bottom"])
            if a >= b:
                continue
            p = (root / r["file"]).resolve()
            if p.parent != root or p.suffix.lower() != ".png":
                raise ValueError("Expected a local PNG strip")
            if p != last_path:
                if last_img is not None:
                    last_img.close()
                with Image.open(p) as im:
                    if im.format != "PNG" or im.width != width or not (0 <= im.height - (r["bottom"] - r["top"]) <= 1):
                        raise ValueError(f"Unexpected dimensions: {p.name} {im.size}")
                    if "A" in im.getbands() and im.getchannel("A").getextrema() != (255, 255):
                        raise ValueError(f"Unexpected transparency: {p.name}")
                    if last_path is not None and profile != im.info.get("icc_profile"):
                        raise ValueError("Inconsistent color profiles")
                    profile = im.info.get("icc_profile")
                    last_img = im.convert("RGB")
                last_path = p
            result.paste(last_img.crop((0, a-r["top"], width, b-r["top"])), (0, a-top))
        return result

    def save(im, name):
        out = dest / name
        kwargs = {"icc_profile": profile} if profile else {}
        im.save(out, "WEBP", lossless=True, quality=65, method=2, **kwargs)
        with Image.open(out) as check:
            if check.size != im.size or ImageChops.difference(im, check.convert("RGB")).getbbox() is not None:
                raise ValueError("WebP differs from the RGB source: " + name)
        return {"file": name, "width": im.width, "height": im.height, "bytes": out.stat().st_size}

    info = []
    for t in m["tiles"]:
        name, top, bottom = t["name"], t["top"], t["bottom"]
        if not re.fullmatch(r"(pc|mobile)-\d+\.webp", name) or not name.startswith(m["mode"]+"-"):
            raise ValueError("Unexpected tile name")
        if tile_names is not None and name not in tile_names:
            continue
        # Bookend sampling in global coordinates to keep neighbouring bands on the same pixel grid.
        y0, y1 = round(top / 2), round(bottom / 2)
        lo, hi = max(0, min(top, 2*y0)-8), min(height, max(bottom, 2*y1)+8)
        region = crop(lo, hi)
        tiny = region.resize((base, y1-y0), Image.Resampling.LANCZOS,
                             box=(0, 2*y0-lo, width, min(2*y1, height)-lo))
        full = region.crop((0, top-lo, width, bottom-lo))
        info.append({"base": save(tiny, name), "high": save(full, name[:-5]+"@2x.webp")})
        tiny.close(); full.close(); region.close()
    if last_img is not None:
        last_img.close()
    return info


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("manifest", type=Path)
    p.add_argument("output", type=Path)
    args = p.parse_args()
    print(json.dumps(encode(args.manifest, args.output)))


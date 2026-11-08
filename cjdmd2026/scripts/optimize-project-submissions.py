"""Convert the captured Figma artwork to WebP; keep vector/raster logo formats."""
import json
import hashlib
from io import BytesIO
import shutil
from pathlib import Path

from PIL import Image, ImageChops, ImageCms, ImageStat

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'output/figma/project-downloads-20261107.json'
ENCODING = 'original-pixels-webp95-v1'
# Saturated lettering and neon edges lose detail with WebP's lossy chroma sampling.
LOSSLESS_LANDSCAPES = {'magmoa', 'omix'}


def save_profile_logo(original, target):
    """The profile overlay displays at up to 420 x 200 CSS pixels."""
    preview = original.convert('RGBA')
    preview.thumbnail((840, 400), Image.Resampling.LANCZOS)
    encoded = BytesIO()
    preview.save(encoded, format='WEBP', lossless=True, method=6)
    data = encoded.getvalue()
    if len(data) >= target.stat().st_size:
        return None
    path = target.with_name('logo-profile.webp')
    path.write_bytes(data)
    return {'output': path.relative_to(ROOT).as_posix(),
            'contentHash': hashlib.sha256(data).hexdigest()[:12]}


def render_original(image, node, paint):
    """Use the full-resolution fill, keeping the submitted frame's crop."""
    image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
    width, height = image.size
    frame_width, frame_height = node['frame']['width'], node['frame']['height']
    mode = paint['scaleMode']
    if mode == 'FIT':
        scale = max(width / frame_width, height / frame_height)
        out = (round(frame_width * scale), round(frame_height * scale))
        ratio = min(1, 4096 / max(out))
        out = (max(1, round(out[0] * ratio)), max(1, round(out[1] * ratio)))
        image.thumbnail(out, Image.Resampling.LANCZOS)
        canvas = Image.new(image.mode, out, 'white')
        canvas.paste(image, ((out[0] - image.width) // 2, (out[1] - image.height) // 2))
        return canvas
    if mode == 'CROP':
        transform = paint['transform']
        if abs(transform[0][1]) > 0.00001 or abs(transform[1][0]) > 0.00001:
            raise ValueError(f'Rotated crop needs review: {node["id"]}')
        crop_width, crop_height = width * transform[0][0], height * transform[1][1]
        left, top = width * transform[0][2], height * transform[1][2]
        scale = min(crop_width / frame_width, crop_height / frame_height)
    elif mode == 'FILL':
        scale = min(width / frame_width, height / frame_height)
        crop_width, crop_height = frame_width * scale, frame_height * scale
        left, top = (width - crop_width) / 2, (height - crop_height) / 2
    else:
        raise ValueError(f'Unsupported fill: {mode}')
    scale = min(scale, 4096 / max(frame_width, frame_height))
    out = (max(1, round(frame_width * scale)), max(1, round(frame_height * scale)))
    return image.transform(out, Image.Transform.AFFINE,
                           (crop_width / out[0], 0, left, 0, crop_height / out[1], top),
                           Image.Resampling.BICUBIC, fillcolor='white')


def get_original_image(asset, node, candidates, reference):
    paths = {hashlib.sha1((ROOT / p).read_bytes()).hexdigest(): p for p in candidates}
    choices = []
    for paint in node['sources']:
        source_path = paths.get(paint['hash'])
        if not source_path:
            raise ValueError(f'Full-resolution image missing: {asset["nodeId"]} / {paint["hash"]}')
        with Image.open(ROOT / source_path) as source_image:
            if list(source_image.size) != [paint['size']['width'], paint['size']['height']]:
                raise ValueError(f'Original size mismatch: {source_path}')
            # Convert the full-resolution print artwork before cropping for a screen.
            profile = source_image.info.get('icc_profile') if asset['role'] == 'landscape' and source_image.mode == 'CMYK' else None
            if profile:
                source_image = ImageCms.profileToProfile(source_image, ImageCms.ImageCmsProfile(BytesIO(profile)),
                                                        ImageCms.createProfile('sRGB'), outputMode='RGB')
            rendered = render_original(source_image, node, paint)
        # Some nodes contain two opaque fills; retain the one visible in the submission.
        score = 0
        if len(node['sources']) > 1:
            with Image.open(reference) as old_image:
                difference = ImageChops.difference(rendered.convert('RGB').resize((96, 96)), old_image.convert('RGB').resize((96, 96)))
                score = sum(ImageStat.Stat(difference).mean)
        choices.append((score, rendered, source_path, paint, bool(profile)))
    return min(choices, key=lambda choice: choice[0])[1:]


def main():
    image_manifest = ROOT / 'output/figma/project-original-image-downloads-20261107.json'
    image_sources = {}
    source_nodes = {}
    previous_path = ROOT / 'output/figma/project-assets-20261107.json'
    previous = {a['output']: a for a in json.loads(previous_path.read_text(encoding='utf-8'))} if previous_path.exists() else {}
    if image_manifest.exists():
        image_sources = {a['nodeId']: a for a in json.loads(image_manifest.read_text(encoding='utf-8'))}
        source_nodes = {n['id']: n for n in json.loads((ROOT / 'output/figma/project-image-source-audit-20261107.json').read_text(encoding='utf-8'))}
    originals = ROOT / 'output/figma/project-logo-originals-20261107.json'
    if originals.exists():
        original_data = json.loads(originals.read_text(encoding='utf-8'))
        assets = original_data['assets']
        for logo in original_data['rawLogos']:
            matches = [p for p in logo['sources'] if hashlib.sha1((ROOT / p).read_bytes()).hexdigest() == logo['hash']]
            if len(matches) != 1:
                raise ValueError(f'Original logo hash mismatch: {logo["projectId"]}')
            entry = next(a for a in assets if a['projectId'] == logo['projectId'] and a['role'] == 'logo')
            source = ROOT / matches[0]
            entry.update(source=matches[0], sourceFormat=source.suffix[1:], sizeBytes=source.stat().st_size, isolated=True, imageHash=logo['hash'])
        MANIFEST.write_text(json.dumps(assets, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    else:
        assets = json.loads(MANIFEST.read_text(encoding='utf-8'))
    report = []
    for asset in assets:
        source = ROOT / asset['source']
        target = ROOT / asset['output']
        target.parent.mkdir(parents=True, exist_ok=True)
        size = None
        if asset['role'] == 'logo':
            if asset['format'] == 'svg':
                svg = source.read_text(encoding='utf-8')
                if '<svg' not in svg or '<script' in svg.lower():
                    raise ValueError(f'Invalid SVG: {source}')
                shutil.copyfile(source, target)
            else:
                with Image.open(source) as image:
                    image.save(target, format='PNG', optimize=True)
                    size = list(image.size)
                    preview = save_profile_logo(image, target)
                    if preview:
                        asset = {**asset, 'profileLogo': preview}
        else:
            lossless = asset['role'] == 'landscape' and asset['projectId'] in LOSSLESS_LANDSCAPES
            encoding = 'original-pixels-webp-lossless-v1' if lossless else ENCODING
            if image_sources:
                if asset['nodeId'] not in image_sources:
                    raise ValueError(f'Original image not downloaded: {asset["nodeId"]}')
                image, pixel_source, paint, converted_profile = get_original_image(asset, source_nodes[asset['nodeId']], image_sources[asset['nodeId']]['candidates'], source)
                if converted_profile:
                    encoding = 'icc-srgb-' + encoding.removeprefix('original-pixels-')
                source = ROOT / pixel_source
                asset = {**asset, 'renderSource': asset['source'], 'source': pixel_source,
                         'sourceFormat': source.suffix[1:], 'sizeBytes': source.stat().st_size,
                         'originalImageHash': paint['hash'], 'originalDimensions': [paint['size']['width'], paint['size']['height']],
                         'encoding': encoding}
            else:
                with Image.open(source) as original:
                    image = original.convert('RGBA' if 'A' in original.getbands() else 'RGB')
                image.thumbnail((4096, 4096), Image.Resampling.LANCZOS)
            old = previous.get(asset['output'], {})
            if not target.exists() or old.get('encoding') != asset.get('encoding') or old.get('originalImageHash') != asset.get('originalImageHash') or target.stat().st_mtime < source.stat().st_mtime:
                image.save(target, format='WEBP', lossless=lossless, quality=100 if lossless else 95, method=6)
            size = list(image.size)
        report.append({**asset, 'dimensions': size, 'optimizedBytes': target.stat().st_size,
                       'contentHash': hashlib.sha256(target.read_bytes()).hexdigest()[:12]})
        if len(report) % 10 == 0:
            print(f'Converted {len(report)}/{len(assets)}', flush=True)
    (ROOT / 'output/figma/project-assets-20261107.json').write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'assets': len(report), 'bytes': sum(a['optimizedBytes'] for a in report)}))


if __name__ == '__main__':
    main()

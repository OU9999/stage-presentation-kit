from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json
import sys

folder = Path(sys.argv[1]).resolve()
manifest = json.loads((folder / 'manifest.json').read_text())
if manifest.get('method') == 'crop-full-viewport-strips-between-sticky-chrome':
    for row in manifest['observations']:
        assembled = Image.new('RGB', (row['stage']['width'], row['stage']['height']))
        covered = 0
        for tile in row['tiles']:
            part = Image.open(tile['filename']).convert('RGB')
            c = tile['clip']
            assert part.size == (row['viewport']['width'], row['viewport']['height'])
            part = part.crop(tuple(round(v) for v in (c['x'], c['y'], c['x'] + c['width'], c['y'] + c['height'])))
            assert tile['offsetY'] == covered
            assert part.size == (row['stage']['width'], tile['clip']['height']), part.size
            assembled.paste(part, (0, tile['offsetY']))
            covered += part.height
        assert covered == row['stage']['height']
        assembled.save(row['filename'])
elif manifest['captureMode'] == 'read-slide-crop':
    full = Image.open(folder / 'full-page.png')
    for row in manifest['observations']:
        b = row['stage']
        # Full-page capture and DOM rectangles both use CSS pixels (DPR1).
        rect = tuple(round(v) for v in (b['x'], b['y'], b['x'] + b['width'], b['y'] + b['height']))
        assert rect[0] >= 0 and rect[1] >= 0 and rect[2] <= full.width + 1 and rect[3] <= full.height + 1, (rect, full.size)
        full.crop(rect).save(folder / Path(row['filename']).name)
files = [folder / Path(row['filename']).name for row in manifest['observations']]
for start in range(0, len(files), 8):
    count = min(8, len(files) - start)
    board = Image.new('RGB', (1280, ((count + 1) // 2) * 386), '#242424')
    draw = ImageDraw.Draw(board)
    for position, filename in enumerate(files[start:start + 8]):
        x, y = (position % 2) * 640, (position // 2) * 386
        thumbnail = ImageOps.contain(Image.open(filename).convert('RGB'), (632, 356))
        board.paste(thumbnail, (x + (640 - thumbnail.width) // 2, y + 26))
        draw.text((x + 12, y + 7), filename.stem, fill='white')
    board.save(folder / f'contact-{start + 1:02}-{min(start + 8, len(files)):02}.jpg', quality=92)
print({'folder': str(folder), 'slides': len(files), 'boards': (len(files) + 7) // 8})

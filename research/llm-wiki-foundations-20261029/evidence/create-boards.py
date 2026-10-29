from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

root = Path(__file__).parent
files = sorted((root / 'screens').glob('slide-*.png'))
for start in range(0, len(files), 10):
    canvas = Image.new('RGB', (1200, 5 * 362), '#17171b')
    draw = ImageDraw.Draw(canvas)
    for offset, file in enumerate(files[start:start + 10]):
        x, y = (offset % 2) * 600, (offset // 2) * 362
        image = Image.open(file).convert('RGB')
        image = ImageOps.contain(image, (588, 330))
        canvas.paste(image, (x + 6, y + 24))
        draw.text((x + 10, y + 6), file.stem, fill='white')
    canvas.save(root / ('board-' + str(start // 10 + 1) + '.jpg'), quality=93)
print({'screens': len(files), 'boards': (len(files) + 9) // 10})

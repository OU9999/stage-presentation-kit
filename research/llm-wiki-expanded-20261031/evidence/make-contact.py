from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
folder=Path(__file__).resolve().parent
files=sorted((folder/'screens').glob('expanded-slide-*.png'))
assert len(files)==48,len(files)
(folder/'contact').mkdir(exist_ok=True)
for group in range(8):
    board=Image.new('RGB',(1280,1170),'#e6e3da');draw=ImageDraw.Draw(board)
    for pos,p in enumerate(files[group*6:group*6+6]):
        x=(pos%2)*640;y=(pos//2)*390
        img=Image.open(p).convert('RGB');img=ImageOps.contain(img,(640,360))
        board.paste(img,(x+(640-img.width)//2,y+25))
        draw.text((x+12,y+6),str(group*6+pos+1).zfill(2),fill='#172238')
    board.save(folder/'contact'/f'slides-{group+1}.jpg',quality=94)
print('8 contact sheets: all 48 screenshots')

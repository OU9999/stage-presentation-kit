from pathlib import Path
from PIL import Image,ImageOps,ImageDraw
import sys,json
base=Path(__file__).resolve().parent
round_dir=base/sys.argv[1]
width=int(sys.argv[2]) if len(sys.argv)>2 else 1280
before=base.parent/('ou-presentation-20261113/present-1280' if width==1280 else 'llm-wiki-design-audit-20261113/evidence/present-1920')
after=round_dir/('present-'+str(width))
slides=[3,5,10,12,15]
w=1800; row_h=540
board=Image.new('RGB',(w,len(slides)*row_h),'#242424');d=ImageDraw.Draw(board)
for i,n in enumerate(slides):
    for col,(label,folder) in enumerate([('Before',before),('Current',after)]):
        im=ImageOps.contain(Image.open(folder/f'slide-{n:02}.png').convert('RGB'),(880,500))
        x=col*900+(900-im.width)//2;y=i*row_h+30
        board.paste(im,(x,y));d.text((col*900+12,i*row_h+8),f'{label} / slide {n:02}',fill='white')
board.save(round_dir/('before-after-'+str(width)+'.png'))
print(round_dir/('before-after-'+str(width)+'.png'))

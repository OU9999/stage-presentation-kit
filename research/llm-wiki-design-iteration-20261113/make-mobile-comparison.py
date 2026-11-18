from pathlib import Path
from PIL import Image,ImageOps,ImageDraw
import sys
base=Path(__file__).resolve().parent
current=base/sys.argv[1]
images=[('Before / 390px reading',base/'round-02/read-390/slide-18.png'),('Current / 390px reading',current/'read-390/slide-18.png')]
loaded=[Image.open(path).convert('RGB') for _,path in images]
height=max(im.height for im in loaded)+50
board=Image.new('RGB',(800,height),'#242424');draw=ImageDraw.Draw(board)
for index,((label,path),im) in enumerate(zip(images,loaded)):
 draw.text((index*400+16,12),label,fill='white')
 board.paste(im,(index*400+(400-im.width)//2,40))
board.save(current/'mobile-18-before-after.png')
print(current/'mobile-18-before-after.png')

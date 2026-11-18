"""Review aids only: each new pilot image retains its own capture provenance."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json,sys

root=Path(__file__).resolve().parents[2]
base=Path(__file__).resolve().parent
round_name=sys.argv[1]
old=root/'research/llm-wiki-keynote-reset-20261113/main-05/present-1920'
mapping=[5,7,13,15]
refs=[base/'evidence/official-XkKdbPhIvbY-90.png',base/'evidence/official-XkKdbPhIvbY-210.png',base/'evidence/official-Fls_onRviPM-1500.png',base/'evidence/official-Fls_onRviPM-1440.png']
for width in (1920,1280):
    folder=base/'evidence'/round_name/f'present-{width}'
    if (folder/'reference-before-after.jpg').exists() or (folder/'context-storyboard.jpg').exists():
        raise SystemExit('Review boards already exist; preserve the captured round and choose a new round.')
    manifest=json.loads((folder/'manifest.json').read_text())
    assert len(manifest['observations'])==len(mapping)
    board=Image.new('RGB',(1920,4*405),'#242424');draw=ImageDraw.Draw(board)
    for i,(target,ref,row) in enumerate(zip(mapping,refs,manifest['observations'])):
        for col,(label,p) in enumerate([('Official reference (broadcast frame)',ref),(f'Before: main-05 / {target:02}',old/f'slide-{target:02}.png'),(f'New: {round_name} / {target:02}',Path(row['filename']))]):
            assert p.is_file(),str(p)
            img=ImageOps.contain(Image.open(p).convert('RGB'),(624,356))
            x=col*640+(640-img.width)//2;y=i*405+30+(356-img.height)//2
            draw.text((col*640+12,i*405+8),label,fill='white');board.paste(img,(x,y))
    board.save(folder/'reference-before-after.jpg',quality=94)
    # An explicit mixed provenance storyboard; never a capture of a rebuilt main deck.
    contextual=Image.new('RGB',(1280,10*386),'#242424');draw=ImageDraw.Draw(contextual)
    replacements={target:Path(row['filename']) for target,row in zip(mapping,manifest['observations'])}
    provenance=[]
    for n in range(1,21):
        p=replacements.get(n,old/f'slide-{n:02}.png');new=n in replacements
        col=(n-1)%2;row=(n-1)//2;img=ImageOps.contain(Image.open(p).convert('RGB'),(632,356))
        draw.text((col*640+12,row*386+7),f'{n:02} '+('PILOT' if new else 'UNCHANGED CONTEXT'),fill='#FFB777' if new else 'white')
        contextual.paste(img,(col*640+(640-img.width)//2,row*386+26))
        provenance.append({'mainSlide':n,'pilot':new,'image':str(p.relative_to(root))})
    contextual.save(folder/'context-storyboard.jpg',quality=92)
    (folder/'context-storyboard.json').write_text(json.dumps({'purpose':'Mixed provenance review aid, not a new main-deck capture or approval','widthOfPilotViewport':width,'images':provenance},indent=2)+'\n')
    print({'round':round_name,'width':width,'pilotSlides':len(mapping),'contextSlides':20})

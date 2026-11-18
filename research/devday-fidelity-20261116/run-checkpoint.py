from pathlib import Path
import sys,subprocess,json,re
base=Path(__file__).resolve().parent
name=sys.argv[1]
assert re.fullmatch(r'checkpoint-\d+',name)
assert not (base/name).exists(), 'Preserve existing checkpoints; choose a new number'
for width,height in [(1920,1080),(1280,720)]:
 (base/'main-capture-request.json').write_text(json.dumps(dict(round=name,mode='present',width=width,height=height,slides=[3,7],taskSpaceId=4,port=4336),indent=2)+'\n')
 folder=base/name/f'present-{width}';folder.mkdir(parents=True,exist_ok=True)
 for script in ['capture-main-presentation.mjs','capture-main-svg.mjs']:
  p=subprocess.run(['ego-browser','nodejs','-e',(base/script).read_text()],capture_output=True,text=True)
  (folder/(script+'.log')).write_text(p.stdout+p.stderr)
  print(dict(scope=f'present-{width}',script=script,exit=p.returncode),flush=True)
  if p.returncode:print((p.stdout+p.stderr)[-1800:]);raise SystemExit(p.returncode)
 subprocess.run([sys.executable,str(base/'make-boards-current.py'),str(folder)],capture_output=True,check=True)

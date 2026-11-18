from pathlib import Path
import subprocess,sys,json
base=Path(__file__).resolve().parent
script=base/(sys.argv[1] if len(sys.argv)>1 else 'capture-presentation.mjs')
request=json.loads((base/'capture-request.json').read_text())
log=base/request['round']/(script.stem+'-'+str(request['width'])+'.log')
log.parent.mkdir(parents=True,exist_ok=True)
with log.open('w') as out:
    p=subprocess.run(['ego-browser','nodejs','-e',script.read_text()],stdout=out,stderr=subprocess.STDOUT)
print(json.dumps({'exitCode':p.returncode,'log':str(log)}))
if p.returncode: print(log.read_text()[-5000:])
raise SystemExit(p.returncode)

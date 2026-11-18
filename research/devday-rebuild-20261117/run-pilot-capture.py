from pathlib import Path
import json
import os
import subprocess
import sys

base=Path(__file__).resolve().parent
round_name=sys.argv[1]
assert round_name.startswith('round-') and round_name[6:].isdigit()
task_space_id = int(os.environ['OU_DEVDAY_TASK_SPACE'])
for width,height in [(1920,1080),(1280,720)]:
    request=dict(round=round_name,width=width,height=height,taskSpaceId=task_space_id,
                 source='research/devday-rebuild-20261117/prototypes/talks/first-look/slides.md',
                 url='http://127.0.0.1:4336/research/devday-rebuild-20261117/prototypes/site/first-look/')
    (base/'capture-request.json').write_text(json.dumps(request,indent=2)+'\n')
    folder=base/'evidence'/round_name/f'present-{width}'
    for script in ['capture-pilot.mjs','capture-pilot-svg.mjs']:
        result=subprocess.run(['ego-browser','nodejs','-e',(base/script).read_text()],text=True,capture_output=True)
        folder.mkdir(parents=True,exist_ok=True)
        (folder/(script+'.log')).write_text(result.stdout+result.stderr)
        print(json.dumps({'scope':width,'script':script,'exit':result.returncode},ensure_ascii=False),flush=True)
        if result.returncode:
            print((result.stdout+result.stderr)[-2400:]);raise SystemExit(result.returncode)
    subprocess.run([sys.executable,str(base.parent/'llm-wiki-keynote-reset-20261113/make-boards.py'),str(folder)],check=True,capture_output=True)


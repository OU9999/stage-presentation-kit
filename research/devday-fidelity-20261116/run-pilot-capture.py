from pathlib import Path
import subprocess,json,sys

base=Path(__file__).resolve().parent
round_name=sys.argv[1]
assert round_name.startswith('round-') and round_name[6:].isdigit()
for width,height in [(1920,1080),(1280,720)]:
    request=dict(round=round_name,width=width,height=height,taskSpaceId=4,
                 source=f'research/devday-fidelity-20261116/prototypes/talks/{round_name}/slides.md',
                 url=f'http://127.0.0.1:4336/research/devday-fidelity-20261116/prototypes/site/{round_name}/')
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
subprocess.run([sys.executable,str(base/'make-pilot-boards.py'),round_name],check=True)

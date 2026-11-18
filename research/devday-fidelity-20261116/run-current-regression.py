from pathlib import Path
import subprocess,json,sys,re

base=Path(__file__).resolve().parent
out=base/'regression'
round_name=sys.argv[1]
assert re.fullmatch(r'core-\d+',round_name)
for mode,width,height,scripts in [
    ('present',1920,1080,['capture-current-presentation.mjs','capture-current-svg.mjs']),
    ('present',1280,720,['capture-current-presentation.mjs','capture-current-svg.mjs']),
    ('read',1440,1000,['capture-current-reading.mjs']),
    ('read',390,844,['capture-current-reading.mjs']),
]:
    (out/'capture-request.json').write_text(json.dumps(dict(round=round_name,mode=mode,width=width,height=height,taskSpaceId=4,port=4336),indent=2)+'\n')
    folder=out/round_name/f'{mode}-{width}'
    for script in scripts:
        result=subprocess.run(['ego-browser','nodejs','-e',(base/script).read_text()],capture_output=True,text=True)
        folder.mkdir(parents=True,exist_ok=True)
        (folder/(script+'.log')).write_text(result.stdout+result.stderr)
        print(json.dumps({'scope':f'{mode}-{width}','script':script,'exit':result.returncode}),flush=True)
        if result.returncode:
            print((result.stdout+result.stderr)[-2800:]);raise SystemExit(result.returncode)
    subprocess.run([sys.executable,str(base.parent/'llm-wiki-keynote-reset-20261113/make-boards.py'),str(folder)],check=True,capture_output=True)
    repo=base.parent.parent
    command=['node','scripts/llm-wiki-keynote-qa.cjs','--mode','current','--source','talks/llm-wiki/slides.md','--manifest',str((folder/'manifest.json').relative_to(repo))]
    command+=['--svg-metrics',str((folder/'svg-metrics.json').relative_to(repo))] if mode=='present' else ['--reading-metrics',str((folder/'reading-metrics.json').relative_to(repo))]
    result=subprocess.run(command,capture_output=True,text=True)
    (folder/'qa.json').write_text(result.stdout)
    (folder/'qa.stderr.txt').write_text(result.stderr)
    if result.returncode:
        print(result.stdout[-2800:],result.stderr[-1200:]);raise SystemExit(result.returncode)
    qa=json.loads(result.stdout)
    print(json.dumps({'scope':f'{mode}-{width}','qaExit':result.returncode,'summary':qa['summary'],'visualApproval':qa['visualApproval']}),flush=True)

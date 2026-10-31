"""Run one root-owned CLI browser check and save its structured result."""
import json
from pathlib import Path
import subprocess
import sys
folder=Path(__file__).resolve().parent
root=folder.parents[2]
name=sys.argv[1]
source=(folder/('check-'+name+'.js')).read_text()
if name=='svg':
    assets=sorted(p.name for p in (root/'talks/llm-wiki/assets/expanded').glob('*.svg'))
    source=source.replace('__ASSETS__',json.dumps(assets))
r=subprocess.run(['npx','--yes','--package','@playwright/cli','playwright-cli','-s=llmwiki-expanded','run-code',source],cwd=root,text=True,capture_output=True)
if r.returncode or '### Result\n' not in r.stdout:raise RuntimeError(r.stdout+r.stderr)
data=json.loads(r.stdout.split('### Result\n',1)[1].split('\n###',1)[0])
(folder/({'svg':'svg-bounds'}.get(name,name)+'.json')).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
if name=='svg':
    failures=[a for a in data if a['outside'] or a['overlaps']]
    assert not failures,json.dumps(failures,ensure_ascii=False)
    print(json.dumps({'assets':len(data),'outside':0,'overlaps':0}))
elif name=='navigation':
    assert data['revision']==json.loads((folder/'source-check.json').read_text())['revision']
    assert data['walk']==list(range(1,49)),data
    assert data['overview']==48 and data['overviewSelection']==40,data
    assert data['presenterToStage']==41 and data['stageToPresenter']=='42 / 48',data
    assert data['home']==1 and data['end']==48,data
    print(json.dumps(data,ensure_ascii=False))

else:
    print(json.dumps(data,ensure_ascii=False))

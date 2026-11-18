from pathlib import Path
import sys,json,subprocess,re
b=Path(__file__).resolve().parent
repo=b.parent.parent
r=sys.argv[1]
assert re.fullmatch(r'main-\d+',r)
rows=[]
for scope in ['present-1280','present-1920','read-1440','read-390']:
 record=(b/r/'reviews'/(scope+'.review.json')).relative_to(repo).as_posix()
 for require in [False,True]:
  cmd=['node','scripts/design-review.cjs','check','--source','talks/llm-wiki/slides.md','--record',record]+(['--require-approved'] if require else [])
  p=subprocess.run(cmd,cwd=repo,capture_output=True,text=True)
  rows.append(dict(scope=scope,record=record,requireApproved=require,command=cmd,exit=p.returncode,stdout=p.stdout,stderr=p.stderr))
  print(json.dumps(rows[-1],ensure_ascii=False),flush=True)
(b/r/'approval-cli.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')

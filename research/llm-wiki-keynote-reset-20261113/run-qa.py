from pathlib import Path
import subprocess, json, sys

base = Path(__file__).resolve().parent
root = base.parent.parent
round_name, *selected = sys.argv[1:]
scopes = selected or ['present-1920', 'present-1280', 'read-1440', 'read-390']
results = []
for scope in scopes:
    folder = base / round_name / scope
    manifest = folder / 'manifest.json'
    kind = 'svg' if scope.startswith('present-') else 'reading'
    metric = folder / f'{kind}-metrics.json'
    output = base / round_name / f'qa-{scope}.json'
    cmd = ['node', 'scripts/llm-wiki-keynote-qa.cjs', '--mode', 'current', '--source', 'talks/llm-wiki/slides.md', '--manifest', str(manifest.relative_to(root)), f'--{kind}-metrics', str(metric.relative_to(root)), '--output', str(output.relative_to(root))]
    with (base / round_name / f'qa-{scope}.log').open('w') as log:
        run = subprocess.run(cmd, cwd=root, stdout=log, stderr=subprocess.STDOUT)
    result = json.loads(output.read_text()) if output.exists() else {}
    row = dict(scope=scope, command=cmd, exitCode=run.returncode, status=result.get('status'), summary=result.get('summary'))
    results.append(row)
    print(json.dumps(row))
path = base / round_name / 'qa-cli.json'
old = json.loads(path.read_text()) if path.exists() else []
path.write_text(json.dumps([r for r in old if r['scope'] not in scopes] + results, indent=2) + '\n')
raise SystemExit(1 if any(r['exitCode'] for r in results) else 0)

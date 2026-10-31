"""Run with the root-owned playwright-cli session `llmwiki-rebuild` open."""
import json
from pathlib import Path
import shutil
import subprocess

directory = Path(__file__).resolve().parent
root = directory.parents[2]
callback = (directory / 'check-browser.js').read_text()
result = subprocess.run(
    ['npx', '--yes', '--package', '@playwright/cli', 'playwright-cli',
     '-s=llmwiki-rebuild', 'run-code', callback],
    cwd=root, text=True, capture_output=True,
)
if result.returncode or '### Result\n' not in result.stdout:
    raise RuntimeError(result.stdout + result.stderr)
payload = result.stdout.split('### Result\n', 1)[1].split('\n###', 1)[0]
data = json.loads(payload)
(directory / 'browser.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
(directory / 'screens').mkdir(exist_ok=True)
for slide in data['slides']:
    source = root / slide['screenshot']
    shutil.copyfile(source, directory / 'screens' / source.name)
failures = [s for s in data['slides'] if s['overflow'] or s['diagnostic'] or s['clippedScroll']
            or s['headingLines'] > 2.1 or s['revision'] != data['expected']['revision']
            or any(not i['width'] for i in s['images'])]
failures += [r for r in data['reading'] + data['materials'] + data['compact']
             if r['documentWidth' if 'documentWidth' in r else 'width'] > r.get('viewport', r['width']) + 1
             or r.get('diagnostic') or r.get('brokenImages')]
assert not data['errors'], data['errors']
assert not failures, json.dumps(failures, ensure_ascii=False, indent=2)
assert all(r['titles'] == data['expected']['titles'] for r in data['reading'])
print(json.dumps({'slides': len(data['slides']), 'revision': data['expected']['revision'],
                  'compact': len(data['compact']), 'reading': len(data['reading']),
                  'materials': len(data['materials']), 'errors': data['errors'],
                  'failures': len(failures)}, ensure_ascii=False))

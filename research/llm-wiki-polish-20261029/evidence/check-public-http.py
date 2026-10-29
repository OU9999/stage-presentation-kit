from pathlib import Path
import concurrent.futures
import hashlib
import json
import sys
import urllib.request

repo = Path(__file__).resolve().parents[3]
evidence = Path(__file__).resolve().parent
revision = sys.argv[1]
base = 'https://ou9999.github.io/stage-presentation-kit/'
files = [repo / 'presentations/index.html', repo / 'presentations/manifest.json']
for directory in ['presentations/_runtime', 'presentations/llm-wiki']:
    files.extend(p for p in (repo / directory).rglob('*') if p.is_file() and not p.name.startswith('.'))

def check(filename):
    relative = filename.relative_to(repo).as_posix()
    request = urllib.request.Request(base + relative + '?deploy=' + revision, headers={'Cache-Control': 'no-cache'})
    with urllib.request.urlopen(request, timeout=30) as response:
        body = response.read()
        result = {'path': relative, 'status': response.status, 'bytes': len(body), 'sha256': hashlib.sha256(body).hexdigest()}
    result['matches_local'] = body == filename.read_bytes()
    return result

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(check, sorted(set(files))))
report = {'git_sha': revision, 'files': results}
(evidence / 'public-http.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
failures = [row for row in results if row['status'] != 200 or not row['matches_local']]
print(json.dumps({'files': len(results), 'failures': failures}, ensure_ascii=False))
if failures:
    raise SystemExit(1)

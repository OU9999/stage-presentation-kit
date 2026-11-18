from pathlib import Path
import subprocess, json, sys

base = Path(__file__).resolve().parent
round_name = sys.argv[1]
assert round_name.startswith('main-') and round_name[5:].isdigit()
for mode, width, height, scripts in [
    ('present', 1920, 1080, ['capture-presentation.mjs', 'capture-svg-metrics.mjs']),
    ('present', 1280, 720, ['capture-presentation.mjs', 'capture-svg-metrics.mjs']),
    ('read', 1440, 1000, ['capture-reading.mjs']),
    ('read', 390, 844, ['capture-reading.mjs']),
]:
    (base / 'capture-request.json').write_text(json.dumps(dict(round=round_name, mode=mode, width=width, height=height, taskSpaceId=89, port=4336), indent=2) + '\n')
    for script in scripts:
        subprocess.run([sys.executable, str(base / 'run-capture.py'), script], check=True)
    subprocess.run([sys.executable, str(base / 'make-boards.py'), str(base / round_name / f'{mode}-{width}')], check=True)

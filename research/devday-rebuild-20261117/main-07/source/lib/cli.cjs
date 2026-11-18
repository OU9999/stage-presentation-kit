'use strict';
const { buildProject, startDev } = require('./project.cjs');
const { initProject, newTalk } = require('./scaffold.cjs');

const HELP = `ou-presentation — Markdown으로 발표와 읽기 자료 만들기

사용법:
  ou-presentation init [폴더] [--title 제목] [--package 설치할-패키지]
  ou-presentation new 발표이름 [--title 제목] [--config 설정파일]
  ou-presentation build [--config 설정파일]
  ou-presentation verify [--config 설정파일]
  ou-presentation dev [--config 설정파일] [--port 4320]

현재 폴더부터 상위 폴더의 ou.config.json 또는 stage.config.json을 찾습니다.
같은 폴더에 둘 다 있으면 ou.config.json을 사용합니다.
`;

async function run(args, context = {}) {
  const out = context.stdout || process.stdout;
  const options = { cwd: context.cwd || process.cwd() };
  const tokens = [...args];
  const command = tokens.shift();
  if (!command || ['--help', '-h', 'help'].includes(command)) { out.write(HELP); return; }
  if (command === '--version') { out.write(require('../package.json').version + '\n'); return; }
  const commands = { init: ['--title', '--package'], new: ['--title', '--config'], build: ['--config'], verify: ['--config'], dev: ['--config', '--port'] };
  if (!Object.hasOwn(commands, command)) throw new Error('알 수 없는 명령: ' + command + '\n' + HELP);
  const allowed = commands[command];
  const positional = [];
  const seen = new Set();
  while (tokens.length) {
    const token = tokens.shift();
    if (token === '--help' || token === '-h') { out.write(HELP); return; }
    if (!token.startsWith('-')) { positional.push(token); continue; }
    if (!allowed.includes(token) || seen.has(token)) throw new Error('지원하지 않거나 중복된 옵션: ' + token);
    seen.add(token);
    const value = tokens.shift();
    if (!value || value.startsWith('--')) throw new Error(token + ': 값이 필요합니다.');
    options[{ '--config': 'configPath', '--title': 'title', '--package': 'packageSpec', '--port': 'port' }[token]] = value;
  }
  if (positional.length > (['init', 'new'].includes(command) ? 1 : 0)) throw new Error('불필요한 인수: ' + positional.join(' '));
  if (options.port !== undefined) {
    if (!/^\d+$/.test(options.port) || Number(options.port) > 65535) throw new Error('port: 0~65535 정수를 사용하세요.');
    options.port = Number(options.port);
  }
  if (command === 'init') {
    const result = initProject(positional[0], options);
    out.write('프로젝트 생성: ' + result.projectRoot + '\n해당 폴더에서 npm install 후 npm run dev를 실행하세요.\n');
    return result;
  }
  if (command === 'new') {
    const result = newTalk(positional[0], options);
    out.write('발표 원고 생성: ' + result.source + '\n'); return result;
  }
  if (command === 'dev') {
    const dev = await startDev(options);
    out.write('ou-presentation 미리보기: ' + dev.url + '\n'); return dev;
  }
  const result = buildProject({ ...options, check: command === 'verify' });
  if (result.differences.length) throw new Error('생성물이 원본과 다릅니다. build를 실행하세요.\n' + result.differences.map(item => '[' + item.reason + '] ' + item.file).join('\n'));
  out.write(result.manifest.decks.length + '개 발표 ' + (command === 'verify' ? '검증' : '생성') + ': ' + result.outputDir + '\n');
  return result;
}

function main() {
  run(process.argv.slice(2)).then(result => {
    if (result?.close) for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => result.close().then(() => process.exit(0)));
  }).catch(error => { process.stderr.write(error.message + '\n'); process.exitCode = 1; });
}
module.exports = { run, main };

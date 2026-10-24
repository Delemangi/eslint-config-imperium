// All filesystem paths target this repository or the harness-owned temporary consumer.
/* eslint-disable security/detect-non-literal-fs-filename -- Paths target the repository or harness-owned disposable consumer. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const repo = process.cwd();
const manifest = JSON.parse(await readFile(path.join(repo, 'package.json'), 'utf8'));
const localEslint = JSON.parse(await readFile(path.join(repo, 'node_modules/eslint/package.json'), 'utf8'));
const args = process.argv.slice(2);
const option = args.find((arg) => arg.startsWith('--eslint-version='));
const typescriptOption = args.find((arg) => arg.startsWith('--typescript-mode='));
if (args.some((arg) => arg !== option && arg !== typescriptOption)) {
  throw new Error('Usage: npm run test:consumer -- [--eslint-version=10.4.0|10] ' +
    '[--typescript-mode=typescript6|side-by-side]');
}
const typescriptMode =
  typescriptOption?.slice('--typescript-mode='.length) ?? 'typescript6';
const sideBySide = 'side-by-side';
if (![sideBySide, 'typescript6'].includes(typescriptMode)) {
  throw new Error(`Unsupported TypeScript mode: ${typescriptMode}`);
}
const requested =
  option?.slice('--eslint-version='.length) ?? localEslint.version;
const eslintSpec = requested === '10' ? 'eslint@10' : `eslint@${requested}`;
const dependencySpec = (name, spec) => {
  const [alias, range] = spec.startsWith('npm:')
    ? [
      spec.slice(4).split('@')
        .slice(0, -1)
        .join('@'),
      spec.slice(spec.lastIndexOf('@') + 1)
    ]
    : [name, spec];
  if (!alias || !range) {
    throw new Error(`Cannot parse npm alias for ${name}: ${spec}`);
  }

  return `${name}@npm:${alias}@${range}`;
};
const typescript6Spec =
  typescriptMode === sideBySide
    ? dependencySpec('typescript', manifest.devDependencies.typescript)
    : 'typescript@~6.0.3';
const npmCli = process.env.npm_execpath;
if (!npmCli) {
  throw new Error('npm_execpath is missing; run via npm run test:consumer.');
}

const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'imperium-consumer-'));
const subprocessTimeout = 180_000;
const consumerEnvironment = () => {
  const env = { ...process.env };
  /*
   * npm run forwards this user policy as an env flag; npm 12 rejects it for
   * nested project installs. The subprocess still reads the user's .npmrc.
   */
  // eslint-disable-next-line e18e/no-delete-property -- npm must see this policy as absent, not undefined.
  delete env.npm_config_allow_scripts;
  const pathKeys = Object.keys(env).filter((key) => key.toLowerCase() === 'path');
  const pathKey = pathKeys[0];
  const bins = new Set();
  for (let directory = repo; ; directory = path.dirname(directory)) {
    bins.add(path.resolve(
      directory,
      'node_modules',
      '.bin'
    ).toLowerCase());
    const parent = path.dirname(directory);
    if (parent === directory) {
      break;
    }
  }
  if (pathKey) {
    const filtered = env[pathKey]
      .split(path.delimiter)
      .filter((entry) => !bins.has(path.resolve(entry).toLowerCase()));
    env[pathKey] = filtered.join(path.delimiter);
    for (const duplicate of pathKeys.slice(1)) {
      delete env[duplicate];
    }
  }

  return env;
};

const terminateProcessTree = (child) => {
  if (process.platform === 'win32') {
    return new Promise((resolve) => {
      const taskkill = path.join(
        process.env.SystemRoot ?? String.raw`C:\Windows`,
        'System32',
        'taskkill.exe'
      );
      const killer = spawn(
        taskkill,
        [
          '/PID',
          String(child.pid),
          '/T',
          '/F'
        ],
        {
          stdio: 'ignore',
          windowsHide: true
        }
      );
      const cleanupTimer = setTimeout(() => {
        killer.kill();
        resolve();
      }, 3_000);
      killer.once('error', () => {
        clearTimeout(cleanupTimer);
        child.kill();
        resolve();
      });
      killer.once('close', () => {
        clearTimeout(cleanupTimer);
        resolve();
      });
    });
  }

  try {
    process.kill(-child.pid, 'SIGTERM');
  } catch {
    // The owned process group may already have exited.
  }
  const hardKill = setTimeout(() => {
    try {
      process.kill(-child.pid, 'SIGKILL');
    } catch {
      // Exit can race the escalation timer.
    }
  }, 300);

  return new Promise((resolve) => {
    const cleanupTimer = setTimeout(() => {
      clearTimeout(hardKill);
      resolve();
    }, 1_500);
    child.once('close', () => {
      clearTimeout(hardKill);
      clearTimeout(cleanupTimer);
      resolve();
    });
  });
};

/* eslint-disable max-params -- Keep subprocess arguments explicit and auditable. */
const run = (
  executable,
  commandArgs,
  cwd,
  env = process.env,
  timeout = subprocessTimeout
) => new Promise((resolve, reject) => {
  const child = spawn(
    executable,
    commandArgs,
    {
      cwd,
      detached: process.platform !== 'win32',
      env,
      stdio: [
        'ignore',
        'pipe',
        'pipe'
      ]
    }
  );
  let output = '';
  let settled = false;
  let timedOut = false;
  // eslint-disable-next-line prefer-const -- The timeout callback and completion closure refer to one another.
  let timer;
  const finish = (callback, value) => {
    if (settled) {
      return;
    }
    settled = true;
    clearTimeout(timer);
    callback(value);
  };
  timer = setTimeout(async () => {
    timedOut = true;
    try {
      await terminateProcessTree(child);
    } finally {
      const message = `${path.basename(executable)} ${commandArgs.join(' ')} timed out after ${timeout}ms\n${output}`;
      finish(reject, new Error(message));
    }
  }, timeout);
  child.stdout.setEncoding('utf8').on('data', (chunk) => {
    output += chunk;
  });
  child.stderr.setEncoding('utf8').on('data', (chunk) => {
    output += chunk;
  });
  child.once('error', (error) => {
    finish(reject, error);
  });
  child.once('close', (code, signal = code) => {
    if (timedOut) {
      return;
    }
    if (code === 0) {
      finish(resolve, output);
    } else {
      const message = `${path.basename(executable)} ${commandArgs.join(' ')} failed (${signal ?? code})\n${output}`;
      finish(reject, new Error(message));
    }
  });
});

/* eslint-enable max-params -- End of subprocess helper. */
try {
  await assert.rejects(
    run(
      process.execPath,
      [
        '-e',
        'const { spawn } = require("node:child_process"); spawn(process.execPath, ["-e", ' +
        '"setInterval(() => {}, 1000)"], { stdio: "inherit" }); setInterval(() => {}, 1000);'
      ],
      repo,
      process.env,
      1_000
    ),
    /timed out after 1000ms/iu,
    'Timed subprocess and owned descendants must be terminated'
  );
  const packed = JSON.parse(await run(
    process.execPath,
    [
      npmCli,
      'pack',
      '--ignore-scripts',
      '--json',
      '--pack-destination',
      tempRoot
    ],
    repo
  ));
  const packEntry = Array.isArray(packed)
    ? packed[0]
    : Object.values(packed)[0];
  assert.ok(packEntry?.filename, `npm pack returned no filename: ${JSON.stringify(packed)}`);
  const consumer = path.join(tempRoot, 'consumer');
  await mkdir(consumer);
  await writeFile(path.join(consumer, 'package.json'), JSON.stringify({
    name: 'imperium-consumer-fixture',
    private: true,
    type: 'module'
  }));

  const env = consumerEnvironment();
  await run(
    process.execPath,
    [
      npmCli,
      'install',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--package-lock=false',
      eslintSpec,
      typescript6Spec,
      ...typescriptMode === sideBySide
        ? [dependencySpec('@typescript/native', manifest.devDependencies['@typescript/native'])]
        : [],
      path.join(tempRoot, packEntry.filename)
    ],
    consumer,
    env
  );

  const installed = JSON.parse(await readFile(path.join(consumer, 'node_modules/eslint/package.json'), 'utf8'));
  const typescript6Path = path.join(consumer, 'node_modules/typescript/package.json');
  const typescript6Manifest = JSON.parse(await readFile(typescript6Path, 'utf8'));
  const localBin = (name) => path.join(
    consumer,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? `${name}.cmd` : name
  );
  await access(localBin('tsc'));
  assert.equal(
    typescript6Manifest.name,
    typescriptMode === sideBySide ? '@typescript/typescript6' : 'typescript',
    `Unexpected TypeScript 6 package identity: ${typescript6Manifest.name}`
  );
  assert.equal(
    installed.version,
    requested === '10' ? installed.version : requested,
    `Expected ${eslintSpec}, got ${installed.version}`
  );
  if (requested === '10') {
    const { default: semver } = await import(pathToFileURL(path.join(repo, 'node_modules/semver/index.js')));
    assert.ok(semver.satisfies(installed.version, '^10.0.0'), `Expected ESLint 10, got ${installed.version}`);
  }
  const consumerManifest = JSON.parse(await readFile(path.join(consumer, 'package.json'), 'utf8'));
  assert.equal(
    consumerManifest.overrides,
    undefined,
    'Consumer must not use overrides'
  );
  assert.equal(
    consumerManifest.resolutions,
    undefined,
    'Consumer must not use resolutions'
  );

  const fixtures = [
    ['bad.jsx', 'export default function Bad() { return <img src="/x" />; }'],
    [
      'good.jsx',
      'export default function Good() { return <img src="/x" alt="example" />; }'
    ],
    ['bad.astro', '---\nconst value = 1;\n---\n<img src="/x" />'],
    [
      'good.astro',
      '---\nconst value = 1;\n---\n<img src="/x" alt="example" />'
    ],
    ['component.svelte', '<script>const value = 1;</script><p>{value}</p>'],
    [
      'component.vue',
      '<template><div>{{ value }}</div></template><script>export default { data() { return { value: 1 }; } };</script>'
    ],
    [
      'typed.ts',
      'async function check(value: Promise<number>) { await value; await 1; }\nvoid check(Promise.resolve(1));'
    ],
    [
      'clean.ts',
      'async function check(value: Promise<number>) { await value; }\nvoid check(Promise.resolve(1));'
    ],
    ...['mts', 'cts'].flatMap((extension) => [
      [
        `typed.${extension}`,
        'async function check(value: Promise<number>) { await value; await 1; }\nvoid check(Promise.resolve(1));'
      ],
      [
        `clean.${extension}`,
        'async function check(value: Promise<number>) { await value; }\nvoid check(Promise.resolve(1));'
      ]
    ]),
    [
      'tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          strict: true,
          target: 'ESNext'
        },
        include: [
          '*.ts',
          '*.mts',
          '*.cts'
        ]
      })
    ]
  ];
  await Promise.all(fixtures.map(([name, contents]) => writeFile(path.join(consumer, name), contents)));
  if (typescriptMode === sideBySide) {
    const ts7Path = path.join(consumer, 'node_modules/@typescript/native/package.json');
    const ts7Manifest = JSON.parse(await readFile(ts7Path, 'utf8'));
    assert.equal(
      ts7Manifest.name,
      'typescript',
      'Native alias must install the official TypeScript package'
    );
    assert.ok(ts7Manifest.bin?.tsc, 'Native TypeScript package must declare tsc');
    assert.equal(
      path.posix.normalize(typescript6Manifest.bin?.tsc6 ?? ''),
      'bin/tsc6',
      'Compatibility package must expose tsc6'
    );
    await access(localBin('tsc6'));
    const versionOutput = await run(
      process.execPath,
      [
        npmCli,
        'exec',
        '--no',
        '--',
        'tsc',
        '--version'
      ],
      consumer,
      env
    );
    const ts6VersionOutput = await run(
      process.execPath,
      [
        npmCli,
        'exec',
        '--no',
        '--',
        'tsc6',
        '--version'
      ],
      consumer,
      env
    );
    const versionMessage = `TypeScript CLI version does not match package ${ts7Manifest.version}`;
    assert.ok(versionOutput.includes(`Version ${ts7Manifest.version}`), versionMessage);
    assert.match(
      ts7Manifest.version,
      /^7\./u,
      'Native TypeScript package must be major 7'
    );
    assert.match(
      versionOutput,
      /Version 7\./u,
      'Installed TypeScript CLI must be major 7'
    );
    assert.match(
      ts6VersionOutput,
      /Version 6\./u,
      'Installed tsc6 CLI must be major 6'
    );
    await Promise.all([
      ['ts7-good.ts', 'const value: string = "valid";'],
      ['ts7-bad.ts', 'const value: string = 1;']
    ].map(([name, contents]) => writeFile(path.join(consumer, name), contents)));
    const ts7Config = (file) => JSON.stringify({
      compilerOptions: {
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        noEmit: true,
        strict: true,
        target: 'ESNext'
      },
      files: [file]
    });
    await Promise.all(['good', 'bad'].map((name) => {
      const configPath = path.join(consumer, `tsconfig.ts7-${name}.json`);

      return writeFile(configPath, ts7Config(`ts7-${name}.ts`));
    }));
    await run(
      process.execPath,
      [
        npmCli,
        'exec',
        '--no',
        '--',
        'tsc',
        '--project',
        'tsconfig.ts7-good.json'
      ],
      consumer,
      env
    );
    await assert.rejects(
      run(
        process.execPath,
        [
          npmCli,
          'exec',
          '--no',
          '--',
          'tsc',
          '--project',
          'tsconfig.ts7-bad.json'
        ],
        consumer,
        env
      ),
      /TS2322/u,
      'TypeScript 7 must reject the invalid fixture'
    );
  }
  const checkOutput = await run(
    process.execPath,
    [
      path.join(repo, 'scripts/test-consumer-check.js'),
      consumer,
      repo,
      manifest.peerDependencies.eslint,
      typescriptMode,
      typescript6Manifest.name
    ],
    repo
  );
  process.stdout.write(checkOutput);
} finally {
  await rm(tempRoot, {
    force: true,
    recursive: true
  });
}

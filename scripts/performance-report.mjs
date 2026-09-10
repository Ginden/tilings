#!/usr/bin/env node
import { cpus } from 'node:os';
import { performance } from 'node:perf_hooks';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const { values } = parseArgs({
  options: {
    width: { type: 'string', default: '900' },
    height: { type: 'string', default: '600' },
    'tile-size': { type: 'string', default: '34' },
    seed: { type: 'string', default: '20260824' },
    runs: { type: 'string', default: '10' },
    warmup: { type: 'string', default: '2' },
    help: { type: 'boolean', default: false },
  },
});

if (values.help) {
  console.log(`Usage: npm run --silent report:performance -- [options]

Print a Markdown report for every registered tiling to stdout.
Progress and failures go to stderr. Options:
  --width N       Viewport width in pixels (default: 900)
  --height N      Viewport height in pixels (default: 600)
  --tile-size N   Nominal tile size in pixels, at least 2 (default: 34)
  --seed N        Unsigned 32-bit seed (default: 20260824)
  --runs N        Measured renders per tiling (default: 10)
  --warmup N      Unmeasured renders per tiling (default: 2)
  --help          Show this help`);
  process.exit(0);
}

function numberOption(name, minimum, maximum = Number.MAX_SAFE_INTEGER) {
  const value = Number(values[name]);
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    throw new Error(`--${name} must be an integer between ${minimum} and ${maximum}`);
  }
  return value;
}

const options = {
  width: numberOption('width', 1),
  height: numberOption('height', 1),
  tileSize: numberOption('tile-size', 2),
  seed: numberOption('seed', 0, 0xffffffff),
  rotation: 0,
  substitutionHierarchy: 0,
  loopFillLimit: 16,
  colour1: '#f2c14e',
  colour2: '#1b3a5c',
  colour3: null,
  border: '#101820',
  borderWidth: 1,
};
const runs = numberOption('runs', 1);
const warmup = numberOption('warmup', 0);
const escapeCell = (value) => String(value).replaceAll('|', '\\|').replaceAll(/\r?\n/g, ' ');

// Use the existing Vite dependency to load production TypeScript and its .js imports.
const server = await createServer({
  root: fileURLToPath(new URL('..', import.meta.url)),
  configFile: false,
  server: { middlewareMode: true, watch: null, ws: false },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { TILINGS } = await server.ssrLoadModule('/src/tilings/index.ts');
  const { renderSvg } = await server.ssrLoadModule('/src/render/svg.ts');
  console.log(`# Tiling performance report

${new Date().toISOString()} · Node ${process.version} · ${process.platform}/${process.arch} · ${escapeCell(cpus()[0]?.model ?? 'unknown CPU')}

Viewport: ${options.width} × ${options.height} px; tile size: ${options.tileSize} px; seed: ${options.seed}.
${warmup} warmup renders and ${runs} measured renders per tiling, run sequentially in one process.
Times cover synchronous production SVG generation, including geometry, clipping and serialization where applicable.
Module loading, browser painting, worker messaging and PNG rasterization are excluded.
Rotation and hierarchy are zero; loop fill limit is 16; border width is 1 px.
Periodic tile counts are viewport estimates; patch counts are retained tiles after clipping.
The renderer is called directly, without the UI's tile-count cap. Caches and normal garbage collection remain enabled.
Median averages the two central samples for even run counts; p95 uses nearest rank.

| Tiling | ID | Render path | Tiles | SVG KiB | Median ms | p95 ms |
| --- | --- | --- | ---: | ---: | ---: | ---: |`);

  for (const def of TILINGS) {
    console.error(`Benchmarking ${def.id}…`);
    try {
      for (let i = 0; i < warmup; i++) renderSvg(def, options);
      const samples = [];
      let result;
      for (let i = 0; i < runs; i++) {
        const start = performance.now();
        result = renderSvg(def, options);
        samples.push(performance.now() - start);
      }
      samples.sort((a, b) => a - b);
      const middle = Math.floor(runs / 2);
      const median = runs % 2 ? samples[middle] : (samples[middle - 1] + samples[middle]) / 2;
      const p95 = samples[Math.ceil(runs * 0.95) - 1];
      console.log(`| ${escapeCell(def.name)} | ${def.id} | ${def.periodicCell ? 'Repeating cell' : 'Patch'} | ${result.tileCount} | ${(Buffer.byteLength(result.svg, 'utf8') / 1024).toFixed(1)} | ${median.toFixed(3)} | ${p95.toFixed(3)} |`);
    } catch (error) {
      console.error(`${def.id}:`, error);
      console.log(`| ${escapeCell(def.name)} | ${def.id} | ERROR | — | — | — | — |`);
      process.exitCode = 1;
    }
  }
} finally {
  await server.close();
}

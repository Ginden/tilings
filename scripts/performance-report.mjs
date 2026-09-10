#!/usr/bin/env node
import { cpus } from 'node:os';
import { performance } from 'node:perf_hooks';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const { values } = parseArgs({
  options: {
    sizes: { type: 'string', default: '900x600,1920x1080,3840x2160' },
    tilings: { type: 'string' },
    'tile-size': { type: 'string', default: '10,34,68' },
    rotation: { type: 'string', default: '0' },
    hierarchy: { type: 'string', default: '0' },
    'loop-fill-limit': { type: 'string', default: '16' },
    'border-width': { type: 'string', default: '0,1,3,6' },
    seed: { type: 'string', default: '20260824' },
    runs: { type: 'string', default: '6' },
    warmup: { type: 'string', default: '1' },
    help: { type: 'boolean', default: false },
  },
});

if (values.help) {
  console.log(`Usage: npm run --silent report:performance -- [options]

Print a Markdown report for every registered tiling to stdout.
Progress and failures go to stderr. Options:
  --tilings LIST        Tiling IDs (default: all registered tilings)
  --sizes LIST          Viewports (default: 900x600,1920x1080)
  --tile-size LIST      Tile sizes >= 2 (default: 34,68)
  --rotation LIST       Rotation angles in degrees (default: 0)
  --hierarchy LIST      Requested ancestry levels >= 0 (default: 0)
  --loop-fill-limit LIST Loop fill thresholds >= 0 (default: 16)
  --border-width LIST   Border widths >= 0; 0 disables borders (default: 0,1)
  --seed LIST           Unsigned 32-bit seeds (default: 20260824)
  --runs N              Measured renders per combination (default: 10)
  --warmup N            Unmeasured renders per combination (default: 2)
  Lists are comma-separated. Every combination is benchmarked for every tiling.
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

function numberList(name, minimum, maximum = Number.MAX_SAFE_INTEGER) {
  return [...new Set(values[name].split(',').map((item) => {
    const value = Number(item);
    if (!item.trim() || !Number.isFinite(value) || value < minimum || value > maximum
      || (name !== 'rotation' && name !== 'border-width' && !Number.isSafeInteger(value))) {
      throw new Error(`Invalid --${name} value: ${JSON.stringify(item)}`);
    }
    return value;
  }))];
}

if (values.sizes && (values.width || values.height)) {
  throw new Error('Use either --sizes or --width/--height');
}
if (Boolean(values.width) !== Boolean(values.height)) {
  throw new Error('--width and --height must be supplied together');
}
const sizes = values.width
  ? [{ width: numberOption('width', 1), height: numberOption('height', 1) }]
  : [...new Set((values.sizes ?? '900x600,1920x1080').split(','))].map((size) => {
    const match = /^(\d+)x(\d+)$/.exec(size.trim());
    if (!match || !match.slice(1).every((n) => Number.isSafeInteger(Number(n)) && Number(n) > 0)) {
      throw new Error(`Invalid viewport: ${JSON.stringify(size)}; expected WIDTHxHEIGHT`);
    }
    return { width: Number(match[1]), height: Number(match[2]) };
  });
const dimensions = {
  tileSize: numberList('tile-size', 2),
  rotation: numberList('rotation', -360, 360),
  substitutionHierarchy: numberList('hierarchy', 0),
  loopFillLimit: numberList('loop-fill-limit', 0),
  borderWidth: numberList('border-width', 0),
  seed: numberList('seed', 0, 0xffffffff),
};
let scenarios = sizes;
for (const [key, choices] of Object.entries(dimensions)) {
  scenarios = scenarios.flatMap((scenario) => choices.map((value) => ({ ...scenario, [key]: value })));
}
const palette = { colour1: '#f2c14e', colour2: '#1b3a5c', colour3: null };
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
  const ids = values.tilings?.split(',').map((id) => id.trim());
  if (ids) {
    for (const id of ids) {
      if (!TILINGS.some((def) => def.id === id)) throw new Error(`Unknown tiling: ${id}`);
    }
  }
  const selectedTilings = ids ? TILINGS.filter((def) => ids.includes(def.id)) : TILINGS;
  const { renderSvg } = await server.ssrLoadModule('/src/render/svg.ts');
  console.log(`# Tiling performance report

${new Date().toISOString()} · Node ${process.version} · ${process.platform}/${process.arch} · ${escapeCell(cpus()[0]?.model ?? 'unknown CPU')}

${selectedTilings.length} tilings × ${scenarios.length} setting combinations = ${selectedTilings.length * scenarios.length} benchmark rows.
${warmup} warmup renders and ${runs} measured renders per combination, run sequentially in one process.
Times cover synchronous production SVG generation, including geometry, clipping and serialization where applicable.
Module loading, browser painting, worker messaging and PNG rasterization are excluded.
Colours: #f2c14e / #1b3a5c; border: #101820 when enabled.
Hierarchy is the requested level count; unsupported settings are ignored or clamped by the production renderer.
Periodic tile counts are viewport estimates; patch counts are retained tiles after clipping.
The renderer is called directly, without the UI's tile-count cap. Caches and normal garbage collection remain enabled.
Median averages the two central samples for even run counts; p95 uses nearest rank.

| Tiling | ID | Viewport | Tile px | Rotation ° | Hierarchy | Loop limit | Border px | Seed | Render path | Tiles | SVG KiB | Median ms | p95 ms |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: | ---: |`);

  for (const def of selectedTilings) {
    for (const scenario of scenarios) {
      const options = { ...palette, ...scenario, border: scenario.borderWidth === 0 ? null : '#101820' };
      const label = `${escapeCell(def.name)} | ${def.id} | ${options.width}x${options.height} | ${options.tileSize} | ${options.rotation} | ${options.substitutionHierarchy} | ${options.loopFillLimit} | ${options.borderWidth} | ${options.seed}`;
      console.error(`Benchmarking ${def.id}: ${JSON.stringify(scenario)}`);
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
        console.log(`| ${label} | ${def.periodicCell ? 'Repeating cell' : 'Patch'} | ${result.tileCount} | ${(Buffer.byteLength(result.svg, 'utf8') / 1024).toFixed(1)} | ${median.toFixed(3)} | ${p95.toFixed(3)} |`);
      } catch (error) {
        console.error(`${def.id} ${JSON.stringify(scenario)}:`, error);
        console.log(`| ${label} | ERROR | — | — | — | — |`);
        process.exitCode = 1;
      }
    }
  }
} finally {
  await server.close();
}

import { readFileSync, writeFileSync } from 'node:fs';

const source = readFileSync(new URL('../shuriken_exact_rules.svg', import.meta.url), 'utf8');
const output = new URL('../src/tilings/shuriken-rule-data.ts', import.meta.url);

const root3 = Math.sqrt(3);
const lambda = Math.sqrt(5 + 2 * root3);
const xi = { x: root3 / 2, y: 1 / 2 };
const z = { x: 2 + xi.x, y: xi.y };
const rho = { x: z.x / lambda, y: z.y / lambda };

const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
const mul = (a, b) => ({ x: a.x * b.x - a.y * b.y, y: a.x * b.y + a.y * b.x });
const scale = (a, k) => ({ x: a.x * k, y: a.y * k });
const power = (a, n) => {
  let result = { x: 1, y: 0 };
  for (let i = 0; i < n; i++) result = mul(result, a);
  return result;
};

const xiPowers = Array.from({ length: 12 }, (_, index) => power(xi, index));
const u0 = { x: -(xiPowers[2].x + xiPowers[3].x), y: -(xiPowers[2].y + xiPowers[3].y) };
const dodecagon = [];
let corner = u0;
for (let index = 0; index < 12; index++) {
  dodecagon.push(corner);
  corner = add(corner, xiPowers[index]);
}

const oneMinusXi = sub({ x: 1, y: 0 }, xi);
const v = mul(oneMinusXi, sub({ x: 1, y: 0 }, xiPowers[3]));
const base = [
  dodecagon.map((point) => mul(rho, point)),
  [{ x: 0, y: 0 }, mul(rho, { x: 2, y: 0 }), mul(rho, sub(xiPowers[3], xi))],
  [{ x: 0, y: 0 }, oneMinusXi, sub(xi, xiPowers[3])],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, xi],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, xiPowers[2]],
  [{ x: 0, y: 0 }, v, mul(xi, v)],
  [{ x: 0, y: 0 }, oneMinusXi, mul(xiPowers[2], oneMinusXi)],
  [{ x: 0, y: 0 }, oneMinusXi, mul(xiPowers[3], oneMinusXi)],
];
for (let index = 2; index < 8; index++) base.push(base[index].map((point) => scale(point, lambda)));

const colours = new Map([
  ['#e0affe', 0], ['#ff9934', 1], ['#66cbff', 2], ['#ffff67', 3],
  ['#01cc00', 4], ['#33ffcc', 5], ['#fe0000', 6], ['#ff99cb', 7],
]);
const panelParents = [0, 1, 8, 9, 10, 11, 12, 13];

function pathsInPanel(panel) {
  const start = source.indexOf(`<g id="axes_${panel}">`);
  const end = panel === 8 ? source.indexOf('<g id="text_9">', start) : source.indexOf(`<g id="axes_${panel + 1}">`, start);
  const block = source.slice(start, end);
  return [...block.matchAll(/<path d="([\s\S]*?)"([^>]*?)\/>/g)].map((match) => {
    const numbers = [...match[1].matchAll(/-?\d+(?:\.\d+)?/g)].map((number) => Number(number[0]));
    const points = [];
    for (let index = 0; index < numbers.length; index += 2) points.push({ x: numbers[index], y: numbers[index + 1] });
    if (points.length > 1 && Math.hypot(points[0].x - points.at(-1).x, points[0].y - points.at(-1).y) < 1e-8) points.pop();
    const fill = match[2].match(/fill: ([^;]+)/)?.[1];
    return { points, fill };
  });
}

function candidateOrders(length) {
  const orders = [];
  for (let shift = 0; shift < length; shift++) {
    orders.push(Array.from({ length }, (_, index) => (shift + index) % length));
    orders.push(Array.from({ length }, (_, index) => (shift - index + length) % length));
  }
  return orders;
}

/** Best orientation-preserving or reflected similarity mapping `from` onto `to`. */
function fitSimilarity(from, to) {
  let best;
  for (const order of candidateOrders(to.length)) {
    for (const reflected of [false, true]) {
      const p0 = from[0];
      const p1 = from[1];
      const q0 = to[order[0]];
      const q1 = to[order[1]];
      const dp = reflected ? { x: p1.x - p0.x, y: -(p1.y - p0.y) } : sub(p1, p0);
      const dq = sub(q1, q0);
      const denominator = dp.x * dp.x + dp.y * dp.y;
      const factor = {
        x: (dq.x * dp.x + dq.y * dp.y) / denominator,
        y: (dq.y * dp.x - dq.x * dp.y) / denominator,
      };
      const linear = (point) => {
        const value = reflected ? { x: point.x, y: -point.y } : point;
        return mul(factor, value);
      };
      const origin = sub(q0, linear(p0));
      let error = 0;
      for (let index = 0; index < from.length; index++) {
        const actual = add(linear(from[index]), origin);
        const expected = to[order[index]];
        error = Math.max(error, Math.hypot(actual.x - expected.x, actual.y - expected.y));
      }
      if (!best || error < best.error) {
        const a = factor.x;
        const d = factor.y;
        best = {
          error,
          transform: reflected
            ? [a, d, origin.x, d, -a, origin.y]
            : [a, -d, origin.x, d, a, origin.y],
        };
      }
    }
  }
  return best;
}

const apply = (transform, point) => ({
  x: transform[0] * point.x + transform[1] * point.y + transform[2],
  y: transform[3] * point.x + transform[4] * point.y + transform[5],
});

const rules = Array.from({ length: 14 }, () => []);
for (let panel = 1; panel <= 8; panel++) {
  const parent = panelParents[panel - 1];
  const paths = pathsInPanel(panel);
  const outline = paths.find((path) => path.fill === 'none');
  if (!outline) throw new Error(`Panel ${panel} has no support outline`);
  const expandedParent = base[parent].map((point) => scale(point, lambda));
  const panelToParent = fitSimilarity(outline.points, expandedParent);
  if (panelToParent.error > 1e-5) throw new Error(`Panel ${panel} outline residual ${panelToParent.error}`);

  for (const path of paths) {
    const child = colours.get(path.fill);
    if (child === undefined) continue;
    const target = path.points.map((point) => apply(panelToParent.transform, point));
    const placement = fitSimilarity(base[child], target);
    if (placement.error > 2e-5) throw new Error(`Panel ${panel}, T${child + 1} residual ${placement.error}`);
    const transform = [...placement.transform];
    if (parent === 0 && child === 0) {
      // T1 is centred exactly at the origin. Removing the SVG's sub-pixel
      // translation makes successive central supertiles share one fixed point.
      const length = Math.hypot(transform[0], transform[3]);
      transform[0] /= length;
      transform[1] /= length;
      transform[3] /= length;
      transform[4] /= length;
      transform[2] = 0;
      transform[5] = 0;
    }
    rules[parent].push([child, ...transform.map((number) => Number(number.toFixed(9)))]);
  }
}

for (let parent = 2; parent < 8; parent++) rules[parent].push([parent + 6, 1, 0, 0, 0, 1, 0]);

const counts = [349, 13, 1, 1, 1, 1, 1, 1, 65, 67, 84, 55, 67, 61];
for (let parent = 0; parent < rules.length; parent++) {
  if (rules[parent].length !== counts[parent]) throw new Error(`T${parent + 1}: expected ${counts[parent]}, got ${rules[parent].length}`);
}

const header = `// Generated by scripts/extract-shuriken-rule-data.mjs from shuriken_exact_rules.svg.\n` +
  `// Do not edit by hand; regenerate with: node scripts/extract-shuriken-rule-data.mjs\n` +
  `import type { Affine } from '../geometry.js';\n\n` +
  `export type ShurikenChild = readonly [kind: number, ...transform: Affine];\n\n`;
writeFileSync(output, `${header}export const SHURIKEN_RULES: readonly (readonly ShurikenChild[])[] = ${JSON.stringify(rules)};\n`);
console.log(`Wrote ${rules.reduce((sum, rule) => sum + rule.length, 0)} placements to ${output.pathname}`);

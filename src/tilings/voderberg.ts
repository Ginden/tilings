import { area } from '../geometry.js';
import type { Vec } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';

interface TurtleState {
  x: number;
  y: number;
  angle: number;
  step: number;
}

interface Segment {
  readonly a: Vec;
  readonly b: Vec;
}

interface GraphEdge {
  readonly a: string;
  readonly b: string;
}

interface PolygonFace {
  readonly arm: 0 | 1;
  readonly edgeKeys: readonly string[];
  readonly points: readonly Vec[];
}

const AXIOM = String.raw`\84.1A\96@4.783386117M@I4.783386117/96A`;
const RULES: Readonly<Record<string, string>> = {
  A: String.raw`X\12X\12X\12X\12X\12X\12X\12X\12X\12X\12X\12X\12X\12X\12X\12Z`,
  X: String.raw`[D\78D\46.37236@3.393427D@I3.393427/46.37236D\114[\168X\24Y]D\78D\46.37236@3.393427D@I3.393427/46.37236D/78D]`,
  Y: String.raw`[D\78D\46.37236@3.393427D@I3.393427/46.37236D/78D\168[\192Y]D\78D\46.37236@3.393427D@I3.393427/46.37236D]`,
  Z: String.raw`[D\78D\46.37236@3.393427D@I3.393427/46.37236D\114D\78D\46.37236@3.393427D@I3.393427/46.37236D/78D]`,
};
const DEG = Math.PI / 180;
const POINT_PRECISION = 1_000;
const SPIRAL_PHASE_PER_UNIT = 0.275;
const SPIRAL_PHASE_OFFSET = 1.22;
const MIN_SPIRAL_ARM_RUN = 12;
const cache = new Map<number, readonly Tile[]>();

/**
 * Turtle grammar by Herb Savage, based on Gardner's published Voderberg
 * construction. It is expanded into a boundary graph and polygonised here;
 * unlike a decorative stroke rendering, every bounded nine-edge face becomes
 * a real tile used by clipping and export.
 *
 * @see https://github.com/LegalizeAdulthood/fractint/blob/master/fractint/lsystem/tiling.l
 * @see https://doi.org/10.1080/0025570X.2020.1708685
 */

function expand(iterations: number): string {
  let commands = AXIOM;
  for (let iteration = 0; iteration < iterations; iteration++) {
    commands = [...commands].map((command) => RULES[command] ?? command).join('');
  }
  return commands;
}

function readNumber(commands: string, start: number): readonly [number, number] {
  let end = start;
  while (end < commands.length && /[0-9.]/.test(commands[end]!)) end++;
  return [Number(commands.slice(start, end)), end];
}

function trace(iterations: number): Segment[] {
  const commands = expand(iterations);
  const state: TurtleState = { x: 0, y: 0, angle: 0, step: 1 };
  const stack: TurtleState[] = [];
  const segments: Segment[] = [];

  for (let index = 0; index < commands.length; index++) {
    const command = commands[index]!;
    if (command === '[') {
      stack.push({ ...state });
    } else if (command === ']') {
      Object.assign(state, stack.pop()!);
    } else if (command === '\\' || command === '/') {
      const [degrees, end] = readNumber(commands, index + 1);
      state.angle += (command === '\\' ? degrees : -degrees) * DEG;
      index = end - 1;
    } else if (command === '@') {
      const inverse = commands[index + 1] === 'I';
      const [factor, end] = readNumber(commands, index + (inverse ? 2 : 1));
      state.step = inverse ? state.step / factor : state.step * factor;
      index = end - 1;
    } else if (command === 'D' || command === 'M') {
      const next = {
        x: state.x + state.step * Math.cos(state.angle),
        y: state.y + state.step * Math.sin(state.angle),
      };
      if (command === 'D') {
        segments.push({ a: { x: state.x, y: state.y }, b: next });
      }
      state.x = next.x;
      state.y = next.y;
    }
  }
  return segments;
}

function pointKey(point: Vec): string {
  return `${Math.round(point.x * POINT_PRECISION)},${Math.round(point.y * POINT_PRECISION)}`;
}

function polygonize(segments: readonly Segment[]): Tile[] {
  const points = new Map<string, Vec>();
  const edges = new Map<string, GraphEdge>();
  const neighbours = new Map<string, Set<string>>();

  for (const segment of segments) {
    const a = pointKey(segment.a);
    const b = pointKey(segment.b);
    if (a === b) continue;
    if (!points.has(a)) points.set(a, segment.a);
    if (!points.has(b)) points.set(b, segment.b);
    const edgeKey = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (!edges.has(edgeKey)) {
      edges.set(edgeKey, { a, b });
      if (!neighbours.has(a)) neighbours.set(a, new Set());
      if (!neighbours.has(b)) neighbours.set(b, new Set());
      neighbours.get(a)!.add(b);
      neighbours.get(b)!.add(a);
    }
  }

  const sortedNeighbours = new Map<string, string[]>();
  for (const [key, adjacent] of neighbours) {
    const centre = points.get(key)!;
    sortedNeighbours.set(
      key,
      [...adjacent].sort((left, right) => {
        const a = points.get(left)!;
        const b = points.get(right)!;
        return Math.atan2(a.y - centre.y, a.x - centre.x) -
          Math.atan2(b.y - centre.y, b.x - centre.x);
      }),
    );
  }

  const used = new Set<string>();
  const faces: PolygonFace[] = [];
  for (const edge of edges.values()) {
    for (const [startA, startB] of [[edge.a, edge.b], [edge.b, edge.a]] as const) {
      if (used.has(`${startA}>${startB}`)) continue;
      const face: string[] = [];
      let a = startA;
      let b = startB;
      while (!used.has(`${a}>${b}`)) {
        used.add(`${a}>${b}`);
        face.push(a);
        const adjacent = sortedNeighbours.get(b)!;
        const reverse = adjacent.indexOf(a);
        const next = adjacent[(reverse - 1 + adjacent.length) % adjacent.length]!;
        a = b;
        b = next;
      }
      if (a !== startA || b !== startB || face.length !== 9) continue;
      const polygon = face.map((key) => points.get(key)!);
      if (area(polygon) < 1e-6) continue;

      const centroid = polygon.reduce(
        (sum, point) => ({ x: sum.x + point.x / 9, y: sum.y + point.y / 9 }),
        { x: 0, y: 0 },
      );
      const centre = {
        x: 4.783386117 / 2,
        y: (4.783386117 * Math.sin(0.1 * DEG)) / 2,
      };
      const dx = centroid.x - centre.x;
      const dy = centroid.y - centre.y;
      // The two arms alternate every half-turn of the Archimedean phase.
      // Its pitch is the grammar's 12-degree turn per construction layer.
      const spiralPhase =
        SPIRAL_PHASE_PER_UNIT * Math.hypot(dx, dy) +
        Math.atan2(dy, dx) +
        SPIRAL_PHASE_OFFSET;
      const edgeKeys = face.map((left, index) => {
        const right = face[(index + 1) % face.length]!;
        return left < right ? `${left}|${right}` : `${right}|${left}`;
      });
      faces.push({
        arm: Math.sin(spiralPhase) > 0 ? 1 : 0,
        edgeKeys,
        points: polygon,
      });
    }
  }

  const edgeFaces = new Map<string, number[]>();
  faces.forEach((face, index) => {
    for (const edgeKey of face.edgeKeys) {
      const adjacent = edgeFaces.get(edgeKey) ?? [];
      adjacent.push(index);
      edgeFaces.set(edgeKey, adjacent);
    }
  });
  // The two long edges join every nonagon into one construction path. Walking
  // that path gives the exact alternating V/A placement; colouring the full
  // face-adjacency graph instead can flip phase where spiral layers touch.
  const longEdgeNeighbours = Array.from({ length: faces.length }, () => new Set<number>());
  for (const [edgeKey, adjacent] of edgeFaces) {
    if (adjacent.length !== 2) continue;
    const [leftKey, rightKey] = edgeKey.split('|');
    const left = points.get(leftKey!)!;
    const right = points.get(rightKey!)!;
    if (Math.hypot(right.x - left.x, right.y - left.y) < 2) continue;
    longEdgeNeighbours[adjacent[0]!]!.add(adjacent[1]!);
    longEdgeNeighbours[adjacent[1]!]!.add(adjacent[0]!);
  }
  const placements = Array<number>(faces.length).fill(-1);
  const constructionPaths: number[][] = [];
  for (let seed = 0; seed < faces.length; seed++) {
    if (placements[seed] !== -1 || longEdgeNeighbours[seed]!.size !== 1) continue;
    const path: number[] = [];
    let previous = -1;
    let current = seed;
    let placement = 0;
    while (current !== -1 && placements[current] === -1) {
      path.push(current);
      placements[current] = placement;
      const next = [...longEdgeNeighbours[current]!].find((index) => index !== previous) ?? -1;
      previous = current;
      current = next;
      placement = 1 - placement;
    }
    constructionPaths.push(path);
  }
  for (let index = 0; index < placements.length; index++) {
    if (placements[index] === -1) placements[index] = index % 2;
  }

  const arms = faces.map((face) => face.arm);
  for (const path of constructionPaths) {
    // The polar phase identifies the broad spiral arms, while the construction
    // path makes their continuity exact. Near a staircase boundary the smooth
    // phase can briefly cross two or three adjacent tile centroids, creating a
    // false opposite-colour spur. Absorb only those tiny internal runs; genuine
    // arm runs are at least dozens of nonagons long (including at the core).
    while (true) {
      const runs: { arm: 0 | 1; start: number; end: number }[] = [];
      for (let order = 0; order < path.length; order++) {
        const arm = arms[path[order]!]!;
        const previousRun = runs.at(-1);
        if (previousRun?.arm === arm) previousRun.end = order + 1;
        else runs.push({ arm, start: order, end: order + 1 });
      }
      const noise = runs.find(
        (run, index) =>
          index > 0 &&
          index < runs.length - 1 &&
          run.end - run.start < MIN_SPIRAL_ARM_RUN &&
          runs[index - 1]!.arm === runs[index + 1]!.arm,
      );
      if (!noise) break;
      const arm = runs[runs.indexOf(noise) - 1]!.arm;
      for (let order = noise.start; order < noise.end; order++) arms[path[order]!] = arm;
    }
  }
  return faces.map((face, index) => ({
    kind: arms[index]! * 2 + placements[index]!,
    points: face.points,
  }));
}

function patch(iterations: number): readonly Tile[] {
  const existing = cache.get(iterations);
  if (existing) return existing;
  const tiles = polygonize(trace(iterations));
  cache.set(iterations, tiles);
  return tiles;
}

export const VODERBERG_OUTLINE: readonly Vec[] = patch(3)[0]!.points;

export function generateVoderberg(radius: number): Tile[] {
  const iterations = Math.max(5, Math.min(22, Math.ceil(radius / 4) + 1));
  return [...patch(iterations)];
}

export const voderberg: TilingDefinition = {
  id: 'voderberg',
  name: 'Voderberg spiral',
  family: 'nonperiodic',
  description:
    'The classic plane-covering Voderberg double spiral, generated as two recursively interlocking arms of congruent nonagons.',
  kinds: 4,
  kindLabels: ['clockwise V', 'clockwise A', 'counter-clockwise V', 'counter-clockwise A'],
  colourMode: 'paired',
  reference: 'https://en.wikipedia.org/wiki/Voderberg_tiling',
  unitTileArea: area(VODERBERG_OUTLINE),
  generate: generateVoderberg,
};

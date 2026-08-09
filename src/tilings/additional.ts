import { PHI, area } from '../geometry.js';
import type { Affine, Vec } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';
import { multigrid } from './multigrid.js';
import { subdivideP3, sunSeed } from './penrose.js';
import { composeChild, placedPolygon, subdivideShapes, subdivideTriangles } from './substitution.js';
import type { Placed } from './substitution.js';

const SQRT3 = Math.sqrt(3);

function parity(value: number): number {
  return Math.abs(value) % 2;
}

function pointKey(point: Vec): string {
  return `${Math.round(point.x * 10_000)},${Math.round(point.y * 10_000)}`;
}

function edgeKey(a: Vec, b: Vec): string {
  const ka = pointKey(a);
  const kb = pointKey(b);
  return ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`;
}

/**
 * In the six-grid dual tiling, a Socolar hexagon is the union of three 60°
 * rhombs meeting along complete edges. Merge every such unambiguous triple;
 * squares and 30° rhombs already are the other two Socolar carriers.
 */
export function mergeSocolarHexagons(rhombs: readonly Tile[]): Tile[] {
  const candidates = new Map<string, number[]>();
  for (let i = 0; i < rhombs.length; i++) {
    const tile = rhombs[i]!;
    if (tile.kind !== 1) continue;
    for (const point of tile.points) {
      const key = pointKey(point);
      const list = candidates.get(key);
      if (list) list.push(i);
      else candidates.set(key, [i]);
    }
  }

  const used = new Set<number>();
  const hexagons: Tile[] = [];
  for (const indices of candidates.values()) {
    const unique = [...new Set(indices)].filter((index) => !used.has(index));
    if (unique.length !== 3) continue;

    const boundary = new Map<string, [Vec, Vec]>();
    for (const index of unique) {
      const points = rhombs[index]!.points;
      for (let i = 0; i < points.length; i++) {
        const edge: [Vec, Vec] = [points[i]!, points[(i + 1) % points.length]!];
        const key = edgeKey(edge[0], edge[1]);
        if (boundary.has(key)) boundary.delete(key);
        else boundary.set(key, edge);
      }
    }
    if (boundary.size !== 6) continue;

    const edges = [...boundary.values()];
    const points: Vec[] = [edges[0]![0], edges[0]![1]];
    edges.splice(0, 1);
    while (edges.length > 0) {
      const last = pointKey(points[points.length - 1]!);
      const next = edges.findIndex(([a, b]) => pointKey(a) === last || pointKey(b) === last);
      if (next < 0) break;
      const [a, b] = edges.splice(next, 1)[0]!;
      points.push(pointKey(a) === last ? b : a);
    }
    points.pop(); // repeated first vertex
    if (points.length !== 6) continue;
    const summedArea = unique.reduce((sum, index) => sum + area(rhombs[index]!.points), 0);
    if (Math.abs(area(points) - summedArea) > 1e-5) continue;
    unique.forEach((index) => used.add(index));
    hexagons.push({ kind: 2, points });
  }

  const output: Tile[] = [];
  for (let i = 0; i < rhombs.length; i++) {
    if (used.has(i)) continue;
    const tile = rhombs[i]!;
    // Multigrid classes: 0=30°, 1=60°, 2=90°. A 60° boundary rhomb that
    // cannot form a complete hexagon is retained as a rhomb at patch margins.
    output.push({ kind: tile.kind === 2 ? 1 : 0, points: tile.points });
  }
  output.push(...hexagons);
  return output;
}

const SOCOLAR_OFFSETS = [0.07, -0.31, 0.22, -0.18, 0.39, -0.19] as const;

export const socolar: TilingDefinition = {
  id: 'socolar',
  name: 'Socolar (12-fold)',
  family: 'quasicrystal',
  description:
    'Socolar’s dodecagonal matching-rule tiling: 30° rhombs and squares, with triples of 60° dual-grid rhombs recomposed as regular hexagons.',
  kinds: 3,
  kindLabels: ['30° rhomb', 'square', 'regular hexagon'],
  supportsThreeColours: true,
  reference: 'https://en.wikipedia.org/wiki/Socolar_tiling',
  unitTileArea: 0.91,
  generate(radius): Tile[] {
    return mergeSocolarHexagons(multigrid(6, SOCOLAR_OFFSETS, radius));
  },
};

const HALF_SQRT3 = SQRT3 / 2;

/** The pentagonal Sphinx hexiamond, of area six unit equilateral triangles. */
export const SPHINX_OUTLINE: readonly Vec[] = [
  { x: 0.5, y: -HALF_SQRT3 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 1, y: SQRT3 },
  { x: -0.5, y: -HALF_SQRT3 },
];

/** Four exact half-scale affine copies that dissect one Sphinx. */
export const SPHINX_CHILDREN: readonly Affine[] = [
  [-0.25, HALF_SQRT3 / 2, 0.75, HALF_SQRT3 / 2, 0.25, -HALF_SQRT3 / 2],
  [-0.25, HALF_SQRT3 / 2, 1.5, -HALF_SQRT3 / 2, -0.25, HALF_SQRT3],
  [0.25, -HALF_SQRT3 / 2, 0, -HALF_SQRT3 / 2, -0.25, 0],
  [0.25, -HALF_SQRT3 / 2, 0.75, -HALF_SQRT3 / 2, -0.25, 1.5 * HALF_SQRT3],
];

export function subdivideSphinx(parent: Placed): Placed[] {
  return SPHINX_CHILDREN.map((child) => {
    const reflected = child[0] * child[4] - child[1] * child[3] < 0 ? 1 : 0;
    return composeChild(parent, parent.kind ^ reflected, child);
  });
}

export function generateSphinx(radius: number): Tile[] {
  // Around this interior anchor the prototile contains a disc of radius
  // sqrt(3)/4. Inflate to a supertile large enough to contain the request,
  // then deflate back to unit-edged Sphinxes.
  const levels = Math.max(1, Math.ceil(Math.log2((4 * Math.max(radius, 1)) / SQRT3)));
  const size = 2 ** levels;
  const anchor = { x: 0.5, y: 0 };
  const seedTransform: Affine = [size, 0, -size * anchor.x, 0, size, -size * anchor.y];
  const leaves = subdivideShapes([{ kind: 0, transform: seedTransform }], subdivideSphinx, levels);
  return leaves.map((leaf) => ({ kind: leaf.kind, points: placedPolygon(leaf, SPHINX_OUTLINE) }));
}

export const sphinx: TilingDefinition = {
  id: 'sphinx',
  name: 'Sphinx hexiamond',
  family: 'reptile',
  description:
    'The pentagonal hexiamond rep-tile, recursively dissected into four half-scale copies. Reflection states reveal its limit-periodic hierarchy.',
  kinds: 2,
  kindLabels: ['left-handed sphinx', 'right-handed sphinx'],
  reference: 'https://en.wikipedia.org/wiki/Sphinx_tiling',
  unitTileArea: (3 * SQRT3) / 2,
  generate: generateSphinx,
};

export function generateTubingen(radius: number): Tile[] {
  const levels = Math.max(1, Math.ceil(Math.log(Math.max(radius, 1) / 0.9) / Math.log(PHI)));
  const seed = sunSeed(Math.pow(PHI, levels)).map((triangle, index) => ({
    ...triangle,
    kind: 2 * triangle.kind + parity(index),
  }));
  const triangles = subdivideTriangles(seed, subdivideTubingen, levels);
  return triangles.map((triangle) => ({
    kind: triangle.kind,
    points: [triangle.a, triangle.b, triangle.c],
  }));
}

/**
 * Robinson geometry with Tübingen's extra handed state carried through every
 * substitution. Unlike the undecorated Penrose rule, reflection is not erased:
 * the child order flips the state and therefore changes later substitutions.
 */
export function subdivideTubingen(triangle: import('./substitution.js').Tri): import('./substitution.js').Tri[] {
  const shape = Math.floor(triangle.kind / 2);
  const hand = triangle.kind % 2;
  const children = subdivideP3({ ...triangle, kind: shape });
  return children.map((child, index) => ({
    ...child,
    kind: 2 * child.kind + ((hand + index + child.kind) % 2),
  }));
}

export const tubingenTriangle: TilingDefinition = {
  id: 'tubingen-triangle',
  name: 'Tübingen triangle',
  family: 'quasicrystal',
  description:
    'Robinson triangles under the Tübingen four-state substitution: acute and obtuse shapes retain distinct left- and right-handed hierarchy states.',
  kinds: 4,
  kindLabels: ['acute left', 'acute right', 'obtuse left', 'obtuse right'],
  reference: 'https://en.wikipedia.org/wiki/T%C3%BCbingen_triangle',
  unitTileArea: 0.406,
  generate: generateTubingen,
};

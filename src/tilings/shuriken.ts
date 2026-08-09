import type { Vec } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';

/**
 * The twelvefold Shuriken supertile.
 *
 * Frettlöh, Say-awen and de las Peñas dissect a regular n-gon of side length
 * λ_n into copies of a triangle T2 along its edges, one unit n-gon in the
 * centre, and "several parallelograms". This is that dissection worked out for
 * n = 12, where λ = λ_12 = sqrt(5 + 2*sqrt3) and T2 is the triangle whose edges
 * of length 1 and 2 meet at 150°.
 *
 * The dissection is exact: writing ξ = e^{iπ/6} and z = 2 + ξ (so |z| = λ),
 * every vertex below lies in Z[ξ], because the centre-to-vertex vector of the
 * unit dodecagon is u0 = 1/(ξ-1) = -ξ² - ξ³ and ξ-1 is a unit of that ring.
 * The whole construction rests on
 *
 *     z·ξ^k = 2ξ^k + ξ^{k+1},
 *
 * which spans an inflated unit edge by a two-step lattice path; the triangle
 * between the chord and that path is exactly T2. So for any lattice polygon Q,
 * z·Q splits into one T2 per unit boundary step plus an inner lattice polygon.
 * Where two cells meet, their two T2s glue into the parallelogram with edges 1
 * and 2 at 30° — the parallelogram of the paper's Theorem 5, whose diagonal
 * makes an irrational angle with its edges.
 *
 * What this is NOT: Paz's dense-orientation 12-fold Shuriken. That rule needs
 * fourteen prototile states and is published only as raster images. Rebuilding
 * it from the recipe stalls because the inflated rhombi cannot be dissected back
 * into rhombi, so the substitution does not close; and a rule whose tiles are
 * each dissected on their own lattice yields twelve tile orientations rather
 * than a dense set. See todo/shuriken-twelvefold-problem.md. The cells are
 * therefore laid out on the periodic 4.6.12 Archimedean tiling — dodecagon,
 * hexagon and square all inflate and dissect exactly — which fills the plane
 * without a closing substitution. The result is periodic, and every supertile
 * shows the genuine n = 12 dissection.
 */

/** A point of Z[ξ]: c0 + c1·ξ + c2·ξ² + c3·ξ³, with ξ⁴ = ξ² - 1. */
type Zx = readonly [number, number, number, number];

const ZERO: Zx = [0, 0, 0, 0];
/** Centre-to-first-vertex of the unit dodecagon, 1/(ξ-1). */
const U0: Zx = [0, 0, -1, -1];

export const LAMBDA = Math.sqrt(5 + 2 * Math.sqrt(3));

function zAdd(a: Zx, b: Zx): Zx {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
}

function zSub(a: Zx, b: Zx): Zx {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]];
}

function zScale(a: Zx, k: number): Zx {
  return [a[0] * k, a[1] * k, a[2] * k, a[3] * k];
}

/** Multiply by ξ, reducing ξ⁴ to ξ² - 1. */
function zMulXi(a: Zx): Zx {
  return [-a[3], a[0], a[1] + a[3], a[2]];
}

function zRot(a: Zx, k: number): Zx {
  let out = a;
  for (let i = 0; i < ((k % 12) + 12) % 12; i++) out = zMulXi(out);
  return out;
}

/** Multiply by z = 2 + ξ: the inflation, scaling by λ and turning by α. */
function zInflate(a: Zx): Zx {
  return zAdd(zScale(a, 2), zMulXi(a));
}

const XI_POW: Zx[] = [];
for (let k = 0; k < 12; k++) XI_POW.push(zRot([1, 0, 0, 0], k));

const BASIS: Vec[] = [0, 1, 2, 3].map((i) => ({
  x: Math.cos((i * Math.PI) / 6),
  y: Math.sin((i * Math.PI) / 6),
}));

function toVec(a: Zx): Vec {
  let x = 0;
  let y = 0;
  for (let i = 0; i < 4; i++) {
    x += a[i]! * BASIS[i]!.x;
    y += a[i]! * BASIS[i]!.y;
  }
  return { x, y };
}

/** Boundary words (cyclic lists of unit-step directions), counter-clockwise. */
const CELL_WORD: Record<string, readonly number[]> = {
  dodecagon: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  hexagon: [0, 2, 4, 6, 8, 10],
  square: [0, 3, 6, 9],
};

const TILE_WORD: Record<string, readonly number[]> = {
  dodecagon: CELL_WORD.dodecagon!,
  tri: [0, 4, 8],
  rhomb1: [0, 1, 6, 7],
  rhomb2: [0, 2, 6, 8],
  rhomb3: [0, 3, 6, 9],
};

/** Colour classes, in the order the renderer shades them. */
const KIND: Record<string, number> = {
  dodecagon: 0,
  T2: 1,
  tri: 2,
  rhomb1: 3,
  rhomb2: 4,
  rhomb3: 5,
};

/** A placed piece: prototile name, rotation in twelfths, and its start vertex. */
type Piece = readonly [string, number, Zx];

function pieceTile(name: string, rot: number, at: Zx): Tile {
  if (name === 'T2') {
    // The triangle on one inflated unit edge: chord z·ξ^rot, path ξ^{rot+1} then 2ξ^rot.
    return {
      kind: KIND.T2!,
      points: [
        toVec(at),
        toVec(zAdd(at, XI_POW[(rot + 1) % 12]!)),
        toVec(zAdd(at, zInflate(XI_POW[rot % 12]!))),
      ],
    };
  }
  const word = TILE_WORD[name]!;
  const points: Vec[] = [];
  let v = at;
  for (const d of word) {
    points.push(toVec(v));
    v = zAdd(v, XI_POW[(d + rot) % 12]!);
  }
  return { kind: KIND[name]!, points };
}

/**
 * The annulus of the dodecagon supertile: 96 rhombi in 8 orbits of 12 under
 * rotation by ξ, so the dissection carries the full twelvefold symmetry. Each
 * row is one orbit representative as [name, rotation, start vertex].
 */
const DODECAGON_ORBITS: Piece[] = [
  ['rhomb2', 6, [3, 1, -2, -3]],
  ['rhomb2', 6, [2, 1, -2, -3]],
  ['rhomb3', 3, [3, 1, -2, -3]],
  ['rhomb3', 3, [2, 1, -2, -3]],
  ['rhomb2', 4, [3, 1, -2, -2]],
  ['rhomb2', 4, [2, 1, -2, -2]],
  ['rhomb1', 5, [2, 1, -1, -2]],
  ['rhomb1', 11, [0, 0, -1, -1]],
];

/** Interior of the inflated regular hexagon, as offsets from z·(its start vertex). */
const HEXAGON_CHILDREN: Piece[] = [
  ['rhomb1', 1, [0, 0, 0, 0]],
  ['rhomb2', 2, [0, 0, 0, 0]],
  ['rhomb2', 0, [0, 1, 0, 0]],
  ['tri', 0, [1, 1, 0, 0]],
  ['rhomb1', 3, [2, 1, 0, 0]],
  ['tri', 2, [-1, 0, 1, 0]],
  ['rhomb1', 1, [0, 0, 1, 0]],
  ['tri', 2, [0, 0, 1, 0]],
  ['tri', 0, [0, 1, 1, 0]],
  ['rhomb1', 3, [1, 1, 1, 0]],
  ['rhomb2', 2, [2, 1, 0, 1]],
  ['rhomb1', 5, [-1, 0, 2, 0]],
  ['rhomb1', 5, [0, 0, 2, 0]],
  ['rhomb2', 1, [0, 0, 2, 0]],
  ['rhomb2', 3, [0, 0, 2, 0]],
  ['rhomb2', 0, [-2, -1, 2, 1]],
  ['tri', 0, [-1, -1, 2, 1]],
  ['rhomb1', 3, [0, -1, 2, 1]],
  ['tri', 2, [1, 1, 1, 1]],
  ['tri', 2, [2, 1, 1, 1]],
  ['rhomb2', 5, [0, 1, 2, 1]],
  ['tri', 0, [-2, -1, 3, 1]],
  ['rhomb1', 3, [-1, -1, 3, 1]],
  ['rhomb1', 1, [0, -1, 2, 2]],
  ['rhomb2', 2, [0, -1, 2, 2]],
  ['rhomb1', 5, [1, 1, 2, 1]],
  ['rhomb1', 5, [2, 1, 2, 1]],
  ['rhomb2', 0, [0, 0, 2, 2]],
  ['tri', 0, [1, 0, 2, 2]],
  ['tri', 2, [-1, -1, 3, 2]],
  ['rhomb1', 1, [0, -1, 3, 2]],
  ['tri', 2, [0, -1, 3, 2]],
  ['tri', 0, [0, 0, 3, 2]],
];

/** Interior of the inflated square, as offsets from z·(its start vertex). */
const SQUARE_CHILDREN: Piece[] = [
  ['rhomb1', 1, [0, 0, 0, 0]],
  ['rhomb1', 2, [0, 0, 0, 0]],
  ['rhomb2', 0, [0, 1, 0, 0]],
  ['tri', 0, [1, 1, 0, 0]],
  ['rhomb2', 1, [0, 0, 1, 0]],
  ['rhomb1', 2, [0, 0, 0, 1]],
  ['rhomb3', 0, [0, 1, 1, 0]],
  ['tri', 1, [0, 0, 1, 1]],
  ['tri', 2, [0, 0, 0, 2]],
  ['rhomb1', 5, [1, 1, 1, 1]],
  ['tri', 3, [1, 1, 1, 1]],
];

/** Children of each inflated cell, as offsets from z·(the cell's start vertex). */
const CELL_RULE: Record<string, { start: Zx; children: Piece[] }> = {
  dodecagon: { start: U0, children: [] },
  hexagon: { start: ZERO, children: HEXAGON_CHILDREN },
  square: { start: ZERO, children: SQUARE_CHILDREN },
};

{
  // The dodecagon's dissection is symmetric about its centre, which is the
  // origin, so spin each orbit representative about the origin rather than
  // about the start vertex the offsets are measured from.
  const anchor = zInflate(U0);
  const children: Piece[] = [['dodecagon', 0, zSub(U0, anchor)]];
  for (const [name, rot, off] of DODECAGON_ORBITS) {
    for (let k = 0; k < 12; k++) {
      children.push([name, (rot + k) % 12, zSub(zRot(off, k), anchor)]);
    }
  }
  CELL_RULE.dodecagon!.children = children;
}

/**
 * Cells of the unit-edge 4.6.12 tiling reaching the given radius once inflated.
 * Dodecagon centres form a triangular lattice; each dodecagon is ringed by six
 * squares (on its even edges) and six hexagons (on its odd ones).
 */
function cells(radius: number): Piece[] {
  const corner: Zx[] = [];
  for (let k = 0; k < 12; k++) {
    corner.push(k === 0 ? U0 : zAdd(corner[k - 1]!, XI_POW[k - 1]!));
  }
  const step = (k: number): Zx =>
    zAdd(zAdd(corner[k % 12]!, corner[(k + 1) % 12]!), XI_POW[(k + 9) % 12]!);
  const t0 = step(0);
  const t2 = step(2);

  const reach = (radius + 6) / LAMBDA;
  const t0len = Math.hypot(toVec(t0).x, toVec(t0).y);
  const span = Math.ceil(reach / t0len) + 1;

  const seen = new Set<string>();
  const out: Piece[] = [];
  const push = (name: string, rot: number, word: readonly number[], at: Zx): void => {
    // Key on the sum of the vertices: independent of which neighbouring
    // dodecagon offered this cell, and of where its word starts.
    let sum: Zx = ZERO;
    let v = at;
    for (const d of word) {
      sum = zAdd(sum, v);
      v = zAdd(v, XI_POW[(d + rot) % 12]!);
    }
    const key = `${name}:${sum.join(',')}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push([name, rot, at]);
  };

  for (let i = -span; i <= span; i++) {
    for (let j = -span; j <= span; j++) {
      const centre = zAdd(zScale(t0, i), zScale(t2, j));
      const c = toVec(centre);
      if (Math.hypot(c.x, c.y) > reach + 2 * t0len) continue;
      const vertex = (k: number): Zx => zAdd(centre, corner[k % 12]!);
      push('dodecagon', 0, CELL_WORD.dodecagon!, vertex(0));
      for (let k = 0; k < 12; k++) {
        const rot = (k + 6) % 12;
        const name = k % 2 === 0 ? 'square' : 'hexagon';
        push(name, rot, CELL_WORD[name]!, vertex(k + 1));
      }
    }
  }
  return out;
}

function cellTiles(name: string, rot: number, at: Zx): Tile[] {
  const rule = CELL_RULE[name]!;
  const base = zInflate(at);
  const tiles = rule.children.map(([child, childRot, off]) =>
    pieceTile(child, (childRot + rot) % 12, zAdd(base, zRot(off, rot))),
  );
  // One T2 rides on every unit step of the cell's own boundary; the T2 of the
  // cell across each edge completes it into a Theorem-5 parallelogram.
  let v = at;
  for (const d of CELL_WORD[name]!) {
    const dir = (d + rot) % 12;
    tiles.push(pieceTile('T2', dir, zInflate(v)));
    v = zAdd(v, XI_POW[dir]!);
  }
  return tiles;
}

/**
 * One dodecagon supertile centred on the origin: the twelve rim triangles, the
 * unit dodecagon at the centre, and the 96-rhomb shuriken star between them.
 */
export function supertileTiles(): Tile[] {
  return cellTiles('dodecagon', 0, U0);
}

export function generateShuriken(radius: number): Tile[] {
  const tiles: Tile[] = [];
  for (const [name, rot, at] of cells(radius)) {
    for (const tile of cellTiles(name, rot, at)) tiles.push(tile);
  }
  return tiles;
}

export const shurikenSupertile: TilingDefinition = {
  id: 'shuriken-supertile-12',
  name: 'Shuriken supertile (12-fold)',
  family: 'experimental',
  description:
    'The Frettlöh–Say-awen–de las Peñas dissection of the inflated dodecagon at n = 12: twelve 1–2–150° triangles on the rim, a unit dodecagon in the centre, and a twelvefold shuriken star of 96 rhombi between them, with inflation sqrt(5 + 2*sqrt3). Their substitution does not close on these prototiles, so the supertiles are laid out periodically on the 4.6.12 Archimedean tiling rather than by inflation; this is not Paz’s dense-orientation twelvefold Shuriken.',
  kinds: 6,
  kindLabels: ['dodecagon', '1–2–150° triangle', 'triangle', '30° rhomb', '60° rhomb', '90° rhomb'],
  reference: 'https://arxiv.org/abs/1602.00518',
  unitTileArea: 0.7075,
  generate(radius): Tile[] {
    return generateShuriken(radius);
  },
};

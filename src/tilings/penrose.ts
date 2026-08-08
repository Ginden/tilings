import { PHI, add, lerp, scale, sub } from '../geometry.js';
import type { Vec } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';
import { mergeHalfTiles, subdivideTriangles } from './substitution.js';
import type { Tri } from './substitution.js';

const INV_PHI = 1 / PHI;

/** Point at distance `t * |q - p|` from `p` along `p -> q`. */
function along(p: Vec, q: Vec, t: number): Vec {
  return lerp(p, q, t);
}

/**
 * P3 (rhombs). Robinson triangle deflation: kind 0 is the acute golden triangle
 * (half of a thin rhomb), kind 1 the obtuse gnomon (half of a thick rhomb).
 */
export function subdivideP3(t: Tri): Tri[] {
  if (t.kind === 0) {
    const p = along(t.a, t.b, INV_PHI);
    return [
      { kind: 0, a: t.c, b: p, c: t.b },
      { kind: 1, a: p, b: t.c, c: t.a },
    ];
  }
  const q = along(t.b, t.a, INV_PHI);
  const r = along(t.b, t.c, INV_PHI);
  return [
    { kind: 1, a: r, b: t.c, c: t.a },
    { kind: 1, a: q, b: r, c: t.b },
    { kind: 0, a: r, b: q, c: t.a },
  ];
}

/**
 * P2 (kite and dart). Kind 0 is the half-kite (acute golden triangle whose legs
 * are the long edges), kind 1 the half-dart (obtuse gnomon whose equal sides are
 * the short edges). Vertex `a` is the apex and the edge `a-c` is the mirror axis
 * along which two half-tiles glue into a whole kite or dart; the rule below
 * preserves that invariant, which is what makes the halves pair up again.
 *
 * A half-kite becomes a whole kite (two half-kites) plus a half-dart; a
 * half-dart becomes a half-kite plus a half-dart.
 */
export function subdivideP2(t: Tri): Tri[] {
  if (t.kind === 0) {
    const p = along(t.a, t.b, INV_PHI * INV_PHI);
    const q = along(t.a, t.c, INV_PHI);
    return [
      { kind: 1, a: p, b: q, c: t.a },
      { kind: 0, a: t.b, b: p, c: q },
      { kind: 0, a: t.b, b: t.c, c: q },
    ];
  }
  const g = along(t.c, t.b, INV_PHI);
  return [
    { kind: 0, a: t.c, b: g, c: t.a },
    { kind: 1, a: g, b: t.a, c: t.b },
  ];
}

/**
 * The classic "sun" seed: ten acute golden triangles around the origin,
 * alternately mirrored so that neighbouring pairs form whole tiles.
 */
export function sunSeed(radius: number): Tri[] {
  const seed: Tri[] = [];
  const origin: Vec = { x: 0, y: 0 };
  for (let i = 0; i < 10; i++) {
    const b: Vec = {
      x: radius * Math.cos(((2 * i - 1) * Math.PI) / 10),
      y: radius * Math.sin(((2 * i - 1) * Math.PI) / 10),
    };
    const c: Vec = {
      x: radius * Math.cos(((2 * i + 1) * Math.PI) / 10),
      y: radius * Math.sin(((2 * i + 1) * Math.PI) / 10),
    };
    seed.push(i % 2 === 0 ? { kind: 0, a: origin, b: c, c: b } : { kind: 0, a: origin, b, c });
  }
  return seed;
}

/**
 * Five kites around a point (the "sun" vertex of a P2 tiling), split into ten
 * half-kites whose mirror axes all lie on the edge a-c.
 */
export function kiteSeed(radius: number): Tri[] {
  const at = (degrees: number): Vec => ({
    x: radius * Math.cos((degrees * Math.PI) / 180),
    y: radius * Math.sin((degrees * Math.PI) / 180),
  });
  const origin: Vec = { x: 0, y: 0 };
  const seed: Tri[] = [];
  for (let k = 0; k < 5; k++) {
    const axis = 72 * k;
    seed.push({ kind: 0, a: origin, b: at(axis - 36), c: at(axis) });
    seed.push({ kind: 0, a: origin, b: at(axis + 36), c: at(axis) });
  }
  return seed;
}

/** Number of deflation steps needed so that the final half-tiles have unit legs. */
function levelsFor(radius: number): number {
  return Math.max(1, Math.ceil(Math.log(Math.max(radius, 1) / 0.9) / Math.log(PHI)));
}

function buildTriangles(
  radius: number,
  rule: (t: Tri) => Tri[],
  seed: (r: number) => Tri[] = sunSeed,
): Tri[] {
  const levels = levelsFor(radius);
  return subdivideTriangles(seed(Math.pow(PHI, levels)), rule, levels);
}

export const penroseP3: TilingDefinition = {
  id: 'penrose-p3',
  name: 'Penrose P3 — rhombs',
  family: 'penrose',
  description:
    'The rhombus tiling: a thick rhomb (72°/108°) and a thin rhomb (36°/144°), produced by Robinson triangle deflation.',
  kinds: 2,
  kindLabels: ['thin rhomb', 'thick rhomb'],
  reference: 'https://en.wikipedia.org/wiki/Penrose_tiling#Rhombus_tiling_(P3)',
  unitTileArea: 0.8125,
  generate(radius) {
    return mergeHalfTiles(buildTriangles(radius, subdivideP3), 'base');
  },
};

export const penroseP2: TilingDefinition = {
  id: 'penrose-p2',
  name: 'Penrose P2 — kite and dart',
  family: 'penrose',
  description:
    'Penrose’s kite and dart: a 72/72/72/144 kite and a 36/72/36/216 dart, both split into Robinson triangles.',
  kinds: 2,
  kindLabels: ['kite', 'dart'],
  reference: 'https://en.wikipedia.org/wiki/Penrose_tiling#Kite_and_dart_tiling_(P2)',
  unitTileArea: 0.502,
  generate(radius) {
    return mergeHalfTiles(buildTriangles(radius, subdivideP2, kiteSeed), 'axis');
  },
};

export const robinsonTriangles: TilingDefinition = {
  id: 'robinson-triangles',
  name: 'Robinson triangles',
  family: 'penrose',
  description:
    'The half-tiles themselves: acute golden triangles and golden gnomons, the building blocks of every Penrose tiling.',
  kinds: 2,
  kindLabels: ['golden triangle', 'golden gnomon'],
  reference: 'https://en.wikipedia.org/wiki/Penrose_tiling#Robinson_triangles',
  unitTileArea: 0.406,
  generate(radius): Tile[] {
    return buildTriangles(radius, subdivideP3).map((t) => ({
      kind: t.kind,
      points: [t.a, t.b, t.c],
    }));
  },
};

/**
 * Penrose P1-style pentagon decoration. Each thick rhomb of a P3 tiling carries
 * a regular pentagon inscribed on its long diagonal; this is a decoration of the
 * rhombs, not the six-prototile P1 tiling itself.
 */
export function pentagonOnRhomb(points: readonly Vec[]): Vec[] {
  const [p0, p1, p2, p3] = points as [Vec, Vec, Vec, Vec];
  const centre = scale(add(add(p0, p1), add(p2, p3)), 0.25);
  const r = Math.hypot(p0.x - centre.x, p0.y - centre.y);
  const base = Math.atan2(p0.y - centre.y, p0.x - centre.x);
  const out: Vec[] = [];
  for (let i = 0; i < 5; i++) {
    const a = base + (i * 2 * Math.PI) / 5;
    out.push(add(centre, { x: r * Math.cos(a), y: r * Math.sin(a) }));
  }
  return out;
}

export function triangleArea(t: Tri): number {
  const u = sub(t.b, t.a);
  const v = sub(t.c, t.a);
  return Math.abs(u.x * v.y - u.y * v.x) / 2;
}

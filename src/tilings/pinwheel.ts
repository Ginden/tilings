import type { Vec } from '../geometry.js';
import { intersectsCenteredSquare, sub } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';
import { subdivideTriangles } from './substitution.js';
import type { Tri } from './substitution.js';

/**
 * Conway and Radin's pinwheel triangle: a right triangle with legs 1 and 2 that
 * splits into five copies of itself scaled by 1/sqrt(5). Vertex convention:
 * `a` is the right angle, `b` the end of the long leg, `c` the end of the short leg.
 */
function point(t: Tri, s: number, u: number): Vec {
  const long = sub(t.b, t.a);
  const short = sub(t.c, t.a);
  return { x: t.a.x + long.x * s + short.x * u, y: t.a.y + long.y * s + short.y * u };
}

function orientation(t: Tri): number {
  const u = sub(t.b, t.a);
  const v = sub(t.c, t.a);
  return u.x * v.y - u.y * v.x >= 0 ? 0 : 1;
}

export function subdividePinwheel(t: Tri): Tri[] {
  const m = point(t, 0.5, 0); // midpoint of the long leg
  const p = point(t, 0.1, 0.4);
  const q = point(t, 0.6, 0.4);
  const r = point(t, 0.2, 0.8);
  const tris: Tri[] = [
    { kind: 0, a: p, b: m, c: t.a },
    { kind: 0, a: q, b: t.b, c: m },
    { kind: 0, a: r, b: t.a, c: t.c },
    { kind: 0, a: p, b: m, c: r },
    { kind: 0, a: q, b: r, c: m },
  ];
  return tris.map((child) => ({ ...child, kind: orientation(child) }));
}

function seedRectangle(halfLong: number): Tri[] {
  // Two pinwheel triangles glued into a 2s x s rectangle centred on the origin.
  const s = halfLong;
  const x0 = -s;
  const y0 = -s / 2;
  const a: Vec = { x: x0, y: y0 };
  const b: Vec = { x: x0 + 2 * s, y: y0 };
  const c: Vec = { x: x0, y: y0 + s };
  const d: Vec = { x: x0 + 2 * s, y: y0 + s };
  const t1: Tri = { kind: 0, a, b, c };
  const t2: Tri = { kind: 0, a: d, b: c, c: b };
  return [t1, t2].map((t) => ({ ...t, kind: orientation(t) }));
}

export const pinwheel: TilingDefinition = {
  id: 'pinwheel',
  name: 'Pinwheel (Conway–Radin)',
  family: 'reptile',
  description:
    'A single right triangle with legs 1 and 2, subdivided into five copies of itself. Its tiles appear in infinitely many orientations.',
  kinds: 2,
  kindLabels: ['triangle', 'mirrored triangle'],
  reference: 'https://en.wikipedia.org/wiki/Pinwheel_tiling',
  unitTileArea: 1,
  generate(radius): Tile[] {
    const levels = Math.max(1, Math.ceil((2 * Math.log(2 * Math.max(radius, 1))) / Math.log(5)));
    const s = Math.pow(5, levels / 2);
    const tris = subdivideTriangles(seedRectangle(s), subdividePinwheel, levels, (triangle) =>
      intersectsCenteredSquare([triangle.a, triangle.b, triangle.c], radius),
    );
    return tris.map((t) => ({ kind: t.kind, points: [t.a, t.b, t.c] }));
  },
};

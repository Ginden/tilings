/** A point (or vector) in the plane. */
export interface Vec {
  readonly x: number;
  readonly y: number;
}

/**
 * A 2D affine transform stored as the top two rows of a 3x3 matrix:
 * `[a, b, c, d, e, f]` maps `(x, y)` to `(a*x + b*y + c, d*x + e*y + f)`.
 */
export type Affine = readonly [number, number, number, number, number, number];

export const IDENTITY: Affine = [1, 0, 0, 0, 1, 0];

export function pt(x: number, y: number): Vec {
  return { x, y };
}

export function add(p: Vec, q: Vec): Vec {
  return { x: p.x + q.x, y: p.y + q.y };
}

export function sub(p: Vec, q: Vec): Vec {
  return { x: p.x - q.x, y: p.y - q.y };
}

export function scale(p: Vec, k: number): Vec {
  return { x: p.x * k, y: p.y * k };
}

/** Linear interpolation from `p` towards `q`. */
export function lerp(p: Vec, q: Vec, t: number): Vec {
  return { x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t };
}

export function len(p: Vec): number {
  return Math.hypot(p.x, p.y);
}

export function dist(p: Vec, q: Vec): number {
  return Math.hypot(p.x - q.x, p.y - q.y);
}

export function mul(a: Affine, b: Affine): Affine {
  return [
    a[0] * b[0] + a[1] * b[3],
    a[0] * b[1] + a[1] * b[4],
    a[0] * b[2] + a[1] * b[5] + a[2],
    a[3] * b[0] + a[4] * b[3],
    a[3] * b[1] + a[4] * b[4],
    a[3] * b[2] + a[4] * b[5] + a[5],
  ];
}

export function inv(t: Affine): Affine {
  const det = t[0] * t[4] - t[1] * t[3];
  return [
    t[4] / det,
    -t[1] / det,
    (t[1] * t[5] - t[2] * t[4]) / det,
    -t[3] / det,
    t[0] / det,
    (t[2] * t[3] - t[0] * t[5]) / det,
  ];
}

export function apply(t: Affine, p: Vec): Vec {
  return { x: t[0] * p.x + t[1] * p.y + t[2], y: t[3] * p.x + t[4] * p.y + t[5] };
}

export function rotation(angle: number): Affine {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [c, -s, 0, s, c, 0];
}

export function translation(tx: number, ty: number): Affine {
  return [1, 0, tx, 0, 1, ty];
}

export function scaling(k: number): Affine {
  return [k, 0, 0, 0, k, 0];
}

export function rotateAbout(p: Vec, angle: number): Affine {
  return mul(translation(p.x, p.y), mul(rotation(angle), translation(-p.x, -p.y)));
}

/** Transform mapping the unit interval (0,0)->(1,0) onto the segment p->q (with a flip in y). */
export function matchSeg(p: Vec, q: Vec): Affine {
  return [q.x - p.x, p.y - q.y, p.x, q.y - p.y, q.x - p.x, p.y];
}

/** Transform mapping segment p1->q1 onto segment p2->q2. */
export function matchTwo(p1: Vec, q1: Vec, p2: Vec, q2: Vec): Affine {
  return mul(matchSeg(p2, q2), inv(matchSeg(p1, q1)));
}

/** Intersection of the (infinite) lines through p1->q1 and p2->q2. */
export function intersect(p1: Vec, q1: Vec, p2: Vec, q2: Vec): Vec {
  const d = (q2.y - p2.y) * (q1.x - p1.x) - (q2.x - p2.x) * (q1.y - p1.y);
  const ua =
    ((q2.x - p2.x) * (p1.y - p2.y) - (q2.y - p2.y) * (p1.x - p2.x)) / d;
  return { x: p1.x + ua * (q1.x - p1.x), y: p1.y + ua * (q1.y - p1.y) };
}

/** Signed area of a polygon; positive for counter-clockwise winding. */
export function signedArea(points: readonly Vec[]): number {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i]!;
    const b = points[(i + 1) % points.length]!;
    sum += a.x * b.y - b.x * a.y;
  }
  return sum / 2;
}

export function area(points: readonly Vec[]): number {
  return Math.abs(signedArea(points));
}

export function centroid(points: readonly Vec[]): Vec {
  let x = 0;
  let y = 0;
  for (const p of points) {
    x += p.x;
    y += p.y;
  }
  return { x: x / points.length, y: y / points.length };
}

export interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export function bounds(points: readonly Vec[]): Bounds {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  return { minX, minY, maxX, maxY };
}

export const PHI = (1 + Math.sqrt(5)) / 2;

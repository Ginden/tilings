import type { Affine, Vec } from '../geometry.js';
import { apply, mul, sub } from '../geometry.js';

/**
 * A labelled triangle used by the Robinson-triangle (Penrose) and pinwheel
 * substitutions. The vertex order is meaningful: `a` is the apex, and the
 * substitution rules are expressed in terms of that labelling.
 */
export interface Tri {
  readonly kind: number;
  readonly a: Vec;
  readonly b: Vec;
  readonly c: Vec;
}

export type TriRule = (t: Tri) => Tri[];
export type TriFilter = (t: Tri) => boolean;

/** Apply a triangle substitution rule `levels` times. */
export function subdivideTriangles(
  seed: readonly Tri[],
  rule: TriRule,
  levels: number,
  keep?: TriFilter,
): Tri[] {
  let current: Tri[] = [...seed];
  for (let i = 0; i < levels; i++) {
    const next: Tri[] = [];
    for (const t of current) {
      for (const child of rule(t)) {
        if (!keep || keep(child)) next.push(child);
      }
    }
    current = next;
  }
  return current;
}

/** A shape placed by an affine transform; used by the transform based substitutions. */
export interface Placed {
  readonly kind: number;
  readonly transform: Affine;
}

export type PlacedRule = (p: Placed) => Placed[];
export type PlacedFilter = (p: Placed) => boolean;

export function subdivideShapes(
  seed: readonly Placed[],
  rule: PlacedRule,
  levels: number,
  keep?: PlacedFilter,
): Placed[] {
  let current: Placed[] = [...seed];
  for (let i = 0; i < levels; i++) {
    const next: Placed[] = [];
    for (const s of current) {
      for (const child of rule(s)) {
        if (!keep || keep(child)) next.push(child);
      }
    }
    current = next;
  }
  return current;
}

export function placedPolygon(p: Placed, base: readonly Vec[]): Vec[] {
  return base.map((v) => apply(p.transform, v));
}

export function composeChild(parent: Placed, kind: number, local: Affine): Placed {
  return { kind, transform: mul(parent.transform, local) };
}

/**
 * Which triangle edge is the mirror axis that glues two half-tiles into a full
 * tile: `base` is the edge b-c (Penrose P3 rhombs), `axis` the edge a-c
 * (Penrose P2 kites and darts).
 */
export type GlueEdge = 'base' | 'axis';

interface Keyed {
  tri: Tri;
  key: string;
  edge: [Vec, Vec];
  other: Vec;
}

const QUANTUM = 1e-4;

function edgeKey(kind: number, p: Vec, q: Vec): string {
  const mx = Math.round(((p.x + q.x) / 2 / QUANTUM)) ;
  const my = Math.round(((p.y + q.y) / 2 / QUANTUM));
  return `${kind}:${mx}:${my}`;
}

function isMirror(edgeA: Vec, edgeB: Vec, p: Vec, q: Vec): boolean {
  // p and q are mirror images across the line edgeA->edgeB.
  const dx = edgeB.x - edgeA.x;
  const dy = edgeB.y - edgeA.y;
  const l2 = dx * dx + dy * dy;
  const rp = sub(p, edgeA);
  const t = (rp.x * dx + rp.y * dy) / l2;
  const mirrored = {
    x: edgeA.x + 2 * t * dx - rp.x,
    y: edgeA.y + 2 * t * dy - rp.y,
  };
  const tol = Math.sqrt(l2) * 1e-6;
  return Math.hypot(mirrored.x - q.x, mirrored.y - q.y) < tol;
}

/**
 * Glue mirror-image pairs of half-tiles into full tiles (rhombs for P3, kites
 * and darts for P2). Half-tiles with no partner (patch boundary) are dropped.
 */
export function mergeHalfTiles(tris: readonly Tri[], glue: GlueEdge): { kind: number; points: Vec[] }[] {
  const buckets = new Map<string, Keyed[]>();
  const push = (k: Keyed): void => {
    const list = buckets.get(k.key);
    if (list) list.push(k);
    else buckets.set(k.key, [k]);
  };

  for (const tri of tris) {
    if (glue === 'base') {
      push({ tri, key: edgeKey(tri.kind, tri.b, tri.c), edge: [tri.b, tri.c], other: tri.a });
    } else {
      push({ tri, key: edgeKey(tri.kind, tri.a, tri.c), edge: [tri.a, tri.c], other: tri.b });
    }
  }

  const used = new Set<Tri>();
  const out: { kind: number; points: Vec[] }[] = [];
  for (const list of buckets.values()) {
    if (list.length < 2) continue;
    for (let i = 0; i < list.length; i++) {
      const x = list[i]!;
      if (used.has(x.tri)) continue;
      for (let j = i + 1; j < list.length; j++) {
        const y = list[j]!;
        if (used.has(y.tri)) continue;
        if (!isMirror(x.edge[0], x.edge[1], x.other, y.other)) continue;
        used.add(x.tri);
        used.add(y.tri);
        out.push({
          kind: x.tri.kind,
          points: [x.other, x.edge[0], y.other, x.edge[1]],
        });
        break;
      }
    }
  }
  return out;
}

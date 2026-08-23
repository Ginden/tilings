// The subdivision coordinates are adapted from James Adam Buckland's
// Apache-2.0 plotz_rs implementation (2023) and substantially modified for
// typed state tracking, disc coverage, rendering, and verification here.
// See THIRD-PARTY-LICENSES.md and licenses/Apache-2.0.txt.
import { area, intersectsCenteredSquare, lerp, signedArea } from '../geometry.js';
import type { Vec } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';

const STEP = Math.PI / 7;

/** The three edge lengths in the original Nischke--Danzer sevenfold rule. */
export const DANZER_EDGE_LENGTHS = [Math.sin(STEP), Math.sin(2 * STEP), Math.sin(3 * STEP)] as const;

const [A, B, C] = DANZER_EDGE_LENGTHS;
const A_B = A + B;
const B_C = B + C;
const A_B_C = A + B + C;
const B_C_C = B + 2 * C;

/** Inflation factor of the archived rule, 1 + sin(2 pi/7) / sin(pi/7). */
export const DANZER_INFLATION = 1 + B / A;

/**
 * Rows are parent T0, T1, T2; columns are child T0, T1, T2.  The ordering is
 * the one in the arrowed rule diagram archived by the Tilings Encyclopedia.
 */
export const DANZER_SUBSTITUTION_COUNTS = [
  [3, 1, 2],
  [3, 4, 1],
  [5, 3, 3],
] as const;

export type DanzerShape = 0 | 1 | 2;
export type DanzerHand = 0 | 1;

/**
 * An arrowed prototile state.  The ordered vertices carry the arrows from the
 * archival diagram: reflection reverses the order (`hand`) and rotation is in
 * one of the fourteen directions.  Together these are the finite D14 state
 * needed to reconstruct and compare vertex stars.
 */
export interface DanzerTriangle extends Tile {
  readonly shape: DanzerShape;
  readonly hand: DanzerHand;
  readonly rotation: number;
  /** Canonical incident-corner signatures at the three vertices. */
  readonly vertexStars: readonly [string, string, string];
  readonly points: readonly [Vec, Vec, Vec];
}

interface OrientedTriangle {
  readonly shape: DanzerShape;
  readonly points: readonly [Vec, Vec, Vec];
}

function phase(points: readonly [Vec, Vec, Vec]): number {
  const angle = Math.atan2(points[1].y - points[0].y, points[1].x - points[0].x);
  return ((Math.round(angle / STEP) % 14) + 14) % 14;
}

type DanzerTileState = Omit<DanzerTriangle, 'vertexStars'>;

function decorate(tile: OrientedTriangle): DanzerTileState {
  return {
    kind: tile.shape,
    shape: tile.shape,
    hand: signedArea(tile.points) >= 0 ? 0 : 1,
    rotation: phase(tile.points),
    points: tile.points,
  };
}

function vertexKey(point: Vec): string {
  return `${Math.round(point.x * 1e7)},${Math.round(point.y * 1e7)}`;
}

/** Attach the vertex-star matching state induced by all incident arrowed corners. */
function attachVertexStars(tiles: readonly OrientedTriangle[]): DanzerTriangle[] {
  const states = tiles.map(decorate);
  const vertices = new Map<string, { point: Vec; incidents: string[] }>();
  for (const tile of states) {
    for (let corner = 0; corner < 3; corner++) {
      const point = tile.points[corner]!;
      const key = vertexKey(point);
      const incident = `${tile.shape}:${tile.hand}:${tile.rotation}:${corner}`;
      const vertex = vertices.get(key);
      if (vertex) vertex.incidents.push(incident);
      else vertices.set(key, { point, incidents: [incident] });
    }
  }

  // The original rule is not face-to-face at every star: a corner can meet the
  // interior of another prototile edge.  Index the short natural-scale edges
  // spatially so those straight-angle incidences are part of the matching state.
  const cellSize = C * 1.01;
  const edgeCells = new Map<string, { tile: number; edge: number; a: Vec; b: Vec }[]>();
  const cellKey = (x: number, y: number): string => `${x},${y}`;
  for (let tile = 0; tile < states.length; tile++) {
    const state = states[tile]!;
    for (let edge = 0; edge < 3; edge++) {
      const a = state.points[edge]!;
      const b = state.points[(edge + 1) % 3]!;
      const minX = Math.floor(Math.min(a.x, b.x) / cellSize);
      const maxX = Math.floor(Math.max(a.x, b.x) / cellSize);
      const minY = Math.floor(Math.min(a.y, b.y) / cellSize);
      const maxY = Math.floor(Math.max(a.y, b.y) / cellSize);
      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          const key = cellKey(x, y);
          const list = edgeCells.get(key);
          const item = { tile, edge, a, b };
          if (list) list.push(item);
          else edgeCells.set(key, [item]);
        }
      }
    }
  }

  for (const vertex of vertices.values()) {
    const x = Math.floor(vertex.point.x / cellSize);
    const y = Math.floor(vertex.point.y / cellSize);
    const candidates = edgeCells.get(cellKey(x, y)) ?? [];
    for (const candidate of candidates) {
      const ab = { x: candidate.b.x - candidate.a.x, y: candidate.b.y - candidate.a.y };
      const ap = { x: vertex.point.x - candidate.a.x, y: vertex.point.y - candidate.a.y };
      const lengthSquared = ab.x * ab.x + ab.y * ab.y;
      const along = ap.x * ab.x + ap.y * ab.y;
      const cross = ap.x * ab.y - ap.y * ab.x;
      if (along <= 1e-8 || along >= lengthSquared - 1e-8 || Math.abs(cross) > 1e-8) continue;
      const state = states[candidate.tile]!;
      vertex.incidents.push(`${state.shape}:${state.hand}:${state.rotation}:e${candidate.edge}`);
    }
  }

  const stars = new Map(
    [...vertices].map(([key, vertex]) => [key, [...new Set(vertex.incidents)].sort().join('|')]),
  );
  return states.map((tile) => ({
    ...tile,
    vertexStars: tile.points.map((point) => stars.get(vertexKey(point))!) as unknown as readonly [
      string,
      string,
      string,
    ],
  }));
}

/**
 * Deflate one arrowed prototile according to the original Nischke--Danzer
 * sevenfold diagram.  Vertex order is significant and makes the same formula
 * work for every rotation and for the reflected rule.
 *
 * The sine-section coordinate transcription follows James Adam Buckland's
 * Apache-2.0 `plotz_rs` implementation (2023), itself explicitly based on the
 * archived original rule.  No diagram or other graphic asset is bundled.
 *
 * @see https://tilings.math.uni-bielefeld.de/substitution/danzers-7-fold-original/
 * @see https://github.com/ambuc/plotz_rs/blob/main/art/tilings/src/danzers.rs
 */
export function subdivideDanzer(tile: OrientedTriangle): OrientedTriangle[] {
  const p = tile.points;

  if (tile.shape === 0) {
    const a = p[2];
    const f = p[1];
    const h = p[0];
    const b = lerp(a, h, C / B_C_C);
    const d = lerp(a, h, B_C / B_C_C);
    const c = lerp(a, f, C / A_B_C);
    const e = lerp(a, f, B_C / A_B_C);
    const g = lerp(f, h, B / A_B);

    return [
      { shape: 1, points: [b, c, a] },
      { shape: 0, points: [c, b, d] },
      { shape: 2, points: [c, e, d] },
      { shape: 0, points: [f, e, d] },
      { shape: 2, points: [d, g, f] },
      { shape: 0, points: [h, g, d] },
    ];
  }

  if (tile.shape === 1) {
    const a = p[0];
    const h = p[1];
    const d = p[2];
    const b = lerp(a, d, C / B_C_C);
    const c = lerp(a, d, B_C / B_C_C);
    const g = lerp(a, h, A / A_B);
    const i = lerp(h, d, C / B_C_C);
    const e = lerp(h, i, B_C / C);
    const f = lerp(g, e, B / B_C);

    return [
      { shape: 1, points: [f, b, a] },
      { shape: 0, points: [a, g, f] },
      { shape: 2, points: [h, g, f] },
      { shape: 1, points: [i, f, h] },
      { shape: 0, points: [f, i, e] },
      { shape: 0, points: [f, b, c] },
      { shape: 1, points: [c, e, f] },
      { shape: 1, points: [c, e, d] },
    ];
  }

  const e = p[0];
  const k = p[1];
  const a = p[2];
  const i = lerp(e, k, C / A_B_C);
  const j = lerp(e, k, B_C / A_B_C);
  const c = lerp(k, a, B_C / A_B_C);
  const h = lerp(k, a, C / A_B_C);
  const g = lerp(e, h, B_C / A_B_C);
  const f = lerp(e, h, C / A_B_C);
  const b = lerp(e, a, B_C / B_C_C);
  const d = lerp(e, a, C / B_C_C);

  return [
    { shape: 1, points: [d, f, e] },
    { shape: 0, points: [f, d, b] },
    { shape: 2, points: [b, g, f] },
    { shape: 0, points: [h, g, b] },
    { shape: 2, points: [b, c, h] },
    { shape: 0, points: [a, c, b] },
    { shape: 1, points: [f, i, e] },
    { shape: 0, points: [i, f, g] },
    { shape: 2, points: [g, j, i] },
    { shape: 0, points: [k, j, g] },
    { shape: 1, points: [g, h, k] },
  ];
}

function canonicalAcuteTriangle(): OrientedTriangle {
  const height = Math.sqrt(C * C - (A * A) / 4);
  return { shape: 1, points: [{ x: 0, y: 0 }, { x: A, y: 0 }, { x: A / 2, y: height }] };
}

function scaleAboutIncentre(tile: OrientedTriangle, factor: number): OrientedTriangle {
  const [p0, p1, p2] = tile.points;
  // T1 has opposite side lengths C, C, A at p0, p1, p2.
  const weight = 2 * C + A;
  const centre = {
    x: (C * p0.x + C * p1.x + A * p2.x) / weight,
    y: (C * p0.y + C * p1.y + A * p2.y) / weight,
  };
  const points = tile.points.map((point) => ({
    x: (point.x - centre.x) * factor,
    y: (point.y - centre.y) * factor,
  })) as unknown as readonly [Vec, Vec, Vec];
  return { shape: tile.shape, points };
}

/** Generate a genuine substitution patch whose parent contains the requested disc. */
function generateDanzerPatch(radius: number): OrientedTriangle[] {
  const seed = canonicalAcuteTriangle();
  const inradius = (2 * area(seed.points)) / (A + 2 * C);
  const levels = Math.max(1, Math.ceil(Math.log((radius + C) / inradius) / Math.log(DANZER_INFLATION)));
  let tiles: OrientedTriangle[] = [scaleAboutIncentre(seed, DANZER_INFLATION ** levels)];
  // Children never leave their parent triangle, so branches outside this
  // generous drawing bound cannot contribute to the requested patch. Keeping
  // two natural edge lengths of margin also preserves complete boundary stars.
  const clipLimit = radius + 2 * C;

  for (let level = 0; level < levels; level++) {
    const next: OrientedTriangle[] = [];
    for (const tile of tiles) {
      for (const child of subdivideDanzer(tile)) {
        if (intersectsCenteredSquare(child.points, clipLimit)) next.push(child);
      }
    }
    tiles = next;
  }
  return tiles;
}

/** Generate the complete arrow and vertex-star state used by geometry verification. */
export function generateDanzerSevenfold(radius: number): DanzerTriangle[] {
  return attachVertexStars(generateDanzerPatch(radius));
}

/** The production drawing needs only the shape class and triangle geometry. */
function generateDanzerTiles(radius: number): Tile[] {
  return generateDanzerPatch(radius).map((tile) => ({ kind: tile.shape, points: tile.points }));
}

const MEAN_PROTOTILE_AREA =
  (A * B * Math.sin(4 * STEP) + A * C * Math.sin(3 * STEP) + B * B * Math.sin(3 * STEP)) / 6;

export const danzerSevenfold: TilingDefinition = {
  id: 'danzer-sevenfold',
  name: 'Danzer sevenfold triangles',
  family: 'experimental',
  description:
    'The original sevenfold member of the Nischke–Danzer n-fold inflation family. Its scalene T0 and isosceles T1/T2 prototiles use the edge module sin(kπ/7); ordered vertices preserve the reflected arrow states of the archival rule. The inflation 1 + sin(2π/7)/sin(π/7) is non-Pisot.',
  kinds: 3,
  kindLabels: ['T0 scalene', 'T1 acute isosceles', 'T2 isosceles'],
  supportsThreeColours: true,
  reference: 'https://tilings.math.uni-bielefeld.de/substitution/danzers-7-fold-original/',
  referenceLabel: 'Danzer’s 7-fold original — Tilings Encyclopedia (arrowed rule and patch)',
  furtherReferences: [
    {
      label: 'Nischke & Danzer (1996), A Construction of Inflation Rules Based on n-Fold Symmetry',
      url: 'https://doi.org/10.1007/BF02717732',
    },
    {
      label: 'Buckland (2023), plotz_rs Danzer coordinate transcription (Apache-2.0)',
      url: 'https://github.com/ambuc/plotz_rs/blob/main/art/tilings/src/danzers.rs',
    },
  ],
  unitTileArea: MEAN_PROTOTILE_AREA,
  generate: generateDanzerTiles,
};

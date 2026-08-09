import type { Vec } from '../geometry.js';
import { multigrid } from './multigrid.js';
import type { Tile, TilingDefinition } from './types.js';

const SEVEN = 7;
const STEP = Math.PI / SEVEN;

/** sin(k pi / 7), the metric module used by the Nischke--Danzer rule. */
export const DANZER_SINES = [
  Math.sin(Math.PI / SEVEN),
  Math.sin((2 * Math.PI) / SEVEN),
  Math.sin((3 * Math.PI) / SEVEN),
] as const;

/**
 * Inflation from the rule reproduced by the Tilings Encyclopedia.  Since
 * sin(2 pi/7) / sin(pi/7) = 2 cos(pi/7), this is the first sevenfold member
 * of the Nischke--Danzer n-fold family.
 */
export const DANZER_INFLATION = 1 + DANZER_SINES[1] / DANZER_SINES[0];

/**
 * Child counts for the pi/7, 3pi/7 and 5pi/7 triangles, respectively.
 * Rows are inflated parents and columns are children.  This is transcribed
 * from the three supertriangles in the archival rule diagram; the diagram is
 * a reference only and is not bundled or redrawn by this project.
 *
 * @see https://tilings.math.uni-bielefeld.de/substitution/danzers-7-fold/
 */
export const DANZER_SUBSTITUTION_COUNTS = [
  [2, 1, 2],
  [1, 5, 3],
  [2, 3, 3],
] as const;

export type DanzerShape = 0 | 1 | 2;
export type DanzerHand = 0 | 1;

/** A triangle together with the finite orientation state used at its vertices. */
export interface DanzerTriangle extends Tile {
  readonly shape: DanzerShape;
  readonly hand: DanzerHand;
  /** Direction of the apex ray in the fourteen-direction vertex-star atlas. */
  readonly star: number;
}

function offsets(): number[] {
  const raw = Array.from({ length: SEVEN }, (_, i) => (((i + 1) * Math.SQRT2 * 0.37) % 1));
  const mean = raw.reduce((sum, value) => sum + value, 0) / raw.length;
  return raw.map((value) => value - mean);
}

const DANZER_OFFSETS = offsets();

function starPhase(apex: Vec, left: Vec, right: Vec): number {
  const base = { x: (left.x + right.x) / 2, y: (left.y + right.y) / 2 };
  const angle = Math.atan2(apex.y - base.y, apex.x - base.x);
  return ((Math.round(angle / STEP) % 14) + 14) % 14;
}

function triangle(shape: DanzerShape, hand: DanzerHand, apex: Vec, left: Vec, right: Vec): DanzerTriangle {
  return {
    kind: shape,
    shape,
    hand,
    star: starPhase(apex, left, right),
    points: [apex, left, right],
  };
}

/**
 * Construct the triangular carrier of the sevenfold rule.  Nischke and
 * Danzer formulate their family in generalized Robinson (half-rhomb)
 * triangles.  Splitting every seven-grid rhomb on the parity-selected
 * diagonal produces precisely the three apex angles pi/7, 3pi/7 and 5pi/7;
 * keeping both halves records handedness instead of erasing the local state.
 */
export function generateDanzerSevenfold(radius: number): DanzerTriangle[] {
  const rhombs = multigrid(SEVEN, DANZER_OFFSETS, radius);
  const triangles: DanzerTriangle[] = [];

  for (const rhomb of rhombs) {
    const [a, b, c, d] = rhomb.points as readonly [Vec, Vec, Vec, Vec];
    if (rhomb.kind === 0) {
      // pi/7: the rhomb's acute vertices are the two triangle apices.
      triangles.push(triangle(0, 0, a, b, d), triangle(0, 1, c, d, b));
    } else if (rhomb.kind === 2) {
      // 3pi/7: again split between the obtuse vertices.
      triangles.push(triangle(1, 0, a, b, d), triangle(1, 1, c, d, b));
    } else {
      // 5pi/7: split between the acute vertices, leaving obtuse apices.
      triangles.push(triangle(2, 0, b, c, a), triangle(2, 1, d, a, c));
    }
  }
  return triangles;
}

const MEAN_TRIANGLE_AREA = (DANZER_SINES[0] + DANZER_SINES[1] + DANZER_SINES[2]) / 6;

export const danzerSevenfold: TilingDefinition = {
  id: 'danzer-sevenfold',
  name: 'Danzer sevenfold triangles',
  family: 'experimental',
  description:
    'The sevenfold member of the Nischke–Danzer n-fold inflation family: three generalized Robinson triangles with apex angles π/7, 3π/7 and 5π/7, retaining handedness and fourteen-direction vertex-star states. The non-Pisot factor 1 + sin(2π/7)/sin(π/7) and family construction are from K.-P. Nischke and Ludwig Danzer, “A Construction of Inflation Rules Based on n-Fold Symmetry” (Discrete & Computational Geometry 15, 1996, pp. 221–236); the explicit three-triangle rule is archived by the Bielefeld Tilings Encyclopedia.',
  kinds: 3,
  kindLabels: ['π/7 triangle', '3π/7 triangle', '5π/7 triangle'],
  supportsThreeColours: true,
  reference: 'https://tilings.math.uni-bielefeld.de/substitution/danzers-7-fold/',
  referenceLabel: 'Danzer’s 7-fold — Tilings Encyclopedia (rule and metric data)',
  furtherReferences: [
    {
      label: 'Nischke & Danzer (1996), A Construction of Inflation Rules Based on n-Fold Symmetry',
      url: 'https://doi.org/10.1007/BF02717732',
    },
    {
      label: 'Nischke & Danzer (1996) — DBLP publication record',
      url: 'https://dblp.org/rec/journals/dcg/NischkeD96',
    },
  ],
  unitTileArea: MEAN_TRIANGLE_AREA,
  generate: generateDanzerSevenfold,
};

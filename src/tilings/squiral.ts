import type { Affine, Vec } from '../geometry.js';
import { IDENTITY, apply, mul, rotation, scaling, translation } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';
import type { Placed } from './substitution.js';

/**
 * The squiral tiling of Baake and Grimm.
 *
 * The prototile is the rep-9 "squiral" (square + spiral) of Grünbaum and
 * Shephard, *Tilings and Patterns*, Fig. 10.1.4: a tile with infinitely many
 * straight edges, occurring in two chiralities. Baake and Grimm, *Squirals and
 * beyond: substitution tilings with singular continuous spectrum*
 * (arXiv:1205.1384; Ergodic Theory Dynam. Systems 34 (2014) 1077–1102) use it as
 * the first genuinely planar example of singular continuous diffraction; the
 * coordinates below are read off their inflation rule, Eq. (1) of that paper.
 *
 * Units here are chosen so that one tile has area 1, which makes the tile the
 * decoration of one square of the unit lattice that the paper's Section 2
 * describes. In those units the tile is the closure of the nested chain of
 * rectangles
 *
 *     R_0 = [-1, 1/3] x [-1, -1/3],   R_{k+1} = f(R_k),
 *
 * where f is the similarity that turns a quarter turn anticlockwise about the
 * origin and shrinks by 3. The R_k meet edge to edge and wind into the origin,
 * the "spiralling vertex". The spiral converges geometrically, so the tile is a
 * bounded region of area exactly 1 with a boundary of infinitely many edges.
 *
 * Inflation (Eq. (1) of the paper, in the tile's own frame, so the nine children
 * dissect the tile itself rather than its 3-fold enlargement):
 *
 *   * one child of the same chirality is f applied to the whole tile — the tail
 *     of the spiral reproduces the tile a third of the size, rotated a quarter
 *     turn about the spiralling vertex;
 *   * the base rectangle R_0 is two squares of side 2/3. The right-hand one holds
 *     four children of the parent's chirality and the left-hand one their mirror
 *     images, each square being one "rosette": four tiles of a single chirality
 *     winding into the square's centre in the four quarter-turn orientations.
 *
 * That gives the inflation matrix M = ((5, 4), (4, 5)) of Section 2 of the paper,
 * with Perron eigenvalue 9 = 3^2 and eigenvector (1, 1): both chiralities cover
 * the same area and occur with the same frequency. The rosettes are why "the
 * special (spiralling) vertex always falls on the centre of a square that is
 * formed by 4 squirals of the same chirality".
 *
 * Those rosettes are the paper's square lattice. Every tile belongs to exactly
 * one rosette; the rosettes are squares of side 2 on an aligned grid, each of a
 * single chirality, and each holding the four quarter-turn orientations of that
 * chirality. Inflating a rosette gives nine rosettes in a 3 x 3 block, of which
 * the four corners take the opposite chirality — which is precisely the bijective
 * block substitution of Eq. (5) of the paper, the presentation whose hull is MLD
 * to the squiral hull. `subdivideSquiral` and `squiralBlockStep` below are the
 * two rules, and the tests check that one induces the other. Patches are
 * generated from the block rule, which needs no hierarchy of transforms, and
 * drawn with the geometric carrier.
 *
 * The two symbol classes are the two chiralities, and they are what the spectral
 * results are about. The distinction to keep in mind is between the two spectra:
 * with the balanced weights 1 and -1 of equal frequency the *diffraction* measure
 * of the block system is purely singular continuous — a two-dimensional Riesz
 * product, the planar analogue of Thue–Morse, with no Bragg peak beyond the
 * trivial one — while the *dynamical* spectrum of the same system is of mixed
 * type, with a pure point part (from the underlying scale-3 lattice hierarchy)
 * as well as a singular continuous part (Baake & Grimm, Thm. 1 and Thm. 2).
 * Unbalanced weights would restore a pure point component in the diffraction, so
 * the balance of the two classes is not cosmetic. See also their conference
 * account *Squiral diffraction* (arXiv:1211.5471).
 */

/** Anticlockwise quarter turn about the spiralling vertex, shrinking by 3. */
const SPIRAL: Affine = [0, -1 / 3, 0, 1 / 3, 0, 0];

/**
 * How many rectangles of the spiral are drawn. The chain shrinks by 3 each step,
 * so the omitted tail is below 3^-6 of the tile: far under one pixel at any tile
 * size the renderer uses. The paper's own figures truncate after six rectangles.
 */
export const SQUIRAL_SPIRAL_DEPTH = 6;

/**
 * The outline of the base tile, anticlockwise. The two spiral arms of the
 * boundary both start at the outer corner (-1, -1) of R_0 and are orbits of the
 * spiral similarity; they are joined at the spiralling vertex once the chain is
 * cut off.
 */
export function squiralOutline(depth: number = SQUIRAL_SPIRAL_DEPTH): Vec[] {
  const arm = (start: Vec): Vec[] => {
    const points = [start];
    for (let i = 0; i < depth; i++) points.push(apply(SPIRAL, points[points.length - 1]!));
    return points;
  };
  return [
    { x: -1, y: -1 },
    ...arm({ x: 1 / 3, y: -1 }),
    { x: 0, y: 0 },
    ...arm({ x: -1, y: -1 / 3 }).reverse(),
  ];
}

export const SQUIRAL_OUTLINE: readonly Vec[] = squiralOutline();

/** The four quarter-turn orientations a rosette holds. */
const QUARTER_TURNS: readonly Affine[] = [0, 1, 2, 3].map((k) => rotation((k * Math.PI) / 2));

/** Those four orientations as children, a third of the size. */
const ROSETTE: readonly Affine[] = QUARTER_TURNS.map((t) => mul(t, scaling(1 / 3)));

/** Reflection in the y axis, which swaps the two chiralities. */
const MIRROR: Affine = [-1, 0, 0, 0, 1, 0];

const CHILDREN: readonly { flip: boolean; transform: Affine }[] = [
  { flip: false, transform: mul(rotation(Math.PI / 2), scaling(1 / 3)) },
  ...ROSETTE.map((t) => ({ flip: false, transform: mul(translation(0, -2 / 3), t) })),
  ...ROSETTE.map((t) => ({
    flip: true,
    transform: mul(translation(-2 / 3, -2 / 3), mul(MIRROR, t)),
  })),
];

export function subdivideSquiral(p: Placed): Placed[] {
  return CHILDREN.map((child) => ({
    kind: child.flip ? 1 - p.kind : p.kind,
    transform: mul(p.transform, child.transform),
  }));
}

/**
 * The two-symbol presentation, Eq. (5) of arXiv:1205.1384: the block
 * substitution of constant length 3 that replaces a symbol by a 3x3 block
 * carrying the opposite symbol wherever both offsets are even, and the symbol
 * itself otherwise,
 *
 *     (rho v)_{3m+r, 3n+s} = 1 - v_{m,n}   if r = s = 0 (mod 2),
 *                            v_{m,n}       otherwise.
 *
 * Every cell is either the identity or the swap, so the rule is bijective in the
 * sense of Frank's classification; that is exactly the property that rules out a
 * modular coincidence and so rules out the pure point (model set) case. It is
 * primitive with the same inflation matrix ((5, 4), (4, 5)) as the geometric
 * inflation above, which is the arithmetic half of the paper's statement that
 * the block substitution hull is MLD to the squiral hull. The two presentations
 * are not the same map on the plane — the derivation of one from the other is a
 * local rule, not the identity — so the patches this file renders come from the
 * geometric inflation, and this is the symbolic system the diffraction theorem
 * is stated for.
 */
export function squiralBlockFlips(r: number, s: number): boolean {
  return r % 2 === 0 && s % 2 === 0;
}

/** One step of the block substitution, mapping an n x n array to a 3n x 3n one. */
export function squiralBlockStep(grid: readonly (readonly number[])[]): number[][] {
  const n = grid.length;
  const out: number[][] = Array.from({ length: 3 * n }, () => new Array<number>(3 * n).fill(0));
  for (let m = 0; m < n; m++) {
    for (let k = 0; k < n; k++) {
      const v = grid[m]![k]!;
      for (let r = 0; r < 3; r++) {
        for (let s = 0; s < 3; s++) {
          out[3 * m + r]![3 * k + s] = squiralBlockFlips(r, s) ? 1 - v : v;
        }
      }
    }
  }
  return out;
}

/**
 * The symbol at (m, n) of `levels` applications of the block substitution to a
 * single symbol 0: one swap per base-3 digit position, of the `levels` lowest,
 * where both digits are even. The offset 0 is itself even, so a leading zero
 * still swaps and the substitution of one symbol is a 2-cycle rather than a
 * fixed point — the paper starts instead from the legal seed 1 0 / 0 1 about the
 * origin. This closed form is what turns the autocorrelation into the Riesz
 * product of the paper's Section 5.
 */
export function squiralSymbol(m: number, n: number, levels: number): number {
  let symbol = 0;
  let a = m;
  let b = n;
  for (let i = 0; i < levels; i++) {
    if (squiralBlockFlips(a % 3, b % 3)) symbol = 1 - symbol;
    a = Math.floor(a / 3);
    b = Math.floor(b / 3);
  }
  return symbol;
}

/** Every point of a tile is within this distance of its spiralling vertex. */
const TILE_REACH = Math.SQRT2;

/**
 * The four tiles of the rosette at `centre`: one chirality, all four quarter
 * turns. A rosette of symbol 1 is the mirror image of a rosette of symbol 0.
 */
function rosetteTiles(symbol: number, centre: Vec): Tile[] {
  const place = mul(translation(centre.x, centre.y), symbol === 0 ? IDENTITY : MIRROR);
  return QUARTER_TURNS.map((turn) => {
    const transform = mul(place, turn);
    return { kind: symbol, points: SQUIRAL_OUTLINE.map((v) => apply(transform, v)) };
  });
}

export function generateSquiral(radius: number): Tile[] {
  // A rosette is a square of side 2, so `levels` steps of the block substitution
  // from one symbol cover the square of side 2*3^levels centred on the origin.
  const levels = Math.max(1, Math.ceil(Math.log(Math.max(radius, 1)) / Math.log(3)));
  const cells = 3 ** levels;
  const middle = (cells - 1) / 2;
  const tiles: Tile[] = [];
  for (let m = 0; m < cells; m++) {
    for (let n = 0; n < cells; n++) {
      const centre = { x: 2 * (m - middle), y: 2 * (n - middle) };
      if (Math.hypot(centre.x, centre.y) > radius + TILE_REACH) continue;
      for (const tile of rosetteTiles(squiralSymbol(m, n, levels), centre)) tiles.push(tile);
    }
  }
  return tiles;
}

export const squiral: TilingDefinition = {
  id: 'squiral',
  name: 'Squiral',
  family: 'experimental',
  description:
    'Baake and Grimm’s squiral is a rep-9 tile with infinitely many edges that winds into a spiralling vertex. It comes in two chiralities. Inflation by 3 divides each tile into five copies of its own chirality and four of the other.\n\nIn the equivalent weighted 3×3 block substitution, its diffraction is purely singular continuous: a planar analogue of Thue–Morse. Its dynamical spectrum is mixed, with both pure-point and singular-continuous parts.',
  kinds: 2,
  kindLabels: ['left-handed squiral', 'right-handed squiral'],
  reference: 'https://arxiv.org/abs/1205.1384',
  referenceLabel: 'Baake & Grimm, “Squirals and beyond” (2014)',
  furtherReferences: [
    {
      label: 'Baake & Grimm, “Squiral diffraction” (2012)',
      url: 'https://arxiv.org/abs/1211.5471',
    },
  ],
  unitTileArea: 1,
  generate(radius): Tile[] {
    return generateSquiral(radius);
  },
};

import type { Vec } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';

const SQRT_2 = Math.SQRT2;
const HALF_DIAGONAL = 1 / SQRT_2;
const STEP = Math.PI / 4;

/** The non-unit inflation; its algebraic norm 2 accounts for the Q_2 factor. */
export const WATANABE_ITO_SOMA_INFLATION = 2 + SQRT_2;

/**
 * Full tiles drawn in the two overlapping clusters (square, rhomb parents).
 * Boundary tiles occur in two neighbouring clusters and are deduplicated.
 */
export const WATANABE_ITO_SOMA_CLUSTER_COUNTS = [
  [8, 8],
  [6, 6],
] as const;

/** Area-weighted counts after the half-on-each-side boundary tiles are paired. */
export const WATANABE_ITO_SOMA_EFFECTIVE_COUNTS = [
  [6, 8],
  [4, 6],
] as const;

export type WatanabeItoSomaKind = 0 | 1;

/** A prototile placement; rotation is measured in eighth-turns. Rhombs retain
 * their directed acute-end state, so rotations separated by 180° differ. */
export interface WatanabeItoSomaTile extends Tile {
  readonly kind: WatanabeItoSomaKind;
  readonly rotation: number;
  readonly centre: Vec;
  readonly points: readonly [Vec, Vec, Vec, Vec];
}

interface Placement {
  readonly kind: WatanabeItoSomaKind;
  readonly x: number;
  readonly y: number;
  readonly rotation: number;
}

const HALF_INFLATION = WATANABE_ITO_SOMA_INFLATION / 2;
const CORNER = (1 + SQRT_2) / 2;
const RHOMB_MID = (1 + HALF_DIAGONAL) / 2;

/**
 * Exact coordinate transcription of the Tilings Encyclopedia's “Substitution
 * Rule” figure, `watanabe-ito-soma-8-fold/rule.gif`: this is the explicit
 * WSI95-resolved version, rather than one of the multiple rules admitted by
 * Watanabe--Ito--Soma's abbreviated 1986--87 description.
 *
 * This is a pseudo-substitution. Four square-cluster squares and four
 * rhomb-cluster squares straddle an inflated boundary; adjacent supertiles
 * generate the same full tile, which `subdivideWatanabeItoSoma` deduplicates.
 * No source graphic is bundled or rendered by the application.
 *
 * @see https://tilings.math.uni-bielefeld.de/substitution/watanabe-ito-soma-8-fold/
 */
const SQUARE_CLUSTER: readonly Placement[] = [
  ...([-CORNER, CORNER] as const).flatMap((x) =>
    ([-CORNER, CORNER] as const).map((y) => ({ kind: 0 as const, x, y, rotation: 0 })),
  ),
  { kind: 0, x: 0, y: -HALF_INFLATION, rotation: 1 },
  { kind: 0, x: HALF_INFLATION, y: 0, rotation: 1 },
  { kind: 0, x: 0, y: HALF_INFLATION, rotation: 1 },
  { kind: 0, x: -HALF_INFLATION, y: 0, rotation: 1 },
  ...Array.from({ length: 8 }, (_, rotation) => {
    const a = rotation * STEP;
    const b = (rotation + 1) * STEP;
    return {
      kind: 1 as const,
      x: (Math.cos(a) + Math.cos(b)) / 2,
      y: (Math.sin(a) + Math.sin(b)) / 2,
      rotation: rotation - 2,
    };
  }),
];

// The canonical parent rhomb has edge directions 90° and 135°. Its displayed
// cluster is centred at (0, HALF_INFLATION) in the rule figure's coordinates.
const RHOMB_CLUSTER: readonly Placement[] = [
  { kind: 0, x: 0, y: -HALF_INFLATION, rotation: 0 },
  { kind: 0, x: CORNER, y: 0.5 - HALF_INFLATION, rotation: 1 },
  { kind: 0, x: -HALF_DIAGONAL, y: 0, rotation: 0 },
  { kind: 0, x: 0.5, y: 0.5, rotation: 1 },
  { kind: 0, x: -CORNER, y: HALF_INFLATION - 0.5, rotation: 1 },
  { kind: 0, x: 0, y: HALF_INFLATION, rotation: 0 },
  { kind: 1, x: RHOMB_MID, y: -HALF_DIAGONAL / 2 - HALF_INFLATION, rotation: 0 },
  { kind: 1, x: -HALF_DIAGONAL / 2, y: RHOMB_MID - HALF_INFLATION, rotation: 1 },
  { kind: 1, x: 0.5 - HALF_DIAGONAL / 2, y: -HALF_DIAGONAL / 2, rotation: 0 },
  { kind: 1, x: RHOMB_MID, y: -HALF_DIAGONAL / 2, rotation: 3 },
  { kind: 1, x: -HALF_DIAGONAL / 2, y: RHOMB_MID, rotation: 2 },
  { kind: 1, x: -RHOMB_MID, y: HALF_INFLATION + HALF_DIAGONAL / 2, rotation: 0 },
];

function canonicalRotation(kind: WatanabeItoSomaKind, rotation: number): number {
  const period = kind === 0 ? 2 : 8;
  return ((rotation % period) + period) % period;
}

function coordinate(value: number): number {
  return Math.round(value * 1e8) / 1e8;
}

function placementKey(tile: Placement): string {
  return `${tile.kind}:${Math.round(tile.x * 1e8)}:${Math.round(tile.y * 1e8)}:${tile.rotation}`;
}

/** Inflate a legal patch once and merge the pseudo-substitution's shared tiles. */
export function subdivideWatanabeItoSoma(tiles: readonly Placement[]): Placement[] {
  const children = new Map<string, Placement>();
  for (const parent of tiles) {
    const angle = parent.rotation * STEP;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const cluster = parent.kind === 0 ? SQUARE_CLUSTER : RHOMB_CLUSTER;
    for (const child of cluster) {
      const tile: Placement = {
        kind: child.kind,
        x: coordinate(WATANABE_ITO_SOMA_INFLATION * parent.x + cos * child.x - sin * child.y),
        y: coordinate(WATANABE_ITO_SOMA_INFLATION * parent.y + sin * child.x + cos * child.y),
        rotation: canonicalRotation(child.kind, parent.rotation + child.rotation),
      };
      children.set(placementKey(tile), tile);
    }
  }
  return [...children.values()];
}

function polygon(tile: Placement): readonly [Vec, Vec, Vec, Vec] {
  const angle = tile.rotation * STEP;
  const uAngle = tile.kind === 0 ? angle : angle + Math.PI / 2;
  const vAngle = tile.kind === 0 ? angle + Math.PI / 2 : angle + (3 * Math.PI) / 4;
  const u = { x: Math.cos(uAngle), y: Math.sin(uAngle) };
  const v = { x: Math.cos(vAngle), y: Math.sin(vAngle) };
  const point = (uSign: number, vSign: number): Vec => ({
    x: tile.x + (uSign * u.x + vSign * v.x) / 2,
    y: tile.y + (uSign * u.y + vSign * v.y) / 2,
  });
  return [point(-1, -1), point(1, -1), point(1, 1), point(-1, 1)];
}

/** Generate the WSI patch centred on its canonical eightfold vertex star. */
export function generateWatanabeItoSomaEightfold(radius: number): WatanabeItoSomaTile[] {
  const levels = Math.max(
    1,
    Math.ceil(
      Math.log((radius + 1) / CORNER) / Math.log(WATANABE_ITO_SOMA_INFLATION),
    ),
  );
  // Eight acute rhomb corners form the legal D8 seed visible at the centre of
  // the archival patch. A lone square supertile has only a D4 outer boundary.
  let patch: Placement[] = SQUARE_CLUSTER.filter(
    (tile): tile is Placement => tile.kind === 1,
  ).map((tile) => ({ ...tile }));
  for (let level = 0; level < levels; level++) patch = subdivideWatanabeItoSoma(patch);

  // Both prototiles have circumradius < 1. Keep the complete corona touching
  // the requested disc while avoiding tens of thousands of off-screen tiles.
  return patch
    .filter((tile) => Math.hypot(tile.x, tile.y) <= radius + 1)
    .map((tile) => ({
      kind: tile.kind,
      rotation: tile.rotation,
      centre: { x: tile.x, y: tile.y },
      points: polygon(tile),
    }));
}

const MEAN_TILE_AREA = 2 / (1 + SQRT_2);

export const watanabeItoSomaEightfold: TilingDefinition = {
  id: 'watanabe-ito-soma-eightfold',
  name: 'Watanabe–Ito–Soma eightfold',
  family: 'experimental',
  description:
    'Watanabe, Ito, Soma and Betsumiya introduced this independent octagonal square-and-45°-rhomb construction in the 1986 Science on Form proceedings; Watanabe, Ito and Soma announced it in Acta Crystallographica A43 (1987), pp. 133–134. This implementation uses the explicit rule catalogued from Watanabe, Soma and Ito’s Acta Crystallographica A51 (1995), pp. 936–942, resolving the ambiguity of the short original descriptions. Its inflation 2 + √2 and overlapping boundary substitution are distinct from the Ammann–Beenker multigrid.',
  kinds: 2,
  kindLabels: ['Square', '45° rhomb'],
  reference: 'https://tilings.math.uni-bielefeld.de/substitution/watanabe-ito-soma-8-fold/',
  referenceLabel: 'Tilings Encyclopedia — explicit Watanabe–Ito–Soma 8-fold rule and patch',
  furtherReferences: [
    {
      label:
        'Watanabe, Ito, Soma & Betsumiya (1986), Nonperiodic Tessellation with Eight-fold Rotational Symmetry, Science on Form, pp. 471–477',
      url: 'https://tilings.math.uni-bielefeld.de/substitution/watanabe-ito-soma-8-fold/#ref-anchor-WISB1986',
    },
    {
      label:
        'Watanabe, Ito & Soma (1987), Nonperiodic tessellation with eightfold rotational symmetry, Acta Cryst. A43, 133–134',
      url: 'https://doi.org/10.1107/S0108767387099732',
    },
    {
      label:
        'Watanabe, Soma & Ito (1995), A new quasiperiodic tiling with dodecagonal symmetry, Acta Cryst. A51, 936–942',
      url: 'https://doi.org/10.1107/S0108767395009160',
    },
  ],
  unitTileArea: MEAN_TILE_AREA,
  generate: generateWatanabeItoSomaEightfold,
};

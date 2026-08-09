import type { Affine, Vec } from '../geometry.js';
import { apply, mul, rotation, scaling } from '../geometry.js';
import { SHURIKEN_RULES } from './shuriken-rule-data.js';
import type { Tile, TilingDefinition } from './types.js';

/** Paz's twelvefold Shuriken substitution, reconstructed from the published rule. */
export const LAMBDA = Math.sqrt(5 + 2 * Math.sqrt(3));
export const SHURIKEN_SUBSTITUTION_COUNTS = [349, 13, 1, 1, 1, 1, 1, 1, 65, 67, 84, 55, 67, 61] as const;

const ROOT3 = Math.sqrt(3);
const XI: Vec = { x: ROOT3 / 2, y: 1 / 2 };
const Z: Vec = { x: 2 + XI.x, y: XI.y };
const RHO: Vec = { x: Z.x / LAMBDA, y: Z.y / LAMBDA };

function add(a: Vec, b: Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y };
}

function sub(a: Vec, b: Vec): Vec {
  return { x: a.x - b.x, y: a.y - b.y };
}

function complexMul(a: Vec, b: Vec): Vec {
  return { x: a.x * b.x - a.y * b.y, y: a.x * b.y + a.y * b.x };
}

function scale(point: Vec, factor: number): Vec {
  return { x: point.x * factor, y: point.y * factor };
}

const XI_POWERS: Vec[] = [];
let xiPower: Vec = { x: 1, y: 0 };
for (let index = 0; index < 12; index++) {
  XI_POWERS.push(xiPower);
  xiPower = complexMul(xiPower, XI);
}

const dodecagon: Vec[] = [];
let corner = scale(add(XI_POWERS[2]!, XI_POWERS[3]!), -1);
for (let index = 0; index < 12; index++) {
  dodecagon.push(complexMul(RHO, corner));
  corner = add(corner, XI_POWERS[index]!);
}

const oneMinusXi = sub({ x: 1, y: 0 }, XI);
const v = complexMul(oneMinusXi, sub({ x: 1, y: 0 }, XI_POWERS[3]!));

/** Intrinsic shapes T1..T14 under the common real-expansion convention. */
export const SHURIKEN_PROTOTILES: readonly (readonly Vec[])[] = [
  dodecagon,
  [{ x: 0, y: 0 }, complexMul(RHO, { x: 2, y: 0 }), complexMul(RHO, sub(XI_POWERS[3]!, XI))],
  [{ x: 0, y: 0 }, oneMinusXi, sub(XI, XI_POWERS[3]!)],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, XI],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, XI_POWERS[2]!],
  [{ x: 0, y: 0 }, v, complexMul(XI, v)],
  [{ x: 0, y: 0 }, oneMinusXi, complexMul(XI_POWERS[2]!, oneMinusXi)],
  [{ x: 0, y: 0 }, oneMinusXi, complexMul(XI_POWERS[3]!, oneMinusXi)],
  ...Array.from({ length: 6 }, (_, index) =>
    ([
      [{ x: 0, y: 0 }, oneMinusXi, sub(XI, XI_POWERS[3]!)],
      [{ x: 0, y: 0 }, { x: 1, y: 0 }, XI],
      [{ x: 0, y: 0 }, { x: 1, y: 0 }, XI_POWERS[2]!],
      [{ x: 0, y: 0 }, v, complexMul(XI, v)],
      [{ x: 0, y: 0 }, oneMinusXi, complexMul(XI_POWERS[2]!, oneMinusXi)],
      [{ x: 0, y: 0 }, oneMinusXi, complexMul(XI_POWERS[3]!, oneMinusXi)],
    ][index]!.map((point) => scale(point, LAMBDA))),
  ),
];

interface ShurikenState {
  readonly kind: number;
  readonly transform: Affine;
}

const SHRINK: Affine = scaling(1 / LAMBDA);
const CENTRAL_T1 = SHURIKEN_RULES[0]!.find(([kind]) => kind === 0)!;
const CENTRAL_ANGLE = Math.atan2(CENTRAL_T1[4], CENTRAL_T1[1]);

function seedTransform(levels: number): Affine {
  // The central T1 child is rotated by CENTRAL_ANGLE. Counter-rotating the
  // level-n seed makes its central level-(n-1) supertile coincide exactly with
  // the seed used at level n-1, instead of changing frame at a size threshold.
  return mul(rotation(-levels * CENTRAL_ANGLE), scaling(LAMBDA ** levels));
}

/** Substitute every state once while keeping the parent support fixed. */
export function subdivideShuriken(states: readonly ShurikenState[]): ShurikenState[] {
  const children: ShurikenState[] = [];
  for (const state of states) {
    for (const [kind, a, b, c, d, e, f] of SHURIKEN_RULES[state.kind]!) {
      children.push({ kind, transform: mul(state.transform, mul(SHRINK, [a, b, c, d, e, f])) });
    }
  }
  return children;
}

function stateTile(state: ShurikenState): Tile {
  return {
    kind: state.kind,
    points: SHURIKEN_PROTOTILES[state.kind]!.map((point) => apply(state.transform, point)),
  };
}

/** The complete 349-child first-order T1 supertile at natural child scale. */
export function supertileTiles(): Tile[] {
  const expandedSeed: ShurikenState = { kind: 0, transform: scaling(LAMBDA) };
  return subdivideShuriken([expandedSeed]).map(stateTile);
}

export function generateShuriken(radius: number): Tile[] {
  // A regular unit-edge dodecagon has this inradius. Its central substitutions
  // are nested, so the least enclosing supertile covers the requested disc.
  const inradius = 1 / (2 * Math.tan(Math.PI / 12));
  const levels = Math.max(1, Math.ceil(Math.log(Math.max(radius, inradius) / inradius) / Math.log(LAMBDA)));
  let states: ShurikenState[] = [{ kind: 0, transform: seedTransform(levels) }];
  for (let level = 0; level < levels; level++) states = subdivideShuriken(states);
  return states.map(stateTile);
}

export const shurikenSupertile: TilingDefinition = {
  id: 'shuriken-supertile-12',
  name: 'Shuriken tiling (12-fold)',
  family: 'experimental',
  description:
    'Paz’s primitive 14-state Shuriken substitution: an aperiodic tiling with dense tile orientations, finite local complexity under rigid motions, inflation sqrt(5 + 2*sqrt3), and a twelvefold-symmetric fixed point.',
  kinds: 14,
  kindLabels: Array.from({ length: 14 }, (_, index) => `T${index + 1}`),
  supportsThreeColours: true,
  reference: 'https://tilings.math.uni-bielefeld.de/substitution/dto_c12/',
  referenceLabel: 'Tilings Encyclopedia, “12-fold Shuriken Tiling”',
  furtherReferences: [
    {
      label: 'Frettlöh, Say-awen & de las Peñas, “Substitution tilings with dense tile orientations” (2017)',
      url: 'https://arxiv.org/abs/1602.00518',
    },
  ],
  unitTileArea: 0.562,
  generate(radius): Tile[] {
    return generateShuriken(radius);
  },
};

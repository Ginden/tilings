/**
 * Penrose's original P1 tiling: three matched pentagons, star, boat and diamond.
 *
 * The decomposition is an independent TypeScript implementation of the P1
 * Lindenmayer rules documented by Andrew Stacey's `penrose` LaTeX package:
 * https://ctan.org/pkg/penrose
 */
import type { Affine, Vec } from '../geometry.js';
import { IDENTITY, PHI, apply, mul, rotation, scaling, translation } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';

const DEG = Math.PI / 180;
const COS18 = Math.cos(18 * DEG);
const COS36 = Math.cos(36 * DEG);
const COS72 = Math.cos(72 * DEG);
const COS108 = Math.cos(108 * DEG);
const SIN18 = Math.sin(18 * DEG);
const SIN36 = Math.sin(36 * DEG);
const SIN72 = Math.sin(72 * DEG);
const SIN108 = Math.sin(108 * DEG);
const TAN54 = Math.tan(54 * DEG);
const TAN72 = Math.tan(72 * DEG);
const INFLATION = PHI * PHI;

type TileSymbol = 'P' | 'Q' | 'R' | 'G' | 'B' | 'D';

const RULES: Readonly<Record<TileSymbol, string>> = {
  P: '[s>P][1sF+Q][1+sF+Q][1*sF+Q][1-sF+Q][1_sF+Q]',
  Q: '[s>P][1+sFR][1*sF*R][1-sF+Q][1_sF+Q][1sF+Q][->fsD]',
  R: '[s>P][1-sF+Q][1+sF*R][1*sFR][1_sF*R][1sFR][_>fsD][>fsD]',
  G:
    '[s>G][se[>d+R][e1B]][+se[>d+R][e1B]][-se[>d+R][e1B]][*se[>d+R][e1B]][_se[>d+R][e1B]]',
  B: '[s>G][se[>d+R][e1B]][+se[>d+R][e1B]][-se[>d+R][e1B]]',
  D: '[s>d+R][s>eG][se1B]',
};

const PENTAGON: readonly Vec[] = [
  { x: 0, y: 0 },
  { x: COS108, y: SIN108 },
  { x: 1 + COS72 + Math.cos(144 * DEG), y: SIN72 + Math.sin(144 * DEG) },
  { x: 1 + COS72, y: SIN72 },
  { x: 1, y: 0 },
];

/** All P1 edges have unit length; the three pentagon classes share one outline. */
export const P1_OUTLINES: Readonly<Record<TileSymbol, readonly Vec[]>> = {
  P: PENTAGON,
  Q: PENTAGON,
  R: PENTAGON,
  G: [
    { x: 1, y: 0 },
    { x: 1 - COS36, y: -SIN36 },
    { x: 1 - COS36 - COS108, y: -SIN36 - SIN108 },
    { x: COS108, y: -SIN108 },
    { x: -1 + 3 * COS108 + COS36, y: -SIN36 - SIN108 },
    { x: -1 + 2 * COS108 + COS36, y: -SIN36 },
    { x: -1 + 2 * COS108, y: 0 },
    { x: 2 * COS108, y: 0 },
    { x: COS108, y: SIN108 },
    { x: 0, y: 0 },
  ],
  B: [
    { x: -1 + 2 * COS108, y: 0 },
    { x: 2 * COS108, y: 0 },
    { x: COS108, y: SIN108 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1 - COS36, y: -SIN36 },
    { x: -1 + 2 * COS108 + COS36, y: -SIN36 },
  ],
  D: [
    { x: 0, y: 0 },
    { x: COS18, y: SIN18 },
    { x: 2 * COS18, y: 0 },
    { x: COS18, y: -SIN18 },
  ],
};

const SYMBOL_KIND: Readonly<Record<TileSymbol, number>> = {
  P: 0,
  Q: 1,
  R: 2,
  G: 3,
  B: 4,
  D: 5,
};

interface Turtle {
  transform: Affine;
  step: number;
}

function expand(seed: string, levels: number): string {
  let current = seed;
  for (let level = 0; level < levels; level++) {
    let next = '';
    for (const symbol of current) next += RULES[symbol as TileSymbol] ?? symbol;
    current = next;
  }
  return current;
}

function local(state: Turtle, transform: Affine): void {
  state.transform = mul(state.transform, transform);
}

function tileTransform(symbol: TileSymbol, state: Turtle): Affine {
  if (symbol === 'P' || symbol === 'Q' || symbol === 'R') {
    return mul(
      state.transform,
      mul(translation(-state.step / 2, (-state.step * TAN54) / 2), scaling(state.step)),
    );
  }
  if (symbol === 'G' || symbol === 'B') {
    return mul(
      state.transform,
      mul(translation(state.step * COS72, state.step * TAN54 * COS72), scaling(state.step)),
    );
  }
  return mul(
    state.transform,
    mul(rotation(90 * DEG), mul(translation(-state.step * COS18, 0), scaling(state.step))),
  );
}

/** Generate a pentagonal supertile after `levels` P1 decomposition steps. */
export function generateP1(levels: number): Tile[] {
  const initialStep = Math.pow(INFLATION, levels);
  let state: Turtle = { transform: IDENTITY, step: initialStep };
  const stack: Turtle[] = [];
  const tiles: Tile[] = [];

  for (const symbol of expand('P', levels)) {
    if (symbol === '[') {
      stack.push({ ...state });
    } else if (symbol === ']') {
      state = stack.pop()!;
    } else if (symbol === '1') {
      // Matching-rule parity affects decorations, which this renderer does not draw.
      continue;
    } else if (symbol === '+') {
      local(state, rotation(72 * DEG));
    } else if (symbol === '*') {
      local(state, rotation(144 * DEG));
    } else if (symbol === '-') {
      local(state, rotation(288 * DEG));
    } else if (symbol === '_') {
      local(state, rotation(216 * DEG));
    } else if (symbol === '>') {
      local(state, rotation(Math.PI));
    } else if (symbol === '|') {
      local(state, [-1, 0, 0, 0, 1, 0]);
    } else if (symbol === 's') {
      state.step /= INFLATION;
    } else if (symbol === 'f') {
      local(state, translation(0, (TAN54 * state.step) / 2));
    } else if (symbol === 'F') {
      local(state, translation(0, TAN54 * state.step));
    } else if (symbol === 'd') {
      local(state, translation(0, (TAN54 / 2 - TAN72 / 2 + SIN36) * state.step));
    } else if (symbol === 'e') {
      local(state, translation(0, TAN54 * COS36 * state.step));
    } else if (symbol in RULES) {
      const tileSymbol = symbol as TileSymbol;
      const transform = tileTransform(tileSymbol, state);
      tiles.push({
        kind: SYMBOL_KIND[tileSymbol],
        points: P1_OUTLINES[tileSymbol].map((point) => apply(transform, point)),
      });
    }
  }
  return tiles;
}

export const penroseP1: TilingDefinition = {
  id: 'penrose-p1',
  name: 'Penrose P1 — pentagons',
  family: 'penrose',
  description:
    'Penrose’s original six prototiles: three matched pentagons, a five-pointed star, a boat and a thin diamond.',
  kinds: 6,
  kindLabels: ['pentagon P5', 'pentagon P3', 'pentagon P2', 'star', 'boat', 'diamond'],
  reference: 'https://en.wikipedia.org/wiki/Penrose_tiling#Original_pentagonal_Penrose_tiling_(P1)',
  unitTileArea: 1.543,
  generate(radius): Tile[] {
    const neededSide = (radius + 2) * 2 * Math.tan(36 * DEG);
    const levels = Math.max(2, Math.ceil(Math.log(neededSide) / Math.log(INFLATION)));
    return generateP1(levels);
  },
};

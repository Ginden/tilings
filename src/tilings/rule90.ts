import { currentDaySeed } from '../seed.js';
import type { Tile, TilingDefinition } from './types.js';

const OUTPUT_MARGIN = 2;

function hash(seed: number, x: number): number {
  let value = (seed ^ Math.imul(x, 0x9e3779b1)) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

/** A sparse, coordinate-stable initial row that makes the seed visible. */
export function rule90InitialCell(x: number, seed: number): 0 | 1 {
  return (hash(seed >>> 0, x) & 7) === 0 ? 1 : 0;
}

/** Rule 90: the next state is the XOR of the two neighbouring states. */
export function rule90Step(row: readonly number[]): number[] {
  return row.map((_, index) => (row[index - 1] ?? 0) ^ (row[index + 1] ?? 0));
}

function square(x: number, y: number, kind: number): Tile {
  return {
    kind,
    points: [
      { x, y },
      { x: x + 1, y },
      { x: x + 1, y: y + 1 },
      { x, y: y + 1 },
    ],
  };
}

/**
 * Draw the spacetime diagram above and below one seeded initial row. Padding
 * the row by the number of generations keeps the visible cells independent of
 * the requested patch size.
 */
export function generateRule90(radius: number, seed = currentDaySeed()): Tile[] {
  const extent = Math.ceil(radius) + OUTPUT_MARGIN;
  const sourceMin = -2 * extent;
  const sourceMax = 2 * extent;
  let row: number[] = Array.from(
    { length: sourceMax - sourceMin + 1 },
    (_, index) => rule90InitialCell(sourceMin + index, seed),
  );
  const rows: number[][] = [row];
  for (let generation = 1; generation <= extent; generation++) {
    row = rule90Step(row);
    rows.push(row);
  }

  const tiles: Tile[] = [];
  for (let y = -extent; y < extent; y++) {
    const generation = Math.abs(y);
    const states = rows[generation]!;
    for (let x = -extent; x < extent; x++) {
      tiles.push(square(x, y, states[x - sourceMin]!));
    }
  }
  return tiles;
}

export const rule90: TilingDefinition = {
  id: 'rule-90',
  name: 'Rule 90 cellular automaton',
  family: 'algorithmic',
  description:
    'A spacetime carpet made by Wolfram’s elementary cellular automaton Rule 90. Each new square is the exclusive-or of the two cells diagonally above it, so sparse seeded starts bloom into colliding Sierpiński triangles. The evolution is mirrored around its initial row to fill the plane, and remains fixed when the viewport changes.',
  kinds: 2,
  kindLabels: ['Zero cells', 'One cells'],
  reference: 'https://doi.org/10.1103/RevModPhys.55.601',
  referenceLabel: 'Wolfram, “Statistical mechanics of cellular automata” (1983)',
  furtherReferences: [
    {
      label: 'Rule 90 — Wolfram MathWorld',
      url: 'https://mathworld.wolfram.com/Rule90.html',
    },
  ],
  unitTileArea: 1,
  generate: generateRule90,
};

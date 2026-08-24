import { currentDaySeed } from '../seed.js';
import type { Tile, TilingDefinition } from './types.js';

const PATCH_MARGIN = 2;

function hash(seed: number, x: number, y: number): number {
  let value = seed >>> 0;
  value ^= Math.imul(x, 0x9e3779b1);
  value ^= Math.imul(y, 0x85ebca77);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

/**
 * Fill each square of the integer lattice with one of the four rotations of
 * Truchet's original diagonally bisected, two-colour tile.
 */
export function generateTruchet(radius: number, seed = currentDaySeed()): Tile[] {
  const extent = Math.ceil(radius) + PATCH_MARGIN;
  const integerSeed = seed >>> 0;
  const tiles: Tile[] = [];

  for (let y = -extent; y < extent; y++) {
    for (let x = -extent; x < extent; x++) {
      const northWest = { x, y };
      const northEast = { x: x + 1, y };
      const southEast = { x: x + 1, y: y + 1 };
      const southWest = { x, y: y + 1 };
      const state = hash(integerSeed, x, y) & 3;
      const inverted = state >= 2;

      if ((state & 1) === 0) {
        tiles.push(
          { kind: inverted ? 1 : 0, points: [northWest, northEast, southEast] },
          { kind: inverted ? 0 : 1, points: [northWest, southEast, southWest] },
        );
      } else {
        tiles.push(
          { kind: inverted ? 1 : 0, points: [northWest, northEast, southWest] },
          { kind: inverted ? 0 : 1, points: [northEast, southEast, southWest] },
        );
      }
    }
  }

  return tiles;
}

export const seededTruchet: TilingDefinition = {
  id: 'seeded-truchet',
  name: 'Seeded Truchet mosaic',
  family: 'algorithmic',
  description:
    "Sébastien Truchet's original square tile is divided diagonally into two contrasting right triangles. A coordinate hash chooses independently among its four rotations, producing a reproducible random field whose colour blocks join into larger accidental patterns.",
  kinds: 2,
  kindLabels: ['Triangle colour 1', 'Triangle colour 2'],
  reference: 'https://en.wikipedia.org/wiki/Truchet_tile',
  referenceLabel: 'Truchet tiling — Wikipedia',
  furtherReferences: [
    {
      label: 'Truchet curves and surfaces — Computers & Graphics (2008)',
      url: 'https://doi.org/10.1016/j.cag.2007.10.001',
    },
  ],
  unitTileArea: 0.5,
  generate: generateTruchet,
};

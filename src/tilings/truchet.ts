import type { Vec } from '../geometry.js';
import { currentDaySeed } from '../seed.js';
import type { Tile, TilingDefinition } from './types.js';

const PATCH_MARGIN = 2;
const ARC_RADIUS = 0.5;
const ARC_BAND_WIDTH = 0.12;
const ARC_SEGMENTS = 8;

function hash(seed: number, x: number, y: number): number {
  let value = seed >>> 0;
  value ^= Math.imul(x, 0x9e3779b1);
  value ^= Math.imul(y, 0x85ebca77);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

function arcBand(center: Vec, startAngle: number, endAngle: number): Vec[] {
  const radii = [ARC_RADIUS + ARC_BAND_WIDTH / 2, ARC_RADIUS - ARC_BAND_WIDTH / 2] as const;
  const points: Vec[] = [];
  for (let index = 0; index <= ARC_SEGMENTS; index++) {
    const angle = startAngle + ((endAngle - startAngle) * index) / ARC_SEGMENTS;
    points.push({
      x: center.x + Math.cos(angle) * radii[0],
      y: center.y + Math.sin(angle) * radii[0],
    });
  }
  for (let index = ARC_SEGMENTS; index >= 0; index--) {
    const angle = startAngle + ((endAngle - startAngle) * index) / ARC_SEGMENTS;
    points.push({
      x: center.x + Math.cos(angle) * radii[1],
      y: center.y + Math.sin(angle) * radii[1],
    });
  }
  return points;
}

/** Fill the integer lattice with the two orientations of Smith's quarter-circle Truchet tile. */
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
      const parts = (hash(integerSeed, x, y) & 1) === 0
        ? [arcBand(northWest, 0, Math.PI / 2), arcBand(southEast, -Math.PI, -Math.PI / 2)]
        : [arcBand(northEast, Math.PI, Math.PI / 2), arcBand(southWest, 0, -Math.PI / 2)];

      tiles.push({
        kind: 1,
        points: [northWest, northEast, southEast, southWest],
        parts,
        drawBorder: false,
      });
    }
  }

  return tiles;
}

export const seededTruchet: TilingDefinition = {
  id: 'seeded-truchet',
  name: 'Seeded Truchet mosaic',
  family: 'algorithmic',
  description:
    "Cyril Stanley Smith's quarter-circle variation on Truchet tiles places an arc at each of two opposite corners. Every arc ends at cell-edge midpoints, so random orientations form continuous loops and wandering paths. A coordinate hash chooses reproducibly between the tile's two orientations.",
  kinds: 2,
  kindLabels: ['Background', 'Quarter-circle ribbons'],
  backgroundKind: 0,
  reference: 'https://en.wikipedia.org/wiki/Truchet_tile',
  referenceLabel: 'Truchet tiling — Wikipedia',
  furtherReferences: [
    {
      label: 'Truchet curves and surfaces — Computers & Graphics (2008)',
      url: 'https://doi.org/10.1016/j.cag.2007.10.001',
    },
  ],
  unitTileArea: 1,
  generate: generateTruchet,
};

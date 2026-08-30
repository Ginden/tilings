import { currentDaySeed } from '../seed.js';
import type { Tile, TilingDefinition } from './types.js';

const ROOT_SIZE = 4;
const MAX_DEPTH = 3;
const FINEST_SCALE = 2;
const OUTPUT_MARGIN = ROOT_SIZE;

function hash(seed: number, x: number, y: number, depth: number): number {
  let value = seed >>> 0;
  value ^= Math.imul(x, 0x9e3779b1);
  value ^= Math.imul(y, 0x85ebca77);
  value ^= Math.imul(depth, 0xc2b2ae3d);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

/** Root squares always split; smaller nodes split with depth-dependent odds. */
export function quadtreeShouldSplit(
  seed: number,
  fineX: number,
  fineY: number,
  depth: number,
): boolean {
  if (depth === 0) return true;
  if (depth >= MAX_DEPTH) return false;
  const threshold = depth === 1 ? 0xc0000000 : 0x8ccccccc;
  return hash(seed, fineX, fineY, depth) < threshold;
}

function subdivide(
  tiles: Tile[],
  seed: number,
  fineX: number,
  fineY: number,
  fineSize: number,
  depth: number,
): void {
  if (quadtreeShouldSplit(seed, fineX, fineY, depth)) {
    const half = fineSize / 2;
    subdivide(tiles, seed, fineX, fineY, half, depth + 1);
    subdivide(tiles, seed, fineX + half, fineY, half, depth + 1);
    subdivide(tiles, seed, fineX + half, fineY + half, half, depth + 1);
    subdivide(tiles, seed, fineX, fineY + half, half, depth + 1);
    return;
  }

  const x = fineX / FINEST_SCALE;
  const y = fineY / FINEST_SCALE;
  const size = fineSize / FINEST_SCALE;
  tiles.push({
    kind: depth - 1,
    points: [
      { x, y },
      { x: x + size, y },
      { x: x + size, y: y + size },
      { x, y: y + size },
    ],
  });
}

/** Fill a square patch with independently reproducible point-region quadtrees. */
export function generateQuadtree(radius: number, seed = currentDaySeed()): Tile[] {
  const extent = Math.ceil(radius) + OUTPUT_MARGIN;
  const minRoot = Math.floor(-extent / ROOT_SIZE);
  const maxRoot = Math.ceil(extent / ROOT_SIZE);
  const tiles: Tile[] = [];
  const integerSeed = seed >>> 0;

  for (let rootY = minRoot; rootY < maxRoot; rootY++) {
    for (let rootX = minRoot; rootX < maxRoot; rootX++) {
      subdivide(
        tiles,
        integerSeed,
        rootX * ROOT_SIZE * FINEST_SCALE,
        rootY * ROOT_SIZE * FINEST_SCALE,
        ROOT_SIZE * FINEST_SCALE,
        0,
      );
    }
  }
  return tiles;
}

export const seededQuadtree: TilingDefinition = {
  id: 'seeded-quadtree',
  name: 'Seeded quadtree mosaic',
  family: 'algorithmic',
  description:
    'A Mondrian-like square mosaic grown by a point-region quadtree. Every root square splits into four; a coordinate hash decides which children split again, down to three levels. The three colours reveal the leaf depth, while fixed dyadic boundaries make the same seed stable across zooms and canvas sizes.',
  kinds: 3,
  kindLabels: ['Large leaves', 'Medium leaves', 'Small leaves'],
  supportsThreeColours: true,
  reference: 'https://doi.org/10.1007/BF00288933',
  referenceLabel: 'Finkel & Bentley, “Quad trees” (1974)',
  unitTileArea: 0.5,
  generate: generateQuadtree,
};

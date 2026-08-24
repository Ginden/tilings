import type { Vec } from '../geometry.js';
import { currentDaySeed } from '../seed.js';
import type { Tile, TilingDefinition } from './types.js';

const NEIGHBOUR_RANGE = 2;
const CELL_EXTENT = 2.5;

function hash(seed: number, x: number, y: number, channel: number): number {
  let value = seed >>> 0;
  value ^= Math.imul(x, 0x9e3779b1);
  value ^= Math.imul(y, 0x85ebca77);
  value ^= Math.imul(channel, 0xc2b2ae3d);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

function site(seed: number, x: number, y: number): Vec {
  return {
    x: x + 0.08 + (hash(seed, x, y, 0) / 0x100000000) * 0.84,
    y: y + 0.08 + (hash(seed, x, y, 1) / 0x100000000) * 0.84,
  };
}

/** Keep the half-plane containing `origin`, bounded by its bisector with `other`. */
function clipToBisector(polygon: readonly Vec[], origin: Vec, other: Vec): Vec[] {
  const nx = other.x - origin.x;
  const ny = other.y - origin.y;
  const offset = (other.x * other.x + other.y * other.y - origin.x * origin.x - origin.y * origin.y) / 2;
  const inside = (point: Vec): boolean => point.x * nx + point.y * ny <= offset + 1e-10;
  const clipped: Vec[] = [];

  for (let index = 0; index < polygon.length; index++) {
    const start = polygon[index]!;
    const end = polygon[(index + 1) % polygon.length]!;
    const startInside = inside(start);
    const endInside = inside(end);
    if (startInside) clipped.push(start);
    if (startInside === endInside) continue;

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const t = (offset - start.x * nx - start.y * ny) / (dx * nx + dy * ny);
    clipped.push({ x: start.x + dx * t, y: start.y + dy * t });
  }
  return clipped;
}

function voronoiCell(seed: number, gridX: number, gridY: number): Vec[] {
  const origin = site(seed, gridX, gridY);
  let polygon: Vec[] = [
    { x: origin.x - CELL_EXTENT, y: origin.y - CELL_EXTENT },
    { x: origin.x + CELL_EXTENT, y: origin.y - CELL_EXTENT },
    { x: origin.x + CELL_EXTENT, y: origin.y + CELL_EXTENT },
    { x: origin.x - CELL_EXTENT, y: origin.y + CELL_EXTENT },
  ];

  for (let y = gridY - NEIGHBOUR_RANGE; y <= gridY + NEIGHBOUR_RANGE; y++) {
    for (let x = gridX - NEIGHBOUR_RANGE; x <= gridX + NEIGHBOUR_RANGE; x++) {
      if (x === gridX && y === gridY) continue;
      polygon = clipToBisector(polygon, origin, site(seed, x, y));
    }
  }
  return polygon;
}

export function generateVoronoi(radius: number, seed = currentDaySeed()): Tile[] {
  const integerSeed = seed >>> 0;
  const limit = Math.ceil(radius) + 2;
  const tiles: Tile[] = [];
  for (let y = -limit; y <= limit; y++) {
    for (let x = -limit; x <= limit; x++) {
      const points = voronoiCell(integerSeed, x, y);
      const kind = Math.min(4, Math.max(0, points.length - 4));
      tiles.push({ kind, points });
    }
  }
  return tiles;
}

export const seededVoronoi: TilingDefinition = {
  id: 'seeded-voronoi',
  name: 'Seeded Voronoi mosaic',
  family: 'algorithmic',
  description:
    'A deterministic stained-glass mosaic. A seeded hash places one site inside every square of an infinite grid, then perpendicular bisectors between nearby sites carve the plane into convex Voronoi cells. Colours reveal how many sides each cell has.',
  kinds: 5,
  kindLabels: ['4 or fewer sides', '5 sides', '6 sides', '7 sides', '8 or more sides'],
  supportsThreeColours: true,
  reference: 'https://en.wikipedia.org/wiki/Voronoi_diagram',
  referenceLabel: 'Voronoi diagram — Wikipedia',
  unitTileArea: 1,
  generate: generateVoronoi,
};

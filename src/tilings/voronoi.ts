import type { Vec } from '../geometry.js';
import { currentDaySeed } from '../seed.js';
import type { Tile, TilingDefinition } from './types.js';

const NEIGHBOUR_RANGE = 2;
const CELL_EXTENT = 2.5;
const ROW_HEIGHT = Math.sqrt(3) / 2;
const SITE_JITTER = 0.34;

function hash(seed: number, x: number, y: number, channel: number): number {
  let value = seed >>> 0;
  value ^= Math.imul(x, 0x9e3779b1);
  value ^= Math.imul(y, 0x85ebca77);
  value ^= Math.imul(channel, 0xc2b2ae3d);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

function site(seed: number, x: number, y: number, cos: number, sin: number): Vec {
  const siteX = x + y / 2 + (hash(seed, x, y, 0) / 0x100000000 - 0.5) * SITE_JITTER;
  const siteY = y * ROW_HEIGHT + (hash(seed, x, y, 1) / 0x100000000 - 0.5) * SITE_JITTER;
  return { x: siteX * cos - siteY * sin, y: siteX * sin + siteY * cos };
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

function voronoiCell(seed: number, gridX: number, gridY: number, cos: number, sin: number): Vec[] {
  const origin = site(seed, gridX, gridY, cos, sin);
  let polygon: Vec[] = [
    { x: origin.x - CELL_EXTENT, y: origin.y - CELL_EXTENT },
    { x: origin.x + CELL_EXTENT, y: origin.y - CELL_EXTENT },
    { x: origin.x + CELL_EXTENT, y: origin.y + CELL_EXTENT },
    { x: origin.x - CELL_EXTENT, y: origin.y + CELL_EXTENT },
  ];

  for (let y = gridY - NEIGHBOUR_RANGE; y <= gridY + NEIGHBOUR_RANGE; y++) {
    for (let x = gridX - NEIGHBOUR_RANGE; x <= gridX + NEIGHBOUR_RANGE; x++) {
      if (x === gridX && y === gridY) continue;
      polygon = clipToBisector(polygon, origin, site(seed, x, y, cos, sin));
    }
  }
  return polygon;
}

export function generateVoronoi(radius: number, seed = currentDaySeed()): Tile[] {
  const integerSeed = seed >>> 0;
  const extent = Math.ceil(radius) + 2;
  const rowLimit = Math.ceil(extent / ROW_HEIGHT);
  const angle = (hash(integerSeed, 0, 0, 3) / 0x100000000) * 2 * Math.PI;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const tiles: Tile[] = [];
  for (let y = -rowLimit; y <= rowLimit; y++) {
    const minX = Math.floor(-extent - y / 2);
    const maxX = Math.ceil(extent - y / 2);
    for (let x = minX; x <= maxX; x++) {
      const points = voronoiCell(integerSeed, x, y, cos, sin);
      const rowFlip = hash(integerSeed, 0, y, 2) & 1;
      const kind = (((x & 1) ^ rowFlip) << 1) | (y & 1);
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
    'A deterministic stained-glass mosaic. A seeded hash jitters the sites of an infinite triangular grid, then perpendicular bisectors between nearby sites carve the plane into convex Voronoi cells. Four map colours distinguish cells that share an edge.',
  kinds: 4,
  kindLabels: ['Map colour 1', 'Map colour 2', 'Map colour 3', 'Map colour 4'],
  supportsThreeColours: true,
  reference: 'https://en.wikipedia.org/wiki/Voronoi_diagram',
  referenceLabel: 'Voronoi diagram — Wikipedia',
  unitTileArea: ROW_HEIGHT,
  generate: generateVoronoi,
};

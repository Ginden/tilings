import type { Vec } from '../geometry.js';
import { currentDaySeed } from '../seed.js';
import type { Tile, TilingDefinition } from './types.js';

const NEIGHBOUR_RANGE = 2;
const CELL_EXTENT = 2.5;
const ROW_HEIGHT = Math.sqrt(3) / 2;
const SITE_JITTER = 0.5;

function hash(seed: number, x: number, y: number, channel: number): number {
  let value = seed >>> 0;
  value ^= Math.imul(x, 0x9e3779b1);
  value ^= Math.imul(y, 0x85ebca77);
  value ^= Math.imul(channel, 0xc2b2ae3d);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

interface SiteTransform {
  readonly cos: number;
  readonly sin: number;
  readonly phases: readonly number[];
}

function siteTransform(seed: number): SiteTransform {
  const angle = (hash(seed, 0, 0, 3) / 0x100000000) * 2 * Math.PI;
  return {
    cos: Math.cos(angle),
    sin: Math.sin(angle),
    phases: [4, 5, 6, 7].map((channel) =>
      (hash(seed, 0, 0, channel) / 0x100000000) * 2 * Math.PI),
  };
}

function site(seed: number, x: number, y: number, transform: SiteTransform): Vec {
  const baseX = x + y / 2 + (hash(seed, x, y, 0) / 0x100000000 - 0.5) * SITE_JITTER;
  const baseY = y * ROW_HEIGHT + (hash(seed, x, y, 1) / 0x100000000 - 0.5) * SITE_JITTER;
  const warpedX =
    baseX +
    0.4 * Math.sin(0.18 * baseX + transform.phases[0]!) +
    0.3 * Math.sin(0.15 * baseY + transform.phases[1]!);
  const warpedY =
    baseY +
    0.35 * Math.sin(0.17 * baseY + transform.phases[2]!) +
    0.28 * Math.sin(0.14 * baseX + transform.phases[3]!);
  return {
    x: warpedX * transform.cos - warpedY * transform.sin,
    y: warpedX * transform.sin + warpedY * transform.cos,
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

function voronoiCell(seed: number, gridX: number, gridY: number, transform: SiteTransform): Vec[] {
  const origin = site(seed, gridX, gridY, transform);
  let polygon: Vec[] = [
    { x: origin.x - CELL_EXTENT, y: origin.y - CELL_EXTENT },
    { x: origin.x + CELL_EXTENT, y: origin.y - CELL_EXTENT },
    { x: origin.x + CELL_EXTENT, y: origin.y + CELL_EXTENT },
    { x: origin.x - CELL_EXTENT, y: origin.y + CELL_EXTENT },
  ];

  for (let y = gridY - NEIGHBOUR_RANGE; y <= gridY + NEIGHBOUR_RANGE; y++) {
    for (let x = gridX - NEIGHBOUR_RANGE; x <= gridX + NEIGHBOUR_RANGE; x++) {
      if (x === gridX && y === gridY) continue;
      polygon = clipToBisector(polygon, origin, site(seed, x, y, transform));
    }
  }
  return polygon;
}

export function generateVoronoi(radius: number, seed = currentDaySeed()): Tile[] {
  const integerSeed = seed >>> 0;
  const extent = Math.ceil(radius) + 4;
  const rowLimit = Math.ceil(extent / ROW_HEIGHT);
  const transform = siteTransform(integerSeed);
  const tiles: Tile[] = [];
  for (let y = -rowLimit; y <= rowLimit; y++) {
    const minX = Math.floor(-extent - y / 2);
    const maxX = Math.ceil(extent - y / 2);
    for (let x = minX; x <= maxX; x++) {
      const points = voronoiCell(integerSeed, x, y, transform);
      const kind = ((x & 1) << 1) | (y & 1);
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
    'A deterministic stained-glass mosaic. A seeded hash strongly scatters and smoothly warps a triangular site scaffold, then perpendicular bisectors between nearby sites carve the plane into irregular convex Voronoi cells. Four map colours distinguish cells that share an edge.',
  kinds: 4,
  kindLabels: ['Map colour 1', 'Map colour 2', 'Map colour 3', 'Map colour 4'],
  supportsThreeColours: true,
  reference: 'https://en.wikipedia.org/wiki/Voronoi_diagram',
  referenceLabel: 'Voronoi diagram — Wikipedia',
  unitTileArea: ROW_HEIGHT,
  generate: generateVoronoi,
};

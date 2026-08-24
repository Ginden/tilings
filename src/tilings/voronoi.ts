import type { Vec } from '../geometry.js';
import { currentDaySeed } from '../seed.js';
import type { Tile, TilingDefinition } from './types.js';

const ROW_HEIGHT = Math.sqrt(3) / 2;
const CANDIDATE_SPACING = Math.sqrt(ROW_HEIGHT / 9);
const CANDIDATE_JITTER = 0.9;
const OUTPUT_MARGIN = 4;
const SITE_MARGIN = 8;
const CELL_EXTENT = 4;
const NEIGHBOUR_DISTANCE = CELL_EXTENT * 2 * Math.SQRT2;

function hash(seed: number, x: number, y: number, channel: number): number {
  let value = seed >>> 0;
  value ^= Math.imul(x, 0x9e3779b1);
  value ^= Math.imul(y, 0x85ebca77);
  value ^= Math.imul(channel, 0xc2b2ae3d);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

interface Site {
  readonly gridX: number;
  readonly gridY: number;
  readonly point: Vec;
}

function candidateWins(seed: number, x: number, y: number): boolean {
  const priority = hash(seed, x, y, 0);
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const otherPriority = hash(seed, x + dx, y + dy, 0);
      if (otherPriority < priority) return false;
      if (otherPriority === priority && (dy < 0 || (dy === 0 && dx < 0))) return false;
    }
  }
  return true;
}

function candidateSite(seed: number, x: number, y: number, cos: number, sin: number): Site {
  const jitterX = (hash(seed, x, y, 1) / 0x100000000 - 0.5) * CANDIDATE_JITTER;
  const jitterY = (hash(seed, x, y, 2) / 0x100000000 - 0.5) * CANDIDATE_JITTER;
  const baseX = (x + jitterX) * CANDIDATE_SPACING;
  const baseY = (y + jitterY) * CANDIDATE_SPACING;
  return {
    gridX: x,
    gridY: y,
    point: {
      x: baseX * cos - baseY * sin,
      y: baseX * sin + baseY * cos,
    },
  };
}

function generateSites(seed: number, extent: number): Site[] {
  const angle = (hash(seed, 0, 0, 3) / 0x100000000) * 2 * Math.PI;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const limit = Math.ceil((extent * Math.SQRT2) / CANDIDATE_SPACING) + 2;
  const sites: Site[] = [];
  for (let y = -limit; y <= limit; y++) {
    for (let x = -limit; x <= limit; x++) {
      if (candidateWins(seed, x, y)) sites.push(candidateSite(seed, x, y, cos, sin));
    }
  }
  return sites;
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

function voronoiCell(origin: Site, sites: readonly Site[]): Vec[] {
  const centre = origin.point;
  let polygon: Vec[] = [
    { x: centre.x - CELL_EXTENT, y: centre.y - CELL_EXTENT },
    { x: centre.x + CELL_EXTENT, y: centre.y - CELL_EXTENT },
    { x: centre.x + CELL_EXTENT, y: centre.y + CELL_EXTENT },
    { x: centre.x - CELL_EXTENT, y: centre.y + CELL_EXTENT },
  ];

  for (const other of sites) {
    if (other === origin) continue;
    if (Math.hypot(other.point.x - centre.x, other.point.y - centre.y) > NEIGHBOUR_DISTANCE) continue;
    polygon = clipToBisector(polygon, centre, other.point);
  }
  return polygon;
}

export function generateVoronoi(radius: number, seed = currentDaySeed()): Tile[] {
  const integerSeed = seed >>> 0;
  const outputExtent = Math.ceil(radius) + OUTPUT_MARGIN;
  const allSites = generateSites(integerSeed, outputExtent + SITE_MARGIN);
  const outputSites = allSites.filter((site) =>
    Math.abs(site.point.x) <= outputExtent && Math.abs(site.point.y) <= outputExtent);
  const cells = outputSites.map((site) => voronoiCell(site, allSites));
  return cells.map((points, index) => {
    const site = outputSites[index]!;
    return { kind: hash(integerSeed, site.gridX, site.gridY, 4) & 3, points };
  });
}

export const seededVoronoi: TilingDefinition = {
  id: 'seeded-voronoi',
  name: 'Seeded Voronoi mosaic',
  family: 'algorithmic',
  description:
    'A deterministic stained-glass mosaic. Seeded random candidates compete locally to form a hard-core site process, then perpendicular bisectors carve the plane into irregular convex Voronoi cells. Each site receives one of four stable seeded shades.',
  kinds: 4,
  kindLabels: ['Seeded shade 1', 'Seeded shade 2', 'Seeded shade 3', 'Seeded shade 4'],
  supportsThreeColours: true,
  reference: 'https://en.wikipedia.org/wiki/Voronoi_diagram',
  referenceLabel: 'Voronoi diagram — Wikipedia',
  unitTileArea: ROW_HEIGHT,
  generate: generateVoronoi,
};

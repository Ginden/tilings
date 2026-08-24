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
const NEIGHBOUR_DISTANCE_SQUARED = NEIGHBOUR_DISTANCE ** 2;

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

interface Cell {
  readonly points: readonly Vec[];
  readonly site: Site;
}

type SiteBuckets = ReadonlyMap<string, readonly Site[]>;

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

function bucketKey(x: number, y: number): string {
  return `${x},${y}`;
}

function bucketCoordinate(value: number): number {
  return Math.floor(value / NEIGHBOUR_DISTANCE);
}

function bucketSites(sites: readonly Site[]): SiteBuckets {
  const buckets = new Map<string, Site[]>();
  for (const site of sites) {
    const key = bucketKey(bucketCoordinate(site.point.x), bucketCoordinate(site.point.y));
    const bucket = buckets.get(key);
    if (bucket) bucket.push(site);
    else buckets.set(key, [site]);
  }
  return buckets;
}

function neighbouringSites(origin: Site, buckets: SiteBuckets): Site[] {
  const centre = origin.point;
  const bucketX = bucketCoordinate(centre.x);
  const bucketY = bucketCoordinate(centre.y);
  const neighbours: Site[] = [];

  // A bucket is exactly as wide as the maximum relevant distance, so the
  // origin's bucket and its eight neighbours contain every possible clipper.
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const bucket = buckets.get(bucketKey(bucketX + dx, bucketY + dy));
      if (!bucket) continue;
      for (const other of bucket) {
        if (other === origin) continue;
        const distanceX = other.point.x - centre.x;
        const distanceY = other.point.y - centre.y;
        if (distanceX * distanceX + distanceY * distanceY <= NEIGHBOUR_DISTANCE_SQUARED) {
          neighbours.push(other);
        }
      }
    }
  }

  // Match generateSites' former global scan order. Besides keeping output
  // byte-stable, this prevents floating-point clipping order from depending
  // on the requested patch size.
  neighbours.sort((left, right) => left.gridY - right.gridY || left.gridX - right.gridX);
  return neighbours;
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

function voronoiCell(origin: Site, buckets: SiteBuckets): Vec[] {
  const centre = origin.point;
  let polygon: Vec[] = [
    { x: centre.x - CELL_EXTENT, y: centre.y - CELL_EXTENT },
    { x: centre.x + CELL_EXTENT, y: centre.y - CELL_EXTENT },
    { x: centre.x + CELL_EXTENT, y: centre.y + CELL_EXTENT },
    { x: centre.x - CELL_EXTENT, y: centre.y + CELL_EXTENT },
  ];

  for (const other of neighbouringSites(origin, buckets)) {
    polygon = clipToBisector(polygon, centre, other.point);
  }
  return polygon;
}

const EDGE_PRECISION = 1e8;

function pointKey(point: Vec): string {
  return `${Math.round(point.x * EDGE_PRECISION)},${Math.round(point.y * EDGE_PRECISION)}`;
}

function edgeKey(start: Vec, end: Vec): string {
  const a = pointKey(start);
  const b = pointKey(end);
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

/** Build the dual graph: two Voronoi cells are adjacent when they share a complete edge. */
function cellAdjacency(cells: readonly Cell[]): number[][] {
  const owners = new Map<string, number>();
  const adjacency = cells.map(() => [] as number[]);

  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    const points = cells[cellIndex]!.points;
    for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
      const key = edgeKey(points[pointIndex]!, points[(pointIndex + 1) % points.length]!);
      const neighbour = owners.get(key);
      if (neighbour === undefined) {
        owners.set(key, cellIndex);
      } else {
        adjacency[cellIndex]!.push(neighbour);
        adjacency[neighbour]!.push(cellIndex);
      }
    }
  }
  return adjacency;
}

function availableColours(
  index: number,
  adjacency: readonly (readonly number[])[],
  colours: readonly number[],
): number[] {
  const used = new Set(adjacency[index]!.map((neighbour) => colours[neighbour]!).filter((colour) => colour >= 0));
  return [0, 1, 2, 3].filter((colour) => !used.has(colour));
}

function neighbourhood(
  index: number,
  adjacency: readonly (readonly number[])[],
  colours: readonly number[],
  depth: number,
): number[] {
  const region = new Set([index]);
  let frontier = [index];
  for (let step = 0; step < depth; step++) {
    const next: number[] = [];
    for (const cell of frontier) {
      for (const neighbour of adjacency[cell]!) {
        if (colours[neighbour]! < 0 || region.has(neighbour)) continue;
        region.add(neighbour);
        next.push(neighbour);
      }
    }
    frontier = next;
  }
  return [...region];
}

function recolourRegion(
  region: readonly number[],
  adjacency: readonly (readonly number[])[],
  colours: number[],
  populations: number[],
): boolean {
  const previous = region.map((index) => colours[index]!);
  for (const index of region) {
    const colour = colours[index]!;
    if (colour >= 0) populations[colour]!--;
    colours[index] = -1;
  }

  const search = (remaining: number): boolean => {
    if (remaining === 0) return true;
    let selected = -1;
    let selectedAvailable: number[] = [];
    for (const index of region) {
      if (colours[index]! >= 0) continue;
      const available = availableColours(index, adjacency, colours);
      if (
        selected < 0 ||
        available.length < selectedAvailable.length ||
        (available.length === selectedAvailable.length && adjacency[index]!.length > adjacency[selected]!.length)
      ) {
        selected = index;
        selectedAvailable = available;
      }
    }
    selectedAvailable.sort((left, right) =>
      Number(left === 3) - Number(right === 3) || populations[left]! - populations[right]! || left - right,
    );
    for (const colour of selectedAvailable) {
      colours[selected] = colour;
      populations[colour]!++;
      if (search(remaining - 1)) return true;
      populations[colour]!--;
      colours[selected] = -1;
    }
    return false;
  };

  if (search(region.length)) return true;
  for (let offset = 0; offset < region.length; offset++) {
    const colour = previous[offset]!;
    colours[region[offset]!] = colour;
    if (colour >= 0) populations[colour]!++;
  }
  return false;
}

/**
 * Colour from the centre outwards so an enlarged patch does not recolour its interior.
 * The first three colours are balanced; the fourth is reserved for vertices whose
 * already-coloured neighbours use all three.
 */
function colourCells(cells: readonly Cell[], seed: number): number[] {
  const adjacency = cellAdjacency(cells);
  const colours = Array(cells.length).fill(-1) as number[];
  const populations = [0, 0, 0, 0];
  const order = cells
    .map((_, index) => index)
    .sort((left, right) => {
      const a = cells[left]!.site;
      const b = cells[right]!.site;
      const radiusDifference = a.point.x ** 2 + a.point.y ** 2 - b.point.x ** 2 - b.point.y ** 2;
      return radiusDifference || hash(seed, a.gridX, a.gridY, 4) - hash(seed, b.gridX, b.gridY, 4);
    });

  for (const index of order) {
    const available = availableColours(index, adjacency, colours);

    if (available.length === 0) {
      let repaired = false;
      for (const depth of [1, 2, 3]) {
        if (recolourRegion(neighbourhood(index, adjacency, colours, depth), adjacency, colours, populations)) {
          repaired = true;
          break;
        }
      }
      if (!repaired) {
        const coloured = order.filter((cell) => colours[cell]! >= 0);
        recolourRegion([index, ...coloured], adjacency, colours, populations);
      }
      continue;
    }

    const preferred = available.filter((colour) => colour < 3);
    const candidates = preferred.length > 0 ? preferred : available;
    const colour = candidates.reduce((best, candidate) =>
      populations[candidate]! < populations[best]! ? candidate : best,
    );
    colours[index] = colour;
    populations[colour]!++;
  }
  return colours;
}

export function generateVoronoi(radius: number, seed = currentDaySeed()): Tile[] {
  const integerSeed = seed >>> 0;
  const outputExtent = Math.ceil(radius) + OUTPUT_MARGIN;
  const allSites = generateSites(integerSeed, outputExtent + SITE_MARGIN);
  const buckets = bucketSites(allSites);
  const outputSites = allSites.filter((site) =>
    Math.abs(site.point.x) <= outputExtent && Math.abs(site.point.y) <= outputExtent);
  const cells = outputSites.map((site) => ({ site, points: voronoiCell(site, buckets) }));
  const colours = colourCells(cells, integerSeed);
  return cells.map((cell, index) => ({ kind: colours[index]!, points: cell.points }));
}

export const seededVoronoi: TilingDefinition = {
  id: 'seeded-voronoi',
  name: 'Seeded Voronoi mosaic',
  family: 'algorithmic',
  description:
    'A deterministic stained-glass mosaic. Seeded random candidates compete locally to form a hard-core site process, then perpendicular bisectors carve the plane into irregular convex Voronoi cells. The cell-adjacency map is coloured with three shades where possible and a fourth only where needed.',
  kinds: 4,
  kindLabels: ['Map colour 1', 'Map colour 2', 'Map colour 3', 'Map colour 4'],
  supportsThreeColours: true,
  reference: 'https://en.wikipedia.org/wiki/Voronoi_diagram',
  referenceLabel: 'Voronoi diagram — Wikipedia',
  unitTileArea: ROW_HEIGHT,
  generate: generateVoronoi,
};

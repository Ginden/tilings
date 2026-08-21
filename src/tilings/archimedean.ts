import { area, centroid } from '../geometry.js';
import type { Vec } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';

type LatticePoint = readonly [number, number, number, number];

interface LatticePattern {
  readonly t1: LatticePoint;
  readonly t2: LatticePoint;
  readonly seeds: readonly LatticePoint[];
}

interface PeriodicGeometry {
  readonly width: number;
  readonly height: number;
  readonly ownedTiles: readonly Tile[];
  readonly cellTiles: readonly Tile[];
  readonly meanTileArea: number;
  generate(radius: number): Tile[];
}

const SQRT2 = Math.sqrt(2);
const SQRT3 = Math.sqrt(3);
const EPSILON = 1e-8;

// Unit vectors at multiples of 30 degrees, represented exactly in the
// four-dimensional lattice basis used by Soto Sánchez et al.'s construction.
const POWERS: readonly LatticePoint[] = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [-1, 0, 1, 0],
  [0, -1, 0, 1],
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, -1, 0],
  [0, 0, 0, -1],
  [1, 0, -1, 0],
  [0, 1, 0, -1],
];

function add(a: LatticePoint, b: LatticePoint): LatticePoint {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
}

function scale(point: LatticePoint, amount: number): LatticePoint {
  return [point[0] * amount, point[1] * amount, point[2] * amount, point[3] * amount];
}

function plane(point: LatticePoint): Vec {
  return {
    x: point[0] + point[1] * SQRT3 / 2 + point[2] / 2,
    y: point[1] / 2 + point[2] * SQRT3 / 2 + point[3],
  };
}

function latticeKey(point: LatticePoint): string {
  return point.join(',');
}

function translated(
  point: LatticePoint,
  pattern: LatticePattern,
  i: number,
  j: number,
): LatticePoint {
  return add(point, add(scale(pattern.t1, i), scale(pattern.t2, j)));
}

/** Reconstruct one representative of every face in an oblique lattice cell. */
function latticeFaces(pattern: LatticePattern): readonly (readonly LatticePoint[])[] {
  const vertices = new Set<string>();
  for (const seed of pattern.seeds) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) vertices.add(latticeKey(translated(seed, pattern, i, j)));
    }
  }

  const faces: LatticePoint[][] = [];
  for (const seed of pattern.seeds) {
    const directions: number[] = [];
    for (let direction = 0; direction < 6; direction++) {
      if (vertices.has(latticeKey(add(seed, POWERS[direction]!)))) directions.push(direction);
    }
    for (let index = 0; index + 1 < directions.length; index++) {
      let direction = directions[index]!;
      const sides = 12 / (6 - (directions[index + 1]! - direction));
      const face: LatticePoint[] = [seed, add(seed, POWERS[direction]!)];
      for (let side = 2; side < sides; side++) {
        direction = (direction + 12 / sides) % 12;
        face.push(add(face[side - 1]!, POWERS[direction]!));
      }
      faces.push(face);
    }
  }
  return faces;
}

function rectangularPeriod(pattern: LatticePattern): { width: number; height: number } {
  const a = plane(pattern.t1);
  const b = plane(pattern.t2);
  let width = Infinity;
  let height = Infinity;
  for (let i = -12; i <= 12; i++) {
    for (let j = -12; j <= 12; j++) {
      if (i === 0 && j === 0) continue;
      const x = i * a.x + j * b.x;
      const y = i * a.y + j * b.y;
      if (Math.abs(y) < EPSILON && Math.abs(x) > EPSILON) width = Math.min(width, Math.abs(x));
      if (Math.abs(x) < EPSILON && Math.abs(y) > EPSILON) height = Math.min(height, Math.abs(y));
    }
  }
  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    throw new Error('The tiling lattice has no rectangular translation cell');
  }
  return { width, height };
}

function polygonKey(points: readonly Vec[]): string {
  return points
    .map((point) => `${Math.round(point.x * 1e7)},${Math.round(point.y * 1e7)}`)
    .sort()
    .join('|');
}

function intersectsRect(tile: Tile, width: number, height: number): boolean {
  const xs = tile.points.map((point) => point.x);
  const ys = tile.points.map((point) => point.y);
  return (
    Math.max(...xs) >= 0 &&
    Math.min(...xs) <= width &&
    Math.max(...ys) >= 0 &&
    Math.min(...ys) <= height
  );
}

function repeatOwnedTiles(
  ownedTiles: readonly Tile[],
  width: number,
  height: number,
  minColumn: number,
  maxColumn: number,
  minRow: number,
  maxRow: number,
): Tile[] {
  const tiles: Tile[] = [];
  for (let row = minRow; row <= maxRow; row++) {
    for (let column = minColumn; column <= maxColumn; column++) {
      for (const tile of ownedTiles) {
        tiles.push({
          kind: tile.kind,
          points: tile.points.map((point) => ({
            x: point.x + column * width,
            y: point.y + row * height,
          })),
        });
      }
    }
  }
  return tiles;
}

function periodicGeometry(
  rawFaces: readonly (readonly Vec[])[],
  width: number,
  height: number,
): PeriodicGeometry {
  const sideCounts = [...new Set(rawFaces.map((face) => face.length))].sort((a, b) => a - b);
  const seen = new Set<string>();
  const ownedTiles: Tile[] = [];
  for (const points of rawFaces) {
    const key = polygonKey(points);
    if (seen.has(key)) continue;
    seen.add(key);
    const centre = centroid(points);
    if (
      centre.x < -EPSILON ||
      centre.y < -EPSILON ||
      centre.x >= width - EPSILON ||
      centre.y >= height - EPSILON
    ) continue;
    ownedTiles.push({ kind: sideCounts.indexOf(points.length), points });
  }
  const cellTiles = repeatOwnedTiles(ownedTiles, width, height, -1, 1, -1, 1)
    .filter((tile) => intersectsRect(tile, width, height));
  const meanTileArea =
    ownedTiles.reduce((sum, tile) => sum + area(tile.points), 0) / ownedTiles.length;
  return {
    width,
    height,
    ownedTiles,
    cellTiles,
    meanTileArea,
    generate(radius: number): Tile[] {
      const columns = Math.ceil(radius / width) + 2;
      const rows = Math.ceil(radius / height) + 2;
      return repeatOwnedTiles(ownedTiles, width, height, -columns, columns, -rows, rows);
    },
  };
}

function geometryFromPattern(pattern: LatticePattern): PeriodicGeometry {
  const { width, height } = rectangularPeriod(pattern);
  const faces = latticeFaces(pattern);
  const rawFaces: Vec[][] = [];
  // This range covers the largest rectangular supercell below (snub hexagonal)
  // while retaining only faces whose centroids belong to that cell.
  for (let i = -12; i <= 12; i++) {
    for (let j = -12; j <= 12; j++) {
      for (const face of faces) {
        rawFaces.push(face.map((point) => plane(translated(point, pattern, i, j))));
      }
    }
  }
  return periodicGeometry(rawFaces, width, height);
}

function regularPolygon(sides: number, cx: number, cy: number, startAngle: number): Vec[] {
  const radius = 1 / (2 * Math.sin(Math.PI / sides));
  return Array.from({ length: sides }, (_, index) => {
    const angle = startAngle + index * 2 * Math.PI / sides;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });
}

function truncatedSquareGeometry(): PeriodicGeometry {
  const period = 1 + SQRT2;
  const rawFaces: Vec[][] = [];
  for (let row = -1; row <= 1; row++) {
    for (let column = -1; column <= 1; column++) {
      rawFaces.push(regularPolygon(8, column * period, row * period, Math.PI / 8));
      rawFaces.push(regularPolygon(4, (column + 0.5) * period, (row + 0.5) * period, 0));
    }
  }
  return periodicGeometry(rawFaces, period, period);
}

// Translation vectors and seeds are the eight 1-uniform cases from the public
// companion database to the lattice-construction paper cited in the UI.
const PATTERNS = {
  truncatedHexagonal: {
    t1: [-1, 0, 2, 2], t2: [2, 2, -1, -2],
    seeds: [[0, 0, 0, 0], [-1, 0, 2, 1], [0, 0, 1, 0], [0, 0, 1, 1], [0, 1, 1, 0], [1, 1, 1, 0]],
  },
  truncatedTrihexagonal: {
    t1: [0, 1, 3, 1], t2: [3, 1, -3, -2],
    seeds: [[0, 0, 0, 0], [2, 0, -2, 0], [1, 0, 0, 0], [1, 0, 0, 1], [2, 0, -1, 0], [1, 0, 1, 1], [2, 1, -2, -1], [0, 1, 2, 1], [3, 1, -3, -1], [2, 1, -1, -1], [1, 1, 1, 1], [3, 1, -1, -1]],
  },
  rhombitrihexagonal: {
    t1: [0, 1, 1, 1], t2: [1, 1, -1, -2],
    seeds: [[0, 0, 0, 0], [0, 1, 0, -2], [0, 1, 0, 0], [0, 1, 1, 0], [0, 2, 0, -2], [0, 2, 0, -1]],
  },
  trihexagonal: {
    t1: [2, 0, -2, 0], t2: [0, 0, 2, 0],
    seeds: [[0, 0, 0, 0], [1, 0, -1, 0], [1, 0, 0, 0]],
  },
  elongatedTriangular: {
    t1: [0, 0, 0, 1], t2: [1, 1, 0, -1],
    seeds: [[0, 0, 0, 0], [0, 1, 0, 0]],
  },
  snubSquare: {
    t1: [0, 1, 1, 0], t2: [1, 1, -1, -1],
    seeds: [[0, 0, 0, 0], [0, 1, 0, 0], [1, 1, -1, 0], [1, 1, 0, 0]],
  },
  snubHexagonal: {
    t1: [3, 0, -2, 0], t2: [2, 0, 1, 0],
    seeds: [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, -1, 0], [3, 0, -1, 0], [3, 0, 0, 0], [4, 0, -1, 0]],
  },
} as const satisfies Record<string, LatticePattern>;

interface DefinitionOptions {
  readonly id: string;
  readonly name: string;
  readonly vertexFigure: string;
  readonly description: string;
  readonly labels: readonly string[];
  readonly reference: string;
  readonly geometry: PeriodicGeometry;
  readonly handedness?: 'left' | 'right';
}

const methodReference = {
  label: 'Soto Sánchez, Medeiros e Sá & de Figueiredo — periodic regular-polygon lattice construction',
  url: 'https://doi.org/10.1109/SIBGRAPI.2018.00009',
};

function definition(options: DefinitionOptions): TilingDefinition {
  return {
    id: options.id,
    name: options.name,
    family: 'uniform',
    description: `${options.description} Its vertex figure is ${options.vertexFigure}.${
      options.handedness ? ` This is the ${options.handedness}-handed mirror form.` : ''
    }`,
    kinds: options.labels.length,
    kindLabels: options.labels,
    ...(options.labels.length === 3 ? { supportsThreeColours: true } : {}),
    reference: options.reference,
    furtherReferences: [methodReference],
    unitTileArea: options.geometry.meanTileArea,
    periodicCell: {
      width: options.geometry.width,
      height: options.geometry.height,
      tiles: options.geometry.cellTiles,
    },
    generate: (radius) => options.geometry.generate(radius),
  };
}

const trihexagonalGeometry = geometryFromPattern(PATTERNS.trihexagonal);
const truncatedSquare = truncatedSquareGeometry();
const truncatedHexagonal = geometryFromPattern(PATTERNS.truncatedHexagonal);
const rhombitrihexagonalGeometry = geometryFromPattern(PATTERNS.rhombitrihexagonal);
const elongatedGeometry = geometryFromPattern(PATTERNS.elongatedTriangular);
const truncatedTrihexagonalGeometry = geometryFromPattern(PATTERNS.truncatedTrihexagonal);
const snubSquareGeometry = geometryFromPattern(PATTERNS.snubSquare);
const rightSnubHexagonalGeometry = geometryFromPattern(PATTERNS.snubHexagonal);
const leftSnubHexagonalGeometry = periodicGeometry(
  repeatOwnedTiles(
    rightSnubHexagonalGeometry.ownedTiles,
    rightSnubHexagonalGeometry.width,
    rightSnubHexagonalGeometry.height,
    -1,
    1,
    -1,
    1,
  ).map((tile) => tile.points.map((point) => ({ x: -point.x, y: point.y }))),
  rightSnubHexagonalGeometry.width,
  rightSnubHexagonalGeometry.height,
);

export const trihexagonal = definition({
  id: 'trihexagonal', name: 'Trihexagonal tiling', vertexFigure: '3.6.3.6',
  description: 'The kagome pattern alternates regular triangles and hexagons around every vertex.',
  labels: ['Triangles', 'Hexagons'], reference: 'https://en.wikipedia.org/wiki/Trihexagonal_tiling',
  geometry: trihexagonalGeometry,
});

export const truncatedSquareTiling = definition({
  id: 'truncated-square', name: 'Truncated square tiling', vertexFigure: '4.8.8',
  description: 'Regular squares fill the gaps between pairs of regular octagons.',
  labels: ['Squares', 'Octagons'], reference: 'https://en.wikipedia.org/wiki/Truncated_square_tiling',
  geometry: truncatedSquare,
});

export const truncatedHexagonalTiling = definition({
  id: 'truncated-hexagonal', name: 'Truncated hexagonal tiling', vertexFigure: '3.12.12',
  description: 'Regular triangles fill the gaps between pairs of regular dodecagons.',
  labels: ['Triangles', 'Dodecagons'], reference: 'https://en.wikipedia.org/wiki/Truncated_hexagonal_tiling',
  geometry: truncatedHexagonal,
});

export const rhombitrihexagonal = definition({
  id: 'rhombitrihexagonal', name: 'Rhombitrihexagonal tiling', vertexFigure: '3.4.6.4',
  description: 'Triangles, squares and hexagons occur in the same order around every vertex.',
  labels: ['Triangles', 'Squares', 'Hexagons'], reference: 'https://en.wikipedia.org/wiki/Rhombitrihexagonal_tiling',
  geometry: rhombitrihexagonalGeometry,
});

export const elongatedTriangular = definition({
  id: 'elongated-triangular', name: 'Elongated triangular tiling', vertexFigure: '3.3.3.4.4',
  description: 'Rows of squares separate bands of equilateral triangles.',
  labels: ['Triangles', 'Squares'], reference: 'https://en.wikipedia.org/wiki/Elongated_triangular_tiling',
  geometry: elongatedGeometry,
});

export const truncatedTrihexagonal = definition({
  id: 'truncated-trihexagonal', name: 'Truncated trihexagonal tiling', vertexFigure: '4.6.12',
  description: 'Squares, hexagons and dodecagons meet once each at every vertex.',
  labels: ['Squares', 'Hexagons', 'Dodecagons'], reference: 'https://en.wikipedia.org/wiki/Truncated_trihexagonal_tiling',
  geometry: truncatedTrihexagonalGeometry,
});

export const snubSquare = definition({
  id: 'snub-square', name: 'Snub square tiling', vertexFigure: '3.3.4.3.4',
  description: 'Squares are separated by a pinwheel-like arrangement of equilateral triangles.',
  labels: ['Triangles', 'Squares'], reference: 'https://en.wikipedia.org/wiki/Snub_square_tiling',
  geometry: snubSquareGeometry,
});

export const leftSnubHexagonal = definition({
  id: 'snub-hexagonal-left', name: 'Snub hexagonal tiling — left-handed', vertexFigure: '3.3.3.3.6',
  description: 'Regular hexagons sit in a chiral sea of equilateral triangles.',
  labels: ['Triangles', 'Hexagons'], reference: 'https://en.wikipedia.org/wiki/Snub_trihexagonal_tiling',
  geometry: leftSnubHexagonalGeometry,
  handedness: 'left',
});

export const rightSnubHexagonal = definition({
  id: 'snub-hexagonal-right', name: 'Snub hexagonal tiling — right-handed', vertexFigure: '3.3.3.3.6',
  description: 'Regular hexagons sit in a chiral sea of equilateral triangles.',
  labels: ['Triangles', 'Hexagons'], reference: 'https://en.wikipedia.org/wiki/Snub_trihexagonal_tiling',
  geometry: rightSnubHexagonalGeometry,
  handedness: 'right',
});

export const ARCHIMEDEAN_TILINGS: readonly TilingDefinition[] = [
  trihexagonal,
  truncatedSquareTiling,
  truncatedHexagonalTiling,
  rhombitrihexagonal,
  elongatedTriangular,
  truncatedTrihexagonal,
  snubSquare,
  leftSnubHexagonal,
  rightSnubHexagonal,
];

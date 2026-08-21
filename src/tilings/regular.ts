import type { Tile, TilingDefinition } from './types.js';

const SQRT3 = Math.sqrt(3);

function intersectsCell(tile: Tile, width: number, height: number): boolean {
  const xs = tile.points.map((point) => point.x);
  const ys = tile.points.map((point) => point.y);
  return Math.max(...xs) >= 0 && Math.min(...xs) <= width &&
    Math.max(...ys) >= 0 && Math.min(...ys) <= height;
}

export function generateSquareTiling(radius: number): Tile[] {
  const limit = Math.ceil(radius) + 2;
  const tiles: Tile[] = [];
  for (let y = -limit; y <= limit; y++) {
    for (let x = -limit; x <= limit; x++) {
      tiles.push({
        kind: ((x + y) % 2 + 2) % 2,
        points: [
          { x, y },
          { x: x + 1, y },
          { x: x + 1, y: y + 1 },
          { x, y: y + 1 },
        ],
      });
    }
  }
  return tiles;
}

export function generateTriangularTiling(radius: number): Tile[] {
  const limit = Math.ceil(radius * 2) + 3;
  const tiles: Tile[] = [];
  for (let row = -limit; row <= limit; row++) {
    const y = row * SQRT3 / 2;
    const nextY = (row + 1) * SQRT3 / 2;
    for (let column = -limit; column <= limit; column++) {
      const x = column + row / 2;
      const nextX = column + (row + 1) / 2;
      tiles.push(
        {
          kind: 0,
          points: [{ x, y }, { x: x + 1, y }, { x: nextX, y: nextY }],
        },
        {
          kind: 1,
          points: [
            { x: x + 1, y },
            { x: nextX + 1, y: nextY },
            { x: nextX, y: nextY },
          ],
        },
      );
    }
  }
  return tiles;
}

function hexagon(cx: number, cy: number, kind: number): Tile {
  return {
    kind,
    points: Array.from({ length: 6 }, (_, index) => {
      const angle = index * Math.PI / 3;
      return { x: cx + Math.cos(angle), y: cy + Math.sin(angle) };
    }),
  };
}

export function generateHexagonalTiling(radius: number): Tile[] {
  const limit = Math.ceil(radius * 2) + 3;
  const tiles: Tile[] = [];
  for (let column = -limit; column <= limit; column++) {
    for (let row = -limit; row <= limit; row++) {
      tiles.push(hexagon(1.5 * column, SQRT3 * (row + column / 2), ((column % 2) + 2) % 2));
    }
  }
  return tiles;
}

function cellTiles(
  generate: (radius: number) => Tile[],
  width: number,
  height: number,
): readonly Tile[] {
  return generate(Math.hypot(width, height) + 3).filter((tile) =>
    intersectsCell(tile, width, height),
  );
}

const squareCell = {
  width: 2,
  height: 2,
  tiles: cellTiles(generateSquareTiling, 2, 2),
};

const triangularCell = {
  width: 1,
  height: SQRT3,
  tiles: cellTiles(generateTriangularTiling, 1, SQRT3),
};

const hexagonalCell = {
  width: 3,
  height: SQRT3,
  tiles: cellTiles(generateHexagonalTiling, 3, SQRT3),
};

export const triangular: TilingDefinition = {
  id: 'triangular',
  name: 'Triangular tiling',
  family: 'regular',
  description:
    'The regular tiling by equilateral triangles: six triangles meet at every vertex. Upward- and downward-pointing tiles form the two colour classes.',
  kinds: 2,
  kindLabels: ['Upward triangles', 'Downward triangles'],
  reference: 'https://en.wikipedia.org/wiki/Triangular_tiling',
  unitTileArea: SQRT3 / 4,
  periodicCell: triangularCell,
  generate: generateTriangularTiling,
};

export const square: TilingDefinition = {
  id: 'square',
  name: 'Square tiling',
  family: 'regular',
  description:
    'The familiar regular tiling by squares, with four squares meeting at every vertex. The two classes make a chequerboard colouring.',
  kinds: 2,
  kindLabels: ['Even squares', 'Odd squares'],
  reference: 'https://en.wikipedia.org/wiki/Square_tiling',
  unitTileArea: 1,
  periodicCell: squareCell,
  generate: generateSquareTiling,
};

export const hexagonal: TilingDefinition = {
  id: 'hexagonal',
  name: 'Hexagonal tiling',
  family: 'regular',
  description:
    'The regular honeycomb tiling by hexagons, with three hexagons meeting at every vertex. Alternating columns distinguish the two colour classes.',
  kinds: 2,
  kindLabels: ['Even columns', 'Odd columns'],
  reference: 'https://en.wikipedia.org/wiki/Hexagonal_tiling',
  unitTileArea: 3 * SQRT3 / 2,
  periodicCell: hexagonalCell,
  generate: generateHexagonalTiling,
};

import { area, bounds, centroid } from '../geometry.js';
import type { Vec } from '../geometry.js';
import { ARCHIMEDEAN_TILINGS } from './archimedean.js';
import type { Tile, TilingDefinition } from './types.js';

/** Join face centres around each vertex of an Archimedean translation cell. */
function dualTiling(
  sourceId: string,
  metadata: Pick<TilingDefinition, 'id' | 'name' | 'description' | 'reference' | 'kindLabels'>,
): TilingDefinition {
  const source = ARCHIMEDEAN_TILINGS.find((tiling) => tiling.id === sourceId)!;
  const { width, height } = source.periodicCell!;
  const kinds = metadata.kindLabels.length;
  const vertices = new Map<string, { point: Vec; faces: { centre: Vec; sides: number }[] }>();
  // The source's padded patch contains every face incident to an owned vertex.
  for (const tile of source.generate(Math.hypot(width, height))) {
    const centre = centroid(tile.points);
    for (const point of tile.points) {
      if (point.x < -1e-8 || point.y < -1e-8 ||
          point.x >= width - 1e-8 || point.y >= height - 1e-8) continue;
      const key = `${Math.round(point.x * 1e7)},${Math.round(point.y * 1e7)}`;
      let vertex = vertices.get(key);
      if (!vertex) {
        vertex = { point, faces: [] };
        vertices.set(key, vertex);
      }
      vertex.faces.push({ centre, sides: tile.points.length });
    }
  }
  const owned: Tile[] = [...vertices.values()].map(({ point, faces }) => {
    faces.sort((a, b) =>
      Math.atan2(a.centre.y - point.y, a.centre.x - point.x) -
      Math.atan2(b.centre.y - point.y, b.centre.x - point.x));
    const smallest = faces.reduce((a, b) => a.sides <= b.sides ? a : b).centre;
    // Opposite directions share a colour; the axis toward the smallest source
    // face distinguishes three rhomb/kite orientations or two triangle axes.
    const angle = Math.atan2(smallest.y - point.y, smallest.x - point.x);
    // Snap to the 15° lattice before grouping axes, avoiding half-step
    // rounding differences between translated copies of the same orientation.
    const orientation = Math.floor(Math.round(angle * 12 / Math.PI) / (12 / kinds));
    return { kind: ((orientation % kinds) + kinds) % kinds, points: faces.map((face) => face.centre) };
  });
  function repeat(columns: number, rows: number): Tile[] {
    const tiles: Tile[] = [];
    for (let row = -rows; row <= rows; row++) {
      for (let column = -columns; column <= columns; column++) {
        for (const tile of owned) {
          tiles.push({ kind: tile.kind, points: tile.points.map((point) => ({
            x: point.x + column * width, y: point.y + row * height,
          })) });
        }
      }
    }
    return tiles;
  }
  return {
    ...metadata,
    family: 'laves',
    kinds,
    supportsThreeColours: kinds === 3,
    unitTileArea: owned.reduce((sum, tile) => sum + area(tile.points), 0) / owned.length,
    periodicCell: { width, height, tiles: repeat(1, 1).filter((tile) => {
      const box = bounds(tile.points);
      return box.maxX >= 0 && box.minX <= width && box.maxY >= 0 && box.minY <= height;
    }) },
    generate: (radius) => repeat(Math.ceil(radius / width) + 2, Math.ceil(radius / height) + 2),
  };
}

export const LAVES_TILINGS: readonly TilingDefinition[] = [
  dualTiling('trihexagonal', {
    id: 'rhombille',
    name: 'Rhombille (tumbling blocks)',
    description: 'Congruent 60° rhombs form the dual of the trihexagonal tiling. Three orientation colours reveal the classic tumbling-blocks illusion; three or six rhombs meet at each vertex.',
    kindLabels: ['Rhomb axis 1', 'Rhomb axis 2', 'Rhomb axis 3'],
    reference: 'https://en.wikipedia.org/wiki/Rhombille_tiling',
  }),
  dualTiling('truncated-square', {
    id: 'tetrakis-square',
    name: 'Tetrakis square',
    description: 'Congruent isosceles right triangles form the dual of the truncated square tiling, equivalent to dividing each square along both diagonals. Colours distinguish the two triangle axes.',
    kindLabels: ['Triangle axis 1', 'Triangle axis 2'],
    reference: 'https://en.wikipedia.org/wiki/Tetrakis_square_tiling',
  }),
  dualTiling('rhombitrihexagonal', {
    id: 'deltoidal-trihexagonal',
    name: 'Deltoidal trihexagonal',
    description: 'Congruent kites form the dual of the rhombitrihexagonal tiling. Each kite has angles of 60°, 90°, 120° and 90°; colours distinguish three axes, pairing opposite orientations.',
    kindLabels: ['Kite axis 1', 'Kite axis 2', 'Kite axis 3'],
    reference: 'https://en.wikipedia.org/wiki/Deltoidal_trihexagonal_tiling',
  }),
];

import { describe, expect, it } from 'vitest';
import { area, centroid, dist } from '../src/geometry.js';
import { LAVES_TILINGS } from '../src/tilings/laves.js';

const angles: Record<string, number[]> = {
  rhombille: [60, 60, 120, 120],
  'tetrakis-square': [45, 45, 90],
  'deltoidal-trihexagonal': [60, 90, 90, 120],
};

for (const tiling of LAVES_TILINGS) {
  describe(tiling.id, () => {
    it('has congruent prototiles with the expected angles and equal orientation populations', () => {
      const tiles = tiling.generate(4);
      const populations = Array.from({ length: tiling.kinds }, () => 0);
      for (const tile of tiles) {
        populations[tile.kind]!++;
        expect(area(tile.points)).toBeCloseTo(tiling.unitTileArea, 9);
        const actual = tile.points.map((point, index, points) => {
          const previous = points[(index + points.length - 1) % points.length]!;
          const next = points[(index + 1) % points.length]!;
          const cosine = ((previous.x - point.x) * (next.x - point.x) +
            (previous.y - point.y) * (next.y - point.y)) / (dist(previous, point) * dist(next, point));
          return Math.acos(cosine) * 180 / Math.PI;
        }).sort((a, b) => a - b);
        expect(actual).toHaveLength(angles[tiling.id]!.length);
        actual.forEach((angle, index) => expect(angle).toBeCloseTo(angles[tiling.id]![index]!, 8));
      }
      expect(new Set(populations).size).toBe(1);
      expect(populations[0]).toBeGreaterThan(0);
    });

    it('gives translated copies of the same orientation the same colour', () => {
      const colours = new Map<string, number>();
      for (const tile of tiling.generate(4)) {
        const centre = centroid(tile.points);
        const shape = tile.points.map((point) =>
          `${Math.round((point.x - centre.x) * 1e7)},${Math.round((point.y - centre.y) * 1e7)}`
        ).sort().join('|');
        if (colours.has(shape)) expect(tile.kind).toBe(colours.get(shape));
        else colours.set(shape, tile.kind);
      }
    });

    it('pairs every interior edge exactly twice, including translation boundaries', () => {
      const edges = new Map<string, number>();
      const key = (x: number, y: number) => `${Math.round(x * 1e7)},${Math.round(y * 1e7)}`;
      for (const tile of tiling.generate(8)) {
        tile.points.forEach((a, index, points) => {
          const b = points[(index + 1) % points.length]!;
          if (Math.max(Math.abs(a.x), Math.abs(a.y), Math.abs(b.x), Math.abs(b.y)) > 7) return;
          const edge = [key(a.x, a.y), key(b.x, b.y)].sort().join('|');
          edges.set(edge, (edges.get(edge) ?? 0) + 1);
        });
      }
      expect(edges.size).toBeGreaterThan(20);
      expect(new Set(edges.values())).toEqual(new Set([2]));
    });
  });
}

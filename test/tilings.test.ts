import { describe, expect, it } from 'vitest';
import { TILINGS } from '../src/tilings/index.js';
import type { Tile } from '../src/tilings/types.js';
import { PHI, area } from '../src/geometry.js';
import { P1_OUTLINES, generateP1, penroseP1 } from '../src/tilings/p1.js';
import { subdivideP2, subdivideP3, sunSeed, triangleArea } from '../src/tilings/penrose.js';
import { subdividePinwheel } from '../src/tilings/pinwheel.js';
import type { Tri } from '../src/tilings/substitution.js';

function pointInPolygon(x: number, y: number, points: readonly { x: number; y: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i]!;
    const b = points[j]!;
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) {
      inside = !inside;
    }
  }
  return inside;
}

/** Deterministic pseudo random numbers, so failures are reproducible. */
function makeRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function coverCounts(tiles: readonly Tile[], radius: number, samples: number): number[] {
  const random = makeRandom(20250808);
  const counts: number[] = [];
  for (let i = 0; i < samples; i++) {
    const r = radius * Math.sqrt(random());
    const a = random() * 2 * Math.PI;
    const x = r * Math.cos(a);
    const y = r * Math.sin(a);
    let hits = 0;
    for (const tile of tiles) {
      if (pointInPolygon(x, y, tile.points)) hits++;
    }
    counts.push(hits);
  }
  return counts;
}

describe('tiling registry', () => {
  it('has unique ids and consistent metadata', () => {
    const ids = new Set(TILINGS.map((t) => t.id));
    expect(ids.size).toBe(TILINGS.length);
    for (const def of TILINGS) {
      expect(def.kindLabels.length).toBe(def.kinds);
      expect(def.unitTileArea).toBeGreaterThan(0);
      expect(def.reference).toMatch(/^https:\/\//);
    }
  });

  for (const def of TILINGS) {
    describe(def.id, () => {
      const radius = 14;
      const tiles = def.generate(radius);

      it('produces well formed tiles', () => {
        expect(tiles.length).toBeGreaterThan(20);
        for (const tile of tiles) {
          expect(tile.points.length).toBeGreaterThanOrEqual(3);
          expect(tile.kind).toBeGreaterThanOrEqual(0);
          expect(tile.kind).toBeLessThan(def.kinds);
          for (const p of tile.points) {
            expect(Number.isFinite(p.x)).toBe(true);
            expect(Number.isFinite(p.y)).toBe(true);
          }
          expect(area(tile.points)).toBeGreaterThan(1e-9);
        }
      });

      it('tile areas match the declared unit area', () => {
        const mean = tiles.reduce((sum, t) => sum + area(t.points), 0) / tiles.length;
        expect(mean).toBeGreaterThan(def.unitTileArea * 0.6);
        expect(mean).toBeLessThan(def.unitTileArea * 1.7);
      });

      it('covers the requested disc exactly once', () => {
        const counts = coverCounts(tiles, radius * 0.7, 220);
        const gaps = counts.filter((c) => c === 0).length;
        const overlaps = counts.filter((c) => c > 1).length;
        expect({ gaps, overlaps }).toEqual({ gaps: 0, overlaps: 0 });
      });
    });
  }
});

describe('Robinson triangle substitutions', () => {
  const seed = sunSeed(PHI * PHI);

  for (const [name, rule] of [
    ['P3', subdivideP3],
    ['P2', subdivideP2],
  ] as const) {
    it(`${name} preserves area and produces golden triangles`, () => {
      for (const parent of seed) {
        const children = rule(parent);
        const total = children.reduce((sum, c) => sum + triangleArea(c), 0);
        expect(total).toBeCloseTo(triangleArea(parent), 9);
        for (const child of children) {
          const sides = [
            Math.hypot(child.a.x - child.b.x, child.a.y - child.b.y),
            Math.hypot(child.a.x - child.c.x, child.a.y - child.c.y),
            Math.hypot(child.b.x - child.c.x, child.b.y - child.c.y),
          ];
          // The apex is `a`; its two adjacent sides are equal.
          expect(sides[0]).toBeCloseTo(sides[1]!, 9);
          const ratio = sides[2]! / sides[0]!;
          expect(child.kind === 0 ? 1 / PHI : PHI).toBeCloseTo(ratio, 9);
        }
      }
    });
  }
});

describe('P1 pentagonal decomposition', () => {
  it('produces all six prototiles with the expected outlines', () => {
    const tiles = generateP1(3);
    expect(new Set(tiles.map((tile) => tile.kind))).toEqual(new Set([0, 1, 2, 3, 4, 5]));
    expect(P1_OUTLINES.P).toHaveLength(5);
    expect(P1_OUTLINES.Q).toHaveLength(5);
    expect(P1_OUTLINES.R).toHaveLength(5);
    expect(P1_OUTLINES.G).toHaveLength(10);
    expect(P1_OUTLINES.B).toHaveLength(7);
    expect(P1_OUTLINES.D).toHaveLength(4);
  });

  it('uses unit edges for every prototile', () => {
    for (const outline of Object.values(P1_OUTLINES)) {
      for (let i = 0; i < outline.length; i++) {
        const a = outline[i]!;
        const b = outline[(i + 1) % outline.length]!;
        expect(Math.hypot(b.x - a.x, b.y - a.y)).toBeCloseTo(1, 9);
      }
    }
  });

  it('keeps a large requested disc inside the complete supertile interior', () => {
    const tiles = penroseP1.generate(192);
    expect(tiles.length).toBeLessThan(120_000);
    const probes: readonly [number, number][] = [
      [-143.7, -95.4],
      [-127.6, -79.3],
      [127.4, -95.7],
      [143.2, -79.6],
    ];
    for (const [x, y] of probes) {
      expect(tiles.filter((tile) => pointInPolygon(x, y, tile.points))).toHaveLength(1);
    }
  });
});

describe('multigrid generation bounds', () => {
  it('searches in dual-grid scale instead of generating a full-radius grid', () => {
    const tiles = TILINGS.find((tiling) => tiling.id === 'decagonal')!.generate(100);
    expect(tiles.length).toBeLessThan(50_000);
  });
});

describe('pinwheel substitution', () => {
  it('splits into five copies scaled by 1/sqrt(5)', () => {
    const parent: Tri = { kind: 0, a: { x: 0, y: 0 }, b: { x: 2, y: 0 }, c: { x: 0, y: 1 } };
    const children = subdividePinwheel(parent);
    expect(children).toHaveLength(5);
    const total = children.reduce((sum, c) => sum + triangleArea(c), 0);
    expect(total).toBeCloseTo(triangleArea(parent), 9);
    for (const child of children) {
      const long = Math.hypot(child.b.x - child.a.x, child.b.y - child.a.y);
      const short = Math.hypot(child.c.x - child.a.x, child.c.y - child.a.y);
      const hyp = Math.hypot(child.b.x - child.c.x, child.b.y - child.c.y);
      expect(long).toBeCloseTo(2 / Math.sqrt(5), 9);
      expect(short).toBeCloseTo(1 / Math.sqrt(5), 9);
      expect(hyp).toBeCloseTo(1, 9);
    }
    // Both chiralities occur, which is what the two colours show.
    expect(new Set(children.map((c) => c.kind)).size).toBe(2);
  });
});

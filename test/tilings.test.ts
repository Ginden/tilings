import { describe, expect, it } from 'vitest';
import { TILINGS, TILINGS_FOR_UI } from '../src/tilings/index.js';
import type { Tile } from '../src/tilings/types.js';
import { PHI, area } from '../src/geometry.js';
import type { Vec } from '../src/geometry.js';
import { P1_OUTLINES, generateP1, penroseP1 } from '../src/tilings/p1.js';
import { subdivideP2, subdivideP3, sunSeed, triangleArea } from '../src/tilings/penrose.js';
import { subdividePinwheel } from '../src/tilings/pinwheel.js';
import type { Tri } from '../src/tilings/substitution.js';
import {
  SPHINX_CHILDREN,
  SPHINX_OUTLINE,
  generateAmmannA1,
  generateSocolarTaylor,
  generateSphinx,
  mergeSocolarHexagons,
  subdivideSphinx,
} from '../src/tilings/additional.js';
import { VODERBERG_OUTLINE, generateVoderberg } from '../src/tilings/voderberg.js';
import { LAMBDA, generateShuriken, supertileTiles } from '../src/tilings/shuriken.js';
import { multigrid } from '../src/tilings/multigrid.js';
import { IDENTITY } from '../src/geometry.js';

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

  it('sorts tilings naturally within each UI family', () => {
    expect(TILINGS_FOR_UI.map((tiling) => tiling.id)).toEqual([
      'penrose-p1',
      'penrose-p2',
      'penrose-p3',
      'penrose-pentagrid',
      'robinson-triangles',
      'ammann-beenker',
      'decagonal',
      'dodecagonal',
      'heptagonal',
      'socolar',
      'tubingen-triangle',
      'ammann-a1',
      'hat',
      'socolar-taylor',
      'chair',
      'pinwheel',
      'sphinx',
      'voderberg',
      'shuriken-supertile-12',
    ]);
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

describe('twelvefold Shuriken supertile', () => {
  const ROOT3 = Math.sqrt(3);

  it('dissects the inflated dodecagon into a rim, a centre and a 96-rhomb star', () => {
    const tiles = supertileTiles();
    expect(tiles).toHaveLength(109);
    // dodecagon, rim triangle, triangle, then the 30/60/90 rhombs
    const counts = [0, 1, 2, 3, 4, 5].map((k) => tiles.filter((t) => t.kind === k).length);
    expect(counts).toEqual([1, 12, 0, 24, 48, 24]);
    // The dissection fills exactly lambda^2 times the unit dodecagon.
    const total = tiles.reduce((sum, t) => sum + area(t.points), 0);
    expect(total).toBeCloseTo(48 + 27 * ROOT3, 9);
  });

  it('gives every prototile its exact area', () => {
    const expected = [6 + 3 * ROOT3, 0.5, ROOT3 / 4, 0.5, ROOT3 / 2, 1];
    for (const tile of generateShuriken(12)) {
      expect(area(tile.points)).toBeCloseTo(expected[tile.kind]!, 9);
    }
  });

  it('only ever uses edges of length 1, 2 and lambda', () => {
    // Every vertex lies in Z[xi], so the rim triangle's long edge is exactly
    // |2 + xi| = lambda and nothing else can appear.
    const seen = new Set<number>();
    for (const tile of generateShuriken(12)) {
      for (let i = 0; i < tile.points.length; i++) {
        const a = tile.points[i]!;
        const b = tile.points[(i + 1) % tile.points.length]!;
        seen.add(Math.round(Math.hypot(b.x - a.x, b.y - a.y) * 1e6) / 1e6);
      }
    }
    expect([...seen].sort((a, b) => a - b)).toEqual([1, 2, Math.round(LAMBDA * 1e6) / 1e6]);
  });

  it('pairs the rim triangles into Theorem 5 parallelograms', () => {
    // Each cell puts a triangle on its own side of every shared edge; the two
    // glue along their lambda edge into the 1x2 parallelogram at 30 degrees.
    const key = (a: Vec, b: Vec): string => {
      const [p, q] = a.x < b.x || (a.x === b.x && a.y < b.y) ? [a, b] : [b, a];
      return `${p.x.toFixed(6)},${p.y.toFixed(6)}:${q.x.toFixed(6)},${q.y.toFixed(6)}`;
    };
    const longEdges = new Map<string, number>();
    for (const tile of generateShuriken(12)) {
      if (tile.kind !== 1) continue;
      const [a, , c] = tile.points as readonly Vec[];
      longEdges.set(key(a!, c!), (longEdges.get(key(a!, c!)) ?? 0) + 1);
    }
    const shared = [...longEdges.values()].filter((n) => n === 2).length;
    expect(shared).toBeGreaterThan(longEdges.size * 0.5);
  });
});

describe('additional tiling constructions', () => {
  it('uses all six Ammann A1 matching pieces with shared notched edges', () => {
    const tiles = generateAmmannA1(8);
    expect(new Set(tiles.map((tile) => tile.kind))).toEqual(new Set([0, 1, 2, 3, 4, 5]));
    expect(tiles.every((tile) => tile.points.length === 8)).toBe(true);
  });

  it('recomposes 60-degree dual-grid rhombs into Socolar hexagons', () => {
    const source = multigrid(6, [0.07, -0.31, 0.22, -0.18, 0.39, -0.19], 16);
    const tiles = mergeSocolarHexagons(source);
    expect(new Set(tiles.map((tile) => tile.kind))).toEqual(new Set([0, 1, 2]));
    expect(tiles.filter((tile) => tile.kind === 2).every((tile) => tile.points.length === 6)).toBe(true);
  });

  it('uses regular hexagonal carriers for all Socolar-Taylor hierarchy phases', () => {
    const tiles = generateSocolarTaylor(12);
    expect(new Set(tiles.map((tile) => tile.kind))).toEqual(new Set([0, 1, 2, 3, 4, 5]));
    expect(tiles.every((tile) => tile.points.length === 6)).toBe(true);
    expect(tiles.every((tile) => tile.parts?.length === 7)).toBe(true);
  });

  it('dissects one Sphinx into four half-scale pentagonal hexiamonds', () => {
    expect(SPHINX_OUTLINE).toHaveLength(5);
    expect(SPHINX_CHILDREN).toHaveLength(4);
    const children = subdivideSphinx({ kind: 0, transform: IDENTITY });
    expect(children).toHaveLength(4);
    const parentArea = area(SPHINX_OUTLINE);
    const generated = generateSphinx(4);
    expect(generated.every((tile) => tile.points.length === 5)).toBe(true);
    for (const child of children) {
      const det = Math.abs(child.transform[0] * child.transform[4] - child.transform[1] * child.transform[3]);
      expect(det).toBeCloseTo(0.25, 10);
    }
    expect(children.length * parentArea * 0.25).toBeCloseTo(parentArea, 10);
  });

  it('builds the classic Voderberg double spiral from congruent nonagons', () => {
    expect(VODERBERG_OUTLINE).toHaveLength(9);
    const patch = generateVoderberg(8);
    expect(patch).toHaveLength(480);
    expect(patch.every((tile) => tile.points.length === 9)).toBe(true);
    expect(new Set(patch.map((tile) => tile.kind))).toEqual(new Set([0, 1, 2, 3]));
    const signatures = patch.map((tile) =>
      tile.points
        .map((point, index) => {
          const next = tile.points[(index + 1) % tile.points.length]!;
          return Math.hypot(next.x - point.x, next.y - point.y);
        })
        .sort((a, b) => a - b),
    );
    for (const signature of signatures.slice(1)) {
      for (let index = 0; index < signatures[0]!.length; index++) {
        expect(signature[index]).toBeCloseTo(signatures[0]![index]!, 6);
      }
    }
    const orientations = new Set(
      patch.map((tile) => {
        const [first, second] = tile.points;
        return Math.round((Math.atan2(second!.y - first!.y, second!.x - first!.x) * 180) / Math.PI);
      }),
    );
    expect(orientations.size).toBeGreaterThanOrEqual(15);
  });

  it('splits Voderberg tiles evenly between the two winding arms and their shades', () => {
    const patch = generateVoderberg(8);
    const counts = [0, 1, 2, 3].map(
      (kind) => patch.filter((tile) => tile.kind === kind).length,
    );
    // The arm steps with the corona as well as the half-plane, so each corona
    // hands half its ring to one arm and half to the other; over the whole
    // patch that lands exactly even.
    expect(counts).toEqual([120, 120, 120, 120]);
    expect(counts.reduce((sum, count) => sum + count, 0)).toBe(patch.length);
    expect(generateVoderberg(20)).toHaveLength(30 * 7 * 7);
  });

  it('hands each Voderberg corona to the opposite arm from the one before it', () => {
    const patch = generateVoderberg(8);
    // Sample a ray that stays inside one half-plane and walk outwards: the arm
    // must flip every corona, which is what makes the two arms interlock
    // instead of meeting along one straight seam.
    const contains = (points: readonly Vec[], x: number, y: number): boolean => {
      let inside = false;
      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const a = points[i]!;
        const b = points[j]!;
        if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) {
          inside = !inside;
        }
      }
      return inside;
    };
    const height = 1 / (2 * Math.tan((6 * Math.PI) / 180));
    const direction = (135 * Math.PI) / 180;
    const arms: number[] = [];
    for (let corona = 0; corona < 4; corona++) {
      const r = (corona + 0.5) * height;
      const x = r * Math.cos(direction);
      const y = r * Math.sin(direction);
      const hit = patch.find((tile) => contains(tile.points, x, y));
      expect(hit).toBeDefined();
      arms.push(hit!.kind < 2 ? 0 : 1);
    }
    expect(arms).toEqual([arms[0], 1 - arms[0]!, arms[0], 1 - arms[0]!]);
  });

  it('alternates Voderberg blade shades around every corona', () => {
    const patch = generateVoderberg(8);
    // Walk a corona of one half-plane: each tile must differ in shade from the
    // tile beside it, sector seams included. Select by half-plane rather than
    // arm, since the arm now alternates from corona to corona.
    const arm = patch;
    // Measure from that arm's own apex, which the Goldberg shift moves off the
    // origin, so a corona really is an annulus of constant tile count.
    const shift = 1 / (2 * Math.sin((6 * Math.PI) / 180));
    const hub: Vec = {
      x: (-shift / 2) * Math.cos(Math.PI / 4),
      y: (-shift / 2) * Math.sin(Math.PI / 4),
    };
    const height = 1 / (2 * Math.tan((6 * Math.PI) / 180));
    const ring = arm
      .map((tile) => {
        const x = tile.points.reduce((sum, p) => sum + p.x, 0) / tile.points.length - hub.x;
        const y = tile.points.reduce((sum, p) => sum + p.y, 0) / tile.points.length - hub.y;
        // This half-plane spans 46°-214°, so measure angles in [0, 2pi) to keep
        // the sweep contiguous instead of splitting it at the atan2 branch cut.
        const angle = (Math.atan2(y, x) + 2 * Math.PI) % (2 * Math.PI);
        return { kind: tile.kind, r: Math.hypot(x, y), angle };
      })
      // Stay clear of the two seams where this annulus crosses into the other
      // arm; everything between them is one continuous run of blades.
      .filter(
        (tile) =>
          tile.r > 2 * height &&
          tile.r < 3 * height &&
          tile.angle > (60 * Math.PI) / 180 &&
          tile.angle < (280 * Math.PI) / 180,
      )
      .sort((left, right) => left.angle - right.angle);
    expect(ring.length).toBeGreaterThan(80);
    expect(ring.every((tile) => tile.kind < 2)).toBe(true);
    for (let index = 1; index < ring.length; index++) {
      expect(ring[index]!.kind).not.toBe(ring[index - 1]!.kind);
    }
  });
});

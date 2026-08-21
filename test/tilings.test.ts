import { describe, expect, it } from 'vitest';
import { TILINGS, TILINGS_FOR_UI } from '../src/tilings/index.js';
import type { Tile } from '../src/tilings/types.js';
import { PHI, area, centroid } from '../src/geometry.js';
import type { Vec } from '../src/geometry.js';
import { P1_OUTLINES, generateP1, penroseP1 } from '../src/tilings/p1.js';
import { subdivideP2, subdivideP3, sunSeed, triangleArea } from '../src/tilings/penrose.js';
import { subdividePinwheel } from '../src/tilings/pinwheel.js';
import type { Tri } from '../src/tilings/substitution.js';
import {
  SPHINX_CHILDREN,
  SPHINX_OUTLINE,
  generateSphinx,
  mergeSocolarHexagons,
  subdivideSphinx,
} from '../src/tilings/additional.js';
import { VODERBERG_OUTLINE, generateVoderberg } from '../src/tilings/voderberg.js';
import {
  LAMBDA,
  SHURIKEN_PROTOTILES,
  SHURIKEN_SUBSTITUTION_COUNTS,
  generateShuriken,
  supertileTiles,
} from '../src/tilings/shuriken.js';
import { SHURIKEN_RULES } from '../src/tilings/shuriken-rule-data.js';
import {
  generateSquiral,
  squiralBlockStep,
  squiralOutline,
  squiralSymbol,
  subdivideSquiral,
} from '../src/tilings/squiral.js';
import {
  ATOMS,
  JEANDEL_RAO_T,
  JEANDEL_RAO_T_PRIME,
  JR_START,
  JR_TORUS_HEIGHT,
  generateJeandelRao,
  jeandelRaoTileAt,
  toTorus,
  torusToTile,
  wangTileTriangles,
} from '../src/tilings/jeandel-rao.js';
import { multigrid } from '../src/tilings/multigrid.js';
import { IDENTITY, apply, mul, rotation, scaling } from '../src/geometry.js';
import {
  DANZER_EDGE_LENGTHS,
  DANZER_INFLATION,
  DANZER_SUBSTITUTION_COUNTS,
  generateDanzerSevenfold,
  subdivideDanzer,
} from '../src/tilings/danzer-sevenfold.js';
import {
  WATANABE_ITO_SOMA_CLUSTER_COUNTS,
  WATANABE_ITO_SOMA_EFFECTIVE_COUNTS,
  WATANABE_ITO_SOMA_INFLATION,
  generateWatanabeItoSomaEightfold,
  subdivideWatanabeItoSoma,
} from '../src/tilings/watanabe-ito-soma-eightfold.js';

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
      'hexagonal',
      'square',
      'triangular',
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
      'hat',
      'chair',
      'pinwheel',
      'sphinx',
      'voderberg',
      'danzer-sevenfold',
      'jeandel-rao',
      'shuriken-supertile-12',
      'squiral',
      'watanabe-ito-soma-eightfold',
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

describe('Watanabe–Ito–Soma eightfold tiling', () => {
  function edges(points: readonly Vec[]): number[] {
    return points.map((point, index) => {
      const next = points[(index + 1) % points.length]!;
      return Math.hypot(next.x - point.x, next.y - point.y);
    });
  }

  function edgeKey(a: Vec, b: Vec): string {
    const pointKey = (point: Vec): string =>
      `${Math.round(point.x * 1e7)},${Math.round(point.y * 1e7)}`;
    const first = pointKey(a);
    const second = pointKey(b);
    return first < second ? `${first}|${second}` : `${second}|${first}`;
  }

  it('uses the explicit overlapping square and rhomb clusters', () => {
    const square = subdivideWatanabeItoSoma([{ kind: 0, x: 0, y: 0, rotation: 0 }]);
    const rhomb = subdivideWatanabeItoSoma([{ kind: 1, x: 0, y: 0, rotation: 0 }]);
    const counts = (tiles: typeof square): number[] => [
      tiles.filter((tile) => tile.kind === 0).length,
      tiles.filter((tile) => tile.kind === 1).length,
    ];
    expect(counts(square)).toEqual(WATANABE_ITO_SOMA_CLUSTER_COUNTS[0]);
    expect(counts(rhomb)).toEqual(WATANABE_ITO_SOMA_CLUSTER_COUNTS[1]);
  });

  it('preserves both prototile areas after shared boundary halves are paired', () => {
    const areas = [1, Math.SQRT1_2];
    const inflationArea = WATANABE_ITO_SOMA_INFLATION ** 2;
    for (let parent = 0; parent < 2; parent++) {
      const childArea = WATANABE_ITO_SOMA_EFFECTIVE_COUNTS[parent]!.reduce(
        (sum, count, kind) => sum + count * areas[kind]!,
        0,
      );
      expect(childArea).toBeCloseTo(inflationArea * areas[parent]!, 12);
    }
    expect(WATANABE_ITO_SOMA_INFLATION).toBeCloseTo(2 + Math.sqrt(2), 12);
  });

  it('produces unit squares and 45-degree unit rhombs', () => {
    const tiles = generateWatanabeItoSomaEightfold(8);
    expect(new Set(tiles.map((tile) => tile.kind))).toEqual(new Set([0, 1]));
    for (const tile of tiles) {
      for (const edge of edges(tile.points)) expect(edge).toBeCloseTo(1, 9);
      expect(area(tile.points)).toBeCloseTo(tile.kind === 0 ? 1 : Math.SQRT1_2, 9);
    }
  });

  it('retains the complete eightfold orbit in the requested disc', () => {
    const tiles = generateWatanabeItoSomaEightfold(8);
    const keys = new Set(
      tiles.map(
        (tile) =>
          `${tile.kind}:${Math.round(tile.centre.x * 1e6)}:${Math.round(tile.centre.y * 1e6)}:${tile.rotation}`,
      ),
    );
    for (const tile of tiles.filter((candidate) => Math.hypot(candidate.centre.x, candidate.centre.y) < 7)) {
      const rotatedX = -tile.centre.y;
      const rotatedY = tile.centre.x;
      const period = tile.kind === 0 ? 2 : 8;
      const rotation = (tile.rotation + 2) % period;
      const rotatedKey =
        `${tile.kind}:${Math.round(rotatedX * 1e6)}:${Math.round(rotatedY * 1e6)}:${rotation}`;
      expect(keys.has(rotatedKey), rotatedKey).toBe(true);
    }
  });

  it('covers the requested disc without gaps or overlapping tile edges', () => {
    const radius = 8;
    const tiles = generateWatanabeItoSomaEightfold(radius);
    const multiplicities = new Map<string, number>();
    for (const tile of tiles) {
      for (let index = 0; index < tile.points.length; index++) {
        const key = edgeKey(tile.points[index]!, tile.points[(index + 1) % tile.points.length]!);
        multiplicities.set(key, (multiplicities.get(key) ?? 0) + 1);
      }
    }

    const interiorEdges = tiles.flatMap((tile) =>
      tile.points.flatMap((point, index) => {
        const next = tile.points[(index + 1) % tile.points.length]!;
        const midpointRadius = Math.hypot((point.x + next.x) / 2, (point.y + next.y) / 2);
        return midpointRadius < radius - 1 ? [edgeKey(point, next)] : [];
      }),
    );
    expect(interiorEdges.length).toBeGreaterThan(500);
    expect(interiorEdges.every((key) => multiplicities.get(key) === 2)).toBe(true);
  });
});

describe('Danzer sevenfold triangles', () => {
  const [a, b, c] = DANZER_EDGE_LENGTHS;
  const expectedEdges = [
    [a, b, c],
    [a, c, c],
    [b, b, c],
  ] as const;

  function edges(points: readonly Vec[]): number[] {
    return points.map((point, index) => {
      const next = points[(index + 1) % points.length]!;
      return Math.hypot(next.x - point.x, next.y - point.y);
    });
  }

  it('uses all three published sine-edge prototiles at natural scale', () => {
    const tiles = generateDanzerSevenfold(8);
    expect(new Set(tiles.map((tile) => tile.shape))).toEqual(new Set([0, 1, 2]));
    for (const tile of tiles) {
      const actual = edges(tile.points);
      for (let edge = 0; edge < 3; edge++) {
        expect(actual[edge]).toBeCloseTo(expectedEdges[tile.shape]![edge]!, 9);
      }
    }
  });

  it('applies every archived supertriangle with the published counts and area', () => {
    const representatives = new Map(generateDanzerSevenfold(8).map((tile) => [tile.shape, tile]));
    for (const shape of [0, 1, 2] as const) {
      const parent = representatives.get(shape)!;
      const children = subdivideDanzer(parent);
      const counts = [0, 0, 0];
      for (const child of children) counts[child.shape] = counts[child.shape]! + 1;
      expect(counts).toEqual(DANZER_SUBSTITUTION_COUNTS[shape]);
      expect(children.reduce((sum, child) => sum + area(child.points), 0)).toBeCloseTo(area(parent.points), 11);

      for (const child of children) {
        const actual = edges(child.points);
        for (let edge = 0; edge < 3; edge++) {
          expect(actual[edge]! * DANZER_INFLATION).toBeCloseTo(expectedEdges[child.shape]![edge]!, 9);
        }
      }
    }

    expect(DANZER_INFLATION).toBeCloseTo(1 + 2 * Math.cos(Math.PI / 7), 12);
    // A conjugate of x^3 - 4x^2 + 3x + 1 is outside the unit circle, so the
    // algebraic integer is not Pisot--Vijayaraghavan.
    expect(Math.abs(1 + 2 * Math.cos((3 * Math.PI) / 7))).toBeGreaterThan(1);
  });

  it('retains the reflected arrow state and fourteen finite rotations', () => {
    const tiles = generateDanzerSevenfold(8);
    expect(new Set(tiles.map((tile) => tile.hand))).toEqual(new Set([0, 1]));
    expect(new Set(tiles.map((tile) => tile.rotation))).toEqual(new Set(Array.from({ length: 14 }, (_, i) => i)));
    for (const tile of tiles) {
      expect(tile.rotation).toBeGreaterThanOrEqual(0);
      expect(tile.rotation).toBeLessThan(14);
      for (let corner = 0; corner < 3; corner++) {
        expect(tile.vertexStars[corner]).toContain(`${tile.shape}:${tile.hand}:${tile.rotation}:${corner}`);
      }
    }
  });

  it('carries complete, gap-free vertex-star states in the requested disc', () => {
    const tiles = generateDanzerSevenfold(8);
    const stars = new Map<string, { angle: number; signature: string }[]>();
    for (const tile of tiles) {
      for (let corner = 0; corner < 3; corner++) {
        const point = tile.points[corner]!;
        if (Math.hypot(point.x, point.y) >= 5.6) continue;
        const previous = tile.points[(corner + 2) % 3]!;
        const next = tile.points[(corner + 1) % 3]!;
        const u = { x: previous.x - point.x, y: previous.y - point.y };
        const v = { x: next.x - point.x, y: next.y - point.y };
        const angle = Math.acos((u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y)));
        const key = `${Math.round(point.x * 1e7)},${Math.round(point.y * 1e7)}`;
        const incident = { angle, signature: tile.vertexStars[corner]! };
        const list = stars.get(key);
        if (list) list.push(incident);
        else stars.set(key, [incident]);
      }
    }

    expect(stars.size).toBeGreaterThan(100);
    for (const [key, incidents] of stars) {
      const signature = incidents[0]!.signature;
      const straightAngles = signature.split('|').filter((incident) => incident.includes(':e')).length;
      expect(
        incidents.reduce((sum, incident) => sum + incident.angle, straightAngles * Math.PI),
        `${key}: ${incidents.map((incident) => incident.signature).join(';')}`,
      ).toBeCloseTo(2 * Math.PI, 8);
      expect(new Set(incidents.map((incident) => incident.signature)).size).toBe(1);
    }
  });
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

describe('twelvefold Shuriken substitution', () => {
  const ROOT3 = Math.sqrt(3);

  it('uses the reconstructed 349-child dodecagon rule', () => {
    const tiles = supertileTiles();
    expect(tiles).toHaveLength(SHURIKEN_SUBSTITUTION_COUNTS[0]);
    const counts = Array.from({ length: 14 }, (_, kind) => tiles.filter((tile) => tile.kind === kind).length);
    expect(counts).toEqual([1, 12, 144, 96, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0]);
    const total = tiles.reduce((sum, t) => sum + area(t.points), 0);
    // The runtime table is recovered from six-decimal SVG coordinates.
    expect(total).toBeCloseTo(LAMBDA ** 2 * (6 + 3 * ROOT3), 5);
  });

  it('gives all fourteen prototile states their exact areas', () => {
    const small = [
      6 + 3 * ROOT3,
      0.5,
      (ROOT3 - 1) / 4,
      0.25,
      ROOT3 / 4,
      (2 - ROOT3) / 2,
      (2 * ROOT3 - 3) / 4,
      (2 - ROOT3) / 2,
    ];
    const expected = [...small, ...small.slice(2).map((value) => value * LAMBDA ** 2)];
    for (let kind = 0; kind < 14; kind++) {
      expect(area(SHURIKEN_PROTOTILES[kind]!)).toBeCloseTo(expected[kind]!, 12);
    }
  });

  it('emits the published number of children for every state', () => {
    expect(SHURIKEN_SUBSTITUTION_COUNTS).toEqual([349, 13, 1, 1, 1, 1, 1, 1, 65, 67, 84, 55, 67, 61]);
  });

  it('is primitive with exponent nine', () => {
    let reachability = SHURIKEN_RULES.map((rule) =>
      Array.from({ length: 14 }, (_, child) => rule.some(([kind]) => kind === child)),
    );
    const step = (): void => {
      reachability = reachability.map((row) =>
        Array.from({ length: 14 }, (_, child) =>
          row.some((reachable, middle) => reachable && SHURIKEN_RULES[middle]!.some(([kind]) => kind === child)),
        ),
      );
    };
    for (let power = 2; power <= 8; power++) step();
    expect(reachability.every((row) => row.every(Boolean))).toBe(false);
    step();
    expect(reachability.every((row) => row.every(Boolean))).toBe(true);
  });

  it('contains the irrational relative-orientation certificate in sigma cubed of T1', () => {
    type Linear = readonly [number, number, number, number];
    const linear = (child: (typeof SHURIKEN_RULES)[number][number]): Linear =>
      [child[1], child[2], child[4], child[5]];
    const compose = (a: Linear, b: Linear): Linear => [
      a[0] * b[0] + a[1] * b[2],
      a[0] * b[1] + a[1] * b[3],
      a[2] * b[0] + a[3] * b[2],
      a[2] * b[1] + a[3] * b[3],
    ];
    const angle = (transform: Linear): number => Math.atan2(transform[2], transform[0]);
    const central = linear(SHURIKEN_RULES[0]!.find(([kind]) => kind === 0)!);
    const centralPath = compose(compose(central, central), central);
    const t11ToT1 = linear(SHURIKEN_RULES[10]!.find(([kind]) => kind === 0)!);
    const period = Math.PI / 6;
    const alpha = Math.atan2(0.5, 2 + ROOT3 / 2);
    const target = Math.min(2 * alpha, period - 2 * alpha);
    const residuals = SHURIKEN_RULES[0]!
      .filter(([kind, a, b, , d, e]) => kind === 4 && a * e - b * d > 0)
      .map((placement) => {
        let difference = Math.abs(angle(compose(linear(placement), t11ToT1)) - angle(centralPath)) % period;
        difference = Math.min(difference, period - difference);
        return Math.abs(difference - target);
      });
    expect(Math.min(...residuals)).toBeLessThan(1e-7);
  });

  it('keeps the central frame fixed when the requested radius adds a hierarchy level', () => {
    const centralAngle = (radius: number): number => {
      const central = generateShuriken(radius)
        .filter((tile) => tile.kind === 0)
        .map((tile) => ({ tile, centre: centroid(tile.points) }))
        .sort((a, b) => Math.hypot(a.centre.x, a.centre.y) - Math.hypot(b.centre.x, b.centre.y))[0]!;
      const first = central.tile.points[0]!;
      return Math.atan2(first.y - central.centre.y, first.x - central.centre.x);
    };
    const difference = Math.atan2(
      Math.sin(centralAngle(47) - centralAngle(45)),
      Math.cos(centralAngle(47) - centralAngle(45)),
    );
    expect(Math.abs(difference)).toBeLessThan(1e-7);
  });
});

describe('squiral', () => {
  const rosette = [0, 1, 2, 3].map((k) => ({
    kind: 0,
    transform: rotation((k * Math.PI) / 2),
  }));

  it('uses the exact 3x3 block rule of the two-symbol presentation', () => {
    // Eq. (5) of arXiv:1205.1384: the swap sits on the four even-even cells.
    const block = squiralBlockStep([[0]]);
    expect(block).toEqual([
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ]);
    expect(squiralBlockStep([[1]])).toEqual(block.map((row) => row.map((v) => 1 - v)));
  });

  it('is primitive with inflation matrix ((5, 4), (4, 5)) and balanced symbols', () => {
    let grid = [[0]];
    for (let level = 1; level <= 4; level++) {
      grid = squiralBlockStep(grid);
      const cells = grid.flat();
      const same = cells.filter((v) => v === 0).length;
      const other = cells.length - same;
      // ((5, 4), (4, 5))^level has entries (9^level +- 1) / 2, so the two symbol
      // classes stay exactly one apart: they are balanced in the limit.
      expect(same + other).toBe(9 ** level);
      expect(same - other).toBe(1);
      expect(other).toBeGreaterThan(0);
    }
  });

  it('reproduces the iterated block substitution in closed form', () => {
    let grid = [[0]];
    for (let levels = 1; levels <= 3; levels++) {
      grid = squiralBlockStep(grid);
      for (let m = 0; m < grid.length; m++) {
        for (let n = 0; n < grid.length; n++) {
          expect(squiralSymbol(m, n, levels)).toBe(grid[m]![n]!);
        }
      }
    }
    // Swapping on the even-even cells includes the offset (0, 0), so a single
    // symbol runs into a 2-cycle rather than a fixed point.
    expect(squiralSymbol(0, 0, 1)).toBe(1);
    expect(squiralSymbol(0, 0, 2)).toBe(0);
  });

  it('gives the geometric inflation the same scale 3 and the same 5:4 split', () => {
    const children = subdivideSquiral({ kind: 0, transform: IDENTITY });
    expect(children).toHaveLength(9);
    expect(children.filter((c) => c.kind === 0)).toHaveLength(5);
    expect(children.filter((c) => c.kind === 1)).toHaveLength(4);
    for (const child of children) {
      const scale = Math.hypot(child.transform[0], child.transform[3]);
      expect(scale).toBeCloseTo(1 / 3, 12);
      expect(area(squiralOutline().map((v) => apply(child.transform, v)))).toBeCloseTo(1 / 9, 12);
    }
    // The nine children dissect the parent, so their areas add up to its own.
    const total = children.reduce(
      (sum, c) => sum + area(squiralOutline().map((v) => apply(c.transform, v))),
      0,
    );
    expect(total).toBeCloseTo(area(squiralOutline()), 12);
  });

  it('draws a spiral of area exactly one that winds into its vertex', () => {
    const outline = squiralOutline();
    expect(area(outline)).toBeCloseTo(1, 12);
    // Both boundary arms are orbits of the quarter-turn contraction, so the
    // outline ends at the spiralling vertex at the origin.
    expect(outline).toContainEqual({ x: 0, y: 0 });
    const deeper = squiralOutline(10);
    expect(deeper.length).toBeGreaterThan(outline.length);
    expect(area(deeper)).toBeCloseTo(1, 12);
  });

  it('winds four tiles of one chirality into every spiralling vertex', () => {
    // A rosette of four quarter-turn copies fills the square of side 2 exactly.
    const tiles = rosette.map((p) => squiralOutline().map((v) => apply(p.transform, v)));
    const counts = coverCounts(
      tiles.map((points) => ({ kind: 0, points })),
      0.9,
      200,
    );
    expect(new Set(counts)).toEqual(new Set([1]));
    expect(tiles.reduce((sum, points) => sum + area(points), 0)).toBeCloseTo(4, 12);
  });

  it('induces exactly the block substitution on its rosettes', () => {
    // Inflating a rosette gives nine rosettes on a 3x3 grid of spacing 2, each
    // holding one chirality: the geometric rule and Eq. (5) are the same rule.
    const levels = 3;
    let placed = rosette.map((p) => ({
      kind: p.kind,
      transform: mul(scaling(3 ** levels), p.transform),
    }));
    for (let level = 0; level < levels; level++) placed = placed.flatMap(subdivideSquiral);

    const rosettes = new Map<string, number[]>();
    for (const p of placed) {
      const key = `${Math.round(p.transform[2])},${Math.round(p.transform[5])}`;
      rosettes.set(key, [...(rosettes.get(key) ?? []), p.kind]);
    }
    const cells = 3 ** levels;
    expect(rosettes.size).toBe(cells * cells);

    const middle = (cells - 1) / 2;
    for (let m = 0; m < cells; m++) {
      for (let n = 0; n < cells; n++) {
        const kinds = rosettes.get(`${2 * (m - middle)},${2 * (n - middle)}`)!;
        expect(kinds).toHaveLength(4);
        expect(new Set(kinds)).toEqual(new Set([squiralSymbol(m, n, levels)]));
      }
    }
  });

  it('splits a supertile into the same counts as the block substitution', () => {
    let placed = [{ kind: 0, transform: IDENTITY }];
    for (let level = 1; level <= 3; level++) {
      placed = placed.flatMap(subdivideSquiral);
      const left = placed.filter((p) => p.kind === 0).length;
      // ((5, 4), (4, 5))^level again: (9^level +- 1) / 2 of each chirality.
      expect(left).toBe((9 ** level + 1) / 2);
      expect(placed.length - left).toBe((9 ** level - 1) / 2);
    }
  });

  it('generates both chiralities in near equal numbers', () => {
    const tiles = generateSquiral(20);
    const left = tiles.filter((t) => t.kind === 0).length;
    const right = tiles.length - left;
    expect(left).toBeGreaterThan(0);
    expect(right).toBeGreaterThan(0);
    expect(Math.abs(left - right)).toBeLessThan(tiles.length * 0.1);
  });
});

describe('additional tiling constructions', () => {
  it('recomposes 60-degree dual-grid rhombs into Socolar hexagons', () => {
    const source = multigrid(6, [0.07, -0.31, 0.22, -0.18, 0.39, -0.19], 16);
    const tiles = mergeSocolarHexagons(source);
    expect(new Set(tiles.map((tile) => tile.kind))).toEqual(new Set([0, 1, 2]));
    expect(tiles.filter((tile) => tile.kind === 2).every((tile) => tile.points.length === 6)).toBe(true);
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

describe('Jeandel-Rao 11 Wang tiles', () => {
  const [EAST, NORTH, WEST, SOUTH] = [0, 1, 2, 3];

  /** The coded tile at every cell of the square [-n, n]^2. */
  function codedGrid(n: number): Map<string, number> {
    const grid = new Map<string, number>();
    for (let a = -n; a <= n; a++) {
      for (let b = -n; b <= n; b++) grid.set(`${a},${b}`, jeandelRaoTileAt(a, b));
    }
    return grid;
  }

  function strictlyInside(polygon: readonly Vec[], x: number, y: number): boolean {
    for (let i = 0; i < polygon.length; i++) {
      const a = polygon[i]!;
      const b = polygon[(i + 1) % polygon.length]!;
      if ((b.x - a.x) * (y - a.y) - (b.y - a.y) * (x - a.x) <= 1e-9) return false;
    }
    return true;
  }

  it('encodes the exact eleven tiles of the paper on four horizontal colours', () => {
    // Figure 3 of arXiv:1506.06492, as (east, north, west, south).
    expect(JEANDEL_RAO_T).toEqual([
      [2, 4, 2, 1],
      [2, 2, 2, 0],
      [1, 1, 3, 1],
      [1, 2, 3, 2],
      [3, 1, 3, 3],
      [0, 1, 3, 1],
      [0, 0, 0, 1],
      [3, 1, 0, 2],
      [0, 2, 1, 2],
      [1, 2, 1, 4],
      [3, 3, 1, 2],
    ]);
    const horizontal = JEANDEL_RAO_T.flatMap((t) => [t[EAST], t[WEST]]);
    const vertical = JEANDEL_RAO_T.flatMap((t) => [t[NORTH], t[SOUTH]]);
    expect(new Set(horizontal)).toEqual(new Set([0, 1, 2, 3]));
    expect(new Set(vertical)).toEqual(new Set([0, 1, 2, 3, 4]));
  });

  it('collapses colours 4 and 0 into the minimal four-colour set T-prime', () => {
    // Figure 4 of the paper: "obtained from T by collapsing the colors 4 and 0".
    expect(new Set(JEANDEL_RAO_T_PRIME.flat())).toEqual(new Set([0, 1, 2, 3]));
    expect(JEANDEL_RAO_T_PRIME).toHaveLength(11);
    // Collapsing must not merge two tiles, or the set would not have 11 of them.
    expect(new Set(JEANDEL_RAO_T_PRIME.map((t) => t.join(','))).size).toBe(11);
    for (let i = 0; i < JEANDEL_RAO_T.length; i++) {
      const before = JEANDEL_RAO_T[i]!;
      const after = JEANDEL_RAO_T_PRIME[i]!;
      expect(after[EAST]).toBe(before[EAST]);
      expect(after[WEST]).toBe(before[WEST]);
      for (const side of [NORTH, SOUTH]) {
        expect(after[side]).toBe(before[side] === 4 ? 0 : before[side]);
      }
    }
  });

  it('partitions the torus into 24 atoms labelled by the 11 tiles', () => {
    expect(ATOMS).toHaveLength(24);
    expect(new Set(ATOMS.map((atom) => atom.tile))).toEqual(new Set([...Array(11).keys()]));
    // The fundamental domain of Gamma_0 is phi wide and phi + 3 tall.
    const total = ATOMS.reduce((sum, atom) => sum + area(atom.polygon), 0);
    expect(total).toBeCloseTo(PHI * JR_TORUS_HEIGHT, 12);
    expect(total).toBeCloseTo(4 * PHI + 1, 12);
  });

  it('covers the fundamental domain without overlap', () => {
    const random = makeRandom(19060492);
    for (let i = 0; i < 4000; i++) {
      const x = random() * PHI;
      const y = random() * JR_TORUS_HEIGHT;
      expect(torusToTile(x, y)).toBeGreaterThanOrEqual(0);
      const hits = ATOMS.filter((atom) => strictlyInside(atom.polygon, x, y));
      expect(hits.length).toBeLessThanOrEqual(1);
    }
  });

  it('gives the published tile frequencies as relative atom areas', () => {
    // slabbe.org, tile frequencies of the Jeandel-Rao partition.
    const expected = [
      -PHI / 22 + 2 / 11,
      -PHI / 22 + 2 / 11,
      (9 * PHI) / 22 - 7 / 11,
      -PHI / 22 + 2 / 11,
      (2 * PHI) / 11 - 5 / 22,
      (-5 * PHI) / 11 + 9 / 11,
      -PHI / 22 + 2 / 11,
      (-3 * PHI) / 11 + 13 / 22,
      (2 * PHI) / 11 - 5 / 22,
      -PHI / 22 + 2 / 11,
      (2 * PHI) / 11 - 5 / 22,
    ];
    const total = ATOMS.reduce((sum, atom) => sum + area(atom.polygon), 0);
    for (let tile = 0; tile < 11; tile++) {
      const measure = ATOMS.filter((atom) => atom.tile === tile).reduce(
        (sum, atom) => sum + area(atom.polygon),
        0,
      );
      expect(measure / total).toBeCloseTo(expected[tile]!, 12);
    }
    expect(expected.reduce((sum, f) => sum + f, 0)).toBeCloseTo(1, 12);
  });

  it('reduces the plane modulo the lattice generated by (phi, 0) and (1, phi + 3)', () => {
    const random = makeRandom(1808_07768);
    for (let i = 0; i < 500; i++) {
      const x = (random() - 0.5) * 60;
      const y = (random() - 0.5) * 60;
      const p = toTorus(x, y);
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThan(PHI);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThan(JR_TORUS_HEIGHT);
      for (const [u, v] of [
        [PHI, 0],
        [1, JR_TORUS_HEIGHT],
      ] as const) {
        const shifted = toTorus(x + u, y + v);
        expect(shifted.x).toBeCloseTo(p.x, 9);
        expect(shifted.y).toBeCloseTo(p.y, 9);
      }
    }
  });

  it('codes a legal tiling: every horizontal and vertical adjacency matches', () => {
    const n = 45;
    const grid = codedGrid(n);
    let checked = 0;
    for (let a = -n; a < n; a++) {
      for (let b = -n; b < n; b++) {
        const here = JEANDEL_RAO_T[grid.get(`${a},${b}`)!]!;
        const east = JEANDEL_RAO_T[grid.get(`${a + 1},${b}`)!]!;
        const north = JEANDEL_RAO_T[grid.get(`${a},${b + 1}`)!]!;
        expect(here[EAST]).toBe(east[WEST]);
        expect(here[NORTH]).toBe(north[SOUTH]);
        checked += 2;
      }
    }
    expect(checked).toBe(2 * (2 * n) ** 2);
    // A T-tiling stays legal after the colours are collapsed.
    for (let a = -n; a < n; a++) {
      for (let b = -n; b < n; b++) {
        const here = JEANDEL_RAO_T_PRIME[grid.get(`${a},${b}`)!]!;
        expect(here[EAST]).toBe(JEANDEL_RAO_T_PRIME[grid.get(`${a + 1},${b}`)!]![WEST]);
        expect(here[NORTH]).toBe(JEANDEL_RAO_T_PRIME[grid.get(`${a},${b + 1}`)!]![SOUTH]);
      }
    }
  });

  it('uses all eleven tiles and repeats none of the small translations', () => {
    const n = 30;
    const grid = codedGrid(n);
    expect(new Set(grid.values()).size).toBe(11);
    for (let u = 0; u <= 8; u++) {
      for (let v = -8; v <= 8; v++) {
        if (u === 0 && v === 0) continue;
        const broken = [...grid.keys()].some((key) => {
          const [a, b] = key.split(',').map(Number) as [number, number];
          const other = grid.get(`${a + u},${b + v}`);
          return other !== undefined && other !== grid.get(key);
        });
        expect({ u, v, broken }).toEqual({ u, v, broken: true });
      }
    }
  });

  it('draws each square as four triangles carrying its four edge colours', () => {
    const triangles = wangTileTriangles(0, 0, 9);
    expect(triangles.map((t) => t.kind)).toEqual([
      JEANDEL_RAO_T_PRIME[9]![SOUTH],
      JEANDEL_RAO_T_PRIME[9]![EAST],
      JEANDEL_RAO_T_PRIME[9]![NORTH],
      JEANDEL_RAO_T_PRIME[9]![WEST],
    ]);
    // Tile 9 is (1, 2, 1, 4) in T, so the collapse shows up as a south colour 0.
    expect(triangles[0]!.kind).toBe(0);
    for (const triangle of triangles) {
      expect(triangle.points).toHaveLength(3);
      expect(area(triangle.points)).toBeCloseTo(0.25, 12);
    }
    expect(triangles.reduce((sum, t) => sum + area(t.points), 0)).toBeCloseTo(1, 12);
  });

  it('merges matching edges into diamonds across every grid line', () => {
    // The visual claim of the rendering: a legal join is exactly a pair of
    // triangles of the same colour meeting along a grid line.
    const n = 12;
    for (let a = -n; a < n; a++) {
      for (let b = -n; b < n; b++) {
        const here = wangTileTriangles(a, b, jeandelRaoTileAt(a, b));
        const east = wangTileTriangles(a + 1, b, jeandelRaoTileAt(a + 1, b));
        const north = wangTileTriangles(a, b + 1, jeandelRaoTileAt(a, b + 1));
        expect(here[1]!.kind).toBe(east[3]!.kind);
        expect(here[2]!.kind).toBe(north[0]!.kind);
      }
    }
  });

  it('grows patches that fill the requested disc with unit squares', () => {
    for (const radius of [6, 18]) {
      const tiles = generateJeandelRao(radius);
      expect(tiles.length % 4).toBe(0);
      const squares = tiles.length / 4;
      // The squares covering the disc number roughly its area.
      expect(squares).toBeGreaterThan(Math.PI * radius * radius);
      expect(squares).toBeLessThan(Math.PI * (radius + 2) ** 2);
      for (const tile of tiles) {
        expect(tile.kind).toBeGreaterThanOrEqual(0);
        expect(tile.kind).toBeLessThan(4);
      }
    }
  });

  it('is registered in the experimental family with a stable start point', () => {
    const definition = TILINGS.find((tiling) => tiling.id === 'jeandel-rao')!;
    expect(definition.family).toBe('experimental');
    expect(definition.kinds).toBe(4);
    expect(definition.reference).toBe('https://arxiv.org/abs/1506.06492');
    expect(definition.referenceLabel).toContain('An aperiodic set of 11 Wang tiles');
    expect(definition.furtherReferences).toHaveLength(2);
    expect(JR_START).toEqual({ x: PHI / 3, y: JR_TORUS_HEIGHT / 7 });
    // The generator is deterministic, so the same cell always gets the same tile.
    expect(jeandelRaoTileAt(0, 0)).toBe(jeandelRaoTileAt(0, 0));
  });
});

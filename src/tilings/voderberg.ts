import { area } from '../geometry.js';
import type { Vec } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';

const ALPHA = (12 * Math.PI) / 180;
const BETA = (132 * Math.PI) / 180;
const SECTORS = 30;
const CORONA_HEIGHT = 1 / (2 * Math.tan(ALPHA / 2));
const GOLDBERG_SHIFT = 1 / (2 * Math.sin(ALPHA / 2));
const SECTOR_ROTATION = Math.PI / 2 - ALPHA / 2;
const DISPLAY_ROTATION = Math.PI / 4;

function add(left: Vec, right: Vec): Vec {
  return { x: left.x + right.x, y: left.y + right.y };
}

function rotate(point: Vec, angle: number): Vec {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
  };
}

function translate(points: readonly Vec[], offset: Vec): Vec[] {
  return points.map((point) => add(point, offset));
}

/**
 * Waldman and Waldman's parameterisation of the classic Voderberg nonagon.
 * The 12° reference triangle and beta=132° are their published example.
 * Nine edge vectors close exactly; the repeated endpoint is omitted.
 *
 * @see https://old.nationalcurvebank.org/waldman9/voderbergdeconstructed.pdf
 */
function makeOutlines(): readonly [readonly Vec[], readonly Vec[]] {
  const long =
    (2 * Math.sin((Math.PI - ALPHA) / 2)) /
    Math.cos(BETA - Math.PI / 2);
  const short =
    (1 / Math.sin(ALPHA / 2) / 2 - long * Math.cos(Math.PI - BETA)) / 2 -
    Math.sin(ALPHA / 2);
  const lengths = [1, short, long, short, 1, short, long, short, 1];
  const interiorAngles = [
    ALPHA,
    (3 * Math.PI - ALPHA) / 2,
    2 * Math.PI - BETA,
    BETA,
    (Math.PI + ALPHA) / 2,
    (Math.PI - 3 * ALPHA) / 2,
    2 * Math.PI - BETA,
    BETA,
    (Math.PI + ALPHA) / 2,
  ];

  let heading = 0;
  let point: Vec = { x: 0, y: 0 };
  const v: Vec[] = [{ ...point }];
  for (let index = 0; index < lengths.length; index++) {
    heading += Math.PI - interiorAngles[index]!;
    point = add(point, {
      x: lengths[index]! * Math.cos(heading),
      y: lengths[index]! * Math.sin(heading),
    });
    if (index < lengths.length - 1) v.push(point);
  }

  const maxY = Math.max(...v.map((vertex) => vertex.y));
  const a = v.map((vertex) => ({
    x: -vertex.x + 0.5,
    y: -vertex.y + maxY,
  }));
  return [v, a];
}

const [VODERBERG_V, VODERBERG_A] = makeOutlines();
export const VODERBERG_OUTLINE: readonly Vec[] = VODERBERG_V;

/**
 * Construct the spiral by the radial-sector method from Waldman & Waldman:
 * build V/A rows in one 12° sector, copy it thirty times, then apply a
 * one-tile Goldberg shift to the second fifteen sectors. Unlike a fitted
 * polar colour field, the sector and V/A indices are exact tile classes.
 */
export function generateVoderberg(radius: number): Tile[] {
  const coronas = Math.max(3, Math.ceil((radius + GOLDBERG_SHIFT) / CORONA_HEIGHT));
  const sector: { kind: 0 | 1; points: readonly Vec[] }[] = [
    { kind: 0, points: VODERBERG_V },
  ];
  for (let row = 1; row <= coronas; row++) {
    for (let column = 0; column < row; column++) {
      const offset = { x: -row / 2 + column, y: row * CORONA_HEIGHT };
      sector.push({ kind: 0, points: translate(VODERBERG_V, offset) });
      sector.push({ kind: 1, points: translate(VODERBERG_A, offset) });
    }
    sector.push({
      kind: 0,
      points: translate(VODERBERG_V, { x: row / 2, y: row * CORONA_HEIGHT }),
    });
  }

  const tiles: Tile[] = [];
  for (let sectorIndex = 0; sectorIndex < SECTORS; sectorIndex++) {
    const arm = sectorIndex < SECTORS / 2 ? 0 : 1;
    const shift = rotate(
      { x: (arm === 0 ? -1 : 1) * GOLDBERG_SHIFT / 2, y: 0 },
      DISPLAY_ROTATION,
    );
    const angle = SECTOR_ROTATION + DISPLAY_ROTATION - sectorIndex * ALPHA;
    for (const tile of sector) {
      tiles.push({
        kind: arm * 2 + tile.kind,
        points: tile.points.map((point) => add(rotate(point, angle), shift)),
      });
    }
  }
  return tiles;
}

export const voderberg: TilingDefinition = {
  id: 'voderberg',
  name: 'Voderberg spiral',
  family: 'nonperiodic',
  description:
    'The classic plane-covering Voderberg double spiral: thirty radial sectors become two interlocking arms through a one-tile Goldberg shift.',
  kinds: 4,
  kindLabels: ['first arm V', 'first arm A', 'second arm V', 'second arm A'],
  colourMode: 'paired',
  reference: 'https://en.wikipedia.org/wiki/Voderberg_tiling',
  unitTileArea: area(VODERBERG_OUTLINE),
  generate: generateVoderberg,
};

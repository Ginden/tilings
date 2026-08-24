import type { Vec } from '../geometry.js';
import { currentDaySeed } from '../seed.js';
import type { Tile, TilingDefinition, TilingGenerationOptions } from './types.js';

export const TRUCHET_FILL_LIMITS = [4, 9, 16, 25, 36] as const;
export const TRUCHET_DEFAULT_FILL_LIMIT = 16;

const ARC_RADIUS = 0.5;
const ARC_SEGMENTS = 8;

type Node = readonly [x: number, y: number];

interface Arc {
  readonly cellKey: string;
  readonly start: string;
  readonly end: string;
  readonly points: readonly Vec[];
}

interface Cell {
  readonly key: string;
  readonly points: readonly Vec[];
  readonly arcs: readonly Arc[];
}

function hash(seed: number, x: number, y: number): number {
  let value = seed >>> 0;
  value ^= Math.imul(x, 0x9e3779b1);
  value ^= Math.imul(y, 0x85ebca77);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

function nodeKey(node: Node): string {
  return `${node[0]},${node[1]}`;
}

function nodePoint(node: Node): Vec {
  return { x: node[0] / 2, y: node[1] / 2 };
}

function arcPoints(center: Vec, startAngle: number, endAngle: number): Vec[] {
  return Array.from({ length: ARC_SEGMENTS + 1 }, (_, index) => {
    const angle = startAngle + ((endAngle - startAngle) * index) / ARC_SEGMENTS;
    return {
      x: center.x + Math.cos(angle) * ARC_RADIUS,
      y: center.y + Math.sin(angle) * ARC_RADIUS,
    };
  });
}

function arc(
  cellKey: string,
  start: Node,
  end: Node,
  center: Vec,
  startAngle: number,
  endAngle: number,
): Arc {
  const points = arcPoints(center, startAngle, endAngle);
  points[0] = nodePoint(start);
  points[points.length - 1] = nodePoint(end);
  return { cellKey, start: nodeKey(start), end: nodeKey(end), points };
}

function cell(x: number, y: number, seed: number): Cell {
  const key = `${x},${y}`;
  const northWest = { x, y };
  const northEast = { x: x + 1, y };
  const southEast = { x: x + 1, y: y + 1 };
  const southWest = { x, y: y + 1 };
  const top: Node = [2 * x + 1, 2 * y];
  const right: Node = [2 * x + 2, 2 * y + 1];
  const bottom: Node = [2 * x + 1, 2 * y + 2];
  const left: Node = [2 * x, 2 * y + 1];
  const arcs = (hash(seed, x, y) & 1) === 0
    ? [
        arc(key, top, left, northWest, 0, Math.PI / 2),
        arc(key, bottom, right, southEast, -Math.PI, -Math.PI / 2),
      ]
    : [
        arc(key, top, right, northEast, Math.PI, Math.PI / 2),
        arc(key, bottom, left, southWest, 0, -Math.PI / 2),
      ];
  return { key, points: [northWest, northEast, southEast, southWest], arcs };
}

function endpointOwners(arcs: readonly Arc[]): ReadonlyMap<string, readonly number[]> {
  const owners = new Map<string, number[]>();
  for (let index = 0; index < arcs.length; index++) {
    for (const endpoint of [arcs[index]!.start, arcs[index]!.end]) {
      const existing = owners.get(endpoint);
      if (existing) existing.push(index);
      else owners.set(endpoint, [index]);
    }
  }
  return owners;
}

function arcComponents(arcs: readonly Arc[], owners: ReadonlyMap<string, readonly number[]>): number[][] {
  const visited = new Set<number>();
  const components: number[][] = [];
  for (let start = 0; start < arcs.length; start++) {
    if (visited.has(start)) continue;
    const component: number[] = [];
    const pending = [start];
    visited.add(start);
    while (pending.length > 0) {
      const index = pending.pop()!;
      component.push(index);
      const current = arcs[index]!;
      for (const endpoint of [current.start, current.end]) {
        for (const neighbour of owners.get(endpoint) ?? []) {
          if (visited.has(neighbour)) continue;
          visited.add(neighbour);
          pending.push(neighbour);
        }
      }
    }
    components.push(component);
  }
  return components;
}

function closedLoop(
  component: readonly number[],
  arcs: readonly Arc[],
  owners: ReadonlyMap<string, readonly number[]>,
  fillLimit: number,
): Vec[] | null {
  if (
    component.length > fillLimit ||
    component.some((index) => {
      const current = arcs[index]!;
      return owners.get(current.start)?.length !== 2 || owners.get(current.end)?.length !== 2;
    })
  ) {
    return null;
  }

  const componentSet = new Set(component);
  let arcIndex = component[0]!;
  let endpoint = arcs[arcIndex]!.start;
  const firstEndpoint = endpoint;
  const polygon: Vec[] = [];

  for (let step = 0; step < component.length; step++) {
    const current = arcs[arcIndex]!;
    const forwards = current.start === endpoint;
    const points = forwards ? current.points : [...current.points].reverse();
    polygon.push(...(step === 0 ? points : points.slice(1)));
    endpoint = forwards ? current.end : current.start;
    if (step + 1 < component.length) {
      const next = (owners.get(endpoint) ?? []).find(
        (candidate) => candidate !== arcIndex && componentSet.has(candidate),
      );
      if (next === undefined) return null;
      arcIndex = next;
    }
  }

  if (endpoint !== firstEndpoint) return null;
  polygon.pop();
  return polygon;
}

/** Fill the integer lattice with Smith's quarter-circle Truchet tile and its small closed loops. */
export function generateTruchet(
  radius: number,
  seed = currentDaySeed(),
  options: TilingGenerationOptions = {},
): Tile[] {
  const requestedLimit = options.loopFillLimit ?? TRUCHET_DEFAULT_FILL_LIMIT;
  const fillLimit = TRUCHET_FILL_LIMITS.some((limit) => limit === requestedLimit)
    ? requestedLimit
    : TRUCHET_DEFAULT_FILL_LIMIT;
  const extent = Math.ceil(radius) + fillLimit + 1;
  const integerSeed = seed >>> 0;
  const cells: Cell[] = [];
  for (let y = -extent; y < extent; y++) {
    for (let x = -extent; x < extent; x++) cells.push(cell(x, y, integerSeed));
  }

  const arcs = cells.flatMap((item) => item.arcs);
  const owners = endpointOwners(arcs);
  const fills = new Map<string, Vec[][]>();
  for (const component of arcComponents(arcs, owners)) {
    const polygon = closedLoop(component, arcs, owners, fillLimit);
    if (!polygon) continue;
    const key = arcs[component[0]!]!.cellKey;
    const existing = fills.get(key);
    if (existing) existing.push(polygon);
    else fills.set(key, [polygon]);
  }

  return cells.map((item) => {
    const overlays = fills.get(item.key)?.map((points) => ({ kind: 1, points }));
    return {
      kind: 0,
      points: item.points,
      parts: [],
      borderParts: item.arcs.map((itemArc) => itemArc.points),
      ...(overlays ? { overlays } : {}),
    };
  });
}

export const seededTruchet: TilingDefinition = {
  id: 'seeded-truchet',
  name: 'Seeded Truchet mosaic',
  family: 'algorithmic',
  description:
    "Cyril Stanley Smith's quarter-circle variation on Truchet tiles places an arc at each of two opposite corners. The border colour traces the resulting loops and wandering paths; closed loops up to the selected tile count are filled with the second colour. A coordinate hash chooses reproducibly between the tile's two orientations.",
  kinds: 2,
  kindLabels: ['Background', 'Small closed loops'],
  backgroundKind: 0,
  closedLoopFills: {
    defaultLimit: TRUCHET_DEFAULT_FILL_LIMIT,
    limits: TRUCHET_FILL_LIMITS,
  },
  reference: 'https://en.wikipedia.org/wiki/Truchet_tile',
  referenceLabel: 'Truchet tiling — Wikipedia',
  furtherReferences: [
    {
      label: 'Truchet curves and surfaces — Computers & Graphics (2008)',
      url: 'https://doi.org/10.1016/j.cag.2007.10.001',
    },
  ],
  unitTileArea: 1,
  generate: generateTruchet,
};

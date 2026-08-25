import type { Vec } from '../geometry.js';
import { currentDaySeed } from '../seed.js';
import type { Tile, TilingDefinition } from './types.js';

type Direction = 'north' | 'east';
type Arm = 'north' | 'east' | 'south' | 'west';

const OUTPUT_MARGIN = 2;
const AXIS = [0, 0.25, 0.75, 1] as const;

function hash(seed: number, x: number, y: number): number {
  let value = seed >>> 0;
  value ^= Math.imul(x, 0x9e3779b1);
  value ^= Math.imul(y, 0x85ebca77);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

/**
 * Give every non-root cell one edge towards the north-east root. Interior
 * choices depend only on their coordinate, so enlarging the patch does not
 * rearrange the visible maze.
 */
function outgoingDirection(
  x: number,
  y: number,
  min: number,
  max: number,
  seed: number,
): Direction | null {
  if (x === max && y === min) return null;
  if (y === min) return 'east';
  if (x === max) return 'north';
  return (hash(seed, x, y) & 1) === 0 ? 'north' : 'east';
}

function cellArms(x: number, y: number, min: number, max: number, seed: number): Set<Arm> {
  const arms = new Set<Arm>();
  const outgoing = outgoingDirection(x, y, min, max, seed);
  if (outgoing) arms.add(outgoing);
  if (y < max && outgoingDirection(x, y + 1, min, max, seed) === 'north') arms.add('south');
  if (x > min && outgoingDirection(x - 1, y, min, max, seed) === 'east') arms.add('west');
  return arms;
}

interface Edge {
  readonly start: readonly [number, number];
  readonly end: readonly [number, number];
}

function pointKey(point: readonly [number, number]): string {
  return `${point[0]},${point[1]}`;
}

/** Trace the boundary of the centre square and its selected corridor arms. */
function corridorOutline(x: number, y: number, arms: ReadonlySet<Arm>): Vec[] {
  const occupied = new Set(['1,1']);
  if (arms.has('north')) occupied.add('1,0');
  if (arms.has('east')) occupied.add('2,1');
  if (arms.has('south')) occupied.add('1,2');
  if (arms.has('west')) occupied.add('0,1');

  const edges: Edge[] = [];
  const addEdge = (
    start: readonly [number, number],
    end: readonly [number, number],
  ): void => {
    edges.push({ start, end });
  };

  for (const key of occupied) {
    const [column, row] = key.split(',').map(Number) as [number, number];
    if (!occupied.has(`${column},${row - 1}`)) addEdge([column, row], [column + 1, row]);
    if (!occupied.has(`${column + 1},${row}`)) addEdge([column + 1, row], [column + 1, row + 1]);
    if (!occupied.has(`${column},${row + 1}`)) addEdge([column + 1, row + 1], [column, row + 1]);
    if (!occupied.has(`${column - 1},${row}`)) addEdge([column, row + 1], [column, row]);
  }

  const byStart = new Map(edges.map((edge) => [pointKey(edge.start), edge]));
  const outline: Vec[] = [];
  let edge = edges[0]!;
  const first = pointKey(edge.start);
  do {
    const [column, row] = edge.start;
    outline.push({ x: x + AXIS[column]!, y: y + AXIS[row]! });
    edge = byStart.get(pointKey(edge.end))!;
  } while (pointKey(edge.start) !== first);
  return outline;
}

/** Omit the cap where a passage continues into the neighbouring cell. */
function corridorBorders(outline: readonly Vec[], x: number, y: number): Vec[][] {
  const borders: Vec[][] = [];
  for (let index = 0; index < outline.length; index++) {
    const start = outline[index]!;
    const end = outline[(index + 1) % outline.length]!;
    const onVerticalCellEdge = start.x === end.x && (start.x === x || start.x === x + 1);
    const onHorizontalCellEdge = start.y === end.y && (start.y === y || start.y === y + 1);
    if (!onVerticalCellEdge && !onHorizontalCellEdge) borders.push([start, end]);
  }
  return borders;
}

/** Fill a square patch with a reproducible binary-tree perfect maze. */
export function generateBinaryTreeMaze(radius: number, seed = currentDaySeed()): Tile[] {
  const extent = Math.ceil(radius) + OUTPUT_MARGIN;
  const min = -extent;
  const max = extent - 1;
  const integerSeed = seed >>> 0;
  const tiles: Tile[] = [];

  for (let y = min; y <= max; y++) {
    for (let x = min; x <= max; x++) {
      const outline = corridorOutline(x, y, cellArms(x, y, min, max, integerSeed));
      tiles.push({
        kind: 0,
        points: [
          { x, y },
          { x: x + 1, y },
          { x: x + 1, y: y + 1 },
          { x, y: y + 1 },
        ],
        parts: [],
        overlays: [{ kind: 1, points: outline }],
        borderParts: corridorBorders(outline, x, y),
      });
    }
  }
  return tiles;
}

export const seededBinaryTreeMaze: TilingDefinition = {
  id: 'seeded-binary-tree-maze',
  name: 'Seeded binary-tree maze',
  family: 'algorithmic',
  description:
    'A coordinate hash makes each square carve north or east towards a common corner. The resulting passages form a perfect maze: every pair of cells has exactly one connecting route. The two-direction rule gives the construction its characteristic diagonal bias, while the visible interior remains fixed when the canvas or tile size changes.',
  kinds: 2,
  kindLabels: ['Walls', 'Passages'],
  backgroundKind: 0,
  reference: 'https://weblog.jamisbuck.org/2011/2/1/maze-generation-binary-tree-algorithm',
  referenceLabel: 'Maze Generation: Binary Tree algorithm — Jamis Buck',
  furtherReferences: [
    {
      label: 'The Binary Tree Algorithm — Mazes for Programmers',
      url: 'https://www.oreilly.com/library/view/mazes-for-programmers/9781680501315/f_0012.html',
    },
  ],
  unitTileArea: 1,
  generate: generateBinaryTreeMaze,
};

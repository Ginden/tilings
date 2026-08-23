import type { Affine, Vec } from '../geometry.js';
import { IDENTITY, apply, intersectsCenteredSquare, inv, mul, translation } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';
import { subdivideShapes } from './substitution.js';
import type { Placed } from './substitution.js';

/** The chair (L-tromino), three unit squares, as a closed outline. */
export const CHAIR_OUTLINE: readonly Vec[] = [
  { x: 0, y: 0 },
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 0, y: 2 },
];

/** The four half-size chairs that exactly fill one chair, with their rotation. */
const CHILDREN: readonly { transform: Affine; rotation: number }[] = [
  { transform: [0.5, 0, 0, 0, 0.5, 0], rotation: 0 },
  { transform: [0, -0.5, 2, 0.5, 0, 0], rotation: 1 },
  { transform: [0, 0.5, 0, -0.5, 0, 2], rotation: 3 },
  { transform: [0.5, 0, 0.5, 0, 0.5, 0.5], rotation: 0 },
];

export function subdivideChair(p: Placed): Placed[] {
  return CHILDREN.map((child) => ({
    kind: (p.kind + child.rotation) % 4,
    transform: mul(p.transform, child.transform),
  }));
}

function chairSeed(radius: number): { levels: number; seed: Placed } {
  const levels = Math.max(1, Math.ceil(Math.log2(2 * Math.max(radius, 1))));
  // Grow outwards by repeatedly making the current patch the central child of
  // a supertile, which keeps the origin near the middle of the patch.
  const central = CHILDREN[3]!.transform;
  let seedTransform: Affine = IDENTITY;
  for (let i = 0; i < levels; i++) {
    seedTransform = mul(seedTransform, inv(central));
  }
  // The chair is L-shaped, so the largest disc it contains sits over the
  // corner square rather than over the centre of the bounding box.
  const anchor = apply(seedTransform, { x: 0.5, y: 0.5 });
  const recentre = translation(-anchor.x, -anchor.y);
  return { levels, seed: { kind: 0, transform: mul(recentre, seedTransform) } };
}

function generateChairAtDepth(radius: number, levelsToSkip: number): Tile[] {
  const { levels, seed } = chairSeed(radius);
  const placed = subdivideShapes(
    [seed],
    subdivideChair,
    Math.max(0, levels - levelsToSkip),
    (child) => intersectsCenteredSquare(
      CHAIR_OUTLINE.map((point) => apply(child.transform, point)),
      radius,
    ),
  );
  return placed.map((p) => ({
    kind: p.kind,
    points: CHAIR_OUTLINE.map((v) => apply(p.transform, v)),
  }));
}

export const chair: TilingDefinition = {
  id: 'chair',
  name: 'Chair (L-tromino)',
  family: 'reptile',
  description:
    'The chair substitution: an L-tromino splitting into four half-size chairs. Its hierarchical structure forces non-periodicity.',
  kinds: 4,
  kindLabels: ['0°', '90°', '180°', '270°'],
  reference: 'https://en.wikipedia.org/wiki/List_of_aperiodic_sets_of_tiles',
  unitTileArea: 3,
  substitutionHierarchy: {
    maxLevels: 3,
    generate: generateChairAtDepth,
  },
  generate: (radius) => generateChairAtDepth(radius, 0),
};

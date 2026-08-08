import type { TilingDefinition } from './types.js';
import { penroseP2, penroseP3, robinsonTriangles } from './penrose.js';
import {
  ammannBeenker,
  decagonal,
  dodecagonal,
  heptagonal,
  penrosePentagrid,
} from './multigrid.js';
import { pinwheel } from './pinwheel.js';
import { chair } from './chair.js';
import { hat } from './hat.js';

export const TILINGS: readonly TilingDefinition[] = [
  penroseP3,
  penroseP2,
  penrosePentagrid,
  robinsonTriangles,
  ammannBeenker,
  dodecagonal,
  heptagonal,
  decagonal,
  hat,
  pinwheel,
  chair,
];

export const FAMILY_LABELS: Record<TilingDefinition['family'], string> = {
  penrose: 'Penrose tilings',
  quasicrystal: 'Other quasicrystals',
  monotile: 'Aperiodic monotiles',
  reptile: 'Substitution rep-tiles',
};

export function tilingById(id: string): TilingDefinition {
  return TILINGS.find((t) => t.id === id) ?? TILINGS[0]!;
}

export type { TilingDefinition } from './types.js';
export type { Tile } from './types.js';

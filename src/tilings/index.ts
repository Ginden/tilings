import type { TilingDefinition } from './types.js';
import { penroseP1 } from './p1.js';
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
import {
  socolar,
  sphinx,
  tubingenTriangle,
} from './additional.js';
import { voderberg } from './voderberg.js';
import { shurikenSupertile } from './shuriken.js';
import { squiral } from './squiral.js';
import { jeandelRao } from './jeandel-rao.js';
import { danzerSevenfold } from './danzer-sevenfold.js';

export const TILINGS: readonly TilingDefinition[] = [
  penroseP3,
  penroseP2,
  penroseP1,
  penrosePentagrid,
  robinsonTriangles,
  ammannBeenker,
  dodecagonal,
  heptagonal,
  decagonal,
  socolar,
  tubingenTriangle,
  hat,
  pinwheel,
  chair,
  sphinx,
  voderberg,
  shurikenSupertile,
  squiral,
  jeandelRao,
  danzerSevenfold,
];

export const FAMILY_LABELS: Record<TilingDefinition['family'], string> = {
  penrose: 'Penrose tilings',
  quasicrystal: 'Other quasicrystals',
  monotile: 'Aperiodic monotiles',
  reptile: 'Substitution rep-tiles',
  nonperiodic: 'Other non-periodic tilings',
  experimental: 'Experimental',
};

const TILING_NAME_COLLATOR = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
});

/** Registry order keeps the default stable; this order is for the picker UI. */
export const TILINGS_FOR_UI: readonly TilingDefinition[] = Object.keys(FAMILY_LABELS).flatMap(
  (family) =>
    TILINGS.filter((tiling) => tiling.family === family).sort((a, b) =>
      TILING_NAME_COLLATOR.compare(a.name, b.name),
    ),
);

export function tilingById(id: string): TilingDefinition {
  return TILINGS.find((t) => t.id === id) ?? TILINGS[0]!;
}

export type { TilingDefinition } from './types.js';
export type { Tile } from './types.js';

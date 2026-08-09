import type { Vec } from '../geometry.js';

/**
 * A single tile of a tiling. `kind` selects the colour: it is an index into the
 * tiling's tile classes (`0 .. kinds - 1`) which the renderer maps onto the
 * two user-chosen colours.
 */
export interface Tile {
  readonly kind: number;
  /**
   * Optional disconnected visible components. `points` remains the carrier
   * used for coverage and clipping; the renderer draws these polygons instead.
   */
  readonly parts?: readonly (readonly Vec[])[];
  readonly points: readonly Vec[];
}

export type TilingFamily =
  | 'penrose'
  | 'quasicrystal'
  | 'matching'
  | 'monotile'
  | 'reptile'
  | 'nonperiodic';

export interface TilingDefinition {
  /** Stable identifier, also used in exported file names. */
  readonly id: string;
  readonly name: string;
  readonly family: TilingFamily;
  readonly description: string;
  /** Number of tile classes; class `i` gets colour `lerp(colour1, colour2, i/(kinds-1))`. */
  readonly kinds: number;
  readonly kindLabels: readonly string[];
  /** Fit the complete generated patch in the viewport instead of cropping it as an infinite cover. */
  readonly viewportMode?: 'cover' | 'fit-patch';
  /** Reference URL (usually Wikipedia). */
  readonly reference: string;
  /** Area of a typical tile when generated at natural scale, used to normalise tile sizes. */
  readonly unitTileArea: number;
  /**
   * Generate a patch centred on the origin that covers the disc of the given
   * radius (in natural units).
   */
  generate(radius: number): Tile[];
}

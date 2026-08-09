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
  | 'monotile'
  | 'reptile'
  | 'nonperiodic'
  | 'experimental';

export interface TilingReference {
  readonly label: string;
  readonly url: string;
}

export interface TilingDefinition {
  /** Stable identifier, also used in exported file names. */
  readonly id: string;
  readonly name: string;
  readonly family: TilingFamily;
  readonly description: string;
  /** Number of tile classes; class `i` gets colour `lerp(colour1, colour2, i/(kinds-1))`. */
  readonly kinds: number;
  readonly kindLabels: readonly string[];
  /** Pair adjacent states around each selected endpoint colour instead of using one linear gradient. */
  readonly colourMode?: 'gradient' | 'paired';
  /** Reference URL (usually Wikipedia). */
  readonly reference: string;
  /** Human-readable citation for `reference`; defaults to the tiling name and website. */
  readonly referenceLabel?: string;
  /** Other sources that are useful for understanding the construction. */
  readonly furtherReferences?: readonly TilingReference[];
  /** Area of a typical tile when generated at natural scale, used to normalise tile sizes. */
  readonly unitTileArea: number;
  /**
   * Generate a patch centred on the origin that covers the disc of the given
   * radius (in natural units).
   */
  generate(radius: number): Tile[];
}

import type { Vec } from '../geometry.js';

/**
 * A single tile of a tiling. `kind` selects the colour: it is an index into the
 * tiling's tile classes (`0 .. kinds - 1`) which the renderer maps onto the
 * user-chosen colour stops.
 */
export interface Tile {
  readonly kind: number;
  /**
   * Optional disconnected visible components. `points` remains the carrier
   * used for coverage and clipping; the renderer draws these polygons instead.
   */
  readonly parts?: readonly (readonly Vec[])[];
  /** Additional filled polygons, independently assigned to tile classes. */
  readonly overlays?: readonly {
    readonly kind: number;
    readonly points: readonly Vec[];
  }[];
  /** Optional open polylines to use instead of the visible polygons' closed borders. */
  readonly borderParts?: readonly (readonly Vec[])[];
  readonly points: readonly Vec[];
}

export type TilingFamily =
  | 'regular'
  | 'uniform'
  | 'penrose'
  | 'quasicrystal'
  | 'monotile'
  | 'reptile'
  | 'nonperiodic'
  | 'algorithmic'
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
  /** Number of tile classes; their colours are spread evenly across the active colour stops. */
  readonly kinds: number;
  readonly kindLabels: readonly string[];
  /** Offer a third colour stop for tilings whose class structure benefits from one. */
  readonly supportsThreeColours?: boolean;
  /** Use one tile-class colour behind sparse decorative geometry. */
  readonly backgroundKind?: number;
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
   * One rectangular translation cell for periodic tilings. The renderer can
   * repeat this cell instead of expanding the whole viewport into polygons.
   * Tiles may cross the cell boundary; SVG viewport clipping supplies the
   * matching fragment from the neighbouring copy.
   */
  readonly periodicCell?: {
    readonly width: number;
    readonly height: number;
    readonly tiles: readonly Tile[];
  };
  /**
   * Optional geometry for visualising the substitution ancestry. Level 1 is
   * the parent of the rendered tiles, level 2 their grandparent, and so on.
   */
  readonly substitutionHierarchy?: {
    readonly maxLevels: number;
    generate(radius: number, level: number): Tile[];
  };
  /**
   * Generate a patch centred on the origin that covers the disc of the given
   * radius (in natural units).
   */
  generate(radius: number, seed?: number): Tile[];
}

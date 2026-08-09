import type { Tile, TilingDefinition } from '../tilings/types.js';

export interface SceneOptions {
  readonly width: number;
  readonly height: number;
  /** Nominal tile size in pixels (the side of a square with the same area as a typical tile). */
  readonly tileSize: number;
  /** Rotation of the patch, in degrees. */
  readonly rotation?: number;
}

export interface Scene {
  readonly tiles: readonly Tile[];
  /** Tiles generated before clipping to the viewport. */
  readonly generated: number;
}

/**
 * Generate a tiling patch and place it in a `width` x `height` pixel viewport,
 * normalising tile areas so that `tileSize` means the same thing for every tiling.
 */
export function buildScene(def: TilingDefinition, opts: SceneOptions): Scene {
  const tileSize = Math.max(2, opts.tileSize);
  const scale = tileSize / Math.sqrt(def.unitTileArea);
  const diagonal = Math.hypot(opts.width, opts.height) / 2;
  const radius = (diagonal * 1.1 + tileSize * 2) / scale;

  const raw = def.generate(radius);
  const angle = ((opts.rotation ?? 0) * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const cx = opts.width / 2;
  const cy = opts.height / 2;

  const tiles: Tile[] = [];
  for (const tile of raw) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    const transformPoint = (p: { x: number; y: number }): { x: number; y: number } => {
      const x = cx + (p.x * cos - p.y * sin) * scale;
      const y = cy + (p.x * sin + p.y * cos) * scale;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      return { x, y };
    };
    const points = tile.points.map(transformPoint);
    const parts = tile.parts?.map((part) => part.map(transformPoint));
    if (maxX < 0 || maxY < 0 || minX > opts.width || minY > opts.height) continue;
    tiles.push({ kind: tile.kind, points, ...(parts ? { parts } : {}) });
  }
  return { tiles, generated: raw.length };
}

import type { Tile, TilingDefinition } from '../tilings/types.js';
import { buildScene } from './scene.js';
import type { SceneOptions } from './scene.js';
import { kindColors, paletteBackground } from './color.js';

export interface Palette {
  readonly colour1: string;
  readonly colour2: string;
  readonly colour3?: string | null;
  /** Border colour, or `null` for a transparent (invisible) border. */
  readonly border: string | null;
  readonly borderWidth: number;
}

export interface RenderOptions extends SceneOptions, Palette {
  /**
   * SVG `preserveAspectRatio`. The on-screen preview uses `xMidYMid slice` so
   * that the tiling always covers the window; exported files keep the default.
   */
  readonly preserveAspectRatio?: string;
}

export interface RenderResult {
  readonly svg: string;
  readonly tileCount: number;
  /** A single SVG translation cell for the browser's repeating CSS background. */
  readonly cssBackground?: {
    readonly svg: string;
    readonly width: number;
    readonly height: number;
    readonly rotation: number;
  };
}

function fmt(v: number): string {
  return (Math.round(v * 100) / 100).toString();
}

function pathData(tiles: readonly Tile[]): string {
  const parts: string[] = [];
  for (const tile of tiles) {
    for (const polygon of tile.parts ?? [tile.points]) {
      const [first, ...rest] = polygon;
      if (!first) continue;
      let d = `M${fmt(first.x)} ${fmt(first.y)}`;
      for (const p of rest) d += `L${fmt(p.x)} ${fmt(p.y)}`;
      parts.push(`${d}Z`);
    }
  }
  return parts.join('');
}

function edgePathChunks(tiles: readonly Tile[], chunkSize = 1_024): string[] {
  const edges = new Set<string>();
  for (const tile of tiles) {
    for (const polygon of tile.parts ?? [tile.points]) {
      for (let index = 0; index < polygon.length; index++) {
        const a = polygon[index]!;
        const b = polygon[(index + 1) % polygon.length]!;
        const left = `${fmt(a.x)} ${fmt(a.y)}`;
        const right = `${fmt(b.x)} ${fmt(b.y)}`;
        edges.add(left < right ? `M${left}L${right}` : `M${right}L${left}`);
      }
    }
  }

  const chunks: string[] = [];
  let chunk: string[] = [];
  for (const edge of edges) {
    chunk.push(edge);
    if (chunk.length === chunkSize) {
      chunks.push(chunk.join(''));
      chunk = [];
    }
  }
  if (chunk.length > 0) chunks.push(chunk.join(''));
  return chunks;
}

function tileBody(
  def: TilingDefinition,
  tiles: readonly Tile[],
  colours: readonly string[],
  opts: Palette,
): string[] {
  const byKind = new Map<number, Tile[]>();
  for (const tile of tiles) {
    const list = byKind.get(tile.kind);
    if (list) list.push(tile);
    else byKind.set(tile.kind, [tile]);
  }

  const body: string[] = [];
  for (const [kind, kindTiles] of [...byKind.entries()].sort((a, b) => a[0] - b[0])) {
    const fill = colours[Math.min(kind, colours.length - 1)] ?? opts.colour1;
    body.push(
      `<path data-kind="${kind}" fill="${fill}" stroke="none" d="${pathData(kindTiles)}"><title>${escapeXml(
        def.kindLabels[kind] ?? `class ${kind}`,
      )}</title></path>`,
    );
  }
  const borderStroke =
    opts.border === null
      ? 'stroke="none"'
      : `stroke="${opts.border}" stroke-width="${fmt(opts.borderWidth)}"`;
  // Draw deduplicated edges after every fill. Closed polygon strokes form
  // wedges at acute vertices, and per-class strokes can be painted over.
  for (const edges of edgePathChunks(tiles)) {
    body.push(
      `<path data-border="" fill="none" ${borderStroke} stroke-linecap="round" d="${edges}"/>`,
    );
  }
  return body;
}

function renderPeriodicSvg(
  def: TilingDefinition,
  opts: RenderOptions,
  colours: readonly string[],
  background: string,
): RenderResult {
  const cell = def.periodicCell!;
  const scale = Math.max(2, opts.tileSize) / Math.sqrt(def.unitTileArea);
  const cellWidth = cell.width * scale;
  const cellHeight = cell.height * scale;
  const scaledTiles = cell.tiles.map((tile) => ({
    kind: tile.kind,
    points: tile.points.map((point) => ({ x: point.x * scale, y: point.y * scale })),
  }));
  const body = tileBody(def, scaledTiles, colours, opts);
  const cellSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${fmt(cellWidth)}" height="${fmt(cellHeight)}" ` +
    `viewBox="0 0 ${fmt(cellWidth)} ${fmt(cellHeight)}">` +
    `<rect width="100%" height="100%" fill="${background}"/>\n${body.join('\n')}\n</svg>`;
  const rotation = opts.rotation ?? 0;
  const patternTransform = rotation === 0
    ? ''
    : ` patternTransform="rotate(${fmt(rotation)} ${fmt(opts.width / 2)} ${fmt(opts.height / 2)})"`;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.width}" height="${opts.height}" ` +
    `viewBox="0 0 ${opts.width} ${opts.height}" ` +
    `preserveAspectRatio="${opts.preserveAspectRatio ?? 'xMidYMid meet'}">` +
    `<title>${escapeXml(def.name)}</title>\n` +
    `<defs><pattern id="periodic-cell" patternUnits="userSpaceOnUse" width="${fmt(cellWidth)}" ` +
    `height="${fmt(cellHeight)}"${patternTransform}>` +
    `<rect width="100%" height="100%" fill="${background}"/>\n${body.join('\n')}` +
    `</pattern></defs>\n<rect width="${opts.width}" height="${opts.height}" fill="${background}"/>\n` +
    `<rect width="${opts.width}" height="${opts.height}" fill="url(#periodic-cell)"/>\n</svg>`;
  const tileCount = Math.ceil((opts.width * opts.height) / (opts.tileSize * opts.tileSize));
  return {
    svg,
    tileCount,
    cssBackground: { svg: cellSvg, width: cellWidth, height: cellHeight, rotation },
  };
}

/**
 * Render a tiling as a standalone SVG document. Tiles are grouped into one
 * `<path>` per tile class, which keeps even very dense patches fast to draw.
 */
export function renderSvg(def: TilingDefinition, opts: RenderOptions): RenderResult {
  const colour3 = def.supportsThreeColours ? (opts.colour3 ?? null) : null;
  const colours = kindColors(opts.colour1, opts.colour2, def.kinds, def.colourMode, colour3);
  const background = paletteBackground(opts.colour1, opts.colour2, colour3);
  if (def.periodicCell) return renderPeriodicSvg(def, opts, colours, background);

  const scene = buildScene(def, opts);

  const body: string[] = [
    `<rect width="${opts.width}" height="${opts.height}" fill="${background}"/>`,
    ...tileBody(def, scene.tiles, colours, opts),
  ];

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.width}" height="${opts.height}" ` +
    `viewBox="0 0 ${opts.width} ${opts.height}" ` +
    `preserveAspectRatio="${opts.preserveAspectRatio ?? 'xMidYMid meet'}">` +
    `<title>${escapeXml(def.name)}</title>\n${body.join('\n')}\n</svg>`;

  return { svg, tileCount: scene.tiles.length };
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

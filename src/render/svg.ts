import type { Tile, TilingDefinition } from '../tilings/types.js';
import { buildScene } from './scene.js';
import type { SceneOptions } from './scene.js';
import { kindColors, tilingBackground } from './color.js';

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

export function hierarchyStrokeWidth(borderWidth: number, level: number): number {
  return borderWidth + 1.5 * level;
}
function fmt(v: number): string {
  return (Math.round(v * 100) / 100).toString();
}

interface DrawingPaths {
  readonly byKind: ReadonlyMap<number, readonly string[]>;
  readonly edges: ReadonlySet<string> | null;
}

/** Format each vertex once while assembling both fill paths and border edges. */
function drawingPaths(tiles: readonly Tile[], includeBorders: boolean): DrawingPaths {
  const byKind = new Map<number, string[]>();
  const edges = includeBorders ? new Set<string>() : null;
  const addEdge = (left: string, right: string): void => {
    edges!.add(left < right ? `M${left}L${right}` : `M${right}L${left}`);
  };
  for (const tile of tiles) {
    let paths = byKind.get(tile.kind);
    if (!paths) {
      paths = [];
      byKind.set(tile.kind, paths);
    }
    for (const polygon of tile.parts ?? [tile.points]) {
      if (polygon.length === 0) continue;
      const points = polygon.map((point) => `${fmt(point.x)} ${fmt(point.y)}`);
      paths.push(`M${points.join('L')}Z`);
      if (edges && !tile.borderParts) {
        for (let index = 0; index < points.length; index++) {
          addEdge(points[index]!, points[(index + 1) % points.length]!);
        }
      }
    }
    for (const overlay of tile.overlays ?? []) {
      let overlayPaths = byKind.get(overlay.kind);
      if (!overlayPaths) {
        overlayPaths = [];
        byKind.set(overlay.kind, overlayPaths);
      }
      const points = overlay.points.map((point) => `${fmt(point.x)} ${fmt(point.y)}`);
      if (points.length > 0) overlayPaths.push(`M${points.join('L')}Z`);
    }
    if (edges && tile.borderParts) {
      for (const polyline of tile.borderParts) {
        const points = polyline.map((point) => `${fmt(point.x)} ${fmt(point.y)}`);
        for (let index = 0; index + 1 < points.length; index++) {
          addEdge(points[index]!, points[index + 1]!);
        }
      }
    }
  }
  return { byKind, edges };
}

function edgePathChunks(edges: ReadonlySet<string>, chunkSize = 1_024): string[] {
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
  const paths = drawingPaths(tiles, opts.border !== null);

  const body: string[] = [];
  for (const [kind, kindPaths] of [...paths.byKind.entries()].sort((a, b) => a[0] - b[0])) {
    const fill = colours[Math.min(kind, colours.length - 1)] ?? opts.colour1;
    body.push(
      `<path data-kind="${kind}" fill="${fill}" stroke="none" d="${kindPaths.join('')}"><title>${escapeXml(
        def.kindLabels[kind] ?? `class ${kind}`,
      )}</title></path>`,
    );
  }
  if (!paths.edges || opts.border === null) return body;

  const borderStroke = `stroke="${opts.border}" stroke-width="${fmt(opts.borderWidth)}"`;
  // Draw deduplicated edges after every fill. Closed polygon strokes form
  // wedges at acute vertices, and per-class strokes can be painted over.
  for (const edges of edgePathChunks(paths.edges)) {
    body.push(
      `<path data-border="" fill="none" ${borderStroke} stroke-linecap="round" d="${edges}"/>`,
    );
  }
  return body;
}

function hierarchyBody(levels: readonly (readonly Tile[])[], opts: Palette): string[] {
  if (opts.border === null) return [];
  return levels.map((tiles, index) => {
    const paths = drawingPaths(tiles, false).byKind;
    const level = index + 1;
    const path = [...paths.values()].flat().join('');
    return `<path data-hierarchy-level="${level}" fill="none" stroke="${opts.border}" ` +
      `stroke-width="${fmt(hierarchyStrokeWidth(opts.borderWidth, level))}" ` +
      `stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="3" d="${path}"/>`;
  });
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
    ...(tile.parts
      ? { parts: tile.parts.map((part) => part.map((point) => ({ x: point.x * scale, y: point.y * scale }))) }
      : {}),
    ...(tile.overlays
      ? {
          overlays: tile.overlays.map((overlay) => ({
            kind: overlay.kind,
            points: overlay.points.map((point) => ({ x: point.x * scale, y: point.y * scale })),
          })),
        }
      : {}),
    ...(tile.borderParts
      ? {
          borderParts: tile.borderParts.map((part) =>
            part.map((point) => ({ x: point.x * scale, y: point.y * scale }))),
        }
      : {}),
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
  const colours = kindColors(
    opts.colour1,
    opts.colour2,
    def.kinds,
    def.colourMode,
    colour3,
    def.colourPositions,
  );
  const background = tilingBackground(def, colours, opts.colour1, opts.colour2, colour3);
  if (def.periodicCell) return renderPeriodicSvg(def, opts, colours, background);

  const scene = buildScene(def, opts);

  const body: string[] = [
    `<rect width="${opts.width}" height="${opts.height}" fill="${background}"/>`,
    ...tileBody(def, scene.tiles, colours, opts),
    ...hierarchyBody(scene.hierarchy, opts),
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

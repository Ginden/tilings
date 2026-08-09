import type { Tile, TilingDefinition } from '../tilings/types.js';
import { buildScene } from './scene.js';
import type { SceneOptions } from './scene.js';
import { kindColors, mix } from './color.js';

export interface Palette {
  readonly colour1: string;
  readonly colour2: string;
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

/**
 * Render a tiling as a standalone SVG document. Tiles are grouped into one
 * `<path>` per tile class, which keeps even very dense patches fast to draw.
 */
export function renderSvg(def: TilingDefinition, opts: RenderOptions): RenderResult {
  const scene = buildScene(def, opts);
  const colours = kindColors(opts.colour1, opts.colour2, def.kinds, def.colourMode);
  const background = mix(opts.colour1, opts.colour2, 0.5);

  const byKind = new Map<number, Tile[]>();
  for (const tile of scene.tiles) {
    const list = byKind.get(tile.kind);
    if (list) list.push(tile);
    else byKind.set(tile.kind, [tile]);
  }

  const body: string[] = [
    `<rect width="${opts.width}" height="${opts.height}" fill="${background}"/>`,
  ];
  for (const [kind, tiles] of [...byKind.entries()].sort((a, b) => a[0] - b[0])) {
    const fill = colours[Math.min(kind, colours.length - 1)] ?? opts.colour1;
    body.push(
      `<path data-kind="${kind}" fill="${fill}" stroke="none" d="${pathData(tiles)}"><title>${escapeXml(
        def.kindLabels[kind] ?? `class ${kind}`,
      )}</title></path>`,
    );
  }
  const borderStroke =
    opts.border === null
      ? 'stroke="none"'
      : `stroke="${opts.border}" stroke-width="${fmt(opts.borderWidth)}"`;
  // Stroke independent, deduplicated edges after every fill. Closed polygon
  // strokes form large wedges at the nonagon's acute vertices, and grouping
  // fill and stroke lets later colour classes paint over earlier borders.
  for (const edges of edgePathChunks(scene.tiles)) {
    body.push(
      `<path data-border="" fill="none" ${borderStroke} stroke-linecap="round" d="${edges}"/>`,
    );
  }

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

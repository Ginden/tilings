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
    const [first, ...rest] = tile.points;
    if (!first) continue;
    let d = `M${fmt(first.x)} ${fmt(first.y)}`;
    for (const p of rest) d += `L${fmt(p.x)} ${fmt(p.y)}`;
    parts.push(`${d}Z`);
  }
  return parts.join('');
}

/**
 * Render a tiling as a standalone SVG document. Tiles are grouped into one
 * `<path>` per tile class, which keeps even very dense patches fast to draw.
 */
export function renderSvg(def: TilingDefinition, opts: RenderOptions): RenderResult {
  const scene = buildScene(def, opts);
  const colours = kindColors(opts.colour1, opts.colour2, def.kinds);
  const background = opts.border ?? mix(opts.colour1, opts.colour2, 0.5);

  const byKind = new Map<number, Tile[]>();
  for (const tile of scene.tiles) {
    const list = byKind.get(tile.kind);
    if (list) list.push(tile);
    else byKind.set(tile.kind, [tile]);
  }

  const stroke =
    opts.border === null
      ? ' stroke="none"'
      : ` stroke="${opts.border}" stroke-width="${fmt(opts.borderWidth)}" stroke-linejoin="round"`;

  const body: string[] = [
    `<rect width="${opts.width}" height="${opts.height}" fill="${background}"/>`,
  ];
  for (const [kind, tiles] of [...byKind.entries()].sort((a, b) => a[0] - b[0])) {
    const fill = colours[Math.min(kind, colours.length - 1)] ?? opts.colour1;
    body.push(
      `<path fill="${fill}"${stroke} d="${pathData(tiles)}"><title>${escapeXml(
        def.kindLabels[kind] ?? `class ${kind}`,
      )}</title></path>`,
    );
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.width}" height="${opts.height}" ` +
    `viewBox="0 0 ${opts.width} ${opts.height}" ` +
    `preserveAspectRatio="${opts.preserveAspectRatio ?? 'xMidYMid meet'}">` +
    `<title>${escapeXml(def.name)}</title>${body.join('')}</svg>`;

  return { svg, tileCount: scene.tiles.length };
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

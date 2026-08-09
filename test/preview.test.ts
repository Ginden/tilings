import { mkdirSync, writeFileSync } from 'node:fs';
import { describe, it } from 'vitest';
import { TILINGS } from '../src/tilings/index.js';
import { renderSvg } from '../src/render/svg.js';

/**
 * Writes an SVG for every tiling so that the output can be inspected by eye.
 * Enabled with `PREVIEW_DIR=<dir> npm test`.
 */
const dir = process.env['PREVIEW_DIR'];
const requestedTiling = process.env['PREVIEW_TILING'];
const previewWidth = Number(process.env['PREVIEW_WIDTH'] ?? 900);
const previewHeight = Number(process.env['PREVIEW_HEIGHT'] ?? 600);
const previewTileSize = Number(process.env['PREVIEW_TILE_SIZE'] ?? 34);
const previewBorder =
  process.env['PREVIEW_BORDER'] === 'none'
    ? null
    : (process.env['PREVIEW_BORDER'] ?? '#101820');

describe.skipIf(!dir)('preview', () => {
  it('renders every tiling', () => {
    mkdirSync(dir!, { recursive: true });
    const definitions = requestedTiling
      ? TILINGS.filter((definition) => definition.id === requestedTiling)
      : TILINGS;
    if (requestedTiling && definitions.length === 0) {
      throw new Error(`Unknown tiling id: ${requestedTiling}`);
    }
    for (const def of definitions) {
      const { svg, tileCount } = renderSvg(def, {
        width: previewWidth,
        height: previewHeight,
        tileSize: previewTileSize,
        colour1: '#f2c14e',
        colour2: '#1b3a5c',
        border: previewBorder,
        borderWidth: 1,
      });
      writeFileSync(`${dir}/${def.id}.svg`, svg);
      console.log(`${def.id}: ${tileCount} tiles`);
    }
  });
});

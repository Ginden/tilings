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
const previewRotation = Number(process.env['PREVIEW_ROTATION'] ?? 0);
const previewHierarchy = Number(process.env['PREVIEW_HIERARCHY'] ?? 0);
const previewSeed = Number(process.env['PREVIEW_SEED'] ?? 20260824);
const previewLoopFillLimit = Number(process.env['PREVIEW_LOOP_FILL_LIMIT'] ?? 16);
const previewColour1 = process.env['PREVIEW_COLOUR_1'] ?? '#f2c14e';
const previewColour2 = process.env['PREVIEW_COLOUR_2'] ?? '#1b3a5c';
const previewColour3 = process.env['PREVIEW_COLOUR_3'] ?? null;
const previewBorder =
  process.env['PREVIEW_BORDER'] === 'none'
    ? null
    : (process.env['PREVIEW_BORDER'] ?? '#101820');
const previewBorderWidth = Number(process.env['PREVIEW_BORDER_WIDTH'] ?? 1);

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
        rotation: previewRotation,
        substitutionHierarchy: previewHierarchy,
        seed: previewSeed,
        loopFillLimit: previewLoopFillLimit,
        colour1: previewColour1,
        colour2: previewColour2,
        colour3: previewColour3,
        border: previewBorder,
        borderWidth: previewBorderWidth,
      });
      writeFileSync(`${dir}/${def.id}.svg`, svg);
      console.log(`${def.id}: ${tileCount} tiles`);
    }
  });
});

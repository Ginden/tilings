import { mkdirSync, writeFileSync } from 'node:fs';
import { describe, it } from 'vitest';
import { TILINGS } from '../src/tilings/index.js';
import { renderSvg } from '../src/render/svg.js';

/**
 * Writes an SVG for every tiling so that the output can be inspected by eye.
 * Enabled with `PREVIEW_DIR=<dir> npm test`.
 */
const dir = process.env['PREVIEW_DIR'];

describe.skipIf(!dir)('preview', () => {
  it('renders every tiling', () => {
    mkdirSync(dir!, { recursive: true });
    for (const def of TILINGS) {
      const { svg, tileCount } = renderSvg(def, {
        width: 900,
        height: 600,
        tileSize: 34,
        colour1: '#f2c14e',
        colour2: '#1b3a5c',
        border: '#101820',
        borderWidth: 1,
      });
      writeFileSync(`${dir}/${def.id}.svg`, svg);
      console.log(`${def.id}: ${tileCount} tiles`);
    }
  });
});

import { describe, expect, it } from 'vitest';
import { renderSvg } from '../src/render/svg.js';
import type { TilingDefinition } from '../src/tilings/types.js';

const twoSquares: TilingDefinition = {
  id: 'two-squares',
  name: 'Two & squares',
  family: 'regular',
  description: 'A compact renderer fixture.',
  kinds: 2,
  kindLabels: ['left <square>', 'right square'],
  reference: 'https://example.com/',
  unitTileArea: 1,
  generate: () => [
    {
      kind: 0,
      points: [
        { x: -1, y: -0.5 },
        { x: 0, y: -0.5 },
        { x: 0, y: 0.5 },
        { x: -1, y: 0.5 },
      ],
    },
    {
      kind: 1,
      points: [
        { x: 0, y: -0.5 },
        { x: 1, y: -0.5 },
        { x: 1, y: 0.5 },
        { x: 0, y: 0.5 },
      ],
    },
  ],
};

describe('SVG drawing snapshot', () => {
  it('keeps batched fills and deduplicated borders stable', () => {
    expect(
      renderSvg(twoSquares, {
        width: 4,
        height: 2,
        tileSize: 2,
        colour1: '#000000',
        colour2: '#ffffff',
        border: '#123456',
        borderWidth: 0.75,
      }),
    ).toMatchSnapshot();
  });

  it('omits all border geometry when the border is transparent', () => {
    expect(
      renderSvg(twoSquares, {
        width: 4,
        height: 2,
        tileSize: 2,
        colour1: '#000000',
        colour2: '#ffffff',
        border: null,
        borderWidth: 0.75,
      }),
    ).toMatchSnapshot();
  });
});

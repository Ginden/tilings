import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { renderSvg } from '../src/render/svg.js';
import { tilingById } from '../src/tilings/index.js';
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

  it('renders Truchet ribbons over a tile-colour background without cell borders', () => {
    const result = renderSvg(tilingById('seeded-truchet'), {
      width: 80,
      height: 60,
      tileSize: 20,
      seed: 20260824,
      colour1: '#000000',
      colour2: '#ffffff',
      border: '#123456',
      borderWidth: 0.75,
    });
    expect(result.svg).toContain('<rect width="80" height="60" fill="#000000"/>');
    expect(result.svg).toContain('<path data-kind="1" fill="#ffffff"');
    expect(result.svg).not.toContain('data-border');
  });

  it('keeps the Danzer drawing stable', () => {
    const result = renderSvg(tilingById('danzer-sevenfold'), {
      width: 320,
      height: 180,
      tileSize: 20,
      rotation: 13,
      colour1: '#000000',
      colour2: '#ffffff',
      colour3: '#ff0000',
      border: '#123456',
      borderWidth: 0.75,
    });
    expect({
      tileCount: result.tileCount,
      svgBytes: result.svg.length,
      svgSha256: createHash('sha256').update(result.svg).digest('hex'),
    }).toMatchSnapshot();
  });

  it('keeps substitution drawings stable', () => {
    const drawings = Object.fromEntries(
      [
        'sphinx',
        'pinwheel',
        'chair',
        'hat',
        'watanabe-ito-soma-eightfold',
        'penrose-p2',
        'shuriken-supertile-12',
      ].map((id) => {
        const result = renderSvg(tilingById(id), {
          width: 320,
          height: 180,
          tileSize: 12,
          rotation: 13,
          colour1: '#000000',
          colour2: '#ffffff',
          border: '#123456',
          borderWidth: 0.75,
        });
        return [
          id,
          {
            tileCount: result.tileCount,
            svgBytes: result.svg.length,
            svgSha256: createHash('sha256').update(result.svg).digest('hex'),
          },
        ];
      }),
    );
    expect(drawings).toMatchSnapshot();
  });
});

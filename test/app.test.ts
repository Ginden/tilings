import { describe, expect, it } from 'vitest';
import { kindColors, mix, parseHex, toHex } from '../src/render/color.js';
import { renderSvg } from '../src/render/svg.js';
import { buildScene } from '../src/render/scene.js';
import { exportFileName } from '../src/export.js';
import { DEFAULT_STATE, SIZE_PRESETS, decodeState, encodeState, resolveSize } from '../src/state.js';
import { PALETTES } from '../src/palettes.js';
import { TILINGS, tilingById } from '../src/tilings/index.js';

const options = {
  width: 800,
  height: 600,
  tileSize: 40,
  colour1: '#e8b53b',
  colour2: '#1b3a5c',
  border: '#101820',
  borderWidth: 1,
};

describe('colours', () => {
  it('round trips hex values', () => {
    expect(toHex(parseHex('#e8b53b'))).toBe('#e8b53b');
    expect(toHex(parseHex('abc'))).toBe('#aabbcc');
  });

  it('mixes and spreads tile classes across the two colours', () => {
    expect(mix('#000000', '#ffffff', 0.5)).toBe('#808080');
    const colours = kindColors('#000000', '#ffffff', 3);
    expect(colours).toEqual(['#000000', '#808080', '#ffffff']);
    expect(kindColors('#123456', '#654321', 1)).toEqual(['#123456']);
    expect(kindColors('#123456', '#f2c14e', 4, 'paired')).toEqual([
      '#123456',
      '#5e758c',
      '#f2c14e',
      '#bd973d',
    ]);
  });
});

describe('scene', () => {
  it('clips tiles to the viewport and keeps it covered', () => {
    const scene = buildScene(tilingById('penrose-p3'), options);
    expect(scene.tiles.length).toBeGreaterThan(100);
    expect(scene.tiles.length).toBeLessThanOrEqual(scene.generated);
    for (const tile of scene.tiles) {
      for (const p of tile.points) {
        expect(Number.isFinite(p.x)).toBe(true);
      }
    }
  });

  it('scales tiles so that tile size means the same for every tiling', () => {
    for (const def of TILINGS) {
      const scene = buildScene(def, { ...options, tileSize: 60 });
      const areas = scene.tiles.map((t) => {
        let sum = 0;
        for (let i = 0; i < t.points.length; i++) {
          const a = t.points[i]!;
          const b = t.points[(i + 1) % t.points.length]!;
          sum += a.x * b.y - b.x * a.y;
        }
        return Math.abs(sum / 2);
      });
      const mean = areas.reduce((a, b) => a + b, 0) / areas.length;
      // Nominal area is tileSize^2 = 3600; allow for the mix of tile shapes.
      expect(mean).toBeGreaterThan(1500);
      expect(mean).toBeLessThan(7000);
    }
  });
});

describe('svg output', () => {
  it('renders one path per tile class plus a background', () => {
    const def = tilingById('penrose-p3');
    const { svg, tileCount } = renderSvg(def, options);
    expect(tileCount).toBeGreaterThan(0);
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true);
    expect(svg).toContain('viewBox="0 0 800 600"');
    expect(svg.match(/data-kind=/g)).toHaveLength(def.kinds);
    expect(svg).toContain('<path data-kind="0"');
    expect(svg).toContain('<path data-kind="1"');
    expect(svg).toContain(`<path data-border="" fill="none" stroke="${options.border}"`);
    expect(svg).toContain('stroke-linecap="round"');
    expect([...svg.matchAll(/<path data-border=""[^>]+ d="([^"]+)"/g)]).not.toHaveLength(0);
    for (const borderPath of svg.matchAll(/<path data-border=""[^>]+ d="([^"]+)"/g)) {
      expect(borderPath[1]).not.toContain('Z');
    }
    expect(svg).toContain(`<rect width="800" height="600" fill="${mix(options.colour1, options.colour2, 0.5)}"`);
    expect(svg.trimEnd().endsWith('</svg>')).toBe(true);
    expect(svg).not.toContain('NaN');
  });

  it('omits the stroke when the border is transparent', () => {
    const svg = renderSvg(tilingById('penrose-p2'), { ...options, border: null }).svg;
    expect(svg).toContain('stroke="none"');
    expect(svg).not.toContain('stroke-width');
  });

  it('names the tiling and honours preserveAspectRatio', () => {
    const def = tilingById('hat');
    const svg = renderSvg(def, { ...options, preserveAspectRatio: 'xMidYMid slice' }).svg;
    expect(svg).toContain('preserveAspectRatio="xMidYMid slice"');
    expect(svg).toContain(`<title>${def.name}</title>`);
    for (const label of def.kindLabels) expect(svg).toContain(`<title>${label}</title>`);
  });
});

describe('export file names', () => {
  it('describes the tiling, size, tile size and colours', () => {
    expect(exportFileName(tilingById('penrose-p3'), options, 'svg')).toBe(
      'penrose-p3_800x600_tile40_e8b53b-1b3a5c_border-101820.svg',
    );
    expect(exportFileName(tilingById('hat'), { ...options, border: null }, 'png')).toBe(
      'hat_800x600_tile40_e8b53b-1b3a5c_border-none.png',
    );
  });
});

describe('state', () => {
  it('round trips through the URL hash', () => {
    const state = {
      ...DEFAULT_STATE,
      tilingId: 'ammann-beenker',
      colour1: '#123456',
      colour2: '#abcdef',
      borderTransparent: true,
      borderWidth: 2.5,
      sizeId: 'custom',
      customWidth: 1234,
      customHeight: 987,
      tileSize: 77,
    };
    expect(decodeState(`#${encodeState(state)}`)).toEqual(state);
  });

  it('falls back to defaults for unknown values', () => {
    expect(decodeState('#t=nope&c1=zzz&ts=-4')).toEqual(DEFAULT_STATE);
  });

  it('resolves sizes', () => {
    const win = { width: 1000, height: 500 };
    expect(resolveSize({ ...DEFAULT_STATE, sizeId: 'fit' }, win)).toEqual(win);
    expect(resolveSize({ ...DEFAULT_STATE, sizeId: '1920x1080' }, win)).toEqual({
      width: 1920,
      height: 1080,
    });
    expect(
      resolveSize({ ...DEFAULT_STATE, sizeId: 'custom', customWidth: 20, customHeight: 99999 }, win),
    ).toEqual({ width: 64, height: 16384 });
  });

  it('every size preset except fit and custom has dimensions', () => {
    for (const preset of SIZE_PRESETS) {
      if (preset.id === 'fit' || preset.id === 'custom') continue;
      expect(preset.width).toBeGreaterThan(0);
      expect(preset.height).toBeGreaterThan(0);
    }
  });
});

describe('palettes', () => {
  it('includes the transcription platform theme colours', () => {
    expect(PALETTES).toContainEqual({
      id: 'oxblood-brass',
      name: 'Oxblood & brass',
      colour1: '#70253a',
      colour2: '#b08d57',
      border: '#f2eee5',
    });
  });

  it('are unique and use valid colours', () => {
    expect(new Set(PALETTES.map((p) => p.id)).size).toBe(PALETTES.length);
    for (const palette of PALETTES) {
      expect(palette.colour1).toMatch(/^#[0-9a-f]{6}$/);
      expect(palette.colour2).toMatch(/^#[0-9a-f]{6}$/);
      if (palette.border !== null) expect(palette.border).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});

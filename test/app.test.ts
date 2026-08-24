import { describe, expect, it } from 'vitest';
import { kindColors, mix, paletteBackground, parseHex, toHex } from '../src/render/color.js';
import { hierarchyStrokeWidth, renderSvg } from '../src/render/svg.js';
import { buildScene } from '../src/render/scene.js';
import {
  addPngMetadata,
  addSvgMetadata,
  exportFileName,
  exportMetadata,
} from '../src/export.js';
import {
  DEFAULT_STATE,
  SIZE_PRESETS,
  decodeState,
  encodeState,
  resolveSize,
  stickyRotation,
  swapSecondAndThirdColours,
  wrappedRotationForKey,
} from '../src/state.js';
import { currentDaySeed } from '../src/seed.js';
import { PALETTES } from '../src/palettes.js';
import { TILINGS, tilingById } from '../src/tilings/index.js';
import { runRenderJob } from '../src/render/worker-job.js';

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

  it('spreads tile classes through an optional third colour', () => {
    expect(kindColors('#000000', '#ff0000', 5, 'gradient', '#ffffff')).toEqual([
      '#000000',
      '#800000',
      '#ff0000',
      '#ff8080',
      '#ffffff',
    ]);
    expect(paletteBackground('#000000', '#ff0000', '#ffffff')).toBe('#aa5555');
  });
});

describe('scene', () => {
  it('offers substitution hierarchy geometry for every recursive rep-tile', () => {
    expect(TILINGS.filter((tiling) => tiling.substitutionHierarchy).map((tiling) => tiling.id).sort()).toEqual([
      'chair',
      'pinwheel',
      'sphinx',
    ]);
  });

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
  it('renders the same SVG through a serialisable worker job', () => {
    const expected = renderSvg(tilingById('seeded-voronoi'), { ...options, seed: 20260824 });
    expect(runRenderJob({
      id: 42,
      tilingId: 'seeded-voronoi',
      options: { ...options, seed: 20260824 },
    })).toEqual({ id: 42, result: expected });
  });

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
    expect(svg).not.toContain('data-border');
    expect(svg).not.toContain('stroke-width');
  });

  it('draws cumulative chair supertile levels without changing the default output', () => {
    const def = tilingById('chair');
    const plain = renderSvg(def, options).svg;
    const hierarchical = renderSvg(def, { ...options, substitutionHierarchy: 2 }).svg;
    expect(plain).not.toContain('data-hierarchy-level');
    expect(hierarchical).toContain('data-hierarchy-level="1"');
    expect(hierarchical).toContain('data-hierarchy-level="2"');
    expect(hierarchical).not.toContain('data-hierarchy-level="3"');
    expect(hierarchical).toContain('stroke-width="2.5"');
    expect(hierarchical).toContain('stroke-width="4"');
    expect(hierarchical).toContain('stroke-linecap="butt" stroke-linejoin="miter"');
    expect(hierarchical.match(/data-hierarchy-level="1"[^>]+d="([^"]+)"/)?.[1]).toContain('Z');
    expect(hierarchyStrokeWidth(6, 3)).toBe(10.5);
  });

  it('names the tiling and honours preserveAspectRatio', () => {
    const def = tilingById('hat');
    const svg = renderSvg(def, { ...options, preserveAspectRatio: 'xMidYMid slice' }).svg;
    expect(svg).toContain('preserveAspectRatio="xMidYMid slice"');
    expect(svg).toContain(`<title>${def.name}</title>`);
    for (const label of def.kindLabels) expect(svg).toContain(`<title>${label}</title>`);
  });

  it('uses a third colour only on tilings that support it', () => {
    const colour3 = '#00ff00';
    const socolar = renderSvg(tilingById('socolar'), { ...options, colour3 }).svg;
    expect(socolar).toContain(`<path data-kind="2" fill="${colour3}"`);

    const penrose = renderSvg(tilingById('penrose-p3'), { ...options, colour3 }).svg;
    expect(penrose).not.toContain(colour3);
  });

  it('renders all three Danzer prototile classes', () => {
    const { svg, tileCount } = renderSvg(tilingById('danzer-sevenfold'), options);
    expect(tileCount).toBeGreaterThan(100);
    expect(svg.match(/data-kind=/g)).toHaveLength(3);
    for (const kind of [0, 1, 2]) expect(svg).toContain(`<path data-kind="${kind}"`);
    expect(svg).not.toContain('NaN');
  });

  it('renders both Watanabe–Ito–Soma prototiles', () => {
    const { svg, tileCount } = renderSvg(tilingById('watanabe-ito-soma-eightfold'), options);
    expect(tileCount).toBeGreaterThan(100);
    expect(svg.match(/data-kind=/g)).toHaveLength(2);
    for (const kind of [0, 1]) expect(svg).toContain(`<path data-kind="${kind}"`);
  });

  it('renders periodic tilings from a compact repeating cell', () => {
    const periodicIds = [
      'triangular', 'square', 'hexagonal',
      'trihexagonal', 'truncated-square', 'truncated-hexagonal', 'rhombitrihexagonal',
      'elongated-triangular', 'truncated-trihexagonal', 'snub-square',
      'snub-hexagonal-left', 'snub-hexagonal-right',
    ];
    for (const id of periodicIds) {
      const def = tilingById(id);
      const result = renderSvg(def, { ...options, width: 3840, height: 2160, tileSize: 12 });
      expect(result.cssBackground).toBeDefined();
      expect(result.cssBackground?.svg).toContain('<svg');
      expect(result.svg).toContain('<pattern id="periodic-cell"');
      expect(result.svg).toContain('fill="url(#periodic-cell)"');
      expect(result.svg.length).toBeLessThan(20_000);
      expect(result.tileCount).toBeGreaterThan(10_000);
      for (const label of def.kindLabels) expect(result.svg).toContain(`<title>${label}</title>`);
    }
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
    expect(exportFileName(tilingById('hat'), { ...options, colour3: '#c084fc' }, 'svg')).toBe(
      'hat_800x600_tile40_e8b53b-1b3a5c-c084fc_border-101820.svg',
    );
    expect(exportFileName(tilingById('seeded-voronoi'), { ...options, seed: 20260824 }, 'svg')).toBe(
      'seeded-voronoi_800x600_tile40_e8b53b-1b3a5c_border-101820_seed-20260824.svg',
    );
  });

  it('adds Dublin Core metadata to SVG exports', () => {
    const def = tilingById('penrose-p3');
    const fileName = exportFileName(def, options, 'svg');
    const metadata = exportMetadata(def, fileName, 'image/svg+xml', new Date('2026-08-23T12:00:00Z'));
    const svg = addSvgMetadata(renderSvg(def, options).svg, metadata);

    expect(svg).toContain('<metadata><rdf:RDF');
    expect(svg).toContain('<dc:title><rdf:Alt>');
    expect(svg).toContain(`<rdf:li xml:lang="x-default">${def.name}</rdf:li>`);
    expect(svg).toContain('<dc:date><rdf:Seq><rdf:li>2026-08-23T12:00:00.000Z</rdf:li>');
    expect(svg).toContain(`<dc:format>image/svg+xml</dc:format>`);
    expect(svg).toContain(`<dc:identifier>${fileName}</dc:identifier>`);
    expect(svg).toContain(`<dc:source>${def.reference.replaceAll('&', '&amp;')}</dc:source>`);
  });

  it('adds Dublin Core XMP to PNG exports', async () => {
    const def = tilingById('hat');
    const metadata = exportMetadata(
      def,
      'hat.png',
      'image/png',
      new Date('2026-08-23T12:00:00Z'),
    );
    // Signature + IHDR + IEND is sufficient for exercising chunk insertion.
    const source = new Blob([new Uint8Array([
      137, 80, 78, 71, 13, 10, 26, 10,
      0, 0, 0, 13, 73, 72, 68, 82,
      0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137,
      0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
    ])], { type: 'image/png' });
    const png = new Uint8Array(await (await addPngMetadata(source, metadata)).arrayBuffer());
    const embedded = new TextDecoder().decode(png);

    expect(embedded).toContain('iTXtXML:com.adobe.xmp');
    expect(embedded).toContain('<dc:format>image/png</dc:format>');
    expect(embedded).toContain('<rdf:li xml:lang="x-default">Hat monotile (einstein)</rdf:li>');
    expect(embedded).toContain('<dc:identifier>hat.png</dc:identifier>');
  });
});

describe('state', () => {
  it('uses the local calendar day as the default algorithmic seed', () => {
    expect(currentDaySeed(new Date(2026, 7, 24, 23, 59))).toBe(20260824);
  });

  it('round trips through the URL hash', () => {
    const state = {
      ...DEFAULT_STATE,
      tilingId: 'ammann-beenker',
      colour1: '#123456',
      colour2: '#abcdef',
      colour3: '#fedcba',
      borderTransparent: true,
      borderWidth: 2.5,
      sizeId: 'custom',
      customWidth: 1234,
      customHeight: 987,
      tileSize: 77,
      rotation: 237,
      substitutionHierarchy: 2,
    };
    expect(decodeState(`#${encodeState(state)}`)).toEqual(state);
  });

  it('falls back to defaults for unknown values', () => {
    expect(decodeState('#t=nope&c1=zzz&ts=-4&r=360')).toEqual(DEFAULT_STATE);
  });

  it('round trips a valid algorithmic seed and ignores invalid seeds', () => {
    const state = { ...DEFAULT_STATE, tilingId: 'seeded-voronoi', randomSeed: 123456789 };
    expect(decodeState(`#${encodeState(state)}`)).toEqual(state);
    expect(decodeState('#t=seeded-voronoi&seed=-1').randomSeed).toBe(DEFAULT_STATE.randomSeed);
  });

  it('swaps the second and third colours only when the third colour is enabled', () => {
    const withThirdColour = { ...DEFAULT_STATE, colour2: '#abcdef', colour3: '#fedcba' };
    expect(swapSecondAndThirdColours(withThirdColour)).toEqual({
      ...withThirdColour,
      colour2: '#fedcba',
      colour3: '#abcdef',
    });
    expect(swapSecondAndThirdColours(DEFAULT_STATE)).toBe(DEFAULT_STATE);
  });

  it('accepts both ends of the rotation range', () => {
    expect(decodeState('#r=0').rotation).toBe(0);
    expect(decodeState('#r=359').rotation).toBe(359);
  });

  it('wraps horizontal arrow keys at the rotation endpoints', () => {
    expect(wrappedRotationForKey(0, 'ArrowLeft')).toBe(359);
    expect(wrappedRotationForKey(359, 'ArrowRight')).toBe(0);
    expect(wrappedRotationForKey(1, 'ArrowLeft')).toBeNull();
    expect(wrappedRotationForKey(358, 'ArrowRight')).toBeNull();
  });

  it('makes common rotation angles sticky within two degrees', () => {
    expect(stickyRotation(15)).toBe(15);
    expect(stickyRotation(27)).toBe(27);
    expect(stickyRotation(28)).toBe(30);
    expect(stickyRotation(43)).toBe(45);
    expect(stickyRotation(58)).toBe(60);
    expect(stickyRotation(73)).toBe(73);
    expect(stickyRotation(88)).toBe(90);
    expect(stickyRotation(133)).toBe(135);
    expect(stickyRotation(332)).toBe(330);
    expect(stickyRotation(333)).toBe(333);
    expect(stickyRotation(359)).toBe(359);
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
  it('keeps the established classics together', () => {
    expect(PALETTES.filter((palette) => palette.collection === 'classics').map((palette) => palette.id)).toEqual([
      'penrose-classic',
      'blueprint',
      'monochrome',
      'islamic-tile',
      'archive',
      'bauhaus',
    ]);
  });

  it('offers three-colour palettes only on the selected tilings', () => {
    expect(PALETTES.filter((palette) => palette.collection === 'trios').map((palette) => palette.id)).toContain('night-bloom');
    expect(PALETTES.filter((palette) => palette.collection === 'trios')).toHaveLength(6);
    expect(TILINGS.filter((tiling) => tiling.supportsThreeColours).map((tiling) => tiling.id).sort()).toEqual([
      'danzer-sevenfold',
      'decagonal',
      'hat',
      'heptagonal',
      'rhombitrihexagonal',
      'seeded-voronoi',
      'shuriken-supertile-12',
      'socolar',
      'truncated-trihexagonal',
    ]);
  });

  it('offers the Trans palette broadly with a white border and all three flag colours', () => {
    expect(PALETTES.find((palette) => palette.id === 'trans')).toMatchObject({
      collection: 'studio',
      colour1: '#5bcefa',
      colour2: '#f5a9b8',
      colour3: '#ffffff',
      border: '#ffffff',
    });
  });

  it('keeps Ultraviolet vivid when a tiling uses a third colour', () => {
    expect(PALETTES.find((palette) => palette.id === 'ultraviolet')).toMatchObject({
      collection: 'studio',
      colour1: '#4c1d95',
      colour2: '#bef264',
      colour3: '#22d3ee',
    });
  });

  it('are unique and use valid colours', () => {
    expect(PALETTES.filter((palette) => palette.collection === 'studio')).toHaveLength(6);
    expect(new Set(PALETTES.map((p) => p.id)).size).toBe(PALETTES.length);
    for (const palette of PALETTES) {
      expect(['classics', 'studio', 'trios']).toContain(palette.collection);
      expect(palette.colour1).toMatch(/^#[0-9a-f]{6}$/);
      expect(palette.colour2).toMatch(/^#[0-9a-f]{6}$/);
      if (palette.collection === 'trios') expect(palette.colour3).toBeDefined();
      if (palette.colour3 !== undefined) expect(palette.colour3).toMatch(/^#[0-9a-f]{6}$/);
      if (palette.border !== null) expect(palette.border).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});

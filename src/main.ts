import { FAMILY_LABELS, TILINGS_FOR_UI, tilingById } from './tilings/index.js';
import { renderSvg } from './render/svg.js';
import type { RenderOptions } from './render/svg.js';
import { kindColors, paletteBackground } from './render/color.js';
import { PALETTES } from './palettes.js';
import {
  DEFAULT_STATE,
  SIZE_PRESETS,
  decodeState,
  encodeState,
  resolveSize,
  wrappedRotationForKey,
} from './state.js';
import type { AppState } from './state.js';
import { copyPngBlob, downloadBlob, downloadSvg, exportFileName, svgToPngBlob } from './export.js';

function element<T extends HTMLElement>(id: string): T {
  const found = document.getElementById(id);
  if (!found) throw new Error(`Missing element #${id}`);
  return found as T;
}

const stage = element<HTMLElement>('stage');
const panel = element<HTMLFormElement>('panel');
const panelToggle = element<HTMLButtonElement>('panel-toggle');
const tilingSelect = element<HTMLSelectElement>('tiling');
const tilingName = element<HTMLHeadingElement>('tiling-name');
const description = element<HTMLDivElement>('tiling-description');
const referenceList = element<HTMLUListElement>('tiling-reference-list');
const paletteBox = element<HTMLDivElement>('palettes');
const colour1 = element<HTMLInputElement>('colour1');
const colour1Hex = element<HTMLInputElement>('colour1-hex');
const colour2 = element<HTMLInputElement>('colour2');
const colour2Hex = element<HTMLInputElement>('colour2-hex');
const swapColoursButton = element<HTMLButtonElement>('swap-colours');
const colour3Controls = element<HTMLDivElement>('colour3-controls');
const colour3Enabled = element<HTMLInputElement>('colour3-enabled');
const colour3 = element<HTMLInputElement>('colour3');
const colour3Hex = element<HTMLInputElement>('colour3-hex');
const kindHint = element<HTMLParagraphElement>('kind-hint');
const borderInput = element<HTMLInputElement>('border');
const borderHex = element<HTMLInputElement>('border-hex');
const borderTransparent = element<HTMLInputElement>('border-transparent');
const borderWidth = element<HTMLInputElement>('border-width');
const borderWidthValue = element<HTMLOutputElement>('border-width-value');
const sizeSelect = element<HTMLSelectElement>('size');
const customSize = element<HTMLDivElement>('custom-size');
const customWidth = element<HTMLInputElement>('custom-width');
const customHeight = element<HTMLInputElement>('custom-height');
const tileSize = element<HTMLInputElement>('tile-size');
const tileSizeValue = element<HTMLOutputElement>('tile-size-value');
const rotation = element<HTMLInputElement>('rotation');
const rotationValue = element<HTMLOutputElement>('rotation-value');
const status = element<HTMLParagraphElement>('status');
const downloadSvgButton = element<HTMLButtonElement>('download-svg');
const downloadPngButton = element<HTMLButtonElement>('download-png');
const copyPngButton = element<HTMLButtonElement>('copy-png');

let state: AppState = location.hash.length > 1 ? decodeState(location.hash) : { ...DEFAULT_STATE };
let lastRender: { options: RenderOptions } | null = null;
const DEFAULT_THIRD_COLOUR = '#a05ad7';

function populateSelects(): void {
  for (const [family, label] of Object.entries(FAMILY_LABELS)) {
    const group = document.createElement('optgroup');
    group.label = label;
    for (const def of TILINGS_FOR_UI.filter((t) => t.family === family)) {
      const option = document.createElement('option');
      option.value = def.id;
      option.textContent = def.name;
      group.append(option);
    }
    if (group.children.length > 0) tilingSelect.append(group);
  }

  for (const preset of SIZE_PRESETS) {
    const option = document.createElement('option');
    option.value = preset.id;
    option.textContent = preset.name;
    sizeSelect.append(option);
  }

  for (const [collection, label] of [
    ['classics', 'Classics'],
    ['studio', 'Studio'],
    ['trios', 'Three colours'],
  ] as const) {
    const group = document.createElement('section');
    group.className = 'palette-group';
    group.dataset['collection'] = collection;
    const heading = document.createElement('h3');
    heading.textContent = label;
    group.append(heading);

    const presets = document.createElement('div');
    presets.className = 'palette-collection';
    for (const palette of PALETTES.filter((entry) => entry.collection === collection)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset['palette'] = palette.id;
      button.setAttribute('aria-label', palette.name);
      button.addEventListener('click', () => {
        state = {
          ...state,
          colour1: palette.colour1,
          colour2: palette.colour2,
          colour3: palette.colour3 ?? null,
          border: palette.border ?? state.border,
          borderTransparent: palette.border === null,
        };
        syncControls();
        updateAppearance();
      });
      presets.append(button);
    }
    group.append(presets);
    paletteBox.append(group);
  }
}

/**
 * A 4K canvas full of 8 px tiles is a third of a million polygons, which locks
 * up the tab and produces a download nobody wants. Raise the tile size just
 * enough to stay under the budget and say so in the status line.
 */
const MAX_TILES = 30_000;

function referenceSite(url: string): string {
  const hostname = new URL(url).hostname.replace(/^www\./, '');
  if (hostname.endsWith('wikipedia.org')) return 'Wikipedia';
  if (hostname === 'arxiv.org') return 'arXiv';
  return hostname;
}

function syncTilingInfo(def: ReturnType<typeof tilingById>): void {
  tilingName.textContent = def.name;
  description.replaceChildren(
    ...def.description.split(/\n\n+/).map((text) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }),
  );

  const references = [
    {
      label: def.referenceLabel ?? `${def.name} — ${referenceSite(def.reference)}`,
      url: def.reference,
    },
    ...(def.furtherReferences ?? []),
  ];
  referenceList.replaceChildren(
    ...references.map(({ label, url }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noreferrer noopener';
      link.textContent = label;
      item.append(link);
      return item;
    }),
  );
}

function currentOptions(): RenderOptions {
  const def = tilingById(state.tilingId);
  const size = resolveSize(state, { width: window.innerWidth, height: window.innerHeight });
  const budget = Math.sqrt((size.width * size.height) / MAX_TILES);
  return {
    width: Math.round(size.width),
    height: Math.round(size.height),
    tileSize: Math.max(state.tileSize, budget),
    rotation: state.rotation,
    colour1: state.colour1,
    colour2: state.colour2,
    colour3: def.supportsThreeColours ? state.colour3 : null,
    border: state.borderTransparent ? null : state.border,
    borderWidth: state.borderWidth,
  };
}

function syncControls(): void {
  const def = tilingById(state.tilingId);
  tilingSelect.value = def.id;
  syncTilingInfo(def);

  colour1.value = state.colour1;
  colour1Hex.value = state.colour1;
  colour2.value = state.colour2;
  colour2Hex.value = state.colour2;
  colour3Controls.hidden = !def.supportsThreeColours;
  colour3Enabled.checked = state.colour3 !== null;
  colour3.value = state.colour3 ?? DEFAULT_THIRD_COLOUR;
  colour3Hex.value = state.colour3 ?? DEFAULT_THIRD_COLOUR;
  colour3.disabled = state.colour3 === null;
  colour3Hex.disabled = state.colour3 === null;
  borderInput.value = state.border;
  borderHex.value = state.border;
  borderInput.disabled = state.borderTransparent;
  borderHex.disabled = state.borderTransparent;
  borderTransparent.checked = state.borderTransparent;
  borderWidth.value = String(state.borderWidth);
  borderWidth.disabled = state.borderTransparent;
  borderWidthValue.textContent = state.borderWidth.toFixed(1);

  sizeSelect.value = state.sizeId;
  customSize.hidden = state.sizeId !== 'custom';
  customWidth.value = String(state.customWidth);
  customHeight.value = String(state.customHeight);

  tileSize.value = String(state.tileSize);
  tileSizeValue.textContent = `${state.tileSize} px`;
  rotation.value = String(state.rotation);
  rotationValue.textContent = `${state.rotation}\u00b0`;

  const activeColour3 = def.supportsThreeColours ? state.colour3 : null;
  const colours = kindColors(state.colour1, state.colour2, def.kinds, def.colourMode, activeColour3);
  kindHint.textContent =
    def.kinds === 2
      ? `${def.kindLabels[0]} · ${def.kindLabels[1]}`
      : `${def.kinds} tile classes, shaded ${activeColour3 ? 'through three colours' : 'between two colours'}: ${def.kindLabels.join(', ')}`;
  kindHint.title = colours.join(' ');

  const trioGroup = paletteBox.querySelector<HTMLElement>('[data-collection="trios"]');
  if (trioGroup) trioGroup.hidden = !def.supportsThreeColours;

  for (const button of paletteBox.querySelectorAll<HTMLButtonElement>('button')) {
    const palette = PALETTES.find((p) => p.id === button.dataset['palette']);
    if (!palette) continue;

    const swatches = kindColors(
      palette.colour1,
      palette.colour2,
      def.kinds,
      def.colourMode,
      def.supportsThreeColours ? (palette.colour3 ?? null) : null,
    ).map((colour) => {
      const swatch = document.createElement('span');
      swatch.style.background = colour;
      return swatch;
    });
    const colours = document.createElement('span');
    colours.className = 'palette-colours';
    colours.replaceChildren(...swatches);
    const name = document.createElement('span');
    name.className = 'palette-name';
    name.textContent = palette.name;
    button.replaceChildren(colours, name);

    const active =
      palette.colour1.toLowerCase() === state.colour1.toLowerCase() &&
      palette.colour2.toLowerCase() === state.colour2.toLowerCase() &&
      (!def.supportsThreeColours || (palette.colour3 ?? null)?.toLowerCase() === state.colour3?.toLowerCase());
    button.setAttribute('aria-pressed', String(active));
  }

  location.replace(`#${encodeState(state)}`);
}

let pending = 0;

function render(): void {
  if (pending) cancelAnimationFrame(pending);
  status.textContent = 'Generating…';
  pending = requestAnimationFrame(() => {
    // A second frame, so the message above is painted before the work starts.
    pending = requestAnimationFrame(() => {
      pending = 0;
      const def = tilingById(state.tilingId);
      const options = currentOptions();
      const started = performance.now();
      const { svg, tileCount } = renderSvg(def, {
        ...options,
        preserveAspectRatio: 'xMidYMid slice',
      });
      stage.innerHTML = svg;
      lastRender = { options };
      const clamped =
        options.tileSize > state.tileSize
          ? ` · tile size raised to ${Math.round(options.tileSize)} px to stay under ${MAX_TILES.toLocaleString()} tiles`
          : '';
      status.textContent =
        `${tileCount.toLocaleString()} tiles · ${options.width}×${options.height} px · ` +
        `${Math.round(performance.now() - started)} ms${clamped}`;
    });
  });
}

/** Apply palette-only changes without regenerating or reparsing the tiling geometry. */
function updateAppearance(): void {
  const svg = stage.querySelector<SVGSVGElement>('svg');
  if (!svg || !lastRender) {
    render();
    return;
  }

  const def = tilingById(state.tilingId);
  const activeColour3 = def.supportsThreeColours ? state.colour3 : null;
  const colours = kindColors(state.colour1, state.colour2, def.kinds, def.colourMode, activeColour3);
  const border = state.borderTransparent ? null : state.border;
  const background = paletteBackground(state.colour1, state.colour2, activeColour3);
  svg.querySelector('rect')?.setAttribute('fill', background);

  for (const path of svg.querySelectorAll<SVGPathElement>('path[data-kind]')) {
    const kind = Number(path.dataset['kind']);
    path.setAttribute('fill', colours[Math.min(kind, colours.length - 1)] ?? state.colour1);
  }
  for (const borderPath of svg.querySelectorAll<SVGPathElement>('path[data-border]')) {
    borderPath.setAttribute('stroke', border ?? 'none');
    borderPath.setAttribute('stroke-width', String(state.borderWidth));
  }

  lastRender = {
    options: {
      ...lastRender.options,
      colour1: state.colour1,
      colour2: state.colour2,
      colour3: activeColour3,
      border,
      borderWidth: state.borderWidth,
    },
  };
}

function exportOptions(): RenderOptions {
  return lastRender?.options ?? currentOptions();
}

function exportSvg(): string {
  const svg = stage.querySelector<SVGSVGElement>('svg');
  if (!svg || !lastRender) return renderSvg(tilingById(state.tilingId), exportOptions()).svg;
  const standalone = svg.cloneNode(true) as SVGSVGElement;
  standalone.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  return standalone.outerHTML;
}

function bindControls(): void {
  tilingSelect.addEventListener('change', () => {
    state = { ...state, tilingId: tilingSelect.value };
    syncControls();
    render();
  });

  const bindColour = (
    picker: HTMLInputElement,
    hex: HTMLInputElement,
    apply: (value: string) => void,
  ): void => {
    picker.addEventListener('input', () => {
      apply(picker.value);
      syncControls();
      updateAppearance();
    });
    hex.addEventListener('change', () => {
      const value = hex.value.trim().replace(/^#?/, '#');
      if (!/^#[0-9a-f]{6}$/i.test(value)) {
        syncControls();
        return;
      }
      apply(value);
      syncControls();
      updateAppearance();
    });
  };

  bindColour(colour1, colour1Hex, (value) => {
    state = { ...state, colour1: value };
  });
  bindColour(colour2, colour2Hex, (value) => {
    state = { ...state, colour2: value };
  });
  swapColoursButton.addEventListener('click', () => {
    state = { ...state, colour1: state.colour2, colour2: state.colour1 };
    syncControls();
    updateAppearance();
  });
  bindColour(colour3, colour3Hex, (value) => {
    state = { ...state, colour3: value };
  });
  colour3Enabled.addEventListener('change', () => {
    state = { ...state, colour3: colour3Enabled.checked ? colour3.value : null };
    syncControls();
    updateAppearance();
  });
  bindColour(borderInput, borderHex, (value) => {
    state = { ...state, border: value };
  });

  borderTransparent.addEventListener('change', () => {
    state = { ...state, borderTransparent: borderTransparent.checked };
    syncControls();
    updateAppearance();
  });

  borderWidth.addEventListener('input', () => {
    state = { ...state, borderWidth: Number(borderWidth.value) };
    borderWidthValue.textContent = state.borderWidth.toFixed(1);
    updateAppearance();
  });

  sizeSelect.addEventListener('change', () => {
    state = { ...state, sizeId: sizeSelect.value };
    syncControls();
    render();
  });

  for (const input of [customWidth, customHeight]) {
    input.addEventListener('change', () => {
      state = {
        ...state,
        customWidth: Number(customWidth.value),
        customHeight: Number(customHeight.value),
      };
      syncControls();
      render();
    });
  }

  tileSize.addEventListener('input', () => {
    state = { ...state, tileSize: Number(tileSize.value) };
    tileSizeValue.textContent = `${state.tileSize} px`;
    render();
  });

  const applyRotation = (value: number): void => {
    state = { ...state, rotation: value };
    rotation.value = String(value);
    rotationValue.textContent = `${value}\u00b0`;
    location.replace(`#${encodeState(state)}`);
    render();
  };
  rotation.addEventListener('input', () => applyRotation(Number(rotation.value)));
  rotation.addEventListener('keydown', (event) => {
    const wrapped = wrappedRotationForKey(state.rotation, event.key);
    if (wrapped === null) return;
    event.preventDefault();
    applyRotation(wrapped);
  });

  panelToggle.addEventListener('click', () => {
    const open = panel.hidden;
    panel.hidden = !open;
    panelToggle.setAttribute('aria-expanded', String(open));
  });

  downloadSvgButton.addEventListener('click', () => {
    const def = tilingById(state.tilingId);
    const options = exportOptions();
    downloadSvg(exportSvg(), exportFileName(def, options, 'svg'));
  });

  downloadPngButton.addEventListener('click', () => {
    const def = tilingById(state.tilingId);
    const options = exportOptions();
    downloadPngButton.disabled = true;
    status.textContent = 'Rendering PNG…';
    void svgToPngBlob(exportSvg(), options.width, options.height)
      .then((blob) => {
        downloadBlob(blob, exportFileName(def, options, 'png'));
        status.textContent = `Saved ${exportFileName(def, options, 'png')}`;
      })
      .catch((error: unknown) => {
        status.textContent = `PNG export failed: ${String(error)}`;
      })
      .finally(() => {
        downloadPngButton.disabled = false;
      });
  });

  copyPngButton.addEventListener('click', () => {
    const options = exportOptions();
    copyPngButton.disabled = true;
    status.textContent = 'Rendering PNG…';
    void svgToPngBlob(exportSvg(), options.width, options.height)
      .then(copyPngBlob)
      .then(() => {
        status.textContent = 'Image copied to clipboard';
      })
      .catch((error: unknown) => {
        status.textContent = `Copy image failed: ${String(error)}`;
      })
      .finally(() => {
        copyPngButton.disabled = false;
      });
  });

  window.addEventListener('resize', () => {
    if (state.sizeId === 'fit') render();
  });
}

populateSelects();
bindControls();
syncControls();
render();

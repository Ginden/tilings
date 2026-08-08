import { FAMILY_LABELS, TILINGS, tilingById } from './tilings/index.js';
import { renderSvg } from './render/svg.js';
import type { RenderOptions } from './render/svg.js';
import { kindColors } from './render/color.js';
import { PALETTES } from './palettes.js';
import { DEFAULT_STATE, SIZE_PRESETS, decodeState, encodeState, resolveSize } from './state.js';
import type { AppState } from './state.js';
import { downloadBlob, downloadSvg, exportFileName, svgToPngBlob } from './export.js';

function element<T extends HTMLElement>(id: string): T {
  const found = document.getElementById(id);
  if (!found) throw new Error(`Missing element #${id}`);
  return found as T;
}

const stage = element<HTMLElement>('stage');
const panel = element<HTMLFormElement>('panel');
const panelToggle = element<HTMLButtonElement>('panel-toggle');
const tilingSelect = element<HTMLSelectElement>('tiling');
const description = element<HTMLParagraphElement>('tiling-description');
const reference = element<HTMLAnchorElement>('tiling-reference');
const paletteBox = element<HTMLDivElement>('palettes');
const colour1 = element<HTMLInputElement>('colour1');
const colour1Hex = element<HTMLInputElement>('colour1-hex');
const colour2 = element<HTMLInputElement>('colour2');
const colour2Hex = element<HTMLInputElement>('colour2-hex');
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
const status = element<HTMLParagraphElement>('status');
const downloadSvgButton = element<HTMLButtonElement>('download-svg');
const downloadPngButton = element<HTMLButtonElement>('download-png');

let state: AppState = location.hash.length > 1 ? decodeState(location.hash) : { ...DEFAULT_STATE };
let lastRender: { options: RenderOptions; svg: string } | null = null;

function populateSelects(): void {
  for (const [family, label] of Object.entries(FAMILY_LABELS)) {
    const group = document.createElement('optgroup');
    group.label = label;
    for (const def of TILINGS.filter((t) => t.family === family)) {
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

  for (const palette of PALETTES) {
    const button = document.createElement('button');
    button.type = 'button';
    button.title = palette.name;
    button.dataset['palette'] = palette.id;
    button.setAttribute('aria-label', palette.name);
    button.addEventListener('click', () => {
      state = {
        ...state,
        colour1: palette.colour1,
        colour2: palette.colour2,
        border: palette.border ?? state.border,
        borderTransparent: palette.border === null,
      };
      syncControls();
      render();
    });
    paletteBox.append(button);
  }
}

/**
 * A 4K canvas full of 8 px tiles is a third of a million polygons, which locks
 * up the tab and produces a download nobody wants. Raise the tile size just
 * enough to stay under the budget and say so in the status line.
 */
const MAX_TILES = 30_000;

function currentOptions(): RenderOptions {
  const size = resolveSize(state, { width: window.innerWidth, height: window.innerHeight });
  const budget = Math.sqrt((size.width * size.height) / MAX_TILES);
  return {
    width: Math.round(size.width),
    height: Math.round(size.height),
    tileSize: Math.max(state.tileSize, budget),
    colour1: state.colour1,
    colour2: state.colour2,
    border: state.borderTransparent ? null : state.border,
    borderWidth: state.borderWidth,
  };
}

function syncControls(): void {
  const def = tilingById(state.tilingId);
  tilingSelect.value = def.id;
  description.textContent = def.description;
  reference.href = def.reference;

  colour1.value = state.colour1;
  colour1Hex.value = state.colour1;
  colour2.value = state.colour2;
  colour2Hex.value = state.colour2;
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

  const colours = kindColors(state.colour1, state.colour2, def.kinds);
  kindHint.textContent =
    def.kinds === 2
      ? `${def.kindLabels[0]} · ${def.kindLabels[1]}`
      : `${def.kinds} tile classes, shaded between the two colours: ${def.kindLabels.join(', ')}`;
  kindHint.title = colours.join(' ');

  for (const button of paletteBox.querySelectorAll<HTMLButtonElement>('button')) {
    const palette = PALETTES.find((p) => p.id === button.dataset['palette']);
    if (!palette) continue;

    const swatches = kindColors(palette.colour1, palette.colour2, def.kinds).map((colour) => {
      const swatch = document.createElement('span');
      swatch.style.background = colour;
      return swatch;
    });
    button.replaceChildren(...swatches);

    const active =
      palette.colour1.toLowerCase() === state.colour1.toLowerCase() &&
      palette.colour2.toLowerCase() === state.colour2.toLowerCase();
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
      lastRender = { options, svg };
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

function exportOptions(): RenderOptions {
  return lastRender?.options ?? currentOptions();
}

function exportSvg(): string {
  return renderSvg(tilingById(state.tilingId), exportOptions()).svg;
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
      render();
    });
    hex.addEventListener('change', () => {
      const value = hex.value.trim().replace(/^#?/, '#');
      if (!/^#[0-9a-f]{6}$/i.test(value)) {
        syncControls();
        return;
      }
      apply(value);
      syncControls();
      render();
    });
  };

  bindColour(colour1, colour1Hex, (value) => {
    state = { ...state, colour1: value };
  });
  bindColour(colour2, colour2Hex, (value) => {
    state = { ...state, colour2: value };
  });
  bindColour(borderInput, borderHex, (value) => {
    state = { ...state, border: value };
  });

  borderTransparent.addEventListener('change', () => {
    state = { ...state, borderTransparent: borderTransparent.checked };
    syncControls();
    render();
  });

  borderWidth.addEventListener('input', () => {
    state = { ...state, borderWidth: Number(borderWidth.value) };
    borderWidthValue.textContent = state.borderWidth.toFixed(1);
    render();
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

  window.addEventListener('resize', () => {
    if (state.sizeId === 'fit') render();
  });
}

populateSelects();
bindControls();
syncControls();
render();

import { tilingById } from './tilings/index.js';
import { hierarchyStrokeWidth, renderSvg } from './render/svg.js';
import type { RenderOptions, RenderResult } from './render/svg.js';
import type { RenderRequest, RenderResponse } from './render/worker-protocol.js';
import { kindColors, tilingBackground } from './render/color.js';
import { PALETTES } from './palettes.js';
import {
  DEFAULT_STATE,
  SIZE_PRESETS,
  decodeState,
  encodeState,
  resolveSize,
  stickyRotation,
  swapSecondAndThirdColours,
  wrappedRotationForKey,
} from './state.js';
import type { AppState } from './state.js';
import {
  addPngMetadata,
  addSvgMetadata,
  copyPngBlob,
  downloadBlob,
  downloadSvg,
  exportFileName,
  exportMetadata,
  svgToPngBlob,
} from './export.js';
import {
  mountColorIsland,
  renderColorIsland,
  renderTilingPicker,
} from './ui/islands.js';

function element<T extends HTMLElement>(id: string): T {
  const found = document.getElementById(id);
  if (!found) throw new Error(`Missing element #${id}`);
  return found as T;
}

const stage = element<HTMLElement>('stage');
const panel = element<HTMLFormElement>('panel');
const panelToggle = element<HTMLButtonElement>('panel-toggle');
const tilingName = element<HTMLHeadingElement>('tiling-name');
const description = element<HTMLDivElement>('tiling-description');
const referenceList = element<HTMLUListElement>('tiling-reference-list');
const paletteBox = element<HTMLDivElement>('palettes');
const swapColoursButton = element<HTMLButtonElement>('swap-colours');
const swapColours2And3Button = element<HTMLButtonElement>('swap-colours-2-3');
const colour3Controls = element<HTMLDivElement>('colour3-controls');
const colour3Enabled = element<HTMLInputElement>('colour3-enabled');
const kindHint = element<HTMLParagraphElement>('kind-hint');
const substitutionHierarchyControls = element<HTMLDivElement>('substitution-hierarchy-controls');
const substitutionHierarchy = element<HTMLSelectElement>('substitution-hierarchy');
const algorithmicControls = element<HTMLDivElement>('algorithmic-controls');
const randomSeed = element<HTMLInputElement>('random-seed');
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

mountColorIsland('colour1');
mountColorIsland('colour2');
mountColorIsland('colour3');
mountColorIsland('border');

function selectTiling(tilingId: string): void {
  state = { ...state, tilingId };
  syncControls();
  render();
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
    tileSize: def.periodicCell ? state.tileSize : Math.max(state.tileSize, budget),
    rotation: state.rotation,
    colour1: state.colour1,
    colour2: state.colour2,
    colour3: def.supportsThreeColours ? state.colour3 : null,
    border: state.borderTransparent ? null : state.border,
    borderWidth: state.borderWidth,
    substitutionHierarchy: state.substitutionHierarchy,
    seed: state.randomSeed,
  };
}

function syncControls(): void {
  const def = tilingById(state.tilingId);
  renderTilingPicker({ selectedId: def.id, onChange: selectTiling });
  syncTilingInfo(def);

  renderColorIsland('colour1', 'Colour 1', state.colour1, false, applyColour1);
  renderColorIsland('colour2', 'Colour 2', state.colour2, false, applyColour2);
  colour3Controls.hidden = !def.supportsThreeColours;
  colour3Enabled.checked = state.colour3 !== null;
  swapColours2And3Button.hidden = state.colour3 === null;
  renderColorIsland('colour3', 'Colour 3', state.colour3 ?? DEFAULT_THIRD_COLOUR, state.colour3 === null, applyColour3);
  renderColorIsland('border', 'Border', state.border, state.borderTransparent, applyBorder);
  borderTransparent.checked = state.borderTransparent;
  borderWidth.value = String(state.borderWidth);
  borderWidth.disabled = state.borderTransparent;
  borderWidthValue.textContent = state.borderWidth.toFixed(1);
  substitutionHierarchyControls.hidden = !def.substitutionHierarchy;
  algorithmicControls.hidden = def.family !== 'algorithmic';
  randomSeed.value = String(state.randomSeed);
  substitutionHierarchy.value = String(
    Math.min(state.substitutionHierarchy, def.substitutionHierarchy?.maxLevels ?? 0),
  );

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
let renderWorker: Worker | null = null;
let renderRequestId = 0;
let rendering = false;

function setRendering(value: boolean): void {
  rendering = value;
  downloadSvgButton.disabled = value;
  downloadPngButton.disabled = value;
  copyPngButton.disabled = value;
}

function stopPendingRender(): void {
  if (pending) cancelAnimationFrame(pending);
  pending = 0;
  renderWorker?.terminate();
  renderWorker = null;
}

function showRenderResult(
  def: ReturnType<typeof tilingById>,
  options: RenderOptions,
  result: RenderResult,
  started: number,
): void {
  if (result.cssBackground) {
    const layer = document.createElement('div');
    layer.className = 'periodic-background';
    layer.setAttribute('role', 'img');
    layer.setAttribute('aria-label', def.name);
    layer.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(result.cssBackground.svg)}")`;
    const previewScale = Math.max(
      stage.clientWidth / options.width,
      stage.clientHeight / options.height,
    );
    layer.style.backgroundSize =
      `${result.cssBackground.width * previewScale}px ` +
      `${result.cssBackground.height * previewScale}px`;
    layer.style.transform =
      `translate(-50%, -50%) rotate(${result.cssBackground.rotation}deg)`;
    stage.replaceChildren(layer);
  } else {
    stage.innerHTML = result.svg;
  }
  lastRender = { options };
  if (!def.periodicCell) updateAppearance();
  const clamped =
    options.tileSize > state.tileSize
      ? ` · tile size raised to ${Math.round(options.tileSize)} px to stay under ${MAX_TILES.toLocaleString()} tiles`
      : '';
  status.textContent =
    `${result.tileCount.toLocaleString()} tiles · ${options.width}×${options.height} px · ` +
    `${Math.round(performance.now() - started)} ms${clamped}`;
}

function render(): void {
  stopPendingRender();
  const requestId = ++renderRequestId;
  setRendering(true);
  status.textContent = 'Generating…';
  pending = requestAnimationFrame(() => {
    pending = requestAnimationFrame(() => {
      pending = 0;
      const def = tilingById(state.tilingId);
      const options = currentOptions();
      const started = performance.now();
      const worker = new Worker(new URL('./render/worker.ts', import.meta.url), { type: 'module' });
      renderWorker = worker;
      worker.addEventListener('message', (event: MessageEvent<RenderResponse>) => {
        if (worker !== renderWorker || event.data.id !== renderRequestId) return;
        worker.terminate();
        renderWorker = null;
        if ('error' in event.data) {
          rendering = false;
          status.textContent = `Generation failed: ${event.data.error}`;
          return;
        }
        const latestOptions = currentOptions();
        if (!def.periodicCell && options.border === null && latestOptions.border !== null) {
          render();
          return;
        }
        showRenderResult(def, options, event.data.result, started);
        setRendering(false);
      });
      worker.addEventListener('error', (event) => {
        if (worker !== renderWorker) return;
        renderWorker = null;
        rendering = false;
        status.textContent = `Generation failed: ${event.message}`;
      });
      const request: RenderRequest = {
        id: requestId,
        tilingId: def.id,
        options: { ...options, preserveAspectRatio: 'xMidYMid slice' },
      };
      worker.postMessage(request);
    });
  });
}

/** Apply palette-only changes without regenerating or reparsing the tiling geometry. */
function updateAppearance(): void {
  if (tilingById(state.tilingId).periodicCell) {
    render();
    return;
  }
  const svg = stage.querySelector<SVGSVGElement>('svg');
  if (!svg || !lastRender) {
    render();
    return;
  }

  const def = tilingById(state.tilingId);
  const activeColour3 = def.supportsThreeColours ? state.colour3 : null;
  const colours = kindColors(state.colour1, state.colour2, def.kinds, def.colourMode, activeColour3);
  const border = state.borderTransparent ? null : state.border;
  const background = tilingBackground(
    def,
    colours,
    state.colour1,
    state.colour2,
    activeColour3,
  );
  if (border !== null && !svg.querySelector('path[data-border]')) {
    render();
    return;
  }
  svg.querySelector('rect')?.setAttribute('fill', background);

  for (const path of svg.querySelectorAll<SVGPathElement>('path[data-kind]')) {
    const kind = Number(path.dataset['kind']);
    path.setAttribute('fill', colours[Math.min(kind, colours.length - 1)] ?? state.colour1);
  }
  for (const borderPath of svg.querySelectorAll<SVGPathElement>('path[data-border]')) {
    borderPath.setAttribute('stroke', border ?? 'none');
    borderPath.setAttribute('stroke-width', String(state.borderWidth));
  }
  for (const hierarchyPath of svg.querySelectorAll<SVGPathElement>('path[data-hierarchy-level]')) {
    const level = Number(hierarchyPath.dataset['hierarchyLevel']);
    hierarchyPath.setAttribute('stroke', border ?? 'none');
    hierarchyPath.setAttribute('stroke-width', String(hierarchyStrokeWidth(state.borderWidth, level)));
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
  swapColoursButton.addEventListener('click', () => {
    state = { ...state, colour1: state.colour2, colour2: state.colour1 };
    syncControls();
    updateAppearance();
  });
  swapColours2And3Button.addEventListener('click', () => {
    state = swapSecondAndThirdColours(state);
    syncControls();
    updateAppearance();
  });
  colour3Enabled.addEventListener('change', () => {
    state = { ...state, colour3: colour3Enabled.checked ? DEFAULT_THIRD_COLOUR : null };
    syncControls();
    updateAppearance();
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

  substitutionHierarchy.addEventListener('change', () => {
    state = { ...state, substitutionHierarchy: Number(substitutionHierarchy.value) };
    syncControls();
    render();
  });

  randomSeed.addEventListener('change', () => {
    const value = Number(randomSeed.value);
    if (!Number.isInteger(value) || value < 0 || value > 0xffffffff) {
      randomSeed.value = String(state.randomSeed);
      return;
    }
    state = { ...state, randomSeed: value };
    syncControls();
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

  const applyRotation = (value: number): void => {
    state = { ...state, rotation: value };
    rotation.value = String(value);
    rotationValue.textContent = `${value}\u00b0`;
    location.replace(`#${encodeState(state)}`);
    render();
  };
  let draggingRotation = false;
  rotation.addEventListener('pointerdown', () => {
    draggingRotation = true;
  });
  window.addEventListener('pointerup', () => {
    draggingRotation = false;
  });
  rotation.addEventListener('pointercancel', () => {
    draggingRotation = false;
  });
  rotation.addEventListener('input', () => {
    const value = Number(rotation.value);
    applyRotation(draggingRotation ? stickyRotation(value) : value);
  });
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
    const fileName = exportFileName(def, options, 'svg');
    const metadata = exportMetadata(def, fileName, 'image/svg+xml');
    downloadSvg(addSvgMetadata(exportSvg(), metadata), fileName);
  });

  downloadPngButton.addEventListener('click', () => {
    const def = tilingById(state.tilingId);
    const options = exportOptions();
    const fileName = exportFileName(def, options, 'png');
    const metadata = exportMetadata(def, fileName, 'image/png');
    downloadPngButton.disabled = true;
    status.textContent = 'Rendering PNG…';
    void svgToPngBlob(exportSvg(), options.width, options.height)
      .then((blob) => addPngMetadata(blob, metadata))
      .then((blob) => {
        downloadBlob(blob, fileName);
        status.textContent = `Saved ${fileName}`;
      })
      .catch((error: unknown) => {
        status.textContent = `PNG export failed: ${String(error)}`;
      })
      .finally(() => {
        downloadPngButton.disabled = rendering;
      });
  });

  copyPngButton.addEventListener('click', () => {
    const def = tilingById(state.tilingId);
    const options = exportOptions();
    const fileName = exportFileName(def, options, 'png');
    const metadata = exportMetadata(def, fileName, 'image/png');
    copyPngButton.disabled = true;
    status.textContent = 'Rendering PNG…';
    void svgToPngBlob(exportSvg(), options.width, options.height)
      .then((blob) => addPngMetadata(blob, metadata))
      .then(copyPngBlob)
      .then(() => {
        status.textContent = 'Image copied to clipboard';
      })
      .catch((error: unknown) => {
        status.textContent = `Copy image failed: ${String(error)}`;
      })
      .finally(() => {
        copyPngButton.disabled = rendering;
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

function applyColour1(value: string): void {
  state = { ...state, colour1: value };
  syncControls();
  updateAppearance();
}

function applyColour2(value: string): void {
  state = { ...state, colour2: value };
  syncControls();
  updateAppearance();
}

function applyColour3(value: string): void {
  if (state.colour3 === null) return;
  state = { ...state, colour3: value };
  syncControls();
  updateAppearance();
}

function applyBorder(value: string): void {
  if (state.borderTransparent) return;
  state = { ...state, border: value };
  syncControls();
  updateAppearance();
}

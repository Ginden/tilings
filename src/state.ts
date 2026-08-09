import { DEFAULT_PALETTE } from './palettes.js';
import { TILINGS } from './tilings/index.js';

export interface AppState {
  tilingId: string;
  colour1: string;
  colour2: string;
  colour3: string | null;
  border: string;
  borderTransparent: boolean;
  borderWidth: number;
  /** `fit` follows the browser window; anything else is a fixed pixel size. */
  sizeId: string;
  customWidth: number;
  customHeight: number;
  tileSize: number;
  /** Clockwise rotation of the rendered patch, in whole degrees. */
  rotation: number;
}

export interface SizePreset {
  readonly id: string;
  readonly name: string;
  readonly width?: number;
  readonly height?: number;
}

export const SIZE_PRESETS: readonly SizePreset[] = [
  { id: 'fit', name: 'Fit window' },
  { id: '1280x720', name: '1280 × 720 (HD)', width: 1280, height: 720 },
  { id: '1920x1080', name: '1920 × 1080 (Full HD)', width: 1920, height: 1080 },
  { id: '2560x1440', name: '2560 × 1440 (QHD)', width: 2560, height: 1440 },
  { id: '3840x2160', name: '3840 × 2160 (4K)', width: 3840, height: 2160 },
  { id: '1080x1920', name: '1080 × 1920 (phone)', width: 1080, height: 1920 },
  { id: '1414x2000', name: '1414 × 2000 (A4 portrait)', width: 1414, height: 2000 },
  { id: '2000x2000', name: '2000 × 2000 (square)', width: 2000, height: 2000 },
  { id: 'custom', name: 'Custom…' },
];

export const DEFAULT_STATE: AppState = {
  tilingId: TILINGS[0]!.id,
  colour1: DEFAULT_PALETTE.colour1,
  colour2: DEFAULT_PALETTE.colour2,
  colour3: null,
  border: DEFAULT_PALETTE.border ?? '#101820',
  borderTransparent: DEFAULT_PALETTE.border === null,
  borderWidth: 1,
  sizeId: 'fit',
  customWidth: 1600,
  customHeight: 1000,
  tileSize: 42,
  rotation: 0,
};

export function resolveSize(state: AppState, windowSize: { width: number; height: number }): {
  width: number;
  height: number;
} {
  if (state.sizeId === 'fit') return windowSize;
  if (state.sizeId === 'custom') {
    return { width: clamp(state.customWidth, 64, 16384), height: clamp(state.customHeight, 64, 16384) };
  }
  const preset = SIZE_PRESETS.find((p) => p.id === state.sizeId);
  if (preset?.width && preset.height) return { width: preset.width, height: preset.height };
  return windowSize;
}

/** Return the wrapped endpoint for a horizontal arrow key, or null for native range handling. */
export function wrappedRotationForKey(rotation: number, key: string): number | null {
  if (key === 'ArrowLeft' && rotation === 0) return 359;
  if (key === 'ArrowRight' && rotation === 359) return 0;
  return null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

/** Serialise the state into a URL hash so a configuration can be shared. */
export function encodeState(state: AppState): string {
  const params = new URLSearchParams({
    t: state.tilingId,
    c1: state.colour1.replace('#', ''),
    c2: state.colour2.replace('#', ''),
    b: state.borderTransparent ? 'none' : state.border.replace('#', ''),
    bw: String(state.borderWidth),
    s: state.sizeId,
    ts: String(state.tileSize),
    r: String(state.rotation),
  });
  if (state.colour3) params.set('c3', state.colour3.replace('#', ''));
  if (state.sizeId === 'custom') {
    params.set('w', String(state.customWidth));
    params.set('h', String(state.customHeight));
  }
  return params.toString();
}

export function decodeState(hash: string): AppState {
  const state: AppState = { ...DEFAULT_STATE };
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const tiling = params.get('t');
  if (tiling && TILINGS.some((t) => t.id === tiling)) state.tilingId = tiling;

  const colour = (key: string, fallback: string): string => {
    const value = params.get(key);
    return value && /^[0-9a-f]{6}$/i.test(value) ? `#${value}` : fallback;
  };
  state.colour1 = colour('c1', state.colour1);
  state.colour2 = colour('c2', state.colour2);
  const colour3 = params.get('c3');
  state.colour3 = colour3 && /^[0-9a-f]{6}$/i.test(colour3) ? `#${colour3}` : null;

  const border = params.get('b');
  if (border === 'none') {
    state.borderTransparent = true;
  } else if (border && /^[0-9a-f]{6}$/i.test(border)) {
    state.borderTransparent = false;
    state.border = `#${border}`;
  }

  const number = (key: string, fallback: number, min: number, max: number): number => {
    const value = Number(params.get(key));
    return Number.isFinite(value) && value > 0 ? clamp(value, min, max) : fallback;
  };
  state.borderWidth = number('bw', state.borderWidth, 0.1, 6);
  state.tileSize = number('ts', state.tileSize, 8, 200);

  const rotationParam = params.get('r');
  const rotation = Number(rotationParam);
  if (rotationParam !== null && Number.isInteger(rotation) && rotation >= 0 && rotation < 360) {
    state.rotation = rotation;
  }

  const size = params.get('s');
  if (size && SIZE_PRESETS.some((p) => p.id === size)) state.sizeId = size;
  state.customWidth = number('w', state.customWidth, 64, 16384);
  state.customHeight = number('h', state.customHeight, 64, 16384);
  return state;
}

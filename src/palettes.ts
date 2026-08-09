export interface PalettePreset {
  readonly id: string;
  readonly name: string;
  readonly collection: 'classics' | 'studio';
  readonly colour1: string;
  readonly colour2: string;
  readonly border: string | null;
}

/** A compact set of pairings chosen to remain distinct when interpolated across many tile classes. */
export const PALETTES: readonly PalettePreset[] = [
  { id: 'penrose-classic', name: 'Penrose classic', collection: 'classics', colour1: '#e8b53b', colour2: '#1b3a5c', border: '#101820' },
  { id: 'blueprint', name: 'Blueprint', collection: 'classics', colour1: '#0d3b66', colour2: '#1b6ca8', border: '#cfe3f7' },
  { id: 'monochrome', name: 'Monochrome', collection: 'classics', colour1: '#f5f5f5', colour2: '#2e2e2e', border: '#111111' },
  { id: 'islamic-tile', name: 'Islamic tile', collection: 'classics', colour1: '#1f7a8c', colour2: '#022b3a', border: '#bfdbf7' },
  { id: 'archive', name: 'Archive', collection: 'classics', colour1: '#70253a', colour2: '#f2eee5', border: '#13263a' },
  { id: 'ukiyo-e', name: 'Ukiyo-e', collection: 'studio', colour1: '#315a7d', colour2: '#d06c4b', border: '#f2e2cf' },
  { id: 'verdigris', name: 'Verdigris', collection: 'studio', colour1: '#b85c38', colour2: '#2a9d8f', border: '#173f3a' },
  { id: 'lichen', name: 'Lichen', collection: 'studio', colour1: '#435b3b', colour2: '#c8a96a', border: '#202a20' },
  { id: 'night-bloom', name: 'Night bloom', collection: 'studio', colour1: '#312e81', colour2: '#c084fc', border: '#f5f3ff' },
  { id: 'signal', name: 'Signal', collection: 'studio', colour1: '#ef476f', colour2: '#06d6a0', border: '#073b4c' },
];

export const DEFAULT_PALETTE = PALETTES[0]!;

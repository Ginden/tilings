export interface PalettePreset {
  readonly id: string;
  readonly name: string;
  readonly collection: 'classics' | 'studio' | 'trios' | 'flags';
  readonly colour1: string;
  readonly colour2: string;
  readonly colour3?: string;
  readonly border: string | null;
}

/** A compact set of pairings chosen to remain distinct when interpolated across many tile classes. */
export const PALETTES: readonly PalettePreset[] = [
  { id: 'penrose-classic', name: 'Penrose classic', collection: 'classics', colour1: '#e8b53b', colour2: '#1b3a5c', border: '#101820' },
  { id: 'blueprint', name: 'Blueprint', collection: 'classics', colour1: '#0d3b66', colour2: '#1b6ca8', border: '#cfe3f7' },
  { id: 'monochrome', name: 'Monochrome', collection: 'classics', colour1: '#f5f5f5', colour2: '#2e2e2e', border: '#111111' },
  { id: 'archive', name: 'Archive', collection: 'classics', colour1: '#70253a', colour2: '#f2eee5', border: '#13263a' },
  { id: 'trans', name: 'Trans flag', collection: 'flags', colour1: '#5bcefa', colour2: '#f5a9b8', colour3: '#ffffff', border: '#ffffff' },
  { id: 'bisexual', name: 'Bisexual flag', collection: 'flags', colour1: '#d60270', colour2: '#9b4f96', colour3: '#0038a8', border: '#f5f3ff' },
  { id: 'french', name: 'French', collection: 'flags', colour1: '#000091', colour2: '#ffffff', colour3: '#e1000f', border: '#000000' },
  { id: 'german', name: 'German', collection: 'flags', colour1: '#000000', colour2: '#d00000', colour3: '#ffce00', border: '#000000' },
  { id: 'italy', name: 'Italy', collection: 'flags', colour1: '#008c45', colour2: '#f4f5f0', colour3: '#cd212a', border: '#ffffff' },
  { id: 'ireland', name: 'Ireland', collection: 'flags', colour1: '#169b62', colour2: '#ffffff', colour3: '#ff883e', border: '#ffffff' },
  { id: 'ukiyo-e', name: 'Ukiyo-e', collection: 'studio', colour1: '#315a7d', colour2: '#d06c4b', border: '#f2e2cf' },
  { id: 'ultraviolet', name: 'Ultraviolet', collection: 'studio', colour1: '#4c1d95', colour2: '#bef264', colour3: '#22d3ee', border: '#1f1433' },
  { id: 'lichen', name: 'Lichen', collection: 'studio', colour1: '#435b3b', colour2: '#c8a96a', border: '#202a20' },
  { id: 'signal', name: 'Signal', collection: 'studio', colour1: '#ef476f', colour2: '#06d6a0', border: '#073b4c' },
  { id: 'ember', name: 'Ember', collection: 'studio', colour1: '#2b2d42', colour2: '#f77f00', border: '#f4e3c1' },
  { id: 'night-bloom', name: 'Night bloom', collection: 'trios', colour1: '#171a3f', colour2: '#8b5cf6', colour3: '#f2a7c6', border: '#e8c66a' },
  { id: 'night-garden', name: 'Night garden', collection: 'trios', colour1: '#24124d', colour2: '#a05ad7', colour3: '#e0b96a', border: '#160d27' },
  { id: 'understory', name: 'Understory', collection: 'trios', colour1: '#334f38', colour2: '#c8a96a', colour3: '#b85c38', border: '#202a20' },
  { id: 'stained-glass', name: 'Stained glass', collection: 'trios', colour1: '#1d3557', colour2: '#e63946', colour3: '#f1c453', border: '#f4f1de' },
  { id: 'tidepool', name: 'Tidepool', collection: 'trios', colour1: '#073b4c', colour2: '#2a9d8f', colour3: '#e76f51', border: '#d9f0ee' },
];

export const DEFAULT_PALETTE = PALETTES[0]!;

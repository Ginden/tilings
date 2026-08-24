export interface PalettePreset {
  readonly id: string;
  readonly name: string;
  readonly collection: 'classics' | 'studio' | 'trios';
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
  { id: 'islamic-tile', name: 'Islamic tile', collection: 'classics', colour1: '#1f7a8c', colour2: '#022b3a', border: '#091c24' },
  { id: 'archive', name: 'Archive', collection: 'classics', colour1: '#70253a', colour2: '#f2eee5', border: '#13263a' },
  { id: 'ukiyo-e', name: 'Ukiyo-e', collection: 'studio', colour1: '#315a7d', colour2: '#d06c4b', border: '#f2e2cf' },
  { id: 'verdigris', name: 'Verdigris', collection: 'studio', colour1: '#0b6e69', colour2: '#b7ddd3', border: '#3d2b1f' },
  { id: 'lichen', name: 'Lichen', collection: 'studio', colour1: '#435b3b', colour2: '#c8a96a', border: '#202a20' },
  { id: 'signal', name: 'Signal', collection: 'studio', colour1: '#ef476f', colour2: '#06d6a0', border: '#073b4c' },
  { id: 'night-bloom', name: 'Night bloom', collection: 'trios', colour1: '#171a3f', colour2: '#8b5cf6', colour3: '#f2a7c6', border: '#e8c66a' },
  { id: 'night-garden', name: 'Night garden', collection: 'trios', colour1: '#24124d', colour2: '#a05ad7', colour3: '#e0b96a', border: '#160d27' },
  { id: 'understory', name: 'Understory', collection: 'trios', colour1: '#334f38', colour2: '#c8a96a', colour3: '#b85c38', border: '#202a20' },
  { id: 'stained-glass', name: 'Stained glass', collection: 'trios', colour1: '#1d3557', colour2: '#e63946', colour3: '#f1c453', border: '#f4f1de' },
  { id: 'tidepool', name: 'Tidepool', collection: 'trios', colour1: '#073b4c', colour2: '#2a9d8f', colour3: '#e76f51', border: '#d9f0ee' },
  { id: 'bisexual', name: 'Bisexual', collection: 'trios', colour1: '#d60270', colour2: '#9b4f96', colour3: '#0038a8', border: '#f5f3ff' },
  { id: 'trans', name: 'Trans', collection: 'trios', colour1: '#5bcefa', colour2: '#f5a9b8', colour3: '#ffffff', border: '#9ca3af' },
];

export const DEFAULT_PALETTE = PALETTES[0]!;

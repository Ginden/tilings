export interface PalettePreset {
  readonly id: string;
  readonly name: string;
  readonly colour1: string;
  readonly colour2: string;
  readonly border: string | null;
}

/** Classic colour pairings, including the ones used in the canonical Penrose figures. */
export const PALETTES: readonly PalettePreset[] = [
  { id: 'penrose-classic', name: 'Penrose classic', colour1: '#e8b53b', colour2: '#1b3a5c', border: '#101820' },
  { id: 'kite-and-dart', name: 'Kite & dart', colour1: '#d94f3d', colour2: '#2b5f8e', border: '#1a1a1a' },
  { id: 'gold-leaf', name: 'Gold leaf', colour1: '#f4d06f', colour2: '#8c5e10', border: '#3a2606' },
  { id: 'blueprint', name: 'Blueprint', colour1: '#0d3b66', colour2: '#1b6ca8', border: '#cfe3f7' },
  { id: 'monochrome', name: 'Monochrome', colour1: '#f5f5f5', colour2: '#2e2e2e', border: '#111111' },
  { id: 'terracotta', name: 'Terracotta', colour1: '#e2725b', colour2: '#f2e3c6', border: '#6b3a2a' },
  { id: 'islamic-tile', name: 'Islamic tile', colour1: '#1f7a8c', colour2: '#022b3a', border: '#bfdbf7' },
  { id: 'sunset', name: 'Sunset', colour1: '#ff9e4a', colour2: '#7b2d6b', border: null },
  { id: 'emerald', name: 'Emerald', colour1: '#1b998b', colour2: '#093a3e', border: '#0b1b1c' },
  { id: 'paper', name: 'Paper & ink', colour1: '#faf3e0', colour2: '#c9c2b0', border: '#20211f' },
  { id: 'neon', name: 'Neon', colour1: '#39ff14', colour2: '#1a0b2e', border: '#0a0416' },
  { id: 'bauhaus', name: 'Bauhaus', colour1: '#e63946', colour2: '#f1c453', border: '#1d3557' },
];

export const DEFAULT_PALETTE = PALETTES[0]!;

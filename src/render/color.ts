export interface Rgb {
  r: number;
  g: number;
  b: number;
}

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function parseHex(value: string): Rgb {
  const m = HEX_RE.exec(value.trim());
  if (!m) return { r: 0, g: 0, b: 0 };
  let hex = m[1]!;
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

export function toHex(c: Rgb): string {
  const part = (v: number): string =>
    Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${part(c.r)}${part(c.g)}${part(c.b)}`;
}

export function mix(a: string, b: string, t: number): string {
  const ca = parseHex(a);
  const cb = parseHex(b);
  return toHex({
    r: ca.r + (cb.r - ca.r) * t,
    g: ca.g + (cb.g - ca.g) * t,
    b: ca.b + (cb.b - ca.b) * t,
  });
}

/** Colours for tile classes, normally interpolated between the two chosen colours. */
export function kindColors(
  colour1: string,
  colour2: string,
  kinds: number,
  mode: 'gradient' | 'paired' = 'gradient',
): string[] {
  if (kinds <= 1) return [colour1];
  if (mode === 'paired' && kinds === 4) {
    const companion = (colour: string): string =>
      relativeLuminance(colour) < 0.35 ? mix(colour, '#ffffff', 0.32) : mix(colour, '#000000', 0.22);
    return [colour1, companion(colour1), colour2, companion(colour2)];
  }
  const out: string[] = [];
  for (let i = 0; i < kinds; i++) out.push(mix(colour1, colour2, i / (kinds - 1)));
  return out;
}

export function relativeLuminance(colour: string): number {
  const { r, g, b } = parseHex(colour);
  const channel = (v: number): number => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

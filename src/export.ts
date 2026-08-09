import type { RenderOptions } from './render/svg.js';
import type { TilingDefinition } from './tilings/types.js';

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function colourToken(colour: string | null): string {
  return colour === null ? 'none' : slug(colour.replace('#', ''));
}

/**
 * Build a descriptive file name, e.g.
 * `penrose-p3_1920x1080_tile40_e8b53b-1b3a5c_border-101820.svg`.
 */
export function exportFileName(
  def: TilingDefinition,
  opts: RenderOptions,
  extension: 'svg' | 'png',
): string {
  const parts = [
    slug(def.id),
    `${Math.round(opts.width)}x${Math.round(opts.height)}`,
    `tile${Math.round(opts.tileSize)}`,
    [opts.colour1, opts.colour2, opts.colour3]
      .filter((colour): colour is string => Boolean(colour))
      .map(colourToken)
      .join('-'),
    `border-${colourToken(opts.border)}`,
  ];
  return `${parts.join('_')}.${extension}`;
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadSvg(svg: string, fileName: string): void {
  downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), fileName);
}

/** Rasterise an SVG string to PNG at its natural size (optionally scaled). */
export async function svgToPngBlob(svg: string, width: number, height: number, scale = 1): Promise<Blob> {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
  try {
    const image = new Image();
    image.width = width;
    image.height = height;
    await new Promise<void>((resolve, reject) => {
      image.addEventListener('load', () => resolve());
      image.addEventListener('error', () => reject(new Error('Could not rasterise the SVG')));
      image.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D context unavailable');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Could not encode the PNG'));
      }, 'image/png');
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

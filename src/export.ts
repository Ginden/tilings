import type { RenderOptions } from './render/svg.js';
import type { TilingDefinition } from './tilings/types.js';

const PNG_SIGNATURE = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);

export interface DublinCoreMetadata {
  readonly title: string;
  readonly description: string;
  readonly creator: string;
  readonly date: string;
  readonly format: 'image/svg+xml' | 'image/png';
  readonly identifier: string;
  readonly source: string;
}

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
  if ((opts.substitutionHierarchy ?? 0) > 0) {
    parts.push(`hierarchy-${opts.substitutionHierarchy}`);
  }
  if (def.family === 'algorithmic') parts.push(`seed-${opts.seed ?? 0}`);
  if (def.closedLoopFills) {
    parts.push(`loops-${opts.loopFillLimit ?? def.closedLoopFills.defaultLimit}`);
  }
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

export function exportMetadata(
  def: TilingDefinition,
  fileName: string,
  format: DublinCoreMetadata['format'],
  created = new Date(),
): DublinCoreMetadata {
  return {
    title: def.name,
    description: def.description,
    creator: 'Penrose Tilings',
    date: created.toISOString(),
    format,
    identifier: fileName,
    source: def.reference,
  };
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function dublinCoreRdf(metadata: DublinCoreMetadata): string {
  const value = (text: string): string => escapeXml(text);
  return (
    '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" ' +
    'xmlns:dc="http://purl.org/dc/elements/1.1/">' +
    '<rdf:Description rdf:about="">' +
    `<dc:title><rdf:Alt><rdf:li xml:lang="x-default">${value(metadata.title)}</rdf:li></rdf:Alt></dc:title>` +
    `<dc:description><rdf:Alt><rdf:li xml:lang="x-default">${value(metadata.description)}</rdf:li></rdf:Alt></dc:description>` +
    `<dc:creator><rdf:Seq><rdf:li>${value(metadata.creator)}</rdf:li></rdf:Seq></dc:creator>` +
    `<dc:date><rdf:Seq><rdf:li>${value(metadata.date)}</rdf:li></rdf:Seq></dc:date>` +
    `<dc:format>${value(metadata.format)}</dc:format>` +
    `<dc:identifier>${value(metadata.identifier)}</dc:identifier>` +
    `<dc:source>${value(metadata.source)}</dc:source>` +
    '<dc:type><rdf:Bag><rdf:li rdf:resource="http://purl.org/dc/dcmitype/StillImage"/></rdf:Bag></dc:type>' +
    '</rdf:Description></rdf:RDF>'
  );
}

/** Add an RDF/Dublin Core metadata element to a standalone SVG document. */
export function addSvgMetadata(svg: string, metadata: DublinCoreMetadata): string {
  const rootEnd = svg.indexOf('>');
  if (rootEnd === -1 || !svg.startsWith('<svg')) throw new Error('Invalid SVG document');
  return `${svg.slice(0, rootEnd + 1)}<metadata>${dublinCoreRdf(metadata)}</metadata>${svg.slice(rootEnd + 1)}`;
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type: string, data: Uint8Array): Uint8Array {
  const typeBytes = new TextEncoder().encode(type);
  const chunk = new Uint8Array(12 + data.length);
  const view = new DataView(chunk.buffer);
  view.setUint32(0, data.length);
  chunk.set(typeBytes, 4);
  chunk.set(data, 8);
  const checked = new Uint8Array(typeBytes.length + data.length);
  checked.set(typeBytes);
  checked.set(data, typeBytes.length);
  view.setUint32(8 + data.length, crc32(checked));
  return chunk;
}

/** Embed RDF/Dublin Core as an uncompressed XMP iTXt chunk in a PNG. */
export async function addPngMetadata(blob: Blob, metadata: DublinCoreMetadata): Promise<Blob> {
  const png = new Uint8Array(await blob.arrayBuffer());
  if (png.length < PNG_SIGNATURE.length || !PNG_SIGNATURE.every((byte, index) => png[index] === byte)) {
    throw new Error('Invalid PNG image');
  }

  const xmp =
    '<?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?>' +
    '<x:xmpmeta xmlns:x="adobe:ns:meta/">' + dublinCoreRdf(metadata) + '</x:xmpmeta>' +
    '<?xpacket end="w"?>';
  const header = new TextEncoder().encode('XML:com.adobe.xmp\0\0\0\0\0');
  const text = new TextEncoder().encode(xmp);
  const data = new Uint8Array(header.length + text.length);
  data.set(header);
  data.set(text, header.length);
  const metadataChunk = pngChunk('iTXt', data);

  // IHDR is always the first chunk and has a fixed 13-byte payload.
  const insertAt = PNG_SIGNATURE.length + 12 + 13;
  const output = new Uint8Array(png.length + metadataChunk.length);
  output.set(png.subarray(0, insertAt));
  output.set(metadataChunk, insertAt);
  output.set(png.subarray(insertAt), insertAt + metadataChunk.length);
  return new Blob([output], { type: 'image/png' });
}

export async function copyPngBlob(blob: Blob): Promise<void> {
  if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
    throw new Error('Copying images is not supported by this browser');
  }
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
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

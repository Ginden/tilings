import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const projectFile = (path: string): URL => new URL(`../${path}`, import.meta.url);

describe('static page shell', () => {
  const html = readFileSync(projectFile('index.html'), 'utf8');

  it('includes social graph metadata and local raster assets', () => {
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:image" content="./social-preview.png"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');

    for (const path of [
      'public/favicon.svg',
      'public/favicon-32.png',
      'public/apple-touch-icon.png',
      'public/social-preview.png',
      'docs/preview.png',
    ]) {
      expect(existsSync(projectFile(path)), path).toBe(true);
    }
  });

  it('has an explicit fallback for browsers without JavaScript', () => {
    expect(html).toContain('<noscript>');
    expect(html).toContain('This app generates tilings in your browser');
  });

  it('attributes the author without loading external resources', () => {
    expect(html).toContain('href="https://michalwadas.pl"');
    expect(html).toContain('href="https://github.com/Ginden/tilings"');
    expect(html).toContain('aria-label="Source code on GitHub"');
    expect(html).not.toMatch(/<(?:script|link)[^>]+https?:\/\//i);
  });
});

import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ColorPickerPanel } from '../src/ui/color-control.js';

describe('colour picker', () => {
  it('renders a saturation/brightness area and hue slider', () => {
    const markup = renderToStaticMarkup(
      <ColorPickerPanel value="#e8b53b" onChange={vi.fn()} />,
    );

    expect(markup).toContain('react-aria-ColorArea');
    expect(markup.match(/react-aria-ColorSlider/g)).toHaveLength(1);
    expect(markup.match(/react-aria-SliderTrack/g)).toHaveLength(1);
    expect(markup).not.toContain('>Blue<');
  });
});

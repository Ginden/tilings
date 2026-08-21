import { ColorControl } from './color-control.js';
import { createReactIsland } from './react-island.js';
import { TilingPicker } from './tiling-picker.js';

export const renderTilingPicker = createReactIsland('tiling-selector', (props) => (
  <TilingPicker
    selectedId={String(props.selectedId)}
    onChange={props.onChange as (tilingId: string) => void}
  />
));

export function mountColorIsland(
  id: string,
): void {
  colorIslands.set(
    id,
    createReactIsland(id, (props) => (
      <ColorControl
        colourName={String(props.colourName)}
        disabled={Boolean(props.disabled)}
        onChange={props.onChange as (value: string) => void}
        value={props.value as string | null}
      />
    )),
  );
}

export function renderColorIsland(
  id: string,
  label: string,
  value: string | null,
  disabled: boolean,
  apply: (value: string) => void,
): void {
  const render = colorIslands.get(id);
  if (!render) throw new Error(`Missing React island #${id}`);
  render({ colourName: label, disabled, onChange: apply, value });
}

export const colorIslands = new Map<string, (props: Record<string, unknown>) => void>();

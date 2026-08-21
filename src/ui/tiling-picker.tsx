import {
  Button,
  Header,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import { FAMILY_LABELS, TILINGS_FOR_UI } from '../tilings/index.js';

interface TilingPickerProps {
  selectedId: string;
  onChange: (tilingId: string) => void;
}

export function TilingPicker({ selectedId, onChange }: TilingPickerProps) {
  return (
    <Select
      className="tiling-select"
      value={selectedId}
      onSelectionChange={(key) => {
        if (typeof key === 'string') onChange(key);
      }}
    >
      <Label>Type</Label>
      <Button className="select-trigger">
        <SelectValue />
        <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Button>
      <Popover className="picker-popover">
        <ListBox className="picker-listbox">
          {Object.entries(FAMILY_LABELS).map(([family, label]) => {
            const items = TILINGS_FOR_UI.filter((tiling) => tiling.family === family);
            if (items.length === 0) return null;
            return (
              <ListBoxSection key={family}>
                <Header>{label}</Header>
                {items.map((tiling) => (
                  <ListBoxItem key={tiling.id} id={tiling.id} textValue={tiling.name}>
                    {tiling.name}
                  </ListBoxItem>
                ))}
              </ListBoxSection>
            );
          })}
        </ListBox>
      </Popover>
    </Select>
  );
}

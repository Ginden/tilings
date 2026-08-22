import {
  Button,
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorThumb,
  DialogTrigger,
  Input,
  Label,
  Popover,
  SliderTrack,
} from 'react-aria-components';

interface ColorControlProps {
  colourName: string;
  disabled?: boolean;
  value?: string | null;
  onChange: (value: string) => void;
}

interface ColorPickerPanelProps {
  value: string;
  onChange: (value: string) => void;
}

function toHex(value: string): string {
  if (/^#[0-9a-f]{6}$/i.test(value)) return value.toLowerCase();
  if (!value.startsWith('#')) return '#000000';
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && !CSS.supports('color', value)) {
    return '#000000';
  }
  return value.toLowerCase();
}

export function ColorPickerPanel({ value, onChange }: ColorPickerPanelProps) {
  return (
    <ColorPicker value={value} onChange={(color) => onChange(color.toString('hex'))}>
      <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness">
        <ColorThumb />
      </ColorArea>
      <ColorSlider colorSpace="hsb" channel="hue">
        <Label>Hue</Label>
        <SliderTrack>
          <ColorThumb />
        </SliderTrack>
      </ColorSlider>
      <ColorSlider colorSpace="rgb" channel="blue">
        <Label>Blue</Label>
        <SliderTrack>
          <ColorThumb />
        </SliderTrack>
      </ColorSlider>
    </ColorPicker>
  );
}

export function ColorControl({ colourName, disabled = false, value, onChange }: ColorControlProps) {
  const currentValue = disabled || value == null ? '#000000' : toHex(value);

  return (
    <>
      <Label className={disabled ? 'react-aria-Label' : undefined}>{colourName}</Label>
      <ColorField
        className="color-field"
        isDisabled={disabled}
        value={currentValue}
        onChange={(color) => {
          if (color) onChange(color.toString('hex'));
        }}
      >
        <Input className="hex-input" aria-label={`${colourName} hex value`} />
      </ColorField>

      <DialogTrigger>
        <Button
          type="button"
          aria-label={`Edit ${colourName}`}
          className="swatch-button"
          data-disabled={disabled ? '' : undefined}
          isDisabled={disabled}
        >
          <ColorSwatch color={currentValue} />
        </Button>
        <Popover className="color-popover">
          <ColorPickerPanel value={currentValue} onChange={onChange} />
        </Popover>
      </DialogTrigger>
    </>
  );
}

import { InputColorType } from '../../../../enums';

export type AntRadioType = {
  value: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  colorType?: InputColorType;

  [key: string]: unknown;
}

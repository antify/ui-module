import {InputColorType} from '../../../../enums';

export enum AntRadioSize {
  md = 'md',
  sm = 'sm',
}

export type AntRadioType = {
  value: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  colorType?: InputColorType;

  [key: string]: unknown;
}

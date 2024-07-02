import { InputColorType } from '../../../../enums';

export enum AntRadioSize {
	sm = 'sm',
	md = 'md',
}

export type AntRadioType = {
  value: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  colorType?: InputColorType;

  [key: string]: unknown;
}

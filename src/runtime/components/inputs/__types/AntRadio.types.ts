import {InputState} from '../../../enums';

export enum AntRadioSize {
  md = 'md',
  sm = 'sm',
}

export type AntRadioTypes = {
  value: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  state?: InputState;

  [key: string]: unknown;
}

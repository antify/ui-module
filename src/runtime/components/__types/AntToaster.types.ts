import {InputColorType} from '../../enums';

export type Toast = {
  id?: string;
  title: string;
  content?: string;
  type: InputColorType;
  hasIcon?: boolean;
};

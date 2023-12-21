import {InputColorType} from '../enums';

export type Toaster = {
  id: string;
  message: string;
  type?: InputColorType;
};

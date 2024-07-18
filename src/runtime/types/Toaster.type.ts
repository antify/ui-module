import {InputState} from '../enums';

export type Toaster = {
  id: string;
  message: string;
  type?: InputState;
};

export enum POSITION {
  LEFT_TOP = 'LEFT_TOP',
  RIGHT_TOP = 'RIGHT_TOP',
  LEFT_BOTTOM = 'LEFT_BOTTOM',
  RIGHT_BOTTOM = 'RIGHT_BOTTOM',
}

export enum TOASTER_TYPE {
  NOTIFICATION = 'NOTIFICATION',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export type Toaster = {
  id: string;
  message: string;
  type?: TOASTER_TYPE;
};

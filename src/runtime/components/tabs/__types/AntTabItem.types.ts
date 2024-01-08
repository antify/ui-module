import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { type RouteLocationRaw } from 'vue-router';

export type TabItem = {
  id: string;
  label: string;
  colorType?: ColorType;
  showIcon?: boolean;
  icon?: IconDefinition;
  to?: string | RouteLocationRaw;
  clickHandler?: () => void;
  [key: string]: unknown;
}

export enum ColorType {
  base = 'base',
  warning = 'warning',
  danger = 'danger',
}

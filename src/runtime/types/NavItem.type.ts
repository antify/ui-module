import {type RouteLocationRaw} from 'vue-router';

export type NavItem = {
  icon?: object;
  label: string;
  route?: RouteLocationRaw;
  active: boolean;
  subItems?: NavItem[];
  clickHandler?: (payload: MouseEvent) => void;
};

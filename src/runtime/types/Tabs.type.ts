import {type RouteLocationRaw} from 'vue-router';

export type TabsType = {
  name: string;
  to?: RouteLocationRaw;
  current: boolean;
};

import {type RouteLocationRaw} from 'vue-router';

export enum ROW_TYPES {
  TEXT= "TEXT",
  IMAGE= "IMAGE",
  HTML= "HTML",
  TEXT_WITH_LINKS= "TEXT_WITH_LINKS",
  SLOT= "SLOT",
}

export type TableHeader = {
  identifier: string;
  headerClassList?: string;
  rowClassList?: string;
  title: string;
  type: ROW_TYPES;
  links?: {
    to: RouteLocationRaw;
    label: string;
  }[];
};

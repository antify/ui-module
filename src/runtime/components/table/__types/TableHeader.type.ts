
export enum AntTableRowTypes {
  text = 'text',
  html = 'html',
  link = 'link',
  slot = 'slot',
}

export enum AntTableAlign {
  left = 'left',
  center = 'center',
  right = 'right',
}

export enum AntTableSortDirection {
  asc = 'asc',
  desc = 'desc',
  neutral = 'neutral'
}

export type TableHeader = {
  identifier: string;
  title: string;
  type: AntTableRowTypes;
  sortable?: boolean;
  sort?: (a: unknown, b: unknown, direction: AntTableSortDirection) => number;
  headerClassList?: string;
  rowClassList?: string;
  align?: AntTableAlign;
  toProp?: string;
};

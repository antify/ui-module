import {
  ColorType,
  InputColorType
} from '../enums/ColorType.enum';
import {
  ColorType as TabItemColorType
} from '../components/tabs/__types/AntTabItem.types';
import {Direction} from '../enums/Direction.enum';
import {Grouped} from '../enums/Grouped.enum';
import {Position, CornerPosition} from '../enums/Position.enum';
import {Size} from '../enums/Size.enum';
import {
  AntTableRowTypes,
  AntTableAlign,
  AntTableSortDirection
} from '../components/table/__types/TableHeader.type';

export const useUi = () => {
  return {
    Direction,
    ColorType,
    InputColorType,
    TabItemColorType,
    Grouped,
    Position,
    CornerPosition,
    Size,
    AntTableRowTypes,
    AntTableAlign,
    AntTableSortDirection,
  }
}

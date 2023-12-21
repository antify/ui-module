import {
  ColorType,
  InputColorType
} from '../enums/ColorType.enum';
import {Grouped} from '../enums/Grouped.enum';
import {Position, CornerPosition} from '../enums/Position.enum';
import {Size} from '../enums/Size.enum';
import {ROW_TYPES} from '../types/TableHeader.type';

export const useUi = () => {
  return {
    ColorType,
    InputColorType,
    Grouped,
    Position,
    CornerPosition,
    Size,
    ROW_TYPES
  }
}

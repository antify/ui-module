import {
  ColorType,
  InputColorType
} from '../enums/ColorType.enum';
import {Grouped} from '../enums/Grouped.enum';
import {Position} from '../enums/PositionType.enum';
import {Size} from '../enums/Size.enum';
import {POSITION, TOASTER_TYPE} from '../types/Toaster.type';
import {ROW_TYPES} from '../types/TableHeader.type';

export const useUi = () => {
  return {
    ColorType,
    InputColorType,
    Grouped,
    Position,
    Size,
    POSITION,
    TOASTER_TYPE,
    ROW_TYPES
  }
}

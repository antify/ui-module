import {
  State,
  InputState
} from '../enums/State.enum';
import {
  State as TabItemState
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
    State,
    InputState,
    TabItemState,
    Grouped,
    Position,
    CornerPosition,
    Size,
    AntTableRowTypes,
    AntTableAlign,
    AntTableSortDirection,
  };
};

import { ColDef, ColDefBase, ColHeaderCellProps, GridProps } from "../grid";
import { ReorderModel } from "./reorder/types";

export type ProColDef<ValueType = any> = ColDefBase<ValueType> & {
  resizeable?: boolean;
  width?: ColDef["width"] | WidthModel;
  minResizeWidth?: number;
  maxResizeWidth?: number;
  keyboardResizeStep?: number;
};

export type GridProProps = Omit<GridProps, "cols"> & {
  cols: ProColDef[];
  reorder?: ReorderModel;
};

export type ColHeaderCellProProps = ColHeaderCellProps &
  Pick<GridProps, "displayMode"> & {
    setWidth?: (width: number) => void;
  } & Pick<
    ProColDef,
    "minResizeWidth" | "maxResizeWidth" | "keyboardResizeStep"
  >;

export interface WidthModel {
  width: number;
  setWidth: (width: number) => void;
}

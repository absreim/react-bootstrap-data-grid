import { ColDef, ColDefBase, ColHeaderCellProps, GridProps } from "../grid";

export type ProColDef<ValueType = any> = ColDefBase<ValueType> & {
  resizeable?: boolean;
  width?: ColDef["width"] | WidthModel;
};

export type GridProProps = Omit<GridProps, "cols"> & {
  cols: ProColDef[];
};

export type ColHeaderCellProProps = ColHeaderCellProps &
  Pick<GridProps, "displayMode"> & {
    resizeable?: boolean;
  };

export interface WidthModel {
  width: number;
  setWidth: (width: number) => void;
}

import {
  ColDef,
  ColDefBase,
  ColHeaderCellProps,
  GridProps,
  StyleModel,
} from "../grid";
import { ReorderModel, ReorderStyleModel } from "./reorder/types";

export type ProColDef<ValueType = any> = ColDefBase<ValueType> & {
  resizeable?: boolean;
  width?: ColDef["width"] | WidthModel;
  minResizeWidth?: number;
  maxResizeWidth?: number;
  keyboardResizeStep?: number;
};

export type GridProProps = Omit<GridProps, "cols" | "styleModel"> & {
  cols: ProColDef[];
  reorder?: ReorderModel;
  styleModel?: ProStyleModel;
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

export interface ProStyleSubmodels {
  reorderModel?: ReorderStyleModel;
}

export type ProStyleModel = ProStyleSubmodels & StyleModel;

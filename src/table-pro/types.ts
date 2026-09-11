import {
  ColDef,
  ColDefBase,
  ColHeaderCellProps,
  TableProps,
  StyleModel,
} from "../table";
import { ReorderModel, ReorderStyleModel } from "./reorder/types";

/**
 * Fields specific to {@link ProColDef}.
 *
 * @public
 */
export interface ProColDefSpecificFields {
  /**
   * Configures whether the column is resizable.
   *
   * @defaultValue false
   */
  resizeable?: boolean;
  /**
   * Configures the width of the column. The value can be a number in pixels or
   * a state setter/getter object of type {@link WidthModel}.
   *
   * @defaultValue 100
   */
  width?: ColDef["width"] | WidthModel;
  /**
   * When the column is resizable, configures the minimum width to which the
   * column can be resized.
   *
   * @defaultValue 64 if the column is sortable, 32 if not
   */
  minResizeWidth?: number;
  /**
   * When the column is resizable, configures the maximum width to which the
   * column can be resized.
   *
   * @defaultValue {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE | Number.MAX_VALUE}
   */
  maxResizeWidth?: number;
  /**
   * Configures the number of pixels to change the width per keypress when
   * resizing.
   *
   * @defaultValue 10
   */
  keyboardResizeStep?: number;
}

export type ProColDef<ValueType = any> = ColDefBase<ValueType> &
  ProColDefSpecificFields;

export type TableProProps = Omit<TableProps, "cols" | "styleModel"> & {
  cols: ProColDef[];
  reorder?: ReorderModel;
  styleModel?: ProStyleModel;
};

export type ColHeaderCellProProps = ColHeaderCellProps &
  Pick<TableProps, "displayMode"> & {
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

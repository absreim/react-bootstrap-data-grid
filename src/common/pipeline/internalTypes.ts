import { RowId } from "../types";
import { SelectionInfo } from "../selection/internalTypes";
import { SelectModel } from "../selection/types";
import { SelectionInputModel } from "../../table/selection/SelectionInput";

/**
 * A hash map that associates column name to a width setting.
 *
 * @internal
 */
export type ColNameToWidth<ColName extends string = string> = Record<
  ColName,
  number | undefined
>;

export interface SelectionFns {
  selectedSet: Set<RowId>;
  rowsAreSelectable: boolean | undefined;
  selectionInfo: SelectionInfo | null;
  selectAllHandler: () => void;
  getSelectHandler: (index: RowId) => () => void;
  getSelectInputModel: (
    id: RowId,
    selectModel: SelectModel,
  ) => SelectionInputModel;
  getAriaSelectedValue: (id: RowId) => "true" | "false" | undefined;
  getRowSelectHandler: (index: RowId) => () => void;
}

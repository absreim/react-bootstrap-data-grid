import { AugFormattedRow } from "../../common/internalTypes";
import { FocusCoordinates } from "../focus/internalTypes";
import { GridProps } from "./types";
import { SortedRowsOutput } from "../../common/pipeline/useCombinedPipeline/useSortedRows";
import { RowId, SelectMode } from "../../common";
import { CheckboxState } from "../../common/selection/internalTypes";

export interface GridHeaderSelectionInfo {
  mode: SelectMode;
  selectAllHandler: () => void;
  selectCheckboxState: CheckboxState;
}

export interface GridBodySelectionInfo {
  type: "single" | "multi";
  mode: SelectMode;
  getRowIsSelected: (id: RowId) => boolean;
  getRowSelectHandler: (id: RowId) => () => void;
}

/**
 * Props interface for the GridHeader component
 *
 * @internal
 */
export interface GridHeaderProps {
  cols: GridProps["cols"];
  vertScrollable: boolean;
  rowVariant?: GridProps["headerRowVariant"];
  cellVariant?: GridProps["headerCellVariant"];
  focusColIndex: number | null;
  cellFocusVariant?: GridProps["headerCellFocusVariant"];
  sortInfo: Omit<SortedRowsOutput, "sortedRows">;

  /**
   * `undefined` value for ths prop means that selection is disabled for the
   * grid.
   */
  selectionInfo?: GridHeaderSelectionInfo;
}

/**
 * Props interface for the GridBody component
 *
 * @internal
 */
export type GridBodyProps = {
  augFormattedRows: AugFormattedRow[];
  cols: GridProps["cols"];
  rowVariant?: GridProps["bodyRowVariant"];
  cellVariant?: GridProps["bodyCellVariant"];
  focusCoords: FocusCoordinates;
  cellFocusVariant?: GridProps["bodyCellFocusVariant"];

  /**
   * `undefined` value for ths prop means that selection is disabled for the
   * grid.
   */
  selectionInfo?: GridBodySelectionInfo;
  gridId: string;
};

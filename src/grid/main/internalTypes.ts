import { AugFormattedRow } from "../../common/internalTypes";
import { FocusCoordinates } from "../focus/internalTypes";
import { GridProps } from "./types";
import { SortedRowsOutput } from "../../common/pipeline/useCombinedPipeline/useSortedRows";
import { RowId } from "../../common";

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
  selectAllHandler: () => void;
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
  getRowIsSelected: (id: RowId) => boolean;
  getRowSelectHandler: (id: RowId) => () => void;
};

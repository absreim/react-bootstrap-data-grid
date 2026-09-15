import { AugFormattedRow } from "../../common/internalTypes";
import { FocusCoordinates } from "../focus/types";
import { GridProps } from "./types";

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
};

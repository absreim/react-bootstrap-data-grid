import { CellData, PostPaginationRowDef } from "./types";

/**
 * Like {@link FormattedRow}, but additionally contains the "width" property
 * for the column definition related to each cell.
 *
 * @internal
 */
export type AugFormattedRow = {
  contents: CellData[];
} & Omit<PostPaginationRowDef, "data">;

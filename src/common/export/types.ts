import { RowId } from "../types";

/**
 * Intermediary object that represents a single row that is formatted in a
 * manner suitable for CSV export.
 *
 * @internal
 */
export type FormattedExportRow = {
  id: RowId;
  data: Record<string, string | number>;
};

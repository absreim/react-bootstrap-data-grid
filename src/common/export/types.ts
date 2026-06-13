import { RowId } from "../types";

export type FormattedExportRow = {
  id: RowId;
  data: Record<string, string | number>;
};

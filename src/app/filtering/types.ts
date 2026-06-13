import { ColDef, EditableTableFilterState, RowDef } from "@/table";

export interface TestParams {
  testId: string;
  cols: ColDef[];
  rows: RowDef[];
  initialState: EditableTableFilterState;
  caption?: string;
}

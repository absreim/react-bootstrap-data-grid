import { ColDef, EditableTableFilterState, RowDef } from "@/grid";

export interface TestParams {
  testId: string;
  cols: ColDef[];
  rows: RowDef[];
  initialState: EditableTableFilterState;
  caption?: string;
  useToolbar?: boolean;
}

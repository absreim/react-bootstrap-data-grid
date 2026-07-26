import { ColDef, EditableFilterState, RowDef } from "../../table";

export interface TestParams {
  testId: string;
  cols: ColDef[];
  rows: RowDef[];
  initialState: EditableFilterState;
  caption?: string;
}

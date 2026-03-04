import { FC, useState } from "react";
import Grid, {
  ColDef,
  FilterModel,
  MultiSelectModel,
  RowDef,
  RowId,
} from "@/grid";
import { MultiSelectModelInitialState } from "@/app/selection/types";

export interface MultiSelectionTestHarnessProps {
  rows: RowDef[];
  cols: ColDef[];
  initialState: MultiSelectModelInitialState;
  filterModel?: FilterModel;
}

const MultiSelectionTestHarness: FC<MultiSelectionTestHarnessProps> = ({
  rows,
  cols,
  initialState,
  filterModel
}) => {
  const [selected, setSelected] = useState<RowId[]>(initialState.selected);
  const model: MultiSelectModel = {
    ...initialState,
    selected,
    setSelected,
  };
  return <Grid rows={rows} cols={cols} selectModel={model} filterModel={filterModel} />;
};

export default MultiSelectionTestHarness;

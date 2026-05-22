import { FC, useState } from "react";
import Grid, {
  ColDef,
  FilterModel,
  MultiSelectModel,
  RowDef,
  RowId,
} from "@/grid";
import { MultiSelectModelInitialState } from "@/app/selection/types";
import GridPro from "@/grid-pro";

export interface MultiSelectionTestHarnessProps {
  rows: RowDef[];
  cols: ColDef[];
  initialState: MultiSelectModelInitialState;
  filterModel?: FilterModel;
  pro?: boolean;
}

const MultiSelectionTestHarness: FC<MultiSelectionTestHarnessProps> = ({
  rows,
  cols,
  initialState,
  filterModel,
  pro
}) => {
  const [selected, setSelected] = useState<RowId[]>(initialState.selected);
  const model: MultiSelectModel = {
    ...initialState,
    selected,
    setSelected,
  };

  if (pro) {
    return (
      <GridPro
        rows={rows}
        cols={cols}
        selectModel={model}
        filterModel={filterModel}
      />
    );
  }

  return (
    <Grid
      rows={rows}
      cols={cols}
      selectModel={model}
      filterModel={filterModel}
    />
  );
};

export default MultiSelectionTestHarness;

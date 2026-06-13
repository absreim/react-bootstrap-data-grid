import { FC, useState } from "react";
import Table, {
  ColDef,
  FilterModel,
  MultiSelectModel,
  RowDef,
  RowId,
} from "@/table";
import { MultiSelectModelInitialState } from "@/app/selection/types";
import TablePro from "@/table-pro";

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
  pro,
}) => {
  const [selected, setSelected] = useState<RowId[]>(initialState.selected);
  const model: MultiSelectModel = {
    ...initialState,
    selected,
    setSelected,
  };

  if (pro) {
    return (
      <TablePro
        rows={rows}
        cols={cols}
        selectModel={model}
        filterModel={filterModel}
      />
    );
  }

  return (
    <Table
      rows={rows}
      cols={cols}
      selectModel={model}
      filterModel={filterModel}
    />
  );
};

export default MultiSelectionTestHarness;

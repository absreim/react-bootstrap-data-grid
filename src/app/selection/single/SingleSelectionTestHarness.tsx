import { FC, useState } from "react";
import Table, { ColDef, RowDef, RowId, SingleSelectModel } from "@/table";
import { SingleSelectModelInitialState } from "@/app/selection/types";
import TablePro from "@/table-pro";

export interface SingleSelectionTestHarnessProps {
  rows: RowDef[];
  cols: ColDef[];
  initialState: SingleSelectModelInitialState;
  pro?: boolean;
}

const SingleSelectionTestHarness: FC<SingleSelectionTestHarnessProps> = ({
  rows,
  cols,
  initialState,
  pro,
}) => {
  const [selected, setSelected] = useState<RowId | null>(initialState.selected);
  const model: SingleSelectModel = {
    ...initialState,
    selected,
    setSelected,
  };

  if (pro) {
    return <TablePro rows={rows} cols={cols} selectModel={model} />;
  }

  return <Table rows={rows} cols={cols} selectModel={model} />;
};

export default SingleSelectionTestHarness;

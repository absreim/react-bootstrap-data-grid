import { FC, useState } from "react";
import Grid, { ColDef, RowDef, RowId, SingleSelectModel } from "@/grid";
import { SingleSelectModelInitialState } from "@/app/selection/types";
import GridPro from "@/grid-pro";

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
    return <GridPro rows={rows} cols={cols} selectModel={model} />;
  }

  return <Grid rows={rows} cols={cols} selectModel={model} />;
};

export default SingleSelectionTestHarness;

import { FC, useState } from "react";
import Grid, { ColDef, RowDef, SingleSelectModel } from "@/grid";
import { SingleSelectModelInitialState } from "@/app/selection/test/types";

export interface SingleSelectionTestHarnessProps {
  rows: RowDef[];
  cols: ColDef[];
  initialState: SingleSelectModelInitialState;
}

const SingleSelectionTestHarness: FC<SingleSelectionTestHarnessProps> = ({
  rows,
  cols,
  initialState,
}) => {
  const [selected, setSelected] = useState<number | null>(
    initialState.selected,
  );
  const model: SingleSelectModel = {
    ...initialState,
    selected,
    setSelected,
  };

  return <Grid rows={rows} cols={cols} selectModel={model} />;
};

export default SingleSelectionTestHarness;

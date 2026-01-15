import { FC, useState } from "react";
import Grid, {
  ColDef,
  MultiSelectModel,
  MultiSelectModelInitialState,
  RowDef,
} from "@/grid";

export interface MultiSelectionTestHarnessProps {
  rows: RowDef[];
  cols: ColDef[];
  initialState: MultiSelectModelInitialState;
}

const MultiSelectionTestHarness: FC<MultiSelectionTestHarnessProps> = ({
  rows,
  cols,
  initialState,
}) => {
  const [selected, setSelected] = useState<number[]>(initialState.selected);
  const model: MultiSelectModel = {
    ...initialState,
    selected,
    setSelected,
  };
  return <Grid rows={rows} cols={cols} selectModel={model} />;
};

export default MultiSelectionTestHarness;

import Grid, { ColDef, RowDef, SortColDef, TableSortModel } from "@/grid";
import { FC, useState } from "react";

interface SortTestHarnessProps {
  cols: ColDef[];
  rows: RowDef[];
  initialSortDef: SortColDef | null;
  controlled: boolean;
}

const SortTestHarness: FC<SortTestHarnessProps> = ({
  cols,
  rows,
  initialSortDef,
  controlled
}) => {
  const [sortColDef, setSortColDef] = useState<SortColDef | null>(
    initialSortDef,
  );

  const tableSortModel: TableSortModel = controlled ? {
    sortColDef,
    setSortColDef,
  } : {
    type: "uncontrolled",
    initialSortColDef: sortColDef
  };

  return <Grid rows={rows} cols={cols} sortModel={tableSortModel} />;
};

export default SortTestHarness;

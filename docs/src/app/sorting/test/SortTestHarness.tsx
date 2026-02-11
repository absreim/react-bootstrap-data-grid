import Grid, { ColDef, RowDef, SortColDef, TableSortModel } from "@/grid";
import { FC, useState } from "react";

interface SortTestHarnessProps {
  cols: ColDef[];
  rows: RowDef[];
  initialSortDef: SortColDef | null;
}

const SortTestHarness: FC<SortTestHarnessProps> = ({
  cols,
  rows,
  initialSortDef,
}) => {
  const [sortColDef, setSortColDef] = useState<SortColDef | null>(
    initialSortDef,
  );

  const tableSortModel: TableSortModel = {
    sortColDef,
    setSortColDef,
  };

  return <Grid rows={rows} cols={cols} sortModel={tableSortModel} />;
};

export default SortTestHarness;

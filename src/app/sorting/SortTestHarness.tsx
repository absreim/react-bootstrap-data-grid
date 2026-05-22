import Grid, { ColDef, RowDef, SortColDef, TableSortModel } from "@/grid";
import { FC, useState } from "react";
import GridPro from "@/grid-pro";

interface SortTestHarnessProps {
  cols: ColDef[];
  rows: RowDef[];
  initialSortDef: SortColDef | null;
  controlled: boolean;
  pro?: boolean;
}

const SortTestHarness: FC<SortTestHarnessProps> = ({
  cols,
  rows,
  initialSortDef,
  controlled,
  pro
}) => {
  const [sortColDef, setSortColDef] = useState<SortColDef | null>(
    initialSortDef,
  );

  const tableSortModel: TableSortModel = controlled
    ? {
        sortColDef,
        setSortColDef,
      }
    : {
        type: "uncontrolled",
        initialSortColDef: sortColDef,
      };

  if (pro) {
    return <GridPro rows={rows} cols={cols} sortModel={tableSortModel} />;
  }

  return <Grid rows={rows} cols={cols} sortModel={tableSortModel} />;
};

export default SortTestHarness;

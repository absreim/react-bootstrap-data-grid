import Table, { ColDef, RowDef, SortColDef, TableSortModel } from "@/table";
import { FC, useState } from "react";
import TablePro from "@/table-pro";

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
  pro,
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
    return <TablePro rows={rows} cols={cols} sortModel={tableSortModel} />;
  }

  return <Table rows={rows} cols={cols} sortModel={tableSortModel} />;
};

export default SortTestHarness;

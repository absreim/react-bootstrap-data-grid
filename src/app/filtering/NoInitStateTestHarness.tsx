import Table, { ColDef, FilterModel, RowDef } from "@/table";
import { FC } from "react";
import TablePro from "@/table-pro";

interface NoInitStateTestHarnessProps {
  cols: ColDef[];
  rows: RowDef[];
  caption?: string;
  pro?: boolean;
}

const NoInitStateTestHarness: FC<NoInitStateTestHarnessProps> = ({
  cols,
  rows,
  caption,
  pro,
}) => {
  const filterModel: FilterModel = {
    type: "uncontrolled",
    filterTableCaption: caption,
  };

  if (pro) {
    return <TablePro rows={rows} cols={cols} filterModel={filterModel} />;
  }

  return <Table rows={rows} cols={cols} filterModel={filterModel} />;
};

export default NoInitStateTestHarness;

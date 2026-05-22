import Grid, { ColDef, FilterModel, RowDef } from "@/grid";
import { FC } from "react";
import GridPro from "@/grid-pro";

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
  pro
}) => {
  const filterModel: FilterModel = {
    type: "uncontrolled",
    filterTableCaption: caption,
  };

  if (pro) {
    return <GridPro rows={rows} cols={cols} filterModel={filterModel} />;
  }

  return <Grid rows={rows} cols={cols} filterModel={filterModel} />;
};

export default NoInitStateTestHarness;

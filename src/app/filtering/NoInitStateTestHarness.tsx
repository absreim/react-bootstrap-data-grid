import Grid, { ColDef, FilterModel, RowDef } from "@/grid";
import { FC } from "react";

interface NoInitStateTestHarnessProps {
  cols: ColDef[];
  rows: RowDef[];
  caption?: string;
}

const NoInitStateTestHarness: FC<NoInitStateTestHarnessProps> = ({
  cols,
  rows,
  caption,
}) => {
  const filterModel: FilterModel = {
    type: "uncontrolled",
    filterTableCaption: caption,
  };

  return <Grid rows={rows} cols={cols} filterModel={filterModel} />;
};

export default NoInitStateTestHarness;

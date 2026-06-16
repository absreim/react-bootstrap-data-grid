import { FC } from "react";
import useCombinedPipeline from "@/common/pipeline/useCombinedPipeline";
import { GridProps } from "@/grid/main/types";

const Grid: FC<GridProps> = ({ rows, cols, filterModel, sortModel, pagination, selectModel }) => {
  const { displayRows } = useCombinedPipeline({
    rows,
    cols,
    filterModel,
    sortModel,
    pagination,
    selectModel,
  });

  return <></>
}

export default Grid;

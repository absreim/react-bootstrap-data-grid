"use client";

import { CSSProperties, FC, useMemo } from "react";
import useCombinedPipeline from "@/common/pipeline/useCombinedPipeline";
import { GridProps } from "@/grid/main/types";
import useAugFormattedRows from "@/common/pipeline/useAugFormattedRows";
import useColNameToWidth from "@/common/pipeline/useColNameToWidth";
import useGridInfos from "@/grid/main/useGridInfos";
import GridHeader from "@/grid/main/GridHeader";
import GridBody from "@/grid/main/GridBody";

const Grid: FC<GridProps> = ({
  rows,
  cols,
  filterModel,
  sortModel,
  pagination,
  selectModel,
  width,
  height
}) => {
  const { displayRows, filteredRows } = useCombinedPipeline({
    rows,
    cols,
    filterModel,
    sortModel,
    pagination,
    selectModel,
  });
  const colNameToWidth = useColNameToWidth(cols);
  const augFormattedRows = useAugFormattedRows(colNameToWidth, displayRows);
  const { colInfos, rowInfos } = useGridInfos(cols, augFormattedRows);
  const gridStyle: CSSProperties = useMemo(() => {
    let widthProperty: CSSProperties["width"] = undefined;
    if (width === "parent") {
      widthProperty = "100%";
    }
    if (typeof width === "number") {
      widthProperty = width;
    }

    let heightProperty: CSSProperties["height"] = undefined;
    if (height === "parent") {
      heightProperty = "100%";
    }
    if (typeof height === "number") {
      heightProperty = height;
    }

    return {
      width: widthProperty,
      height: heightProperty
    }
  }, [width, height]);

  return (
    <div
      style={gridStyle}
      className="overflow-x-scroll overflow-y-scroll"
      role="grid"
      aria-colcount={cols.length}
      aria-rowcount={filteredRows.length + 1}
    >
      <GridHeader colInfos={colInfos} />
      <GridBody rowInfos={rowInfos} />
    </div>
  );
};

export default Grid;

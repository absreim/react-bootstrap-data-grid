"use client";

import { CSSProperties, FC, useMemo } from "react";
import useCombinedPipeline from "@/common/pipeline/useCombinedPipeline";
import { GridProps } from "@/grid/main/types";
import useAugFormattedRows from "@/common/pipeline/useAugFormattedRows";
import useColNameToWidth from "@/common/pipeline/useColNameToWidth";
import useGridInfos from "@/grid/main/useGridInfos";
import GridHeader from "@/grid/main/GridHeader";
import GridBody from "@/grid/main/GridBody";
import classNames from "classnames";

const Grid: FC<GridProps> = ({
  rows,
  cols,
  filterModel,
  sortModel,
  pagination,
  selectModel,
  width,
  height,
  variant,
  stripes,
  hover,
  borders,
  small,
  divider,
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
    function getWidthProperty(
      width: GridProps["width"],
    ): CSSProperties["width"] {
      if (width === "parent") {
        return "100%";
      }

      if (typeof width === "number") {
        return width;
      }

      return undefined;
    }

    function getHeightProperty(
      height: GridProps["height"],
    ): CSSProperties["height"] {
      if (height === "parent") {
        return "100%";
      }
      if (typeof height === "number") {
        return height;
      }

      return undefined;
    }

    return {
      width: getWidthProperty(width),
      height: getHeightProperty(height),
    };
  }, [width, height]);

  const vertScrollable = height !== undefined && height !== "auto";

  return (
    <div
      style={gridStyle}
      className={classNames(
        {
          "overflow-x-auto": width !== undefined && width !== "auto",
          "overflow-y-auto": vertScrollable,
          "rbdg-grid-striped": stripes === "rows",
          "rbdg-grid-striped-columns": stripes === "columns",
          "rbdg-grid-hover": !!hover,
          "rbdg-grid-bordered": borders === "full",
          "rbdg-grid-borderless": borders === "none",
          "rbdg-grid-sm": !!small,
        },
        "rbdg-grid",
        variant && `rbdg-grid-${variant}`,
      )}
      role="grid"
      aria-colcount={cols.length}
      aria-rowcount={filteredRows.length + 1}
    >
      <GridHeader colInfos={colInfos} vertScrollable={vertScrollable} />
      <GridBody rowInfos={rowInfos} divider={divider} />
    </div>
  );
};

export default Grid;

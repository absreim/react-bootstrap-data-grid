"use client";

import { CSSProperties, FC, useMemo } from "react";
import useCombinedPipeline from "@/common/pipeline/useCombinedPipeline";
import { GridProps } from "@/grid/main/types";
import useAugFormattedRows from "@/common/pipeline/useAugFormattedRows";
import useColNameToWidth from "@/common/pipeline/useColNameToWidth";
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
  borderVariant,
  headerCellVariant,
  headerRowVariant,
  bodyCellVariant,
  bodyRowVariant,
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
  // TODO: make the "auto" setting display intrinsic width and height
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
          border: borders === "full",
          "rbdg-grid-borderless": borders === "none",
          "rbdg-grid-sm": !!small,
          "rbdg-grid-group-divider": !!divider,
        },
        "rbdg-grid",
        variant && `rbdg-grid-${variant}`,
        borderVariant && `border-${borderVariant}`,
      )}
      role="grid"
      aria-colcount={cols.length}
      aria-rowcount={filteredRows.length + 1}
    >
      <GridHeader
        cols={cols}
        rowVariant={headerRowVariant}
        cellVariant={headerCellVariant}
        vertScrollable={vertScrollable}
      />
      <GridBody
        augFormattedRows={augFormattedRows}
        cols={cols}
        rowVariant={bodyRowVariant}
        cellVariant={bodyCellVariant}
      />
    </div>
  );
};

export default Grid;

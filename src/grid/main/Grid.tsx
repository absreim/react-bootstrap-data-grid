"use client";

import { CSSProperties, FC, useMemo, useRef } from "react";
import useCombinedPipeline from "../../common/pipeline/useCombinedPipeline";
import { GridProps } from "./types";
import useAugFormattedRows from "../../common/pipeline/useAugFormattedRows";
import useColNameToWidth from "../../common/pipeline/useColNameToWidth";
import GridHeader from "./GridHeader";
import GridBody from "./GridBody";
import classNames from "classnames";
import { CSS_PREFIX } from "../../common/constants";
import useGridFocus from "../focus/useGridFocus";

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

      return "min-content";
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
  const gridRef = useRef<HTMLDivElement>(null);
  const { effectiveCoords, gridClickHandler, gridKeydownHandler } =
    useGridFocus(gridRef, rows.length + 1, cols.length);

  // TODO: Adjust focus ring styles based on Bootstrap design tokens. The
  // focus-ring utility does not look suitable.

  return (
    <div
      onClick={gridClickHandler}
      onKeyDown={gridKeydownHandler}
      ref={gridRef}
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
          "rbdg-grid-group-divider": !!divider,
        },
        "rbdg-grid",
        variant && `${CSS_PREFIX}-${variant}`,
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
        focusColIndex={
          effectiveCoords.ariaRowIndex === 0
            ? effectiveCoords.ariaColIndex
            : null
        }
      />
      <GridBody
        focusCoords={effectiveCoords}
        augFormattedRows={augFormattedRows}
        cols={cols}
        rowVariant={bodyRowVariant}
        cellVariant={bodyCellVariant}
      />
    </div>
  );
};

export default Grid;

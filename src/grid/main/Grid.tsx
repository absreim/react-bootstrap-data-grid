"use client";

import {
  ClipboardEventHandler,
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import useCombinedPipeline from "../../common/pipeline/useCombinedPipeline";
import { GridProps } from "./types";
import useAugFormattedRows from "../../common/pipeline/useAugFormattedRows";
import useColNameToWidth from "../../common/pipeline/useColNameToWidth";
import GridHeader from "./GridHeader";
import GridBody from "./GridBody";
import classNames from "classnames";
import { CSS_PREFIX } from "../../common/constants";
import useGridFocus from "../focus/useGridFocus";
import Pagination from "../../common/pagination/Pagination";
import { GridPaginationModel } from "../pagination/types";

/**
 * The main component for the grid feature of react-bootstrap-data-grid.
 *
 * @public
 */
const Grid: FC<GridProps> = ({
  rows,
  cols,
  sortModel,
  pagination,
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
  headerCellFocusVariant,
  bodyCellFocusVariant,
}) => {
  const { displayRows, filteredRows, sortedRowsOutput, currentPageRowsOutput } =
    useCombinedPipeline({
      rows,
      cols,
      sortModel,
      pagination,
    });
  const colNameToWidth = useColNameToWidth(cols);
  const augFormattedRows = useAugFormattedRows(colNameToWidth, displayRows);
  function getWidthProperty(width: GridProps["width"]): CSSProperties["width"] {
    if (width === "parent") {
      return "100%";
    }

    if (typeof width === "number") {
      return width;
    }

    return "min-content";
  }
  const widthProperty = getWidthProperty(width);

  function getHeightProperties(height: GridProps["height"]): {
    containerDiv: CSSProperties["height"];
    mainDiv: CSSProperties["height"];
  } {
    if (height === "parent") {
      return {
        containerDiv: "100%",
        mainDiv: "100%",
      };
    }
    if (typeof height === "number") {
      return {
        containerDiv: undefined,
        mainDiv: height,
      };
    }

    return {
      containerDiv: undefined,
      mainDiv: undefined,
    };
  }
  const heightProperties = getHeightProperties(height);

  const vertScrollable = height !== undefined && height !== "auto";
  const gridRef = useRef<HTMLDivElement>(null);
  const sortableColIndices = sortModel
    ? cols
        .map((_, index) => index + 1)
        .filter((ariaColIndex) => cols[ariaColIndex - 1].sortable)
    : [];
  const { effectiveCoords, gridClickHandler, gridKeydownHandler } =
    useGridFocus(gridRef, displayRows.length + 1, cols.length, sortableColIndices);

  const onCopy: ClipboardEventHandler<HTMLDivElement> = useCallback((event) => {
    if (!gridRef.current?.contains(document.activeElement)) {
      return;
    }

    const selection = document.getSelection();
    if (!selection || !selection.isCollapsed) {
      return;
    }

    event.preventDefault();
    event.clipboardData.setData(
      "text/plain",
      selection.focusNode!.textContent!,
    );
  }, []);

  const mainGridComponent = (
    <div
      onCopy={onCopy}
      onClick={gridClickHandler}
      onKeyDown={gridKeydownHandler}
      ref={gridRef}
      style={{
        width: widthProperty,
        height: heightProperties.mainDiv,
      }}
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
          effectiveCoords.ariaRowIndex === 1
            ? effectiveCoords.ariaColIndex
            : null
        }
        cellFocusVariant={headerCellFocusVariant}
        sortInfo={sortedRowsOutput}
      />
      <GridBody
        focusCoords={effectiveCoords}
        augFormattedRows={augFormattedRows}
        cols={cols}
        rowVariant={bodyRowVariant}
        cellVariant={bodyCellVariant}
        cellFocusVariant={bodyCellFocusVariant}
      />
    </div>
  );

  const getPagination: (paginationModel: GridPaginationModel) => ReactNode = (
    pagination,
  ) => (
    <Pagination
      containerDivClasses={[
        "d-flex",
        `rbdg-justify-content-${pagination.styleOptions?.horizontalAlignment || "right"}`,
        `gap-${pagination.styleOptions?.paginationComponentSpacing === undefined ? 2 : pagination.styleOptions?.paginationComponentSpacing}`,
      ]}
      normalizedModel={currentPageRowsOutput.normalizedModel!}
      prePagingNumRows={rows.length}
      sizeSelectAfterPageSelect={
        pagination.styleOptions?.sizeSelectAfterPageSelect
      }
    />
  );

  return pagination ? (
    <div
      style={{ width: widthProperty, height: heightProperties.containerDiv }}
      className={classNames(
        "d-flex",
        "flex-column",
        `gap-${pagination.styleOptions?.mainComponentSpacing === undefined ? 2 : pagination.styleOptions?.mainComponentSpacing}`,
      )}
      data-testid="rbdg-top-level-grid-container"
    >
      {pagination.styleOptions?.aboveMainComponent ? (
        <>
          {getPagination(pagination)}
          {mainGridComponent}
        </>
      ) : (
        <>
          {mainGridComponent}
          {getPagination(pagination)}
        </>
      )}
    </div>
  ) : (
    <>{mainGridComponent}</>
  );
};

export default Grid;

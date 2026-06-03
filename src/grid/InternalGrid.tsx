"use client";

import { FC, ReactNode, useMemo } from "react";
import { BaseGridProps } from "./types";
import SelectAllHeaderCell from "./selection/SelectAllHeaderCell";
import Pagination from "./pagination/Pagination";
import classNames from "classnames";
import useInterfaces from "./toolbar/useInterfaces";
import ToolbarContainer from "./toolbar/ToolbarContainer";
import useExportFn from "./export/useExportFn";
import getWidthStyle from "./util/getWidthStyle";
import { UseCombinedPipelineHook } from "./pipeline/useCombinedPipeline";
import { UseGridSelectionFnsHook } from "./pipeline/useGridSelectionFns";
import { InterfacePropGenerator } from "./toolbar/types";

export interface InternalGridProps {
  gridProps: BaseGridProps;
  hooks: {
    selectFns: UseGridSelectionFnsHook;
    pipelineOutput: UseCombinedPipelineHook;
  };
  slots: {
    colHeaderCells: ReactNode;
    bodyRows: ReactNode;
    prefixHeader?: ReactNode;
  };
  classes?: {
    headerRow?: string[];
  };
}

const InternalGrid: FC<InternalGridProps> = ({
  gridProps: {
    rows,
    cols,
    pagination,
    filterModel,
    selectModel,
    editModel,
    caption,
    styleModel,
    responsive,
    displayMode,
    allowExport,
  },
  hooks: { pipelineOutput, selectFns },
  slots: { colHeaderCells, bodyRows, prefixHeader },
  classes,
}) => {
  const {
    normalizedTableFilterModel,
    filteredRows,
    filterState,
    sortedRowsOutput: { sortedRows },
    currentPageRowsOutput: { paginatedRows, normalizedModel },
    showSelectCol,
  } = pipelineOutput;

  const exportFnInfo = useExportFn({
    rows,
    cols,
    filteredRows: filterModel && filteredRows,
    currentPageRows: pagination && paginatedRows,
  });

  const showToolbar = filterModel || allowExport;
  const toolbarPropGen: InterfacePropGenerator = useMemo(
    () => (closeUiCallback) => {
      return {
        filtering:
          filterState && filterModel && normalizedTableFilterModel
            ? {
                filterState: filterState,
                setFilterState: normalizedTableFilterModel.setTableFilterState,
                caption: filterModel.filterTableCaption,
                styleModel: styleModel?.filterInputTableStyleModel,
                closeFormCallback: closeUiCallback,
              }
            : undefined,
        exporting: allowExport
          ? {
              exportFnInfo,
              styleModel: styleModel?.exportFormStyleModel,
              closeCallback: closeUiCallback,
            }
          : undefined,
      };
    },
    [
      allowExport,
      exportFnInfo,
      filterModel,
      filterState,
      normalizedTableFilterModel,
      styleModel?.exportFormStyleModel,
      styleModel?.filterInputTableStyleModel,
    ],
  );
  const toolbarInterfaces = useInterfaces(toolbarPropGen);

  const { rowsAreSelectable, selectionInfo, selectAllOnClick } = selectFns;

  const mainTable = (
    <table
      className={classNames(
        {
          "table-hover": rowsAreSelectable,
          "d-block": displayMode === "block",
        },
        styleModel?.mainTableStyleModel?.table || "table",
      )}
      aria-rowcount={filteredRows.length + 1}
    >
      {caption !== undefined && (
        <caption
          className={classNames(styleModel?.mainTableStyleModel?.caption)}
        >
          {caption}
        </caption>
      )}
      <thead className={classNames(styleModel?.mainTableStyleModel?.thead)}>
        <tr
          aria-rowindex={1}
          className={classNames(
            styleModel?.mainTableStyleModel?.theadTr,
            classes?.headerRow || [],
          )}
        >
          {prefixHeader}
          {showSelectCol && (
            <SelectAllHeaderCell
              style={getWidthStyle(selectModel?.selectColWidth)}
              selectionInfo={selectionInfo!}
              onClick={selectAllOnClick}
              totalRows={rows.length}
              customClasses={styleModel?.mainTableStyleModel?.rowSelectColTh}
              colIndexOffset={prefixHeader ? 1 : 0}
            />
          )}
          {colHeaderCells}
          {editModel && (
            <th
              aria-colindex={cols.length + 1 + (showSelectCol ? 1 : 0)}
              className={classNames(styleModel?.mainTableStyleModel?.editColTh)}
              style={getWidthStyle(editModel?.editColWidth)}
            >
              Edit Controls
            </th>
          )}
        </tr>
      </thead>
      <tbody
        className={classNames(
          classNames(styleModel?.mainTableStyleModel?.tbody),
        )}
      >
        {bodyRows}
      </tbody>
    </table>
  );

  return (
    <div
      data-testid="rbdg-top-level-div"
      className={classNames(
        styleModel?.additionalComponentsStyleModel?.topLevelDiv,
      )}
    >
      {showToolbar && (
        <ToolbarContainer
          interfaceGen={toolbarInterfaces}
          styleModel={styleModel?.toolbarStyleModel}
        />
      )}
      <div
        data-testid="rbdg-table-and-pagination-div"
        className={classNames(
          styleModel?.additionalComponentsStyleModel?.tableAndPaginationDiv,
        )}
      >
        <div
          data-testid="rbdg-table-div"
          className={classNames(responsive ? "table-responsive" : null)}
        >
          {mainTable}
        </div>
        {normalizedModel && (
          <Pagination
            normalizedModel={normalizedModel}
            prePagingNumRows={sortedRows.length}
            containerDivClasses={
              styleModel?.additionalComponentsStyleModel?.paginationUiDiv
            }
          />
        )}
      </div>
    </div>
  );
};

export default InternalGrid;

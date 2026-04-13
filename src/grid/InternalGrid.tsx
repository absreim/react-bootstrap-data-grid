"use client";

import { FC, ReactNode, useMemo, useState } from "react";
import { GridProps } from "./types";
import ToggleButton from "./main/ToggleButton";
import FilterOptionsTable from "./filtering/FilterOptionsTable";
import SelectAllHeaderCell from "./selection/SelectAllHeaderCell";
import Pagination from "./pagination/Pagination";
import classNames from "classnames";
import useInterfaces, { InterfaceParams } from "./toolbar/useInterfaces";
import ToolbarContainer from "./toolbar/ToolbarContainer";
import useExportFn from "./export/useExportFn";
import getWidthStyle from "./util/getWidthStyle";
import { UseCombinedPipelineHook } from "./pipeline/useCombinedPipeline";
import { UseGridSelectionFnsHook } from "./pipeline/useGridSelectionFns";
import { UseUnwrappedGridStylesHook } from "./pipeline/useUnwrappedGridStyles";

export interface InternalGridProps {
  gridProps: GridProps;
  hooks: {
    selectFns: UseGridSelectionFnsHook;
    pipelineOutput: UseCombinedPipelineHook;
    unwrappedStyles: UseUnwrappedGridStylesHook;
  };
  slots: {
    colHeaderCells: ReactNode;
    bodyRows: ReactNode;
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
    useToolbar,
    responsive,
    displayMode,
  },
  hooks: {
    pipelineOutput,
    selectFns,
    unwrappedStyles,
  },
  slots: { colHeaderCells, bodyRows },
}) => {
  const {
    normalizedTableFilterModel,
    filteredRows,
    filterState,
    sortedRowsOutput: { sortedRows },
    currentPageRowsOutput: { paginatedRows, normalizedModel },
    showSelectCol,
  } = pipelineOutput;

  const [filterOptionsVisible, setFilterOptionsVisible] =
    useState<boolean>(false);
  const exportFnInfo = useExportFn({
    rows,
    cols,
    filteredRows: filterModel && filteredRows,
    currentPageRows: pagination && paginatedRows,
  });

  const toolbarInterfaceParams: InterfaceParams = useMemo(
    () => ({
      filtering:
        useToolbar && filterState && filterModel && normalizedTableFilterModel
          ? {
              filterState: filterState,
              setFilterState: normalizedTableFilterModel.setTableFilterState,
              caption: filterModel.filterTableCaption,
              styleModel: styleModel?.filterInputTableStyleModel,
            }
          : undefined,
      exporting: useToolbar
        ? { exportFnInfo, styleModel: styleModel?.exportFormStyleModel }
        : undefined,
    }),
    [
      exportFnInfo,
      filterModel,
      filterState,
      normalizedTableFilterModel,
      styleModel?.exportFormStyleModel,
      styleModel?.filterInputTableStyleModel,
      useToolbar,
    ],
  );
  const toolbarInterfaces = useInterfaces(toolbarInterfaceParams);

  const handleToggleFilterOptions = () => {
    setFilterOptionsVisible(!filterOptionsVisible);
  };

  const { rowsAreSelectable, selectionInfo, selectAllOnClick } = selectFns;
  const { unwrappedTableModel, unwrappedAdditionalStyleModel } =
    unwrappedStyles;

  const mainTable = (
    <table
      className={classNames(
        "table",
        {
          "table-hover": rowsAreSelectable,
          "d-block": displayMode === "block",
        },
        unwrappedTableModel.table,
      )}
      aria-rowcount={filteredRows.length + 1}
    >
      {caption !== undefined && (
        <caption className={classNames(unwrappedTableModel.caption)}>
          {caption}
        </caption>
      )}
      <thead className={classNames(unwrappedTableModel.thead)}>
        <tr
          aria-rowindex={1}
          className={classNames(unwrappedTableModel.theadTr)}
        >
          {showSelectCol && (
            <SelectAllHeaderCell
              style={getWidthStyle(selectModel?.selectColWidth)}
              selectionInfo={selectionInfo!}
              onClick={selectAllOnClick}
              totalRows={rows.length}
              additionalClasses={unwrappedTableModel.rowSelectColTh}
            />
          )}
          {colHeaderCells}
          {editModel && (
            <th
              aria-colindex={cols.length + 1 + (showSelectCol ? 1 : 0)}
              className={classNames(unwrappedTableModel.editColTh)}
              style={getWidthStyle(editModel?.editColWidth)}
            >
              Edit Controls
            </th>
          )}
        </tr>
      </thead>
      <tbody className={classNames(unwrappedTableModel.tbody)}>
        {bodyRows}
      </tbody>
    </table>
  );

  return (
    <div
      data-testid="rbdg-top-level-div"
      className={classNames(unwrappedAdditionalStyleModel.topLevelDiv)}
    >
      {normalizedTableFilterModel && !useToolbar && (
        <div
          data-testid="rbdg-filter-inputs-div"
          className={classNames(unwrappedAdditionalStyleModel.filterInputsDiv)}
        >
          <ToggleButton
            isActive={filterOptionsVisible}
            label={`${filterOptionsVisible ? "Hide" : "Show "} Filter Options`}
            onClick={handleToggleFilterOptions}
            classes={
              styleModel?.additionalComponentsStyleModel?.filterUiToggleButton
            }
          />
          {filterOptionsVisible && (
            <FilterOptionsTable
              caption={filterModel!.filterTableCaption}
              filterState={filterState!}
              setFilterState={normalizedTableFilterModel.setTableFilterState}
              styleModel={styleModel?.filterInputTableStyleModel}
            />
          )}
        </div>
      )}
      {useToolbar && (
        <ToolbarContainer
          interfaces={toolbarInterfaces}
          styleModel={styleModel?.toolbarStyleModel}
        />
      )}
      <div
        data-testid="rbdg-table-and-pagination-div"
        className={classNames(
          unwrappedAdditionalStyleModel.tableAndPaginationDiv,
        )}
      >
        {responsive ? (
          <div data-testid="rbdg-table-div" className="table-responsive">
            {mainTable}
          </div>
        ) : (
          <>{mainTable}</>
        )}
        {normalizedModel && (
          <Pagination
            normalizedModel={normalizedModel}
            prePagingNumRows={sortedRows.length}
            containerDivClasses={unwrappedAdditionalStyleModel.paginationUiDiv}
          />
        )}
      </div>
    </div>
  );
};

export default InternalGrid;

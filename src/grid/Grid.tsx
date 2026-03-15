"use client";

import { FC, MouseEventHandler, useId, useMemo, useState } from "react";
import { ColDef, FormattedRow, RowData, RowDef, RowId } from "./types";
import ColHeaderCell from "./ColHeaderCell";
import useFilter from "./pipeline/useFilter";
import ToggleButton from "./ToggleButton";
import FilterOptionsTable from "./filtering/FilterOptionsTable";
import useFilterStateFromEditable from "./pipeline/useFilterStateFromEditable";
import useSortedRows from "./pipeline/useSortedRows";
import useDisplayRows from "./pipeline/useDisplayRows";
import SelectAllHeaderCell from "./selection/SelectAllHeaderCell";
import SelectionInput, {
  SelectionInputModel,
} from "./selection/SelectionInput";
import Pagination from "./pagination/Pagination";
import classNames from "classnames";
import EditableRow from "./editing/EditableRow";
import inputStrsToRowData from "./editing/inputStrsToRowData";
import {
  unwrapAdditionalComponentsStyleModel,
  unwrapTableStyleModel,
} from "./styling/styleModelUnwrappers";
import {
  AdditionalComponentsStyleModel,
  StyleModel,
  TableStyleModel,
} from "./styling/types";
import useCurrentPageRows from "./pipeline/useCurrentPageRows";
import { EditModel } from "./editing/types";
import {
  MultiExistingSelection,
  MultiSelectModel,
  SelectionInfo,
  SelectModel,
} from "./selection/types";
import { FilterModel } from "./filtering/types";
import { ColSortModel, TableSortModel } from "./sorting/types";
import { GridPaginationState } from "./pagination/types";
import isSubset from "./util/isSubset";
import useFilterStateStore from "./pipeline/useFilterStateStore";
import useInterfaces, { InterfaceParams } from "./toolbar/useInterfaces";
import ToolbarContainer from "./toolbar/ToolbarContainer";
import useExportFn from "./export/useExportFn";

export interface GridProps {
  rows: RowDef[];
  cols: ColDef[];
  pagination?: GridPaginationState;
  sortModel?: TableSortModel;
  filterModel?: FilterModel;
  selectModel?: SelectModel;
  editModel?: EditModel;
  caption?: string;
  styleModel?: StyleModel;
  useToolbar?: boolean;
}

const Grid: FC<GridProps> = ({
  rows,
  cols,
  pagination,
  sortModel,
  filterModel,
  selectModel,
  editModel,
  caption,
  styleModel,
  useToolbar,
}) => {
  const normalizedTableFilterModel = useFilterStateStore(filterModel, cols);
  const editableFilterState =
    normalizedTableFilterModel?.tableFilterState || null;
  const filteredRows = useFilter(rows, editableFilterState);
  const filterState = useFilterStateFromEditable(cols, editableFilterState);

  const { sortedRows, sortingEnabled, sortColDef, setSortColDef } =
    useSortedRows(filteredRows, cols, sortModel);
  const { paginatedRows, normalizedModel } = useCurrentPageRows(
    sortedRows,
    pagination,
  );

  const showSelectCol = selectModel && selectModel.mode !== "row";
  const ariaColIndexOffset = showSelectCol ? 1 : 0;
  const displayRows: FormattedRow[] = useDisplayRows(
    paginatedRows,
    cols,
    ariaColIndexOffset,
  );

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
      exporting: useToolbar ? exportFnInfo : undefined,
    }),
    [
      exportFnInfo,
      filterModel,
      filterState,
      normalizedTableFilterModel,
      styleModel?.filterInputTableStyleModel,
      useToolbar,
    ],
  );
  const toolbarInterfaces = useInterfaces(toolbarInterfaceParams);

  const handleToggleFilterOptions = () => {
    setFilterOptionsVisible(!filterOptionsVisible);
  };

  const getSelectionExists: () => boolean = () => {
    if (!selectModel) {
      return false;
    }

    if (selectModel.type === "single") {
      return selectModel.selected !== null;
    }

    return (selectModel as MultiSelectModel).selected.length > 0;
  };
  const selectionExists = getSelectionExists();

  const selectAllOnClick: () => void = () => {
    if (!selectModel) {
      return;
    }

    if (selectionExists && selectModel.type === "single") {
      selectModel.setSelected(null);
      return;
    }

    if (selectionExists && selectModel.type === "multi") {
      selectModel.setSelected([]);
      return;
    }

    if (!selectionExists && selectModel.type === "multi") {
      const allRowIndices = rows.map((_, index) => index);
      selectModel.setSelected(allRowIndices);
    }

    // Button should be disabled in the case of selectionExists &&
    // selectModel.type === "single", so function execution should never get
    // to this point.
  };

  const getSelectHandler: (index: RowId) => () => void = (index) => () => {
    if (!selectModel) {
      return;
    }

    if (selectModel.type === "single") {
      selectModel.setSelected(index);
      return;
    }

    selectModel.setSelected(selectModel.selected.concat(index));
  };

  const getDeselectHandler: (index: RowId) => () => void = (index) => () => {
    if (!selectModel || selectModel.type === "single") {
      return;
    }

    selectModel.setSelected(
      selectModel.selected.filter((num) => num !== index),
    );
  };

  // used to group radio buttons for selection
  const gridId = useId();
  const getSelectInputModel: (
    id: RowId,
    selectModel: SelectModel,
  ) => SelectionInputModel = (id, selectModel) => {
    if (selectModel.type === "single") {
      return {
        type: "radio",
        name: selectModel.groupName || gridId,
      };
    }

    return {
      type: "checkbox",
      deselectCallback: getDeselectHandler(id),
    };
  };

  const selectedSet = new Set<RowId>();
  if (selectModel && selectModel.type === "multi") {
    selectModel.selected.forEach((value) => selectedSet.add(value));
  }
  if (
    selectModel &&
    selectModel.type === "single" &&
    selectModel.selected !== null
  ) {
    selectedSet.add(selectModel.selected);
  }

  const rowsAreSelectable = !!(selectModel && selectModel.mode !== "column");

  const selectionInfo: SelectionInfo | null = useMemo(() => {
    if (!selectModel) {
      return null;
    }

    if (selectModel.type === "single") {
      return {
        selectType: "single",
        existingSelection: selectionExists,
      };
    }

    const getMultiExistingSelection: (
      selectionExists: boolean,
      rows: RowDef[],
    ) => MultiExistingSelection = (selectionExists, rows) => {
      const rowIndices = rows.map((_, index) => index);

      // Note that isFullSelection is true if there are no rows at all. In that case, the return value of this function
      // should be "none", not "full".
      const isFullSelection = isSubset(rowIndices, selectModel.selected!);

      if (!selectionExists) {
        return "none";
      }

      if (isFullSelection) {
        return "full";
      }

      return "partial";
    };

    return {
      selectType: "multi",
      existingSelection: getMultiExistingSelection(selectionExists, rows),
    };
  }, [selectModel, selectionExists, rows]);

  const getRowClickHandler: (
    index: RowId,
  ) => MouseEventHandler<HTMLTableRowElement> = (index) => () => {
    if (!rowsAreSelectable) {
      return;
    }

    if (selectedSet.has(index)) {
      getDeselectHandler(index)();
      return;
    }

    getSelectHandler(index)();
  };

  const getAriaSelectedValue: (id: RowId) => "true" | "false" | undefined = (
    id,
  ) => {
    if (!selectModel) {
      return undefined;
    }

    return String(selectedSet.has(id)) as "true" | "false";
  };

  const getInputStrSubmitCallback:
    | ((id: RowId) => (inputStrs: string[]) => void)
    | undefined =
    editModel &&
    ((id) => {
      const idSpecificCallback = editModel.getUpdateCallback(id);
      return (inputStrs: string[]) => {
        const rowData: RowData = inputStrsToRowData(cols, inputStrs);
        idSpecificCallback(rowData);
      };
    });

  const unwrappedTableModel: Required<TableStyleModel> = useMemo(
    () => unwrapTableStyleModel(styleModel?.mainTableStyleModel),
    [styleModel?.mainTableStyleModel],
  );

  const unwrappedAdditionalStyleModel: Required<AdditionalComponentsStyleModel> =
    useMemo(
      () =>
        unwrapAdditionalComponentsStyleModel(
          styleModel?.additionalComponentsStyleModel,
        ),
      [styleModel?.additionalComponentsStyleModel],
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
        <table
          className={classNames(
            "table",
            {
              "table-hover": rowsAreSelectable,
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
                  selectionInfo={selectionInfo!}
                  onClick={selectAllOnClick}
                  totalRows={rows.length}
                  additionalClasses={unwrappedTableModel.rowSelectColTh}
                />
              )}
              {cols.map(({ name, label, sortable }, index) => {
                const colSortModel: ColSortModel | undefined =
                  sortingEnabled && sortable
                    ? {
                        sortOrder:
                          sortColDef?.name === name ? sortColDef.order : null,
                        setSortOrder: (order) => {
                          setSortColDef &&
                            setSortColDef(order && { name, order });
                        },
                      }
                    : undefined;
                return (
                  <ColHeaderCell
                    key={name}
                    label={label}
                    sortModel={colSortModel}
                    ariaColIndex={index + 1 + (showSelectCol ? 1 : 0)}
                    additionalClasses={unwrappedTableModel.theadTh(index)}
                  />
                );
              })}
              {editModel && (
                <th
                  aria-colindex={cols.length + 1 + (showSelectCol ? 1 : 0)}
                  className={classNames(unwrappedTableModel.editColTh)}
                >
                  Edit Controls
                </th>
              )}
            </tr>
          </thead>
          <tbody className={classNames(unwrappedTableModel.tbody)}>
            {displayRows.map((row, index) => {
              return (
                <EditableRow
                  onClick={getRowClickHandler(row.id)}
                  className={classNames(
                    {
                      "table-active": selectedSet.has(row.id),
                    },
                    unwrappedTableModel.tbodyTr(row.id, index),
                  )}
                  key={row.id}
                  aria-rowindex={index + 2}
                  dataRowId={row.id}
                  aria-selected={getAriaSelectedValue(row.id)}
                  ariaColIndexOffset={ariaColIndexOffset}
                  cellData={row.contents}
                  updateCallback={
                    getInputStrSubmitCallback &&
                    getInputStrSubmitCallback(row.id)
                  }
                  deleteCallback={
                    editModel?.getDeleteCallback &&
                    editModel.getDeleteCallback(row.id)
                  }
                  dataCellClasses={(colIndex) =>
                    unwrappedTableModel.tbodyTd(row.id, index, colIndex)
                  }
                  dataCellInputClasses={(colIndex) =>
                    unwrappedTableModel.tbodyTdInput(row.id, index, colIndex)
                  }
                  editCellClasses={unwrappedTableModel.editColTd(row.id, index)}
                  saveButtonClasses={unwrappedTableModel.editSaveButton(
                    row.id,
                    index,
                  )}
                  deleteButtonClasses={unwrappedTableModel.editDeleteButton(
                    row.id,
                    index,
                  )}
                  startButtonClasses={unwrappedTableModel.editStartButton(
                    row.id,
                    index,
                  )}
                  cancelButtonClasses={unwrappedTableModel.editCancelButton(
                    row.id,
                    index,
                  )}
                >
                  {showSelectCol && (
                    <td
                      className={classNames(
                        unwrappedTableModel.rowSelectColTd(row.id, index),
                      )}
                      aria-colindex={1}
                    >
                      <SelectionInput
                        selected={selectedSet.has(row.id)}
                        selectionInputModel={getSelectInputModel(
                          row.id,
                          selectModel,
                        )}
                        selectCallback={getSelectHandler(row.id)}
                        additionalClasses={unwrappedTableModel.rowSelectInput(
                          row.id,
                          index,
                        )}
                      />
                    </td>
                  )}
                </EditableRow>
              );
            })}
          </tbody>
        </table>
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

export default Grid;

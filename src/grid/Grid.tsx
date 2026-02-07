"use client";

import { FC, MouseEventHandler, useMemo, useState } from "react";
import { ColDef, FormattedRow, RowDef } from "./types";
import ColHeaderCell from "./ColHeaderCell";
import useFilter from "./pipeline/useFilter";
import ToggleButton from "./ToggleButton";
import FilterOptionsTable from "./filtering/FilterOptionsTable";
import useFilterStateFromEditable from "./pipeline/useFilterStateFromEditable";
import useAugmentedRows from "./pipeline/useAugmentedRows";
import useSortedRows from "./pipeline/useSortedRows";
import useDisplayRows from "./pipeline/useDisplayRows";
import SelectAllHeaderCell from "./selection/SelectAllHeaderCell";
import SelectionInput, {
  SelectionInputModel,
} from "./selection/SelectionInput";
import Pagination from "./pagination/Pagination";
import classNames from "classnames";
import EditableRow from "./editing/EditableRow";
import inputStrsToRowDef from "./editing/inputStrsToRowDef";
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
import { MultiSelectModel, SelectModel } from "./selection/types";
import { FilterModel } from "./filtering/types";
import { ColSortModel, TableSortModel } from "./sorting/types";
import { GridPaginationState } from "./pagination/types";

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
}) => {
  const editableFilterState = filterModel?.tableFilterState || null;
  const filterState = useFilterStateFromEditable(cols, editableFilterState);
  const augmentedRows = useAugmentedRows(rows);
  const filteredRows = useFilter(augmentedRows, editableFilterState);

  const sortedRows = useSortedRows(filteredRows, cols, sortModel);

  const currentPageRows = useCurrentPageRows(sortedRows, pagination);

  const showSelectCol = selectModel && selectModel.mode !== "row";
  const ariaColIndexOffset = showSelectCol ? 1 : 0;

  const displayRows: FormattedRow[] = useDisplayRows(
    currentPageRows,
    cols,
    ariaColIndexOffset,
  );

  const [filterOptionsVisible, setFilterOptionsVisible] =
    useState<boolean>(false);

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
      const allFilteredRowIndices = filteredRows.map(
        (def) => def.meta.origIndex,
      );
      selectModel.setSelected(allFilteredRowIndices);
    }

    // Button should be disabled in the case of selectionExists &&
    // selectModel.type === "single", so function execution should never get
    // to this point.
  };

  const getSelectHandler: (index: number) => () => void = (index) => () => {
    if (!selectModel) {
      return;
    }

    if (selectModel.type === "single") {
      selectModel.setSelected(index);
      return;
    }

    selectModel.setSelected(selectModel.selected.concat(index));
  };

  const getDeselectHandler: (index: number) => () => void = (index) => () => {
    if (!selectModel || selectModel.type === "single") {
      return;
    }

    selectModel.setSelected(
      selectModel.selected.filter((num) => num !== index),
    );
  };

  // used to group radio buttons for selection
  const getSelectInputModel: (
    index: number,
    selectModel: SelectModel,
  ) => SelectionInputModel = (index, selectModel) => {
    if (selectModel.type === "single") {
      return {
        type: "radio",
        name: selectModel.groupName,
      };
    }

    return {
      type: "checkbox",
      deselectCallback: getDeselectHandler(index),
    };
  };

  const selectedSet = new Set<number>();
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

  const getRowClickHandler: (
    index: number,
  ) => MouseEventHandler<HTMLTableRowElement> = (index) => (event) => {
    if (!rowsAreSelectable) {
      return;
    }

    if (selectedSet.has(index)) {
      getDeselectHandler(index)();
      return;
    }

    getSelectHandler(index)();
  };

  const getAriaSelectedValue: (
    index: number,
  ) => "true" | "false" | undefined = (index) => {
    if (!selectModel) {
      return undefined;
    }

    return String(selectedSet.has(index)) as "true" | "false";
  };

  const getInputStrSubmitCallback:
    | ((origIndex: number) => (inputStrs: string[]) => void)
    | undefined =
    editModel &&
    ((origIndex) => {
      const indexSpecificCallback = editModel.getUpdateCallback(origIndex);
      return (inputStrs: string[]) => {
        const rowDef: RowDef = inputStrsToRowDef(cols, inputStrs);
        indexSpecificCallback(rowDef);
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
      {filterState && filterModel && (
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
              caption={filterModel.filterTableCaption}
              filterState={filterState}
              setFilterState={filterModel.setTableFilterState}
              styleModel={styleModel?.filterInputTableStyleModel}
            />
          )}
        </div>
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
                  selectType={selectModel.type}
                  onClick={selectAllOnClick}
                  selectionExists={selectionExists}
                  additionalClasses={unwrappedTableModel.rowSelectColTh}
                />
              )}
              {cols.map(({ name, label, sortable }, index) => {
                const colSortModel: ColSortModel | undefined =
                  sortModel && sortable
                    ? {
                        sortOrder:
                          sortModel.sortColDef?.name === name
                            ? sortModel.sortColDef.order
                            : null,
                        setSortOrder: (order) => {
                          sortModel.setSortColDef(order && { name, order });
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
                  onClick={getRowClickHandler(row.origIndex)}
                  className={classNames(
                    {
                      "table-active": selectedSet.has(row.origIndex),
                    },
                    unwrappedTableModel.tbodyTr(row.origIndex, index),
                  )}
                  key={row.origIndex}
                  aria-rowindex={index + 2}
                  dataRowIndex={row.origIndex}
                  aria-selected={getAriaSelectedValue(row.origIndex)}
                  ariaColIndexOffset={ariaColIndexOffset}
                  cellData={row.contents}
                  updateCallback={
                    getInputStrSubmitCallback &&
                    getInputStrSubmitCallback(row.origIndex)
                  }
                  deleteCallback={
                    editModel?.getDeleteCallback &&
                    editModel.getDeleteCallback(row.origIndex)
                  }
                  dataCellClasses={(colIndex) =>
                    unwrappedTableModel.tbodyTd(row.origIndex, index, colIndex)
                  }
                  dataCellInputClasses={(colIndex) =>
                    unwrappedTableModel.tbodyTdInput(
                      row.origIndex,
                      index,
                      colIndex,
                    )
                  }
                  editCellClasses={unwrappedTableModel.editColTd(
                    row.origIndex,
                    index,
                  )}
                  saveButtonClasses={unwrappedTableModel.editSaveButton(
                    row.origIndex,
                    index,
                  )}
                  deleteButtonClasses={unwrappedTableModel.editDeleteButton(
                    row.origIndex,
                    index,
                  )}
                  startButtonClasses={unwrappedTableModel.editStartButton(
                    row.origIndex,
                    index,
                  )}
                  cancelButtonClasses={unwrappedTableModel.editCancelButton(
                    row.origIndex,
                    index,
                  )}
                >
                  {showSelectCol && (
                    <td
                      className={classNames(
                        unwrappedTableModel.rowSelectColTd(
                          row.origIndex,
                          index,
                        ),
                      )}
                    >
                      <SelectionInput
                        selected={selectedSet.has(row.origIndex)}
                        selectionInputModel={getSelectInputModel(
                          row.origIndex,
                          selectModel,
                        )}
                        selectCallback={getSelectHandler(row.origIndex)}
                        additionalClasses={unwrappedTableModel.rowSelectInput(
                          row.origIndex,
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
        {pagination && (
          <Pagination
            componentSize={pagination.componentSize || "medium"}
            pageSizeOptions={pagination.pageSizeOptions}
            pageSizeIndex={pagination.pageSizeIndex}
            handleSetPageSizeIndex={pagination.setPageSizeIndex}
            handleSetPageNum={pagination.setCurrentPage}
            prePagingNumRows={sortedRows.length}
            maxPageButtons={pagination.maxPageButtons}
            currentPage={pagination.currentPage}
            pageSelectorJustifyContent={pagination.pageSelectorJustifyContent}
            pageSelectorAriaLabel={pagination.pageSelectorAriaLabel}
          />
        )}
      </div>
    </div>
  );
};

export default Grid;

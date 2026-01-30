"use client";

import { FC, MouseEventHandler, useMemo, useState } from "react";
import {
  ColDef,
  ColSortModel,
  EditModel,
  FilterModel,
  FormattedRow,
  MultiSelectModel,
  RowDef,
  SelectModel,
  Size,
  StyleModel,
  TableSortModel,
} from "./types";
import ColHeaderCell from "./ColHeaderCell";
import useFilter from "./hooks/useFilter";
import ToggleButton from "./ToggleButton";
import FilterOptionsTable from "./filtering/FilterOptionsTable";
import useFilterStateFromEditable from "./hooks/useFilterStateFromEditable";
import useAugmentedRows from "./hooks/useAugmentedRows";
import useSortedRows from "./hooks/useSortedRows";
import useDisplayRows from "./hooks/useDisplayRows";
import SelectAllHeaderCell from "./selection/SelectAllHeaderCell";
import SelectionInput, {
  SelectionInputModel,
} from "./selection/SelectionInput";
import Pagination from "./pagination/Pagination";
import classNames from "classnames";
import EditableRow from "./editing/EditableRow";
import inputStrsToRowDef from "./editing/inputStrsToRowDef";

export interface GridPaginationState {
  pageSizeOptions: number[];
  pageSizeIndex: number;
  setPageSizeIndex: (pageSizeIndex: number) => void;
  currentPage: number;
  setCurrentPage: (pageNum: number) => void;
  maxPageButtons: number;
  componentSize?: Size;
}

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
  styleModel
}) => {
  const editableFilterState = filterModel?.tableFilterState || null;
  const filterState = useFilterStateFromEditable(cols, editableFilterState);
  const augmentedRows = useAugmentedRows(rows);
  const filteredRows = useFilter(augmentedRows, editableFilterState);

  const sortedRows = useSortedRows(filteredRows, cols, sortModel);

  const currentPageRows = useMemo(() => {
    if (pagination === undefined) {
      return sortedRows;
    }

    const { pageSizeOptions, pageSizeIndex, currentPage } = pagination;
    const pageSize = pageSizeOptions[pageSizeIndex];
    const lowerIndex = pageSize * (currentPage - 1);
    const upperIndex = lowerIndex + pageSize;
    return sortedRows.slice(lowerIndex, upperIndex);
  }, [sortedRows, pagination]);

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

  return (
    <div>
      {filterState && filterModel && (
        <div>
          <ToggleButton
            isActive={filterOptionsVisible}
            label={`${filterOptionsVisible ? "Hide" : "Show "} Filter Options`}
            onClick={handleToggleFilterOptions}
          />
          {filterOptionsVisible && (
            <FilterOptionsTable
              filterState={filterState}
              setFilterState={filterModel.setTableFilterState}
              styleModel={styleModel?.filterInputTableStyleModel}
            />
          )}
        </div>
      )}
      <table
        className={classNames("table", {
          "table-hover": rowsAreSelectable,
        })}
        aria-rowcount={filteredRows.length + 1}
      >
        {caption !== undefined && <caption>{caption}</caption>}
        <thead>
          <tr aria-rowindex={1}>
            {showSelectCol && (
              <SelectAllHeaderCell
                selectType={selectModel.type}
                onClick={selectAllOnClick}
                selectionExists={selectionExists}
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
                />
              );
            })}
            {editModel && (
              <th aria-colindex={cols.length + 1 + (showSelectCol ? 1 : 0)}>
                Edit Controls
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row, index) => {
            return (
              <EditableRow
                onClick={getRowClickHandler(row.origIndex)}
                className={classNames({
                  "table-active": selectedSet.has(row.origIndex),
                })}
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
              >
                {showSelectCol && (
                  <td>
                    <SelectionInput
                      selected={selectedSet.has(row.origIndex)}
                      selectionInputModel={getSelectInputModel(
                        row.origIndex,
                        selectModel,
                      )}
                      selectCallback={getSelectHandler(row.origIndex)}
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
        />
      )}
    </div>
  );
};

export default Grid;

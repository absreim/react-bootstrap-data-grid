"use client";

import { FC, MouseEventHandler, useMemo, useState } from "react";
import {
  ColDef,
  ColSortModel,
  FilterModel,
  FormattedRow,
  MultiSelectModel,
  RowDef,
  SelectModel,
  Size,
  TableSortModel,
} from "./types";
import ColHeaderCell from "./ColHeaderCell";
import useFilter from "./hooks/useFilter";
import ToggleButton from "./ToggleButton";
import FilterOptionsTable from "./FilterOptionsTable/FilterOptionsTable";
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
}

const Grid: FC<GridProps> = ({
  rows,
  cols,
  pagination,
  sortModel,
  filterModel,
  selectModel,
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

  const displayRows: FormattedRow[] = useDisplayRows(currentPageRows, cols);

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

  const showSelectCol = selectModel && selectModel.mode !== "row";

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
    event.preventDefault();
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

  // Once this component implements selection state, and if such interactivity is enabled, (conditionally) change the
  // aria role to "grid".
  // TODO: implement the above described features: conditionally changing aria role to grid
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
            />
          )}
        </div>
      )}
      <div
        role="grid"
        className={classNames("table", "rbdg-grid", {
          "table-hover": rowsAreSelectable,
        })}
        aria-rowcount={filteredRows.length + 1}
      >
        <div role="rowgroup" className="rbdg-grid-head">
          <div role="columnheader" className="rbdg-grid-row" aria-rowindex={1}>
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
          </div>
        </div>
        <div role="rowgroup" className="rbdg-grid-body">
          {displayRows.map((row, index) => (
            <div
              role="row"
              onClick={getRowClickHandler(row.origIndex)}
              className={classNames("rbdg-grid-row", {
                "table-active": selectedSet.has(row.origIndex),
              })}
              key={row.origIndex}
              aria-rowindex={index + 2}
              data-rowindex={row.origIndex}
              aria-selected={getAriaSelectedValue(row.origIndex)}
            >
              {showSelectCol && (
                <div role="gridcell" className="rbdg-grid-cell">
                  <SelectionInput
                    selected={selectedSet.has(row.origIndex)}
                    selectionInputModel={getSelectInputModel(
                      row.origIndex,
                      selectModel,
                    )}
                    selectCallback={getSelectHandler(row.origIndex)}
                  />
                </div>
              )}
              {row.contents.map((value, index) => (
                <div
                  role="gridcell"
                  className="rbdg-grid-cell"
                  key={index}
                  aria-colindex={index + 1 + (showSelectCol ? 1 : 0)}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
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

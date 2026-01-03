"use client";

import { ChangeEvent, FC, useMemo, useState } from "react";
import {
  ColDef,
  ColSortModel,
  FilterModel,
  FormattedRow,
  RowDef,
  Size,
  TableSortModel,
} from "./types";
import Pagination from "./Pagination";
import classNames from "classnames";
import ColHeaderCell from "./ColHeaderCell";
import useFilter from "./hooks/useFilter";
import ToggleButton from "./ToggleButton";
import FilterOptionsTable from "./FilterOptionsTable/FilterOptionsTable";
import useFilterStateFromEditable from "./hooks/useFilterStateFromEditable";
import useAugmentedRows from "./hooks/useAugmentedRows";
import useSortedRows from "./hooks/useSortedRows";
import useDisplayRows from "./hooks/useDisplayRows";

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
}

const Grid: FC<GridProps> = ({
  rows,
  cols,
  pagination,
  sortModel,
  filterModel,
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

  const handleSetPageNum: (pageNum: number) => void = (pageNum) => {
    if (pagination === undefined) {
      return;
    }

    pagination.setCurrentPage(pageNum);
  };

  const handleSetPageSize: (event: ChangeEvent<HTMLSelectElement>) => void = (
    event,
  ) => {
    if (pagination === undefined) {
      return;
    }

    const newPageSizeIndex = Number(event.target.value);
    const newPageSize = pagination.pageSizeOptions[newPageSizeIndex];
    const maxPages = Math.ceil(filteredRows.length / newPageSize);
    pagination.setPageSizeIndex(newPageSizeIndex);
    if (pagination.currentPage > maxPages) {
      pagination.setCurrentPage(maxPages);
    }
  };

  const handleToggleFilterOptions = () => {
    setFilterOptionsVisible(!filterOptionsVisible);
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
      <table className="table" aria-rowcount={filteredRows.length + 1}>
        <thead>
          <tr aria-rowindex={1}>
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
                  ariaColIndex={index + 1}
                />
              );
            })}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row, index) => (
            <tr key={row.origIndex} aria-rowindex={index + 2} data-rowindex={row.origIndex}>
              {row.contents.map((value, index) => (
                <td key={index} aria-colindex={index + 1}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="d-flex justify-content-end gap-2">
          <div>
            <select
              className={classNames({
                "form-select": true,
                "form-select-lg": pagination.componentSize === "large",
                "form-select-sm": pagination.componentSize === "small",
              })}
              value={pagination.pageSizeIndex}
              aria-label="Number of Rows per Page"
              onChange={handleSetPageSize}
            >
              {pagination.pageSizeOptions.map((numRows, index) => (
                <option key={index} value={index}>
                  {numRows}
                </option>
              ))}
            </select>
          </div>
          <Pagination
            numPages={Math.ceil(
              rows.length /
                pagination.pageSizeOptions[pagination.pageSizeIndex],
            )}
            pageNum={pagination.currentPage}
            numButtons={pagination.maxPageButtons}
            setPageNum={handleSetPageNum}
            size={pagination.componentSize || "medium"}
          />
        </div>
      )}
    </div>
  );
};

export default Grid;

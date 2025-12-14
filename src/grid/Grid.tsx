"use client";

import { ChangeEvent, FC, useMemo } from "react";
import {
  ColDataTypeStrings,
  ColDef,
  ColSortModel,
  RowDef,
  Size,
  TableSortModel,
} from "./types";
import Pagination from "./Pagination";
import classNames from "classnames";
import ColHeaderCell from "./ColHeaderCell";

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
}

const getTypeComparator: (
  typeStr: ColDataTypeStrings,
) => (a: any, b: any) => number = (typeStr) => {
  if (typeStr === "date" || typeStr === "datetime") {
    return (a: Date, b: Date) => a.valueOf() - b.valueOf();
  }
  if (typeStr === "number") {
    return (a: number, b: number) => a - b;
  }
  return (a: string, b: string) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };
};

const getRowComparator: (
  comparator: (a: any, b: any) => number,
  fieldName: string,
) => (rowA: RowDef, rowB: RowDef) => number = (comparator, fieldName) => {
  return (rowA, rowB) => comparator(rowA[fieldName], rowB[fieldName]);
};

const Grid: FC<GridProps> = ({ rows, cols, pagination, sortModel }) => {
  const sortedRows: RowDef[] = useMemo(() => {
    if (!sortModel || !sortModel.sortColDef) {
      return rows;
    }

    const sortFieldName = sortModel.sortColDef.name;
    const sortOrder = sortModel.sortColDef.order;

    const sortColIndex = cols.findIndex(({ name }) => name === sortFieldName);
    if (sortColIndex < 0) {
      throw new Error(
        `The sortModel for the grid specifies that the data should be sorted based on a column named ${sortFieldName}, but it was not found among the column definitions.`,
      );
    }

    const typeStr = cols[sortColIndex].type;
    const ascComparator = getTypeComparator(typeStr);

    let rowComparator = getRowComparator(ascComparator, sortFieldName);
    if (sortOrder === "desc") {
      const descComparator: (a: any, b: any) => number = (a, b) =>
        ascComparator(a, b) * -1;
      rowComparator = getRowComparator(descComparator, sortFieldName);
    }
    return rows.slice().sort(rowComparator);
  }, [rows, cols, sortModel]);

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

  const displayRows: string[][] = useMemo(() => {
    const nameToIndex = new Map<string, number>();
    cols.forEach(({ name }, index) => {
      nameToIndex.set(name, index);
    });

    return currentPageRows.map((row, index) => {
      cols
        .map(({ name }) => name)
        .forEach((name) => {
          if (!(name in row)) {
            throw new Error(
              `Column definition specifies a property named "${name}", but it was not found in the row data object at index ${index}.`,
            );
          }
        });

      const displayRow: string[] = [];
      Object.keys(row).forEach((name) => {
        if (!nameToIndex.has(name)) {
          throw new Error(
            `Row data contains a property named "${name}", but it was not found among the column definitions.`,
          );
        }
        const index = nameToIndex.get(name)!;
        const formatter = cols[index].formatter;
        const typeString = cols[index].type;
        const value = row[name];
        if (formatter) {
          displayRow[index] = formatter(value);
          return;
        }
        if (typeString === "date") {
          displayRow[index] = (value as Date).toDateString();
          return;
        }
        if (typeString === "datetime") {
          displayRow[index] = (value as Date).toLocaleString();
          return;
        }
        if (typeString === "number") {
          displayRow[index] = (value as number).toLocaleString();
          return;
        }
        displayRow[index] = value as string;
      });
      return displayRow;
    });
  }, [currentPageRows, cols]);

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

    pagination.setPageSizeIndex(Number(event.target.value));
  };

  // Once this component implements selection state, and if such interactivity is enabled, (conditionally) change the
  // aria role to "grid".
  // Array index is okay for the key for rows until some type of feature involving changing the index of rows, such as
  // sorting or pagination, is implemented.
  return (
    <div>
      <table className="table">
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
            <tr key={index} aria-rowindex={index + 2}>
              {row.map((value, index) => (
                <td key={index} aria-colindex={index + 1}>{value}</td>
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

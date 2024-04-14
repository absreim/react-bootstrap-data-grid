"use client";

import { ChangeEvent, FC, useMemo } from "react";
import { ColDef, RowDef, Size } from "./types";
import Pagination from "./Pagination";
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
}

const Grid: FC<GridProps> = ({ rows, cols, pagination }) => {
  const currentPageRows = useMemo(() => {
    if (pagination === undefined) {
      return rows;
    }

    const { pageSizeOptions, pageSizeIndex, currentPage } = pagination;
    const pageSize = pageSizeOptions[pageSizeIndex];
    const lowerIndex = pageSize * (currentPage - 1);
    const upperIndex = lowerIndex + pageSize;
    return rows.slice(lowerIndex, upperIndex);
  }, [rows, pagination]);

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
              `Column definition specifies a property named "${name}",
              but it was no found in the row data object at index ${index}`,
            );
          }
        });

      const displayRow: string[] = [];
      Object.keys(row).forEach((name) => {
        if (!nameToIndex.has(name)) {
          throw new Error(`Row data contains a property named "${name}",
          but it was not found among the column definitions`);
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
          <tr>
            {cols.map(({ name, label }) => (
              <th key={name}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row, index) => (
            <tr key={index}>
              {row.map((value, index) => (
                <td key={index}>{value}</td>
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

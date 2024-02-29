"use client";

import { FC, useMemo } from "react";
import { ColDef, RowDef } from "./types";

interface Props {
  rows: RowDef[];
  cols: ColDef[];
}

const Grid: FC<Props> = ({ rows, cols }) => {
  const displayRows: string[][] = useMemo(() => {
    const nameToIndex = new Map<string, number>();
    cols.forEach(({ name }, index) => {
      nameToIndex.set(name, index);
    });

    return rows.map((row, index) => {
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
  }, [rows, cols]);

  // Once this component implements selection state, and if such interactivity is enabled, (conditionally) change the
  // aria role to "grid".
  // Array index is okay for the key for rows until some type of feature involving changing the index of rows, such as
  // sorting or pagination, is implemented.
  return (
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
  );
};

export default Grid;

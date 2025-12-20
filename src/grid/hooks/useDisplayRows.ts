import { AugRowDef, FormattedRow, ColDef} from "../types";
import { useMemo } from "react";

const useDisplayRows: (
  currentPageRows: AugRowDef[],
  cols: ColDef[],
) => FormattedRow[] = (currentPageRows, cols) =>
  useMemo(() => {
    const nameToIndex = new Map<string, number>();
    cols.forEach(({ name }, index) => {
      nameToIndex.set(name, index);
    });

    return currentPageRows.map((row, index) => {
      cols
        .map(({ name }) => name)
        .forEach((name) => {
          if (!(name in row.data)) {
            throw new Error(
              `Column definition specifies a property named "${name}", but it was not found in the row data object at index ${index}.`,
            );
          }
        });

      const displayRow: string[] = [];
      Object.keys(row.data).forEach((name) => {
        if (!nameToIndex.has(name)) {
          console.error(
            `Warning: row data contains a property named "${name}", but it was not found among the column definitions.`,
          );
          return;
        }

        const index = nameToIndex.get(name)!;
        const formatter = cols[index].formatter;
        const typeString = cols[index].type;
        const value = row.data[name];
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
      return { contents: displayRow, origIndex: row.meta.origIndex };
    });
  }, [currentPageRows, cols]);

export default useDisplayRows;

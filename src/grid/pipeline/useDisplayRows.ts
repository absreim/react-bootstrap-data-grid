import {
  AugRowDef,
  FormattedRow,
  ColDef,
  ColDataType,
  ColDataTypeStrings,
} from "../types";
import { useMemo } from "react";
import { CellData } from "../editing/types";

const getFormattedValue: (
  value: ColDataType,
  formatter: ((value: any) => string) | undefined,
  typeString: ColDataTypeStrings,
) => string = (value, formatter, typeString) => {
  if (formatter) {
    return formatter(value);
  }
  if (typeString === "date") {
    return (value as Date).toDateString();
  }
  if (typeString === "datetime") {
    return (value as Date).toLocaleString();
  }
  if (typeString === "number") {
    return (value as number).toLocaleString();
  }
  return value as string;
};

const useDisplayRows: (
  currentPageRows: AugRowDef[],
  cols: ColDef[],
  ariaColIndexOffset: number,
) => FormattedRow[] = (currentPageRows, cols, ariaColIndexOffset) =>
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

      const displayRow: CellData[] = [];
      Object.keys(row.data).forEach((name) => {
        if (!nameToIndex.has(name)) {
          console.error(
            `Warning: row data contains a property named "${name}", but it was not found among the column definitions.`,
          );
          return;
        }

        const index = nameToIndex.get(name)!;
        const col = cols[index];
        const formatter = col.formatter;
        const typeString = col.type;
        const value = row.data[name];

        displayRow[index] = {
          fieldName: cols[index].name,
          value,
          type: typeString,
          ariaColIndex: index + 1 + ariaColIndexOffset,
          formattedValue: getFormattedValue(value, formatter, typeString),
          label: cols[index].label,
        };
      });
      return { contents: displayRow, origIndex: row.meta.origIndex };
    });
  }, [currentPageRows, cols, ariaColIndexOffset]);

export default useDisplayRows;

import { ColDataTypeStrings, ColDef, RowDef } from "../types";
import { FormattedExportRow } from "./types";
import { dateToDatetimeInputStr, dateToInputStr } from "../util/datetime";
import Papa from "papaparse";
import { useCallback, useMemo } from "react";

export interface UseExportFnsParams {
  rows: RowDef[];
  cols: ColDef[];
  filteredRows?: RowDef[];
  currentPageRows?: RowDef[];
}

export type Stage = "original" | "filtered" | "paged";
export type FileType = "csv" | "json";
export type ExportFn = (
  stage: Stage,
  fileType: FileType,
  formatted: boolean,
) => void;

export interface ExportFnInfo {
  exportFn: ExportFn;
  formattersExist: boolean;
  filteringEnabled: boolean;
  paginationEnabled: boolean;
  rowCounts: {
    total: number;
    filtered?: number;
    currentPage?: number;
  };
}

const downloadFile: (data: BlobPart, filename: string, type: string) => void = (
  data,
  filename,
  type,
) => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 0);
};

const getDefaultFormatter: (
  type: ColDataTypeStrings,
) => (a: any) => number | string = (type: ColDataTypeStrings) => {
  switch (type) {
    case "date":
      return dateToInputStr;
    case "datetime":
      return dateToDatetimeInputStr;
    default:
      return (a: any) => a;
  }
};

const applyFormatters: (
  rows: RowDef[],
  cols: ColDef[],
  defaultOnly: boolean,
) => FormattedExportRow[] = (rows, cols, defaultOnly) => {
  const colToFormatter: Map<string, (value: any) => string> = cols.reduce(
    (map, { name, formatter, type }) => {
      const normalizedFormatter =
        (!defaultOnly && formatter) || getDefaultFormatter(type);
      map.set(name, normalizedFormatter);
      return map;
    },
    new Map(),
  );

  return rows.map(({ id, data }) => ({
    id,
    data: Object.keys(data).reduce(
      (newData, name) => {
        const formatter = colToFormatter.get(name)!;
        newData[name] = formatter(data[name]);
        return newData;
      },
      {} as Record<string, string | number>,
    ),
  }));
};

const flattenExportRows: (
  rows: FormattedExportRow[],
) => Record<string, string | number>[] = (rows) =>
  rows.map(({ id, data }) => ({ id, ...data }));

const exportJson: (
  rows: RowDef[],
  cols: ColDef[],
  useDefaultFormatters: boolean,
) => void = (rows, cols, useDefaultFormatters) => {
  const formattedRows = applyFormatters(rows, cols, useDefaultFormatters);
  const json = JSON.stringify(formattedRows, null, 2);
  downloadFile(json, "export.json", "application/json");
};

const exportCsv: (
  rows: RowDef[],
  cols: ColDef[],
  useDefaultFormatters: boolean,
) => void = (rows, cols, useDefaultFormatters) => {
  const formattedRows = applyFormatters(rows, cols, useDefaultFormatters);
  const flattenedRows = flattenExportRows(formattedRows);
  const csv = Papa.unparse(flattenedRows, { header: true });
  downloadFile(csv, "export.csv", "text/csv");
};

const useExportFn: (params: UseExportFnsParams) => ExportFnInfo = ({
  rows,
  cols,
  filteredRows,
  currentPageRows,
}) => {
  const formattersExist = useMemo(
    () => cols.reduce((prev, { formatter }) => prev || !!formatter, false),
    [cols],
  );

  const exportFn: (
    stage: Stage,
    fileType: FileType,
    formatted: boolean,
  ) => void = useCallback(
    (stage, fileType, formatted) => {
      if (stage === "filtered" && !filteredRows) {
        throw Error(
          "Cannot export filtered rows because filtering is not enabled for this grid",
        );
      }

      if (stage === "paged" && !currentPageRows) {
        throw Error(
          "Cannot export current page of rows because paging is not enabled for this grid",
        );
      }

      if (formatted && !formattersExist) {
        throw Error(
          "Cannot export formatted rows because formatters are not defined for this grid",
        );
      }

      const exportRows = (() => {
        switch (stage) {
          case "filtered":
            return filteredRows!;
          case "paged":
            return currentPageRows!;
          default:
            return rows;
        }
      })();

      if (fileType === "csv") {
        exportCsv(exportRows, cols, !formatted);
        return;
      }

      exportJson(exportRows, cols, !formatted);
    },
    [cols, currentPageRows, filteredRows, formattersExist, rows],
  );

  return useMemo(
    () => ({
      exportFn,
      formattersExist,
      paginationEnabled: !!currentPageRows,
      filteringEnabled: !!filteredRows,
      rowCounts: {
        total: rows.length,
        filtered: filteredRows?.length,
        currentPage: currentPageRows?.length,
      },
    }),
    [currentPageRows, exportFn, filteredRows, formattersExist, rows.length],
  );
};

export default useExportFn;

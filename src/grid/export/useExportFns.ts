import { ColDataTypeStrings, ColDef, RowDef } from "../types";
import { FormattedExportRow } from "./types";
import { dateToDatetimeInputStr, dateToInputStr } from "../util/datetime";

export interface UseExportFnsParams {
  rows: RowDef[];
  cols: ColDef[];
  filteredRows?: RowDef[];
  currentPageRows?: RowDef[];
}

export interface SingleStageFns {
  exportCsv: (formatted: boolean) => void;
  exportJson: (formatted: boolean) => void;
}

export interface ExportStageRecord<V> {
  origRows: V;
  filteredRows?: V;
  currentPageRows?: V;
}

export type ExportStagesFns = ExportStageRecord<SingleStageFns>

export interface ExportFns {
  formatted?: ExportStagesFns; // absence implies no formatters defined
  unformatted: ExportStagesFns;
  rowCount: ExportStageRecord<number>;
}

const downloadFile: (data: BlobPart, filename: string, type: string) => void = (
  data,
  filename,
  type = "text/plain",
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

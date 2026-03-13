import FilterOptionsTable, { FilterOptionsTableProps } from "../filtering/FilterOptionsTable";
import { ToolbarInterfaces } from "./types";
import { useMemo } from "react";
import ExportForm, { ExportFormProps } from "../export/ExportForm";
import { ExportFnInfo } from "../export/useExportFn";

export interface InterfaceParams {
  filtering?: FilterOptionsTableProps;
  exporting?: ExportFnInfo
}

const useInterfaces: (params: InterfaceParams) => ToolbarInterfaces = ({ filtering, exporting }: InterfaceParams) => {
  return useMemo(
    () => ({
      filtering: filtering ? <FilterOptionsTable {...filtering} /> : undefined,
      exporting: exporting ? <ExportForm exportFnInfo={exporting} /> : undefined,
    }),
    [exporting, filtering],
  );
}

export default useInterfaces;

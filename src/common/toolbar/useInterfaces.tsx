import { FilterState } from "../filtering/internalTypes";
import { EditableFilterState } from "../filtering/types";
import {
  ExportFormStyleModel,
  FilterInputTableStyleModel,
} from "../../table";
import { ExportFnInfo } from "../export/useExportFn";
import { ToolbarInterfaces } from "./internalTypes";
import { useCallback } from "react";
import FilterOptionsTable from "../filtering/FilterOptionsTable";
import ExportForm from "../export/ExportForm";

export interface InterfacePropParams {
  exportParams?: {
    exportFnInfo: ExportFnInfo;
    styleModel?: ExportFormStyleModel;
  };
  filterParams?: {
    filterState: FilterState;
    setFilterState: (filterState: EditableFilterState) => void;
    caption?: string;
    styleModel?: FilterInputTableStyleModel;
  };
}

const useInterfaces: (
  params: InterfacePropParams,
) => (closeCallback: () => void ) => ToolbarInterfaces = ({
  exportParams,
  filterParams,
}) => {
  const generatorFn = useCallback(
    (closeUiCallback: () => void) => ({
      exporting: exportParams && {
        ...exportParams,
        closeCallback: closeUiCallback,
      },
      filtering: filterParams && {
        ...filterParams,
        closeFormCallback: closeUiCallback,
      },
    }),
    [exportParams, filterParams],
  );

  return useCallback(
    (closeCallback) => {
      const props = generatorFn(closeCallback);
      const { exporting, filtering } = props;

      return {
        filtering: filtering ? (
          <FilterOptionsTable {...filtering} />
        ) : undefined,
        exporting: exporting ? <ExportForm {...exporting} /> : undefined,
      };
    },
    [generatorFn],
  );
};

export default useInterfaces;

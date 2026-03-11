import FilterOptionsTable, { FilterOptionsTableProps } from "../filtering/FilterOptionsTable";
import { ToolbarInterfaces } from "./types";
import { useMemo } from "react";

export interface InterfaceParams {
  filtering?: FilterOptionsTableProps;
}

const useInterfaces: (params: InterfaceParams) => ToolbarInterfaces = ({ filtering }: InterfaceParams) => {
  return useMemo(() => ({
    filtering: filtering ? <FilterOptionsTable {...filtering} /> : undefined
  }), [filtering])
}

export default useInterfaces;

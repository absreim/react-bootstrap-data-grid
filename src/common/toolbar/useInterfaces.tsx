import FilterOptionsTable from "../filtering/FilterOptionsTable";
import { InterfacePropGenerator, ToolbarInterfaces } from "./types";
import { useMemo } from "react";
import ExportForm from "../export/ExportForm";

const useInterfaces: (
  gen: InterfacePropGenerator,
) => (closeCallback: () => void) => ToolbarInterfaces = (gen) => {
  return useMemo(
    () => (closeCallback) => {
      const props = gen(closeCallback);
      const { exporting, filtering } = props;

      return {
        filtering: filtering ? (
          <FilterOptionsTable {...filtering} />
        ) : undefined,
        exporting: exporting ? <ExportForm {...exporting} /> : undefined,
      };
    },
    [gen],
  );
};

export default useInterfaces;

import {
  EditableTableFilterState,
  FilterModel,
  NormalizedTableFilterModel,
} from "../../filtering/types";
import { ColDef } from "../../types";
import { useState } from "react";

const generateEmptyFilterState: (cols: ColDef[]) => EditableTableFilterState = (
  cols,
) => {
  const filterState: EditableTableFilterState = {};
  cols.forEach(({ type, name }) => {
    switch (type) {
      case "string": {
        filterState[name] = {
          type: "string",
          enabled: false,
          scheme: "contains",
          searchString: "",
        };
        break;
      }
      case "number": {
        filterState[name] = {
          type: "number",
          enabled: false,
          scheme: "greaterOrEqual",
          numValue: null,
        };
        break;
      }
      default: {
        filterState[name] = {
          type,
          enabled: false,
          scheme: "startFrom",
          startDate: null,
        };
      }
    }
  });

  return filterState;
};

const useFilterStateStore: (
  filterModel: FilterModel | undefined,
  cols: ColDef[],
) => NormalizedTableFilterModel | null = (filterModel, cols) => {
  // Initial states being from prop values means that should uncontrolled
  // FilterModel starting values change, the changes will not take effect
  // unless the Grid is remounted. The documentation for this and other
  // uncontrolled features should indicate this fact and recommend using
  // controlled modes if this behavior is unacceptable.
  const [internalFilterState, setInternalFilterState] =
    useState<EditableTableFilterState>(
      filterModel?.tableFilterState || generateEmptyFilterState(cols),
    );

  if (!filterModel) {
    return null;
  }

  return filterModel.type === "uncontrolled"
    ? {
        tableFilterState: internalFilterState,
        setTableFilterState: setInternalFilterState,
      }
    : {
        tableFilterState: filterModel.tableFilterState,
        setTableFilterState: filterModel.setTableFilterState,
      };
};

export default useFilterStateStore;

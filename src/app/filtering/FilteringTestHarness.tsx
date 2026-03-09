import Grid, {
  ColDef,
  EditableTableFilterState,
  FilterModel,
  RowDef,
} from "@/grid";
import { FC, useMemo, useState } from "react";

interface FilteringTestHarnessProps {
  cols: ColDef[];
  rows: RowDef[];
  initialFilterState: EditableTableFilterState;
  controlled: boolean;
}

const FilteringTestHarness: FC<FilteringTestHarnessProps> = ({
  cols,
  rows,
  initialFilterState,
  controlled
}) => {
  const [filterState, setFilterState] = useState(initialFilterState);
  const filterModel: FilterModel = useMemo(
    () => (controlled ? {
      tableFilterState: filterState,
      setTableFilterState: setFilterState,
    } : {
      type: "uncontrolled",
      tableFilterState: initialFilterState
    }),
    [controlled, filterState, initialFilterState],
  );

  return <Grid rows={rows} cols={cols} filterModel={filterModel} />;
};

export default FilteringTestHarness;

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
}

const FilteringTestHarness: FC<FilteringTestHarnessProps> = ({
  cols,
  rows,
  initialFilterState,
}) => {
  const [filterState, setFilterState] = useState(initialFilterState);
  const filterModel: FilterModel = useMemo(
    () => ({
      tableFilterState: filterState,
      setTableFilterState: setFilterState,
    }),
    [filterState],
  );

  return <Grid rows={rows} cols={cols} filterModel={filterModel} />;
};

export default FilteringTestHarness;

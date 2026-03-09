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
  caption?: string;
}

const FilteringTestHarness: FC<FilteringTestHarnessProps> = ({
  cols,
  rows,
  initialFilterState,
  controlled,
  caption
}) => {
  const [filterState, setFilterState] = useState(initialFilterState);
  const filterModel: FilterModel = useMemo(
    () =>
      controlled
        ? {
            tableFilterState: filterState,
            setTableFilterState: setFilterState,
            filterTableCaption: caption,
          }
        : {
            type: "uncontrolled",
            tableFilterState: initialFilterState,
            filterTableCaption: caption,
          },
    [caption, controlled, filterState, initialFilterState],
  );

  return <Grid rows={rows} cols={cols} filterModel={filterModel} />;
};

export default FilteringTestHarness;

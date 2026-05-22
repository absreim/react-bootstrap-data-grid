import Grid, {
  ColDef,
  EditableTableFilterState,
  FilterModel,
  RowDef,
} from "@/grid";
import { FC, useMemo, useState } from "react";
import GridPro from "@/grid-pro";

interface FilteringTestHarnessProps {
  cols: ColDef[];
  rows: RowDef[];
  initialFilterState: EditableTableFilterState;
  controlled: boolean;
  caption?: string;
  useToolbar?: boolean;
  pro?: boolean;
}

const FilteringTestHarness: FC<FilteringTestHarnessProps> = ({
  cols,
  rows,
  initialFilterState,
  controlled,
  caption,
  useToolbar,
  pro
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

  if (pro) {
    return (
      <GridPro
        rows={rows}
        cols={cols}
        filterModel={filterModel}
        useToolbar={useToolbar}
      />
    );
  }

  return (
    <Grid
      rows={rows}
      cols={cols}
      filterModel={filterModel}
      useToolbar={useToolbar}
    />
  );
};

export default FilteringTestHarness;

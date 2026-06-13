import Table, {
  ColDef,
  EditableTableFilterState,
  FilterModel,
  RowDef,
} from "@/table";
import { FC, useMemo, useState } from "react";
import TablePro from "@/table-pro";

interface FilteringTestHarnessProps {
  cols: ColDef[];
  rows: RowDef[];
  initialFilterState: EditableTableFilterState;
  controlled: boolean;
  caption?: string;
  pro?: boolean;
}

const FilteringTestHarness: FC<FilteringTestHarnessProps> = ({
  cols,
  rows,
  initialFilterState,
  controlled,
  caption,
  pro,
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
    return <TablePro rows={rows} cols={cols} filterModel={filterModel} />;
  }

  return <Table rows={rows} cols={cols} filterModel={filterModel} />;
};

export default FilteringTestHarness;

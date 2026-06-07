"use client";

import Grid, {
  EditableTableFilterState,
  FilterModel,
  StyleModel,
} from "@/grid";
import { FC, useMemo, useState } from "react";
import { cols, rows } from "@/app/styling/multitype-test-data";
import GridPro from "@/grid-pro";

export interface FilterStylingTestHarnessProps {
  styleModel: StyleModel;
  pro?: boolean;
}

const FilterStylingTestHarness: FC<FilterStylingTestHarnessProps> = ({
  pro, styleModel
}) => {
  const [tableFilterState, setTableFilterState] =
    useState<EditableTableFilterState>({
      strCol: {
        type: "string",
        scheme: "startsWith",
        searchString: "",
        enabled: false,
      },
      numCol: {
        type: "number",
        scheme: "greaterOrEqual",
        numValue: 2,
        enabled: true,
      },
      dateCol: {
        type: "date",
        scheme: "between",
        startDate: null,
        endDate: null,
        enabled: false,
      },
      datetimeCol: {
        type: "datetime",
        scheme: "endAt",
        endDate: null,
        enabled: false,
      },
    });
  const filterModel: FilterModel = useMemo(
    () => ({
      tableFilterState,
      setTableFilterState,
      filterTableCaption: "filter table test caption",
    }),
    [tableFilterState],
  );

  if (pro) {
    return (
      <GridPro
        rows={rows}
        cols={cols}
        filterModel={filterModel}
        caption="main table test caption"
        styleModel={styleModel}
      />
    );
  }

  return (
    <Grid
      rows={rows}
      cols={cols}
      filterModel={filterModel}
      caption="main table test caption"
      styleModel={styleModel}
    />
  );
};

export default FilterStylingTestHarness;

"use client";

import Grid, { ColDef, EditableTableFilterState, FilterModel, RowDef } from "@/grid";
import { FC, useState } from "react";

const cols: ColDef[] = [
  {
    type: "number",
    name: "number",
    label: "Number"
  },
  {
    type: "string",
    name: "version",
    label: "Version"
  },
  {
    type: "date",
    name: "date",
    label: "Date"
  }
]

const rows: RowDef[] = [
  {
    number: 7,
    version: "4.1.1.5849914",
    date: new Date("2024-09-05")
  },
  {
    number: 6,
    version: "4.1.1.4763283",
    date: new Date("2024-02-16")
  },
  {
    number: 5,
    version: "4.1.1.4061076",
    date: new Date("2023-11-30")
  },
  {
    number: 4,
    version: "4.1.1.3882084",
    date: new Date("2023-11-02")
  },
  {
    number: 3,
    version: "4.1.1.3732833",
    date: new Date("2023-09-22")
  },
  {
    number: 2,
    version: "4.1.1.3686210",
    date: new Date("2023-08-31")
  },
  {
    number: 1,
    version: "4.1.1.3669438",
    date: new Date("2023-08-25")
  },
  {
    number: 0,
    version: "4.1.1.3622274",
    date: new Date("2023-08-03")
  }
]

const SampleFilteredGrid: FC = () => {
  const [tableFilterState, setTableFilterState] = useState<EditableTableFilterState>({
    number: {
      type: "number",
      scheme: "lessOrEqual",
      numValue: 4,
      enabled: true
    },
    version: {
      type: "string",
      scheme: "startsWith",
      searchString: "4.1.1.3",
      enabled: true
    },
    date: {
      type: "date",
      scheme: "startFrom",
      startDate: new Date("2023-08-15"),
      enabled: true
    }
  })

  const filterModel: FilterModel = { tableFilterState, setTableFilterState }

  return <Grid rows={rows} cols={cols} filterModel={filterModel} />
}

export default SampleFilteredGrid;

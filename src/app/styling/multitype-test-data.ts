import { ColDef, dateToDatetimeInputStr, dateToInputStr, RowDef } from "@/grid";

export const cols: ColDef[] = [
  {
    name: "strCol",
    type: "string",
    label: "String Column",
  },
  {
    name: "numCol",
    type: "number",
    label: "Number Column",
  },
  {
    name: "dateCol",
    type: "date",
    label: "Date Column",
    formatter: dateToInputStr,
  },
  {
    name: "datetimeCol",
    type: "date",
    label: "Datetime Column",
    formatter: dateToDatetimeInputStr,
  },
];

export const rows: RowDef[] = [
  {
    id: 0,
    data: {
      strCol: "First Row",
      numCol: 1,
      dateCol: new Date("2026-01-01"),
      datetimeCol: new Date("2026-01-01T01:00"),
    },
  },
  {
    id: 1,
    data: {
      strCol: "Second Row",
      numCol: 2,
      dateCol: new Date("2026-01-02"),
      datetimeCol: new Date("2026-01-02T02:00"),
    },
  },
  {
    id: 2,
    data: {
      strCol: "Third Row",
      numCol: 3,
      dateCol: new Date("2026-01-03"),
      datetimeCol: new Date("2026-01-03T03:00"),
    },
  },
  {
    id: 3,
    data: {
      strCol: "Fourth Row",
      numCol: 4,
      dateCol: new Date("2026-01-04"),
      datetimeCol: new Date("2026-01-04T04:00"),
    },
  },
  {
    id: 4,
    data: {
      strCol: "Fifth Row",
      numCol: 5,
      dateCol: new Date("2026-01-05"),
      datetimeCol: new Date("2026-01-05T05:00"),
    },
  },
];

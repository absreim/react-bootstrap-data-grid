import { ColDef, dateToDatetimeInputStr, RowDef } from "@/common";

export const cols: ColDef[] = [
  {
    type: "string",
    name: "strCol",
    label: "String Column",
    width: 150,
  },
  {
    type: "number",
    name: "numCol",
    label: "Number Column",
  },
  {
    type: "date",
    name: "date",
    label: "Date Column",
    formatter: (date: Date) => String(date.valueOf()),
    width: 200,
  },
  {
    type: "datetime",
    name: "datetime",
    label: "Datetime Column",
    formatter: dateToDatetimeInputStr,
    width: 200,
  },
];

export interface TestRow {
  strCol: string;
  numCol: number;
  date: Date;
  datetime: Date;
}

export const rows: RowDef<TestRow>[] = [
  {
    id: 0,
    data: {
      strCol: "first row string",
      numCol: 1,
      date: new Date("2026-01-01"),
      datetime: new Date("2026-01-01T01:01"),
    },
  },
  {
    id: 1,
    data: {
      strCol: "second row string",
      numCol: 2,
      date: new Date("2026-02-02"),
      datetime: new Date("2026-02-02T02:02"),
    },
  },
  {
    id: 2,
    data: {
      strCol: "third row string",
      numCol: 3,
      date: new Date("2026-03-03"),
      datetime: new Date("2026-03-03T03:03"),
    },
  },
  {
    id: 3,
    data: {
      strCol: "fourth row string",
      numCol: 4,
      date: new Date("2026-04-04"),
      datetime: new Date("2026-04-04T04:04"),
    },
  },
  {
    id: 4,
    data: {
      strCol: "fifth row string",
      numCol: 5,
      date: new Date("2026-05-05"),
      datetime: new Date("2026-05-05T05:05"),
    },
  },
];

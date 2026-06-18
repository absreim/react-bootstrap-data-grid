import { ColDef, dateToDatetimeInputStr, RowDef } from "@/common";
import { BasicTestRow } from "@/test-tools/types";

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

export const generateBasicTestRows: (
  numRows: number,
) => RowDef<BasicTestRow>[] = (numRows) =>
  new Array(numRows).fill(0).map((_, index) => {
    const getSeqDesc: (ordinal: number) => string = (ordinal) => {
      if (ordinal === 1) {
        return "1st";
      }

      if (ordinal === 2) {
        return "2nd";
      }

      if (ordinal === 3) {
        return "3rd";
      }

      return `${ordinal}th`;
    };

    const getMonthStr: (index: number) => string = (index) => {
      const month = (index % 12) + 1;
      if (month < 10) {
        return `0${month}`;
      }

      return String(month);
    };

    const ordinal = index + 1;
    const year = 2026 + Math.floor(index / 12);
    const monthStr = getMonthStr(index);
    const seqDesc = getSeqDesc(ordinal);

    return {
      id: index,
      data: {
        strCol: `${seqDesc} row string`,
        numCol: ordinal,
        date: new Date(`${year}-${monthStr}-${monthStr}`),
        datetime: new Date(
          `${year}-${monthStr}-${monthStr}T${monthStr}:${monthStr}`,
        ),
      },
    };
  });

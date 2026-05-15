"use client";

import { dateToDatetimeInputStr, dateToInputStr, RowDef } from "@/grid";
import GridPro, { ProColDef, reorderRows } from "@/grid-pro";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { ReorderCallback } from "@/grid-pro/reorder/types";

interface TestRow {
  strCol: string;
  numCol: number;
  dateCol: Date;
  datetimeCol: Date;
}

interface DragTargetRectInfo {
  left: number;
  top: number;
  height: number;
  width: number;
  rowId: string;
  upper: boolean;
}

const initRows: RowDef<TestRow>[] = [
  {
    id: "x",
    data: {
      strCol: "First Row",
      numCol: 1,
      dateCol: new Date("2026-01-01"),
      datetimeCol: new Date("2026-01-01T01:00"),
    },
  },
  {
    id: "y",
    data: {
      strCol: "Second Row",
      numCol: 2,
      dateCol: new Date("2026-01-02"),
      datetimeCol: new Date("2026-01-02T02:00"),
    },
  },
  {
    id: "z",
    data: {
      strCol: "Third Row",
      numCol: 3,
      dateCol: new Date("2026-01-03"),
      datetimeCol: new Date("2026-01-03T03:00"),
    },
  },
];

const cols: ProColDef[] = [
  {
    name: "strCol",
    label: "String Column",
    type: "string",
  },
  {
    name: "numCol",
    label: "Number Column",
    type: "number",
  },
  {
    name: "dateCol",
    label: "Date Column",
    type: "date",
    formatter: dateToInputStr,
  },
  {
    name: "datetimeCol",
    label: "Datetime Column",
    type: "datetime",
    formatter: dateToDatetimeInputStr,
  },
];

const ReorderTestHarness: FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(initRows);
  const reorderCallback: ReorderCallback = useCallback(
    (id, destIndex) => {
      const newRows = reorderRows(rows, id, destIndex);
      setRows(newRows);
    },
    [rows],
  );

  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    const trs = divRef.current.querySelectorAll(":scope tbody tr") as NodeListOf<HTMLTableRowElement>;
    const dragTargets = Array.from(trs).map((tr) => {
      const boundingRect = tr.getBoundingClientRect();
      const upperHalfCoords = {
        left: boundingRect.left + 100,
        top: Math.ceil(boundingRect.top),
        height: Math.floor(boundingRect.height / 2) - 1,
        width: 100,
        rowId: tr.getAttribute("data-rowid")!,
        upper: true,
      }
      const lowerHalfCoords = {
        left: boundingRect.left + 100,
        top: Math.ceil(boundingRect.top + boundingRect.height / 2 + 1),
        height: Math.floor(boundingRect.height / 2) - 1,
        width: 100,
        rowId: tr.getAttribute("data-rowid")!,
        upper: false,
      };

      function createTargetDiv(info: DragTargetRectInfo) {
        const targetDiv = document.createElement("div");
        targetDiv.style.position = "fixed";
        targetDiv.style.left = `${info.left}px`;
        targetDiv.style.top = `${info.top}px`;
        targetDiv.style.height = `${info.height}px`;
        targetDiv.style.width = `${info.width}px`;
        targetDiv.style.zIndex = "2";
        targetDiv.style.background = "gray";
        targetDiv.style.opacity = "50%";
        targetDiv.setAttribute(
          "data-testid",
          `drag-target-${info.rowId}-${info.upper ? "upper" : "lower"}`,
        );
        return targetDiv;
      }

      return [
        createTargetDiv(upperHalfCoords),
        createTargetDiv(lowerHalfCoords),
      ];
    }).flat();
    dragTargets.forEach((div) => divRef.current!.appendChild(div));

    return () => {
      dragTargets.forEach((div) => div.remove());
    }
  }, []);

  return (
    <div ref={divRef}>
      <GridPro
        rows={rows}
        cols={cols}
        reorder={{ callback: reorderCallback }}
      />
    </div>
  );
};

export default ReorderTestHarness;

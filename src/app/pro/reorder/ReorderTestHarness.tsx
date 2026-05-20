"use client";

import GridPro, {
  ProColDef,
  reorderRows,
  dateToDatetimeInputStr,
  dateToInputStr,
  RowDef,
  RowId,
  SelectModel,
} from "@/grid-pro";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    sortable: true,
  },
  {
    name: "numCol",
    label: "Number Column",
    type: "number",
    sortable: true,
  },
  {
    name: "dateCol",
    label: "Date Column",
    type: "date",
    formatter: dateToInputStr,
    sortable: true,
  },
  {
    name: "datetimeCol",
    label: "Datetime Column",
    type: "datetime",
    formatter: dateToDatetimeInputStr,
    sortable: true,
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

    const trs = divRef.current.querySelectorAll(
      ":scope tbody tr",
    ) as NodeListOf<HTMLTableRowElement>;
    const dragTargets = Array.from(trs)
      .map((tr) => {
        const boundingRect = tr.getBoundingClientRect();
        const upperHalfCoords = {
          left: boundingRect.left + 100,
          top: Math.ceil(boundingRect.top),
          height: Math.floor(boundingRect.height / 2) - 1,
          width: 100,
          rowId: tr.getAttribute("data-rowid")!,
          upper: true,
        };
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
      })
      .flat();
    dragTargets.forEach((div) => divRef.current!.appendChild(div));

    return () => {
      dragTargets.forEach((div) => div.remove());
    };
  }, []);

  const [selected, setSelected] = useState<RowId[]>(["x"]);
  const selectModel: SelectModel = useMemo(
    () => ({
      type: "multi",
      mode: "both",
      selected,
      setSelected
    }),
    [selected],
  );

  return (
    <div ref={divRef}>
      <GridPro
        useToolbar
        sortModel={{
          type: "uncontrolled",
          initialSortColDef: null,
        }}
        filterModel={{
          type: "uncontrolled",
        }}
        rows={rows}
        cols={cols}
        reorder={{ callback: reorderCallback }}
        selectModel={selectModel}
      />
    </div>
  );
};

export default ReorderTestHarness;

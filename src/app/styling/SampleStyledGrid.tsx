"use client";

import Grid, { ColDef, RowDef, StyleModel, TableStyleModel } from "@/grid";
import { FC, useMemo } from "react";

const cols: ColDef[] = [
  {
    type: "string",
    name: "variant",
    label: "Variant",
  },
  {
    type: "string",
    name: "color",
    label: "Color",
  },
  {
    type: "string",
    name: "alignment",
    label: "Alignment",
  },
  {
    type: "string",
    name: "placeholderText",
    label: "Placeholder Text",
  },
];

type PartialRow = Record<"variant" | "alignment", string>;
const partialRows: PartialRow[] = [
  {
    variant: "primary",
    alignment: "baseline",
  },
  {
    variant: "secondary",
    alignment: "top",
  },
  {
    variant: "success",
    alignment: "middle",
  },
  {
    variant: "danger",
    alignment: "bottom",
  },
  {
    variant: "warning",
    alignment: "text-top",
  },
  {
    variant: "info",
    alignment: "text-bottom",
  },
  {
    variant: "light",
    alignment: "baseline",
  },
  {
    variant: "dark",
    alignment: "top",
  },
];

const placeholderText =
  "This is placeholder text intended to take up space in order to demonstrate " +
  "the effects of vertical alignment. If cell being vertically aligned is the " +
  "tallest column for a row, then vertical alignment will have no effect. " +
  "There should be enough text here to demonstrate the effect even at the " +
  "largest breakpoint."

const getComputedTableColors: (variants: string[]) => string[] = (variants) => {
  const table: HTMLTableElement = document.createElement("table");
  table.className = "table";
  table.style.position = "absolute";
  table.style.visibility = "hidden";

  const tbody = table.createTBody();

  variants.forEach((variant) => {
    const tr: HTMLTableRowElement = document.createElement("tr");
    tr.className = `table-${variant}`;

    const td: HTMLTableCellElement = document.createElement("td");

    tr.appendChild(td);
    tbody.appendChild(tr);
  });

  document.body.appendChild(table);

  const colors = Array.from(tbody.children).map((tr) => {
    const td = tr.firstElementChild!;
    return getComputedStyle(td).backgroundColor;
  });

  table.remove();
  return colors;
};

const getRows: (partialRows: PartialRow[], colors: string[]) => RowDef[] = (
  partialRows,
  colors,
) =>
  partialRows.map((_, index) => ({
    variant: partialRows[index].variant,
    color: colors[index],
    alignment: partialRows[index].alignment,
    placeholderText: placeholderText,
  }));

const tableStyleModel: TableStyleModel = {
  tbodyTr: (origIndex) => [`table-${partialRows[origIndex].variant}`],
  tbodyTd: (origRowIndex, _, colIndex) =>
    colIndex === 2 ? [`align-${partialRows[origRowIndex].alignment}`] : [],
};

const styleModel: StyleModel = {
  mainTableStyleModel: tableStyleModel,
};

const SampleStyledGrid: FC = () => {
  const rows = useMemo(() => {
    const variants = partialRows.map(({ variant }) => variant);
    const colors = getComputedTableColors(variants);
    return getRows(partialRows, colors);
  }, []);

  return <Grid rows={rows} cols={cols} styleModel={styleModel} />;
};

export default SampleStyledGrid;

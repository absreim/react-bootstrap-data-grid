"use client";

import { FC, useMemo } from "react";
import { TableProps } from "./types";
import InternalTable from "./InternalTable";
import { ColSortModel } from "../common/sorting/types";
import ColHeaderCell from "./main/ColHeaderCell";
import useCombinedPipeline from "../common/pipeline/useCombinedPipeline";
import useGridSelectionFns from "../common/pipeline/useGridSelectionFns";
import useGetInputStrSubmitCallback from "../common/pipeline/useGetInputStrSubmitCallback";
import { ColNameToWidth } from "../common/pipeline/types";
import useAugFormattedRows from "../common/pipeline/useAugFormattedRows";
import BodyRows from "./main/BodyRows";
import { AugFormattedRow } from "../common";

const Table: FC<TableProps> = (props) => {
  const {
    rows,
    cols,
    filterModel,
    sortModel,
    pagination,
    selectModel,
    styleModel,
    editModel,
  } = props;

  const combinedPipelineOutput = useCombinedPipeline({
    rows,
    cols,
    filterModel,
    sortModel,
    pagination,
    selectModel,
  });
  const {
    sortedRowsOutput: { sortColDef, setSortColDef, sortingEnabled },
    showSelectCol,
    displayRows,
  } = combinedPipelineOutput;
  const gridSelectionFns = useGridSelectionFns(selectModel, rows);
  const getInputStrSubmitCallback = useGetInputStrSubmitCallback(
    editModel,
    cols,
  );
  const colNameToWidth: ColNameToWidth = useMemo(() => {
    const map: Record<string, number | undefined> = {};
    cols.forEach(({ name, width }) => (map[name] = width));
    return map;
  }, [cols]);
  const augFormattedRows: AugFormattedRow[] = useAugFormattedRows(
    colNameToWidth,
    displayRows,
  );

  const colHeaderCells = cols.map(({ name, label, sortable, width }, index) => {
    const colSortModel: ColSortModel | undefined =
      sortingEnabled && sortable
        ? {
            sortOrder: sortColDef?.name === name ? sortColDef.order : null,
            setSortOrder: (order) => {
              setSortColDef && setSortColDef(order && { name, order });
            },
          }
        : undefined;

    return (
      <ColHeaderCell
        key={name}
        label={label}
        sortModel={colSortModel}
        ariaColIndex={index + 1 + (showSelectCol ? 1 : 0)}
        additionalClasses={
          styleModel?.mainTableStyleModel?.theadTh &&
          styleModel.mainTableStyleModel.theadTh(index)
        }
        width={width}
      />
    );
  });

  const bodyRows = (
    <BodyRows
      augFormattedRows={augFormattedRows}
      gridSelectionFns={gridSelectionFns}
      selectModel={selectModel}
      combinedPipelineOutput={combinedPipelineOutput}
      editModel={editModel}
      getInputStrSubmitCallback={getInputStrSubmitCallback}
      tableStyleModel={styleModel?.mainTableStyleModel}
    />
  );

  return (
    <InternalTable
      gridProps={props}
      hooks={{
        pipelineOutput: combinedPipelineOutput,
        selectFns: gridSelectionFns,
      }}
      slots={{ colHeaderCells, bodyRows }}
    />
  );
};

export default Table;

export type { TableProps } from "./types";

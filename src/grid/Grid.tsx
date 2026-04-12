"use client";

import { FC } from "react";
import { GridProps } from "./types";
import InternalGrid from "./InternalGrid";
import { ColSortModel } from "./sorting/types";
import ColHeaderCell from "./main/ColHeaderCell";
import useCombinedPipeline from "./pipeline/useCombinedPipeline";

const Grid: FC<GridProps> = (props) => {
  const { rows, cols, filterModel, sortModel, pagination, selectModel, styleModel } = props;
  const combinedPipelineOutput = useCombinedPipeline({
    rows, cols, filterModel, sortModel, pagination, selectModel
  });
  const { sortedRowsOutput: { sortColDef, setSortColDef, sortingEnabled }, showSelectCol } = combinedPipelineOutput;
  const colHeaderCells = cols.map(({ name, label, sortable, width }, index) => {
    const colSortModel: ColSortModel | undefined =
      sortingEnabled && sortable
        ? {
          sortOrder:
            sortColDef?.name === name ? sortColDef.order : null,
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
  })

  return (
    <InternalGrid
      gridProps={props}
      pipelineOutput={combinedPipelineOutput}
      slots={{ colHeaderCells }}
    />
  );
};

export default Grid;

export type { GridProps } from "./types";

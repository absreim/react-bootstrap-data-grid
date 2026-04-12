"use client";

import { FC } from "react";
import { ColSortModel } from "../grid";
import useCombinedPipeline from "../grid/pipeline/useCombinedPipeline";
import InternalGrid from "../grid/InternalGrid";
import { GridProProps } from "./types";
import ColHeaderCellPro from "./ColHeaderCellPro";

const GridPro: FC<GridProProps> = (props) => {
  const {
    rows,
    cols,
    filterModel,
    sortModel,
    pagination,
    selectModel,
    styleModel,
    displayMode
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
  } = combinedPipelineOutput;
  const colHeaderCells = cols.map(({ name, label, sortable, width, resizeable }, index) => {
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
      <ColHeaderCellPro
        key={name}
        label={label}
        sortModel={colSortModel}
        ariaColIndex={index + 1 + (showSelectCol ? 1 : 0)}
        additionalClasses={
          styleModel?.mainTableStyleModel?.theadTh &&
          styleModel.mainTableStyleModel.theadTh(index)
        }
        width={width}
        displayMode={displayMode}
        resizeable={resizeable}
      />
    );
  });

  return (
    <InternalGrid
      gridProps={props}
      pipelineOutput={combinedPipelineOutput}
      slots={{ colHeaderCells }}
    />
  );
};

export default GridPro;

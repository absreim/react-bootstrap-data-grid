"use client";

import { FC, useMemo } from "react";
import { AugFormattedRow, GridProps } from "./types";
import InternalGrid from "./InternalGrid";
import { ColSortModel } from "./sorting/types";
import ColHeaderCell from "./main/ColHeaderCell";
import useCombinedPipeline from "./pipeline/useCombinedPipeline";
import useGridSelectionFns from "./pipeline/useGridSelectionFns";
import useUnwrappedGridStyles from "./pipeline/useUnwrappedGridStyles";
import useGetInputStrSubmitCallback from "./pipeline/useGetInputStrSubmitCallback";
import { ColNameToWidth } from "./pipeline/types";
import useAugFormattedRows from "./pipeline/useAugFormattedRows";
import BodyRows from "./main/BodyRows";

const Grid: FC<GridProps> = (props) => {
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
  const unwrappedStyles = useUnwrappedGridStyles(styleModel);
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
      unwrappedStyles={unwrappedStyles}
      combinedPipelineOutput={combinedPipelineOutput}
      editModel={editModel}
      getInputStrSubmitCallback={getInputStrSubmitCallback}
    />
  );

  return (
    <InternalGrid
      gridProps={props}
      hooks={{
        pipelineOutput: combinedPipelineOutput,
        selectFns: gridSelectionFns,
        unwrappedStyles,
      }}
      slots={{ colHeaderCells, bodyRows }}
    />
  );
};

export default Grid;

export type { GridProps } from "./types";

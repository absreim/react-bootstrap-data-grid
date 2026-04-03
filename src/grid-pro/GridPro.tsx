"use client";

import { FC, useMemo } from "react";
import { AugFormattedRow, ColSortModel } from "../grid";
import useCombinedPipeline from "../grid/pipeline/useCombinedPipeline";
import InternalGrid from "../grid/InternalGrid";
import { GridProProps } from "./types";
import ColHeaderCellPro from "./ColHeaderCellPro";
import useGridSelectionFns from "../grid/pipeline/useGridSelectionFns";
import useUnwrappedGridStyles from "../grid/pipeline/useUnwrappedGridStyles";
import useGetInputStrSubmitCallback from "../grid/pipeline/useGetInputStrSubmitCallback";
import { ColNameToWidth } from "../grid/pipeline/types";
import useAugFormattedRows from "../grid/pipeline/useAugFormattedRows";
import useResizeModel from "./resize/useResizeModel";
import BodyRows from "../grid/main/BodyRows";

const GridPro: FC<GridProProps> = (props) => {
  const {
    rows,
    cols,
    editModel,
    filterModel,
    sortModel,
    pagination,
    selectModel,
    styleModel,
    displayMode,
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
  const resizeModel = useResizeModel(cols, displayMode);
  const colNameToWidth: ColNameToWidth = useMemo(
    () =>
      Object.keys(resizeModel).reduce((prev, fieldName) => {
        prev[fieldName] = resizeModel[fieldName].width;
        return prev;
      }, {} as ColNameToWidth),
    [resizeModel],
  );
  const augFormattedRows: AugFormattedRow[] = useAugFormattedRows(
    colNameToWidth,
    displayRows,
  );

  const colHeaderCells = cols.map(
    (
      {
        name,
        label,
        sortable,
        minResizeWidth,
        maxResizeWidth,
        keyboardResizeStep,
      },
      index,
    ) => {
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
          width={resizeModel[name].width}
          displayMode={displayMode}
          setWidth={resizeModel[name].setWidth}
          minResizeWidth={minResizeWidth}
          maxResizeWidth={maxResizeWidth}
          keyboardResizeStep={keyboardResizeStep}
        />
      );
    },
  );

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

export default GridPro;

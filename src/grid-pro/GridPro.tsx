"use client";

import { FC, useCallback, useEffect, useMemo } from "react";
import { AugFormattedRow, ColSortModel, RowId } from "./";
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
import ReorderHeaderCell from "./reorder/ReorderHeaderCell";
import ReorderHandleCell from "./reorder/ReorderHandleCell";
import useKeyboardReorder from "./reorder/useKeyboardReorder";
import useReorderStyles from "./reorder/useReorderStyles";
import useKeyboardReorderListener from "./reorder/useKeyboardReorderListener";

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
    reorder,
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
    filterState,
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

  const displayRowIds = useMemo(
    () => displayRows.map(({ id }) => id),
    [displayRows],
  );
  const { drageeState, setDragee } = useKeyboardReorder(displayRowIds);
  const reorderStyles = useReorderStyles(styleModel?.reorderModel);
  const additionalBodyRowStyles: (id: RowId, displayIndex: number) => string[] =
    useCallback(
      (id, displayIndex) => {
        if (!drageeState) {
          return [];
        }

        const { rowId, drageeIndex, destIndex } = drageeState;

        if (id === rowId) {
          return reorderStyles.draggedRowClasses;
        }

        const isDraggedRowPred =
          drageeIndex > 0 && displayIndex === drageeIndex - 1;
        const isTargetUpperNeighbor =
          destIndex > 0 && displayIndex === destIndex - 1;
        const isTargetLowerNeighbor = destIndex === displayIndex;

        if (isDraggedRowPred && isTargetLowerNeighbor) {
          return reorderStyles.draggedRowPredecessorClasses.concat(
            reorderStyles.bottomBorderRowClasses,
          );
        }

        if (isDraggedRowPred && !isTargetLowerNeighbor) {
          return reorderStyles.draggedRowPredecessorClasses;
        }

        if (!isDraggedRowPred && isTargetLowerNeighbor) {
          return reorderStyles.bottomBorderRowClasses;
        }

        if (isTargetUpperNeighbor) {
          return reorderStyles.topBorderRowClasses;
        }

        return [];
      },
      [reorderStyles, drageeState],
    );
  const additionalHeaderRowStyles: string[] = useMemo(() => {
    if (!drageeState) {
      return [];
    }

    if (drageeState.drageeIndex === 0) {
      return reorderStyles.draggedRowPredecessorClasses;
    }

    if (drageeState.destIndex === 0) {
      return reorderStyles.topBorderRowClasses;
    }

    return [];
  }, [
    drageeState,
    reorderStyles.draggedRowPredecessorClasses,
    reorderStyles.topBorderRowClasses,
  ]);
  const tableOnKeydown = useKeyboardReorderListener(
    drageeState,
    reorder?.callback,
  );
  useEffect(() => {
    document.addEventListener("keydown", tableOnKeydown);
    return () => {
      document.removeEventListener("keydown", tableOnKeydown);
    };
  }, [tableOnKeydown]);

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

  const filteringOccurring = !!(
    filterState &&
    Object.values(filterState).find(
      ({ editableState }) => editableState.enabled,
    )
  );
  const sortingOccurring = !!sortColDef;

  const renderPrefixCells = useCallback(
    (augRow: AugFormattedRow) => {
      if (!reorder) {
        return null;
      }

      const reorderCallback = (destIndex: number) =>
        reorder.callback(augRow.id, destIndex);

      return (
        <ReorderHandleCell
          rowId={augRow.id}
          ariaRowIndex={augRow.prePaginationIndex + 2}
          disabled={
            filteringOccurring || sortingOccurring || displayRows.length <= 1
          }
          reorderCallback={reorderCallback}
          styles={reorderStyles}
          keyboardStartCallback={() => setDragee(augRow.id)}
          suppressKeyboardClick={drageeState !== null}
        />
      );
    },
    [
      displayRows.length,
      drageeState,
      filteringOccurring,
      reorder,
      reorderStyles,
      setDragee,
      sortingOccurring,
    ],
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
      renderPrefixCells={renderPrefixCells}
      additionalColIndexOffset={reorder ? 1 : 0}
      additionalRowStyles={additionalBodyRowStyles}
    />
  );

  const prefixHeader = reorder ? <ReorderHeaderCell /> : null;

  return (
    <InternalGrid
      gridProps={props}
      hooks={{
        pipelineOutput: combinedPipelineOutput,
        selectFns: gridSelectionFns,
        unwrappedStyles,
      }}
      slots={{ colHeaderCells, bodyRows, prefixHeader }}
      classes={{
        headerRow: additionalHeaderRowStyles,
      }}
    />
  );
};

export default GridPro;

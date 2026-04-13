"use client";

import { FC, useMemo } from "react";
import { AugFormattedRow, GridProps } from "./types";
import InternalGrid from "./InternalGrid";
import { ColSortModel } from "./sorting/types";
import ColHeaderCell from "./main/ColHeaderCell";
import useCombinedPipeline from "./pipeline/useCombinedPipeline";
import EditableRow from "./editing/EditableRow";
import classNames from "classnames";
import getWidthStyle from "./util/getWidthStyle";
import SelectionInput from "./selection/SelectionInput";
import useGridSelectionFns from "./pipeline/useGridSelectionFns";
import useUnwrappedGridStyles from "./pipeline/useUnwrappedGridStyles";
import useGetInputStrSubmitCallback from "./pipeline/useGetInputStrSubmitCallback";
import { ColNameToWidth } from "./pipeline/types";
import useAugFormattedRows from "./pipeline/useAugFormattedRows";

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
    ariaColIndexOffset,
  } = combinedPipelineOutput;
  const gridSelectionFns = useGridSelectionFns(selectModel, rows);
  const {
    selectedSet,
    getRowClickHandler,
    getAriaSelectedValue,
    getSelectInputModel,
    getSelectHandler,
  } = gridSelectionFns;
  const unwrappedStyles = useUnwrappedGridStyles(styleModel);
  const { unwrappedTableModel } = unwrappedStyles;
  const getInputStrSubmitCallback = useGetInputStrSubmitCallback(
    editModel,
    cols,
  );
  const colNameToWidth: ColNameToWidth = useMemo(() => {
    const map: Record<string, number | undefined> = {};
    cols.forEach(({ name, width }) => (map[name] = width));
    return map;
  }, [cols]);
  const augFormattedRows: AugFormattedRow[] = useAugFormattedRows(colNameToWidth, displayRows);

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

  const bodyRows = augFormattedRows.map((row, index) => {
    return (
      <EditableRow
        onClick={getRowClickHandler(row.id)}
        className={classNames(
          {
            "table-active": selectedSet.has(row.id),
          },
          unwrappedTableModel.tbodyTr(row.id, index),
        )}
        key={row.id}
        aria-rowindex={index + 2}
        dataRowId={row.id}
        aria-selected={getAriaSelectedValue(row.id)}
        ariaColIndexOffset={ariaColIndexOffset}
        cellData={row.contents}
        updateCallback={
          getInputStrSubmitCallback && getInputStrSubmitCallback(row.id)
        }
        deleteCallback={
          editModel?.getDeleteCallback && editModel.getDeleteCallback(row.id)
        }
        dataCellClasses={(colIndex) =>
          unwrappedTableModel.tbodyTd(row.id, index, colIndex)
        }
        dataCellInputClasses={(colIndex) =>
          unwrappedTableModel.tbodyTdInput(row.id, index, colIndex)
        }
        editCellClasses={unwrappedTableModel.editColTd(row.id, index)}
        saveButtonClasses={unwrappedTableModel.editSaveButton(row.id, index)}
        deleteButtonClasses={unwrappedTableModel.editDeleteButton(
          row.id,
          index,
        )}
        startButtonClasses={unwrappedTableModel.editStartButton(row.id, index)}
        cancelButtonClasses={unwrappedTableModel.editCancelButton(
          row.id,
          index,
        )}
      >
        {showSelectCol && (
          <td
            className={classNames(
              unwrappedTableModel.rowSelectColTd(row.id, index),
            )}
            aria-colindex={1}
            style={getWidthStyle(selectModel!.selectColWidth)}
          >
            <SelectionInput
              selected={selectedSet.has(row.id)}
              selectionInputModel={getSelectInputModel(row.id, selectModel!)}
              selectCallback={getSelectHandler(row.id)}
              additionalClasses={unwrappedTableModel.rowSelectInput(
                row.id,
                index,
              )}
            />
          </td>
        )}
      </EditableRow>
    );
  });

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

import { AugFormattedRow } from "../types";
import { FC, ReactNode } from "react";
import EditableRow from "../editing/EditableRow";
import classNames from "classnames";
import getWidthStyle from "../util/getWidthStyle";
import SelectionInput from "../selection/SelectionInput";
import { UseGridSelectionFnsHook } from "../pipeline/useGridSelectionFns";
import { UseUnwrappedGridStylesHook } from "../pipeline/useUnwrappedGridStyles";
import { UseCombinedPipelineHook } from "../pipeline/useCombinedPipeline";
import { SelectModel } from "../selection/types";
import { EditModel } from "../editing/types";
import { UseGetInputStrSubmitCallbackHook } from "../pipeline/useGetInputStrSubmitCallback";

interface BodyRowsProps {
  augFormattedRows: AugFormattedRow[];
  gridSelectionFns: UseGridSelectionFnsHook;
  unwrappedStyles: UseUnwrappedGridStylesHook;
  combinedPipelineOutput: UseCombinedPipelineHook;
  selectModel: SelectModel | undefined;
  editModel: EditModel | undefined;
  getInputStrSubmitCallback: UseGetInputStrSubmitCallbackHook;
  additionalColIndexOffset?: number;
  prefixCells?: (augFormattedRows: AugFormattedRow) => ReactNode;
}

const BodyRows: FC<BodyRowsProps> = ({
  augFormattedRows,
  gridSelectionFns: {
    selectedSet,
    getSelectInputModel,
    getSelectHandler,
    getRowClickHandler,
    getAriaSelectedValue,
  },
  unwrappedStyles: { unwrappedTableModel },
  combinedPipelineOutput: { showSelectCol, ariaColIndexOffset },
  selectModel,
  editModel,
  getInputStrSubmitCallback,
  additionalColIndexOffset,
  prefixCells
}) =>
  augFormattedRows.map((row, index) => {
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
        ariaColIndexOffset={
          ariaColIndexOffset + (additionalColIndexOffset || 0)
        }
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
        {prefixCells && prefixCells(row)}
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

export default BodyRows;

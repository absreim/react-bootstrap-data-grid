import { FC, ReactNode } from "react";
import EditableRow from "../editing/EditableRow";
import classNames from "classnames";
import getWidthStyle from "../../common/util/getWidthStyle";
import SelectionInput from "../selection/SelectionInput";
import { UseGridSelectionFnsHook } from "../../common/pipeline/useGridSelectionFns";
import { UseCombinedPipelineHook } from "../../common/pipeline/useCombinedPipeline";
import { SelectModel } from "../../common/selection/types";
import { UseGetInputStrSubmitCallbackHook } from "../../common/pipeline/useGetInputStrSubmitCallback";
import { TableStyleModel } from "../styling/types";
import { AugFormattedRow, RowId } from "../../common/types";
import { EditModel } from "../../common/editing/types";

interface BodyRowsProps {
  augFormattedRows: AugFormattedRow[];
  gridSelectionFns: UseGridSelectionFnsHook;
  tableStyleModel: TableStyleModel | undefined;
  combinedPipelineOutput: UseCombinedPipelineHook;
  selectModel: SelectModel | undefined;
  editModel: EditModel | undefined;
  getInputStrSubmitCallback: UseGetInputStrSubmitCallbackHook;
  additionalColIndexOffset?: number;
  renderPrefixCells?: (augFormattedRows: AugFormattedRow) => ReactNode;
  additionalRowStyles?: (rowId: RowId, displayIndex: number) => string[];
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
  tableStyleModel,
  combinedPipelineOutput: { showSelectCol, ariaColIndexOffset },
  selectModel,
  editModel,
  getInputStrSubmitCallback,
  additionalColIndexOffset,
  renderPrefixCells,
  additionalRowStyles,
}) =>
  augFormattedRows.map((row, index) => {
    return (
      <EditableRow
        onClick={getRowClickHandler(row.id)}
        className={classNames(
          {
            "table-active": selectedSet.has(row.id),
          },
          tableStyleModel?.tbodyTr && tableStyleModel?.tbodyTr(row.id, index),
          additionalRowStyles ? additionalRowStyles(row.id, index) : [],
        )}
        key={row.id}
        aria-rowindex={row.prePaginationIndex + 2}
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
          tableStyleModel?.tbodyTd
            ? tableStyleModel?.tbodyTd(row.id, index, colIndex)
            : null
        }
        dataCellInputClasses={(colIndex) =>
          tableStyleModel?.tbodyTdInput
            ? tableStyleModel?.tbodyTdInput(row.id, index, colIndex)
            : null
        }
        editCellClasses={
          tableStyleModel?.editColTd
            ? tableStyleModel?.editColTd(row.id, index)
            : null
        }
        saveButtonClasses={
          tableStyleModel?.editSaveButton
            ? tableStyleModel?.editSaveButton(row.id, index)
            : null
        }
        deleteButtonClasses={
          tableStyleModel?.editDeleteButton
            ? tableStyleModel?.editDeleteButton(row.id, index)
            : null
        }
        startButtonClasses={
          tableStyleModel?.editStartButton
            ? tableStyleModel?.editStartButton(row.id, index)
            : null
        }
        cancelButtonClasses={
          tableStyleModel?.editCancelButton
            ? tableStyleModel?.editCancelButton(row.id, index)
            : null
        }
      >
        {renderPrefixCells && renderPrefixCells(row)}
        {showSelectCol && (
          <td
            className={classNames(
              tableStyleModel?.rowSelectColTd &&
                tableStyleModel?.rowSelectColTd(row.id, index),
            )}
            aria-colindex={1 + (additionalColIndexOffset || 0)}
            style={getWidthStyle(selectModel!.selectColWidth)}
          >
            <SelectionInput
              index={index}
              selected={selectedSet.has(row.id)}
              selectionInputModel={getSelectInputModel(row.id, selectModel!)}
              selectCallback={getSelectHandler(row.id)}
              additionalClasses={
                tableStyleModel?.rowSelectInput &&
                tableStyleModel?.rowSelectInput(row.id, index)
              }
            />
          </td>
        )}
      </EditableRow>
    );
  });

export default BodyRows;

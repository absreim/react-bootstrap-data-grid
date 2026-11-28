import { FC, KeyboardEventHandler } from "react";
import getWidthStyles from "./getWidthStyles";
import classNames from "classnames";
import { CSS_PREFIX, DEFAULT_COL_WIDTH } from "../../common/constants";
import { GRID_BODY_DATA_TEST_ID } from "../constants";
import { GridBodyProps } from "./internalTypes";
import { FormattedRow, RowId } from "../../common";
import SelectBodyCell from "../selection/SelectBodyCell";

const GridBody: FC<GridBodyProps> = ({
  augFormattedRows,
  cols,
  rowVariant,
  cellVariant,
  focusCoords,
  cellFocusVariant,
  selectionInfo,
  gridId,
  selectionCellVariant,
  selectionCellFocusVariant,
}) => {
  const getRowKeydownHandler:
    | ((id: RowId) => KeyboardEventHandler<HTMLDivElement>)
    | null = !selectionInfo
    ? null
    : (id) => {
        return (event) => {
          switch (event.code) {
            case "Space": {
              selectionInfo.getToggleHandler(id)();
              break;
            }
            default:
              return;
          }
        };
      };

  function getSelectCellContent(
    rowId: RowId,
    displayRowIndex: number,
    displayRowArrayIndex: number,
    row: FormattedRow,
  ) {
    if (!selectionInfo || selectionInfo.mode === "row") {
      return null;
    }

    const isFocused =
      focusCoords.ariaColIndex === 1 &&
      focusCoords.displayRowIndex === displayRowIndex;

    const cellVariantVal =
      selectionCellVariant && selectionCellVariant(row, displayRowArrayIndex);
    const cellFocusVariantVal =
      selectionCellFocusVariant &&
      selectionCellFocusVariant(row, displayRowArrayIndex);
    const rowIsSelected = selectionInfo.getRowIsSelected(rowId);
    const ariaRowIndex = row.prePaginationIndex + 2;

    return (
      <SelectBodyCell
        handleSelect={
          selectionInfo && selectionInfo.mode === "column"
            ? selectionInfo.getToggleHandler(rowId)
            : undefined
        }
        isSelected={rowIsSelected}
        selectType={selectionInfo.type}
        radioGroup={gridId}
        tabIndex={isFocused ? 0 : -1}
        className={classNames(
          "rbdg-grid-cell",
          cellVariantVal && `${CSS_PREFIX}-${cellVariantVal}`,
          cellFocusVariantVal && `focus-ring-${cellFocusVariantVal}`,
          {
            "z-2": isFocused,
            "rbdg-focusable-cell": isFocused,
            "rbdg-grid-active": rowIsSelected,
          },
        )}
        label={`Select row ${ariaRowIndex}`}
      />
    );
  }

  return (
    <div role="rowgroup" data-testid={GRID_BODY_DATA_TEST_ID}>
      {augFormattedRows.map((row, displayRowArrayIndex) => {
        const ariaRowIndex = row.prePaginationIndex + 2;
        const displayRowIndex = displayRowArrayIndex + 2;
        const rowIsSelected = selectionInfo
          ? selectionInfo.getRowIsSelected(row.id)
          : undefined;

        return (
          <div
            role="row"
            key={row.id}
            display-rowindex={displayRowIndex}
            aria-selected={rowIsSelected}
            aria-rowindex={ariaRowIndex}
            className={classNames(
              "d-flex",
              "flex-row",
              rowVariant &&
                rowVariant(row, displayRowArrayIndex) &&
                `${CSS_PREFIX}-${rowVariant(row, displayRowArrayIndex)}`,
            )}
            onClick={
              !selectionInfo || selectionInfo.mode === "column"
                ? undefined
                : selectionInfo.getToggleHandler(row.id)
            }
            onKeyDown={
              !selectionInfo || selectionInfo.mode === "column"
                ? undefined
                : getRowKeydownHandler!(row.id)
            }
          >
            {getSelectCellContent(
              row.id,
              displayRowIndex,
              displayRowArrayIndex,
              row,
            )}
            {row.contents.map(({ formattedValue, width }, index) => {
              const ariaColIndex =
                index +
                1 +
                (selectionInfo && selectionInfo.mode !== "row" ? 1 : 0);
              const isFocused =
                focusCoords.ariaColIndex === ariaColIndex &&
                focusCoords.displayRowIndex === displayRowIndex;
              const cellVariantVal =
                cellVariant &&
                cellVariant(
                  row.contents[index],
                  row,
                  index,
                  displayRowArrayIndex,
                );
              const cellFocusVariantVal =
                cellFocusVariant &&
                cellFocusVariant(
                  row.contents[index],
                  row,
                  index,
                  displayRowArrayIndex,
                );

              return (
                <div
                  tabIndex={isFocused ? 0 : -1}
                  key={cols[index].name}
                  style={getWidthStyles(width || DEFAULT_COL_WIDTH)}
                  role="gridcell"
                  className={classNames(
                    "rbdg-grid-cell",
                    cellVariantVal && `${CSS_PREFIX}-${cellVariantVal}`,
                    cellFocusVariantVal && `focus-ring-${cellFocusVariantVal}`,
                    {
                      "z-2": isFocused,
                      "rbdg-focusable-cell": isFocused,
                      "rbdg-grid-active": rowIsSelected,
                    },
                  )}
                  aria-colindex={ariaColIndex}
                >
                  {formattedValue}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GridBody;

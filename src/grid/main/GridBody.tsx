import { FC } from "react";
import getWidthStyles from "./getWidthStyles";
import classNames from "classnames";
import { CSS_PREFIX, DEFAULT_COL_WIDTH } from "../../common/constants";
import { GRID_BODY_DATA_TEST_ID } from "../constants";
import { GridBodyProps } from "./internalTypes";

const GridBody: FC<GridBodyProps> = ({
  augFormattedRows,
  cols,
  rowVariant,
  cellVariant,
  focusCoords,
  cellFocusVariant,
  getRowIsSelected,
  getRowClickHandler,
}) => {
  return (
    <div role="rowgroup" data-testid={GRID_BODY_DATA_TEST_ID}>
      {augFormattedRows.map((row, displayRowArrayIndex) => {
        const ariaRowIndex = row.prePaginationIndex + 2;
        const displayRowIndex = displayRowArrayIndex + 2;
        const rowIsSelected = getRowIsSelected(row.id);

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
              {
                "rbdg-grid-active": rowIsSelected,
              }
            )}
            onClick={getRowClickHandler(row.id)}
          >
            {row.contents.map(({ formattedValue, width }, index) => {
              const ariaColIndex = index + 1;
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

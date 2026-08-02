import { FC } from "react";
import { GridBodyProps } from "./types";
import getWidthStyles from "./getWidthStyles";
import classNames from "classnames";
import { CSS_PREFIX, DEFAULT_COL_WIDTH } from "../../common/constants";
import { GRID_BODY_DATA_TEST_ID } from "../constants";

const GridBody: FC<GridBodyProps> = ({
  augFormattedRows,
  cols,
  rowVariant,
  cellVariant,
  focusCoords,
}) => {
  return (
    <div role="rowgroup" data-testid={GRID_BODY_DATA_TEST_ID}>
      {augFormattedRows.map((row, rowDisplayIndex) => {
        const ariaRowIndex = row.prePaginationIndex + 2;

        return (
          <div
            role="row"
            key={row.id}
            aria-rowindex={ariaRowIndex}
            className={classNames(
              "d-flex",
              "flex-row",
              rowVariant &&
                rowVariant(row, rowDisplayIndex) &&
                `${CSS_PREFIX}-${rowVariant(row, rowDisplayIndex)}`,
            )}
          >
            {row.contents.map(({ formattedValue, width }, index) => {
              const ariaColIndex = index + 1;
              return (
                <div
                  tabIndex={
                    focusCoords.ariaColIndex === ariaColIndex &&
                    focusCoords.ariaRowIndex === ariaRowIndex
                      ? 0
                      : -1
                  }
                  key={cols[index].name}
                  style={getWidthStyles(width || DEFAULT_COL_WIDTH)}
                  role="gridcell"
                  className={classNames(
                    "focus-ring",
                    "rbdg-grid-cell",
                    cellVariant &&
                      cellVariant(
                        row.contents[index],
                        row,
                        index,
                        rowDisplayIndex,
                      ) &&
                      `${CSS_PREFIX}-${cellVariant(row.contents[index], row, index, rowDisplayIndex)}`,
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

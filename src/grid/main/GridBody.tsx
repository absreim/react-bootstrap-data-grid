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
}) => {
  return (
    <div role="rowgroup" data-testid={GRID_BODY_DATA_TEST_ID}>
      {augFormattedRows.map((row, rowDisplayIndex) => (
        <div
          role="row"
          key={row.id}
          aria-rowindex={row.prePaginationIndex + 2}
          className={classNames(
            "d-flex",
            "flex-row",
            rowVariant && `${CSS_PREFIX}-${rowVariant(row, rowDisplayIndex)}`,
          )}
        >
          {row.contents.map(({ formattedValue, width }, index) => (
            <div
              key={cols[index].name}
              style={getWidthStyles(width || DEFAULT_COL_WIDTH)}
              role="gridcell"
              className={classNames(
                "rbdg-grid-cell",
                cellVariant &&
                  `${CSS_PREFIX}-${cellVariant(row.contents[index], row, index, rowDisplayIndex)}`,
              )}
              aria-colindex={index + 1}
            >
              {formattedValue}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridBody;

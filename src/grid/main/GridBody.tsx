import { FC } from 'react';
import { GridBodyProps } from "@/grid/main/types";
import getWidthStyles from "@/grid/main/getWidthStyles";

const GridBody: FC<GridBodyProps> = ({ rowInfos }) => {
  return (
    <div role="rowgroup">
      {rowInfos.map(({ id, prePaginationIndex, cellInfos }) => (
        <div
          role="row"
          key={id}
          aria-rowindex={prePaginationIndex + 2}
          className="d-flex flex-row"
        >
          {cellInfos.map(({ formattedValue, width, columnName }) => (
            <div key={columnName} style={getWidthStyles(width)}>
              {formattedValue}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GridBody;

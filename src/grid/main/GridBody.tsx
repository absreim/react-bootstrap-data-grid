import { FC } from 'react';
import { GridBodyProps } from "@/grid/main/types";

const GridBody: FC<GridBodyProps> = ({ rowInfos }) => {
  return (
    <div role="rowgroup">
      {
        rowInfos.map(({ id, prePaginationIndex, cellInfos }) => (
          <div key={id} aria-rowindex={prePaginationIndex + 2}>
            {
              cellInfos.map(({ formattedValue, width }) => (
                <></>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default GridBody;

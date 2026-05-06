import { FC } from 'react';
import { ReorderCallback } from "./types";
import HorizontalGrip from "../assets/HorizontalGrip";

export interface ReorderHandleCellProps {
  reorderCallback: ReorderCallback;
}

const ReorderHandleCell: FC<ReorderHandleCellProps> = ({ reorderCallback }) => {
  return (
    <th aria-colindex={1}>
      <button className="rbdg-draggable-container rbdg-reorder-container rbdg-plain-icon-button">
        <HorizontalGrip className="rbdg-draggable-icon" />
      </button>
    </th>
  );
}

export default ReorderHandleCell;

import { FC } from "react";
import ReorderTestHarness from "../ReorderTestHarness";
import { ReorderStyleModel } from "../../../../table-pro";

const styleModel: ReorderStyleModel = {
  draggedRowClasses: ["custom-reorder-dragged-row"],
  draggedRowPredecessorClasses: ["custom-reorder-dragged-row-pred"],
  topBorderRowClasses: ["custom-reorder-above-drag-target-row"],
  bottomBorderRowClasses: ["custom-reorder-below-drag-target-row"],
  ghostDivClasses: ["custom-reorder-ghost", "border", "border-3"],
};

const Page: FC = () => <ReorderTestHarness styleModel={styleModel} />;

export default Page;

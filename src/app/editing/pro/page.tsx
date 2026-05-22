import { FC } from "react";
import EditingTestHarness from "@/app/editing/EditingTestHarness";

const Test: FC = () => {
  return (
    <>
      <div data-testid="editable grid container">
        <EditingTestHarness pro />
      </div>
    </>
  );
};

export default Test;

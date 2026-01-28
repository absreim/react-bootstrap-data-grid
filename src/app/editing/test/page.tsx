import { FC } from "react";
import EditingTestHarness from "@/app/editing/test/EditingTestHarness";

const Test: FC = () => {
  return (
    <>
      <div data-testid="editable grid container">
        <EditingTestHarness />
      </div>
    </>
  );
};

export default Test;

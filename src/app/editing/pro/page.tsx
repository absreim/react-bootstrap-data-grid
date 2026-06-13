import { FC } from "react";
import EditingTestHarness from "../EditingTestHarness";

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

import { FC } from "react";
import ToolbarTestHarness from "@/app/toolbar/ToolbarTestHarness";

const Page: FC = () => (
  <>
    <div data-testid="two-element toolbar test container">
      <ToolbarTestHarness enableFiltering={true} />
    </div>
    <div data-testid="single-element toolbar test container">
      <ToolbarTestHarness enableFiltering={false} />
    </div>
  </>
);

export default Page;

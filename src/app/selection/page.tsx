import { FC } from "react";
import SampleMultiSelectGrid from "@/app/selection/SampleMultiSelectGrid";
import SampleSingleSelectGrid from "@/app/selection/SampleSingleSelectGrid";

const Selection: FC = () => {
  return (
    <>
      <h1>Selection</h1>
      <h2>Examples</h2>
      <h3>Multiple Selection Mode</h3>
      <SampleMultiSelectGrid />
      <h3>Single Selection Mode</h3>
      <SampleSingleSelectGrid />
    </>
  );
};

export default Selection;

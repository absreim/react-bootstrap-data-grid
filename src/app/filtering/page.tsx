import { FC } from "react";
import SampleFilteredGrid from "@/app/filtering/SampleFilteredGrid";
import HighlightedCodeBlock from "@/shared/HighlightedCodeBlock";
import sampleFilteredGridCode from "@/app/filtering/sampleFilteredGridCode";

const Filtering: FC = () => {
  return (
    <>
      <h1>Filtering</h1>
      <h2>Example</h2>
      <h3>Code</h3>
      <HighlightedCodeBlock code={sampleFilteredGridCode} />
      <h3>Live Demo</h3>
      <SampleFilteredGrid />
    </>
  );
};

export default Filtering;

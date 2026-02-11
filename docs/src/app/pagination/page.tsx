import { FC } from "react";
import SamplePaginatedGrid from "@/app/pagination/SamplePaginatedGrid";
import samplePaginatedGridCode from "@/app/pagination/samplePaginatedGridCode";
import HighlightedTsCodeBlock from "@/shared/HighlightedTsCodeBlock";
import TypeSpecTable from "@/shared/TypeSpecTable";
import { gridPaginationState } from "@/app/pagination/typeSpecs";

const Pagination: FC = () => {
  return (
    <>
      <h1>Pagination</h1>
      <p>
        React Bootstrap Data Grid implements pagination of data in a{" "}
        <a href="https://legacy.reactjs.org/docs/forms.html#controlled-components">
          controlled
        </a>{" "}
        manner. In particular, the pagination feature being implemented in a
        controlled manner implies that state values, such as the page size and
        the index of current page being displayed, are stored in a parent
        component of the Grid rather than the Grid component itself.
      </p>
      <p>
        Pagination is optional and can be enabled by passing a{" "}
        <code>pagination</code> prop to the Grid component.
      </p>
      <h2>Type Definitions</h2>
      <h3>GridPaginationState</h3>
      <TypeSpecTable rows={gridPaginationState} />
      <h2>Example</h2>
      <h3>Code</h3>
      <HighlightedTsCodeBlock code={samplePaginatedGridCode} />
      <h3>Live Demo</h3>
      <SamplePaginatedGrid />
    </>
  );
};

export default Pagination;

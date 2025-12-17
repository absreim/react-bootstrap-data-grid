import { FC } from "react";
import TypeSpecTable from "@/shared/TypeSpecTable";
import { tableSortModel, sortColDef } from "@/shared/typeSpecs";
import SampleSortedGrid from "@/app/sorting/SampleSortedGrid";
import samplePaginatedGridCode from "@/app/pagination/samplePaginatedGridCode";
import HighlightedCodeBlock from "@/shared/HighlightedCodeBlock";
import sampleSortedGridCode from "@/app/sorting/sampleSortedGridCode";

const Sorting: FC = () => {
  return (
    <>
      <h1>Sorting</h1>
      <p>
        React Bootstrap Data Grid implements simple sorting of data, one column
        at a time, in ascending or descending order. The user can change the
        column being sorted and the sort order by clicking on a column header.
      </p>
      <p>
        When a user clicks on a column header, the sort order changes between{" "}
        <i>ascending</i>, <i>descending</i>, and <i>none</i>. When the sort
        order is <i>none</i>, the rows in the table will appear in original
        order of the array in which data was passed to the Grid component.
      </p>
      <p>
        Note that sorting is done on the original data, before pagination and
        before formatting functions are applied. In particular, note that
        numbers will be sorted by the value of the number rather than
        lexicographically. Similarly, dates and datetimes will be sorted by the
        number of milliseconds after the epoch time as opposed to any time of
        string representation of the Date object.
      </p>
      <p>
        Like other features of React Bootstrap Data Grid, state storage and
        updates for the sorting feature is done in a fully controlled manner.
        That is, the state and updater function are defined in a parent
        component and passed down to the Grid component.
      </p>
      <p>
        To allow a user to sort a Grid by a particular column, set the{" "}
        <code>sortable</code> property to <code>true</code> in the column
        definition (<code>ColDef</code>) for the column.
      </p>
      <p>
        In addition, setting the <code>sortModel</code> property on the{" "}
        <code>Grid</code> component is required to enable sorting.
      </p>
      <h2>Type Definitions</h2>
      <p>
        See below for specifications for the <code>sortModel</code> property and
        related types.
      </p>
      <h3>TableSortModel</h3>
      <TypeSpecTable
        rows={tableSortModel}
        caption="Type specification for the TableSortModel type, a prop to the Grid component"
      />
      <h3>SortColDef</h3>
      <TypeSpecTable
        rows={sortColDef}
        caption="Type specification for SortColDef, which is part of TableSortModel"
      />
      <h2>Example</h2>
      <h3>Code</h3>
      <HighlightedCodeBlock code={sampleSortedGridCode} />
      <h3>Live Demo</h3>
      <SampleSortedGrid />
    </>
  );
};

export default Sorting;

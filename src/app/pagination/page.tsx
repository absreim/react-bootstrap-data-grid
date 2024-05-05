import { FC } from "react";
import SamplePaginatedGrid from "@/app/pagination/SamplePaginatedGrid";
import samplePaginatedGridCode from "@/app/pagination/samplePaginatedGridCode";
import HighlightedCodeBlock from "@/shared/HighlightedCodeBlock";

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
      <table className="table">
        <caption>
          Specifications for each member of the <code>pagination</code> prop
        </caption>
        <thead>
          <tr>
            <th>Property name</th>
            <th>Type definition</th>
            <th>Required/Optional</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>pageSizeOptions</td>
            <td>number[]</td>
            <td>Required</td>
            <td>
              <p>
                List of options for the number of rows to display per page. The
                Grid component will list the options in a dropdown menu that the
                user can use to adjust the setting.
              </p>
              <p>
                Example: <code>[5, 10, 25]</code>
              </p>
            </td>
          </tr>
          <tr>
            <td>pageSizeIndex</td>
            <td>number</td>
            <td>Required</td>
            <td>
              <p>
                The currently selected page size option based on the index of
                the array <code>pageSizeOptions</code>.
              </p>
              <p>
                For example, if <code>pageSizeOptions</code> is{" "}
                <code>[5, 10, 25]</code> and <code>pageSizeIndex</code> is{" "}
                <code>0</code>, the page size would be <em>5</em>.
              </p>
            </td>
          </tr>
          <tr>
            <td>setPageSizeIndex</td>
            <td>(index: number) =&gt; void</td>
            <td>Required</td>
            <td>
              Callback function to set the page size index. When the user
              selects an option in the dropdown menu for selecting page sizes,
              the Grid component will call this function.
            </td>
          </tr>
          <tr>
            <td>pageNum</td>
            <td>number</td>
            <td>Required</td>
            <td>
              The (one-based) current page number to be displayed on the grid.
              For example, if the page size is <em>10</em> and there are{" "}
              <em>30</em> rows in the grid, a <code>pageNum</code> of <em>1</em>{" "}
              would have the grid display the first 10 rows of data.
            </td>
          </tr>
          <tr>
            <td>setPageNum</td>
            <td>(index: number) =&gt; void</td>
            <td>Required</td>
            <td>
              Callback function to set the current page of data to display. When
              the user interacts with the pagination component to select a new
              page, the Grid component will call this function.
            </td>
          </tr>
          <tr>
            <td>maxPageButtons</td>
            <td>number</td>
            <td>Required</td>
            <td>
              <p>
                The maximum number of buttons associated with numerical page
                indices to display on the pagination component.
              </p>
              <p>
                For example, if the page size is <em>10</em> and there are{" "}
                <em>50</em> rows of data, there are <em>5</em> total pages of
                data. The Grid could potentially display a button for each of
                these 5 pages. If one were to set a <code>maxPageButtons</code>{" "}
                setting that is smaller than the total number of pages, such as{" "}
                <em>3</em>, then only that many buttons will displayed.
              </p>
              <p>
                Note that this setting has no effect on whether to display the
                buttons that point to the first, last, next, and previous pages.
                These buttons are always displayed if appropriate.
              </p>
            </td>
          </tr>
          <tr>
            <td>componentSize</td>
            <td>&quot;small&quot; | &quot;medium&quot; | &quot;large&quot;</td>
            <td>Optional</td>
            <td>
              Size of the pagination component based on{" "}
              <a href="https://getbootstrap.com/docs/5.3/components/pagination/#sizing">
                CSS classes provided by Bootstrap
              </a>
              . Set <code>small</code> for <code>pagination-sm</code> or{" "}
              <code>large</code> for <code>pagination-lg</code>. Set{" "}
              <code>medium</code> or do not set the property for no additional
              CSS class, which will result in size between that of the{" "}
              <code>pagination-sm</code> and <code>pagination-lg</code> sizes.
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Example</h2>
      <h3>Code</h3>
      <HighlightedCodeBlock code={samplePaginatedGridCode} />
      <h3>Live Demo</h3>
      <SamplePaginatedGrid />
    </>
  );
};

export default Pagination;

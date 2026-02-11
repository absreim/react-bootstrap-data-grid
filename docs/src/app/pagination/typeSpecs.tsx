import { SpecTableRow } from "@/shared/TypeSpecTable";

export const gridPaginationState: SpecTableRow[] = [
  {
    propertyName: "pageSizeOptions",
    typeDefinition: "number[]",
    isRequired: true,
    description: (
      <>
        <p>
          List of options for the number of rows to display per page. The Grid
          component will list the options in a dropdown menu that the user can
          use to adjust the setting.
        </p>
        <p>
          Example: <code>[5, 10, 25]</code>
        </p>
      </>
    ),
  },
  {
    propertyName: "pageSizeIndex",
    typeDefinition: "number[]",
    isRequired: true,
    description: (
      <>
        <p>
          The currently selected page size option based on the index of the
          array <code>pageSizeOptions</code>.
        </p>
        <p>
          For example, if <code>pageSizeOptions</code> is{" "}
          <code>[5, 10, 25]</code> and <code>pageSizeIndex</code> is{" "}
          <code>0</code>, the page size would be <em>5</em>.
        </p>
      </>
    ),
  },
  {
    propertyName: "setPageSizeIndex",
    typeDefinition: "(index: number) => void",
    isRequired: true,
    description: (
      <>
        Callback function to set the page size index. When the user selects an
        option in the dropdown menu for selecting page sizes, the Grid component
        will call this function.
      </>
    ),
  },
  {
    propertyName: "pageNum",
    typeDefinition: "number",
    isRequired: true,
    description: (
      <>
        The (one-based) current page number to be displayed on the grid. For
        example, if the page size is <em>10</em> and there are <em>30</em> rows
        in the grid, a <code>pageNum</code> of <em>1</em> would have the grid
        display the first 10 rows of data.
      </>
    ),
  },
  {
    propertyName: "setPageNum",
    typeDefinition: "(index: number) => void",
    isRequired: true,
    description: (
      <>
        Callback function to set the current page of data to display. When the
        user interacts with the pagination component to select a new page, the
        Grid component will call this function.
      </>
    ),
  },
  {
    propertyName: "maxPageButtons",
    typeDefinition: "number",
    isRequired: true,
    description: (
      <>
        <p>
          The maximum number of buttons associated with numerical page indices
          to display on the pagination component.
        </p>
        <p>
          For example, if the page size is <em>10</em> and there are <em>50</em>{" "}
          rows of data, there are <em>5</em> total pages of data. The Grid could
          potentially display a button for each of these 5 pages. If one were to
          set a <code>maxPageButtons</code> setting that is smaller than the
          total number of pages, such as <em>3</em>, then only that many buttons
          will displayed.
        </p>
        <p>
          Note that this setting has no effect on whether to display the buttons
          that point to the first, last, next, and previous pages. These buttons
          are always displayed if appropriate.
        </p>
      </>
    ),
  },
  {
    propertyName: "componentSize",
    typeDefinition: '"small" | "medium" | "large"',
    isRequired: false,
    description: (
      <>
        Size of the pagination component based on{" "}
        <a href="https://getbootstrap.com/docs/5.3/components/pagination/#sizing">
          CSS classes provided by Bootstrap
        </a>
        . Set <code>small</code> for <code>pagination-sm</code> or{" "}
        <code>large</code> for <code>pagination-lg</code>. Set{" "}
        <code>medium</code> or do not set the property for no additional CSS
        class, which will result in size between that of the{" "}
        <code>pagination-sm</code> and <code>pagination-lg</code> sizes.
      </>
    ),
  },
  {
    propertyName: "pageSelectorAriaLabel",
    typeDefinition: "string",
    isRequired: false,
    description: (
      <>
        The <code>aria-label</code> attribute of the <i>nav</i> element of the
        Bootstrap pagination component.
      </>
    ),
  },
  {
    propertyName: "pageSelectorJustifyContent",
    typeDefinition:
      '"start" | "end" | "center" | "between" | "around" | "evenly"',
    isRequired: false,
    description: (
      <>
        Applies the flexbox justify-content utility to <i>ul</i> element of the
        Bootstrap pagination component to align the pagination links in the
        enclosing <i>nav</i> element. See the{" "}
        <a href="https://getbootstrap.com/docs/5.3/components/pagination/#alignment">
          examples
        </a>{" "}
        on the Bootstrap documentation site.
      </>
    ),
  },
];

import { SpecTableRow } from "@/shared/TypeSpecTable";

export const additionalComponentsStyleModel: SpecTableRow[] = [
  {
    propertyName: "topLevelDiv",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        <p>
          Additional CSS classes for the top level <i>div</i> element that
          contains, the follow order:
        </p>
        <ul>
          <li>The filter options table (if filtering is enabled)</li>
          <li>
            The toggle button that shows and hides the filter options table (if
            filtering is enabled)
          </li>
          <li>The main table for displaying data</li>
          <li>The pagination component (if pagination is enabled)</li>
        </ul>
      </>
    ),
  },
  {
    propertyName: "filterUiToggleButton",
    typeDefinition: "string[]",
    isRequired: false,
    description: (
      <>
        Additional CSS classes for the button that toggles the visibility of the
        filter options table. Only appears if filtering is enabled (by supplying
        the <code>filterModel</code> prop) on the <code>Grid</code> component.
      </>
    ),
  },
];

"use client";

import { FC } from "react";
import TypeSpecTable from "@/shared/TypeSpecTable";
import {
  additionalComponentsStyleModel,
  filterInputTableStyleModel,
  styleModel,
  tableStyleModel,
} from "@/app/styling/typeSpecs";
import HighlightedTsCodeBlock from "@/shared/HighlightedTsCodeBlock";
import sampleStyledGridCode from "@/app/styling/sampleStyledGridCode";
import dynamic from "next/dynamic";
import SampleStyledInputsGrid from "@/app/styling/SampleStyledInputsGrid";
import sampleStyledInputsGridCode from "@/app/styling/sampleStyledInputsGridCode";

const SampleStyledGrid = dynamic(
  () => import("@/app/styling/SampleStyledGrid"),
  { ssr: false },
);

const Styling: FC = () => {
  return (
    <>
      <h1>Styling</h1>
      <p>
        There are three primary ways of applying custom styles to the components
        of React Bootstrap Data Grid:
      </p>
      <dl>
        <dt>Bootstrap Variable Overrides</dt>
        <dd>
          Because React Bootstrap Data Grid makes heavy use of Bootstrap CSS
          classes and variables, it should also obey{" "}
          <a href="https://getbootstrap.com/docs/5.3/customize/sass/#variable-defaults">
            customization of Bootstrap via variable overrides.
          </a>{" "}
          For example, setting a new <code>primary</code> theme color with an
          SCSS variable will cause buttons of the <code>primary</code> variant
          in React Bootstrap Data Grid to be the new color as well.
          Additionally, setting the <code>$table-cell-vertical-align</code>{" "}
          variable can be used to adjust the vertical alignment of table cells
          from the default of <code>top</code>.
        </dd>
        <dt>Specific Members of Props in React Bootstrap Data Grid</dt>
        <dd>
          A small number of options that are set via properties of component
          props are implemented via CSS classes. Currently, the only properties
          of this type are the <code>pageSelectorJustifyContent</code> and{" "}
          <code>componentSize</code> properties of the{" "}
          <code>GridPaginationState</code> interface. These properties set the
          component size and flexbox justify content settings of the{" "}
          <a href="https://getbootstrap.com/docs/5.3/components/pagination/">
            Bootstrap pagination component
          </a>
          , respectively.
        </dd>
        <dt>Injection of Custom Classes via the StyleModel Prop</dt>
        <dd>
          The <code>StyleModel</code> prop contains a fairly extensive of list
          of properties that correspond to HTML elements in various parts of
          React Bootstrap Data Grid. These properties either contain arrays of
          strings that are CSS classes or functions that return an array of such
          strings.
        </dd>
      </dl>
      <h2>Type Definitions</h2>
      <h3>StyleModel</h3>
      <p>
        A prop of this type is optionally passed to the <code>Grid</code>{" "}
        component to enable injection of custom CSS classes.
      </p>
      <TypeSpecTable rows={styleModel} />
      <h3>TableStyleModel</h3>
      <p>
        Properties of this type are used to inject custom CSS classes into the
        main table of the <code>Grid</code> component.
      </p>
      <p>
        When more than one of a certain kind of element exists, a function is
        used to specify different classes based on the index of the element.
        Certain parameters are common to many different properties:
      </p>
      <dl>
        <dt>
          <code>origIndex</code> and <code>origRowIndex</code>
        </dt>
        <dd>
          Refers to the index of a row as it is passed into the{" "}
          <code>rows</code> prop of the <code>Grid</code> component.
        </dd>
        <dt>
          <code>displayIndex</code>
        </dt>
        <dd>
          Refers to the index of the row as it is displayed in the table, after
          sorting, pagination, and filtering are applied.
        </dd>
        <dt>
          <code>colIndex</code>
        </dt>
        <dd>
          Refers to the index of a column as it corresponds to the{" "}
          <code>cols</code> prop passed into the <code>Grid</code> component.
        </dd>
      </dl>
      <TypeSpecTable rows={tableStyleModel} />
      <h3>FilterInputTableStyleModel</h3>
      <p>
        Properties of this type are used to inject custom CSS classes into the
        filter options table of the <code>Grid</code> component.
      </p>
      <p>
        Like the <code>TableStyleModel</code> type, for certain kinds of
        elements there are more than one of that kind and function parameters
        are used to specify classes differently for different elements.
      </p>
      <dl>
        <dt>
          <code>index</code>
        </dt>
        <dd>
          Zero-based index that refers to the row of filter options as it
          appears in the UI. The order in which the rows appear is the same as
          the order corresponding columns in the <code>cols</code> prop to the{" "}
          <code>Grid</code> component, except that only filterable rows are
          included.
        </dd>
        <dt>
          <code>colIndex</code>
        </dt>
        <dd>
          Zero-based index that refers to the columns of the filter options
          table. The columns are fixed regardless of the contents of options
          passed to the <code>Grid</code> and are as follows:
          <ol start={0}>
            <li>
              Enabled - contains checkbox controls to enable or disable
              filtering on a column
            </li>
            <li>Column - contains the name of the column</li>
            <li>
              Type - contains a string indicating the type of the column (e.g.
              String or Date)
            </li>
            <li>
              Operator - contains a selection input to choose operator used to
              apply filtering
            </li>
            <li>Value - contains inputs to adjust the values to filter on</li>
          </ol>
        </dd>
      </dl>
      <TypeSpecTable rows={filterInputTableStyleModel} />
      <h3>AdditionalComponentsStyleModel</h3>
      <TypeSpecTable rows={additionalComponentsStyleModel} />
      <h2>Examples</h2>
      <h3>Colors and Alignment Example</h3>
      <h4>Code</h4>
      <HighlightedTsCodeBlock code={sampleStyledGridCode} />
      <h4>Live Demo</h4>
      <SampleStyledGrid />
      <h3>Inputs and Display Order Example</h3>
      <h4>Code</h4>
      <HighlightedTsCodeBlock code={sampleStyledInputsGridCode} />
      <h4>Live Demo</h4>
      <SampleStyledInputsGrid />
    </>
  );
};

export default Styling;

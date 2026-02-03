import { FC } from "react";
import TypeSpecTable from "@/shared/TypeSpecTable";
import { styleModel, tableStyleModel } from "@/shared/typeSpecs";

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
      <h2>Injection of Custom Classes</h2>
      <h3>Type Definitions</h3>
      <h4>StyleModel</h4>
      <p>
        A prop of this type is optionally passed to the <code>Grid</code>{" "}
        component to enable injection of custom CSS classes.
      </p>
      <TypeSpecTable rows={styleModel} />
      <h4>TableStyleModel</h4>
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
    </>
  );
};

export default Styling;

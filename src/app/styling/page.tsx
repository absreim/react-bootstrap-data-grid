import { FC } from "react";
import { GridPaginationState } from "@/grid";

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
    </>
  );
};

export default Styling;

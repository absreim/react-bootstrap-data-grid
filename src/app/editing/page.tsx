import { FC } from "react";
import SampleEditableGridContainer from "@/app/editing/SampleEditableGridContainer";
import HighlightedTsCodeBlock from "@/shared/HighlightedTsCodeBlock";
import sampleEditableGridContainerCode from "@/app/editing/sampleEditableGridContainerCode";
import TypeSpecTable from "@/shared/TypeSpecTable";
import { editModel } from "@/shared/typeSpecs";

const Editing: FC = () => {
  return (
    <>
      <h1>Editing</h1>
      <p>
        React Bootstrap Data Grid provides an opinionated interface to edit
        entire rows of cells at a time.
      </p>
      <p>
        When enabled, controls to start editing, cancel editing, save changes,
        and delete rows are provided in special Edit Controls table column.
      </p>
      <p>
        When the user starts editing a row by pushing the Edit button, the
        contents of the cells for that row turn into form inputs.
      </p>
      <p>
        Editing is enabled by passing an <code>editModel</code> prop to the{" "}
        <code>Grid</code> component. One can additionally enable deletion by
        passing an optional <code>getDeleteCallback</code> member inside the{" "}
        <code>editModel</code>.
      </p>
      <p>
        It is the responsibility of the parent component that contains the{" "}
        <code>Grid</code> to provide callback functions that actually act upon
        user interactions with the UI to edit or delete a row. In addition, it
        is the responsibility of the parent component to provide some kind of
        safeguard against accidental deletions (such as a confirmation dialog.)
      </p>
      <p>
        Since null values are not supported by React Bootstrap Data Grid for
        now, for a row to be updated successfully, there should be a valid value
        for <code>number</code>, <code>date</code>, and <code>datetime</code>{" "}
        fields. For these three column types, the <code>Grid</code> will invoke
        a form validation error (using the form validation feature of the
        browser) when trying to use a blank string to update a field of one of
        these types. Since a blank string (<code>{'""'}</code>) is a valid string,
        the <code>Grid</code> will accept blank strings as input for{" "}
        <code>string</code> columns.
      </p>
      <h2>Type Definitions</h2>
      <h3>EditModel</h3>
      Omitting this prop from the <code>Grid</code> component disables the
      editing feature.
      <TypeSpecTable rows={editModel} />
      <h3>UpdateCallbackGenerator</h3>
      <p>
        This type is that of the function passed into EditModel for generating a
        callback function on a per-index basis. The defintion is{" "}
        <code>{"(origIndex: number) => (rowDef: RowDef) => void"}</code>.
      </p>
      <p>
        See the example below to see how this property is typically implemented.
      </p>
      <h2>Example</h2>
      <h3>Code</h3>
      <HighlightedTsCodeBlock code={sampleEditableGridContainerCode} />
      <h3>Live Demo</h3>
      <SampleEditableGridContainer />
    </>
  );
};

export default Editing;

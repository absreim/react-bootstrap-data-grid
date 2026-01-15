import { FC } from "react";
import SampleMultiSelectGridContainer from "@/app/selection/SampleMultiSelectGridContainer";
import SampleSingleSelectGridContainer from "@/app/selection/SampleSingleSelectGridContainer";
import HighlightedCodeBlock from "@/shared/HighlightedCodeBlock";
import sampleMultiSelectGridCode from "@/app/selection/sampleMultiSelectGridCode";
import sampleSingleSelectGridCode from "@/app/selection/sampleSingleSelectGridCode";
import TypeSpecTable from "@/shared/TypeSpecTable";
import { multiSelectMode, singleSelectMode } from "@/shared/typeSpecs";
import ExternalInteractionExample from "@/app/selection/ExternalInteractionExample";
import externalInteractionExampleCode from "@/app/selection/externalInteractionExampleCode";
import Alert from "react-bootstrap/Alert";

const Selection: FC = () => {
  return (
    <>
      <h1>Selection</h1>
      <p>
        React Bootstrap Data Grid provides functionality for the user to select
        and deselect rows in a <code>Grid</code> component.
      </p>
      <p>
        A <code>Grid</code> can be configured to configured to allow or disallow
        selection. If allowed, it can be configured to either allow selection of
        one row at a time or multiple rows at a time.
      </p>
      <p>
        In addition, after configuring whether to allow single or multiple
        selection, it can be configured to allow selection by clicking on a row,
        by clicking on a radio or checkbox (single and multiple selection,
        respectively) for each row, or both.
      </p>
      <p>
        If radio or checkbox selection is enabled (including the "both" option),
        the header cell for the column that contains radio or checkbox selection
        inputs will be clickable. Clicking on it will deselect any existing
        selected rows if there is currently one or more rows selected. If no
        rows are selected, clicking on the header cell selects all rows if
        multiple selection is enabled. If single selection is enabled while no
        existing row is selected, clicking on the header cell does nothing.
      </p>
      <h2>Type Definitions</h2>
      <h3>SelectModel</h3>
      <p>
        Objects of type <code>SelectModel</code> are used to enable selection
        for a <code>Grid</code>, specify the mode (single vs multi), type (row,
        column, or both), and contain the state that keeps track of what rows
        are selected. Selected rows are tracked by original index of each row
        inside the array that is passed into <code>Grid</code>.
      </p>
      <p>
        A <code>SelectModel</code> is one of two interfaces,{" "}
        <code>SingleSelectModel</code> and <code>MultiSelectModel</code>, for
        single selection and multiple selection modes, respectively.
      </p>
      <h3>MultiSelectModel</h3>
      <TypeSpecTable rows={multiSelectMode} />
      <h3>SingleSelectModel</h3>
      <TypeSpecTable rows={singleSelectMode} />
      <h3>SelectMode</h3>
      <p>A union of values that indicate the mode of selection.</p>
      <dl>
        <dt>row</dt>
        <dd>
          Selection can only be done by clicking on the row. Selected rows are
          highlighted and when the mouse hovers over a row, the row is also
          highlighted (in a color different from that of selected rows.)
        </dd>
        <dt>column</dt>
        <dd>
          Selection can only be done by clicking on inputs elements in a
          dedicated column. Choosing this mode also enables a header cell that
          offers to select all or deselect all rows (exact functionality depends
          on the selection type, single or multi).
        </dd>
        <dt>both</dt>
        <dd>
          If this mode is chosen, functionality from both <code>row</code> and{" "}
          <code>column</code> modes will be active at the same time.
        </dd>
      </dl>
      <h2>Examples</h2>
      <h3>External Interaction</h3>
      <p>
        To have your app act on selected elements, simply read the row indices
        from the state that is passed down in your parent component and do
        something with it.
      </p>
      <h4>Code</h4>
      <HighlightedCodeBlock code={externalInteractionExampleCode} />
      <h4>Live Demo</h4>
      <ExternalInteractionExample />
      <h3>Multiple Selection Mode</h3>
      <h4>Code</h4>
      <HighlightedCodeBlock code={sampleMultiSelectGridCode} />
      <h4>Live Demo</h4>
      <SampleMultiSelectGridContainer />
      <h3>Single Selection Mode</h3>
      <h4>Code</h4>
      <HighlightedCodeBlock code={sampleSingleSelectGridCode} />
      <h4>Live Demo</h4>
      <SampleSingleSelectGridContainer />
    </>
  );
};

export default Selection;

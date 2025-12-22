import { FC } from "react";
import SampleFilteredGrid from "@/app/filtering/SampleFilteredGrid";
import HighlightedCodeBlock from "@/shared/HighlightedCodeBlock";
import sampleFilteredGridCode from "@/app/filtering/sampleFilteredGridCode";
import TypeSpecTable from "@/shared/TypeSpecTable";
import {
  abstractDateFilterState,
  abstractFilterState,
  betweenDatesFilterState,
  endDateFilterState,
  filterModel,
  numberFilterState,
  startDateFilterState,
  stringFilterState,
} from "@/shared/typeSpecs";

const Filtering: FC = () => {
  return (
    <>
      <h1>Filtering</h1>
      <p>
        React Bootstrap Data Grid provides an interface to filter rows by
        specifying various criteria across one or more columns.
      </p>
      <p>
        Like other optional features in React Bootstrap Data Grid, filtering is
        implemented in an externally-controlled manner. More specifically, the
        initial state of the UI, a state store (often implemented via a{" "}
        <code>useState</code> hook, as well as a function to update the state
        need to be provided externally via the <code>filterModel</code> prop in
        the <code>Grid</code> component.
      </p>
      <p>
        Supplying the <code>filterModel</code> prop will enable filtering for
        the Grid, while omitting it will disable filtering.
      </p>
      <p>
        To control which columns are filterable and which are not, simply omit
        columns from the <code>filterModel</code> if you do not want the user to
        filter on them.
      </p>
      <h2>Type Definitions</h2>
      <h3>FilterModel</h3>
      <p>
        <code>FilterModel</code> is the type of the prop passed to{" "}
        <code>Grid</code> to enable filtering.
      </p>
      <TypeSpecTable rows={filterModel} />
      <h3>EditableTableFilterState</h3>
      <p>
        <code>EditableTableFilterState</code> contains the state of the
        filtering UI for an entire <code>Grid</code> and has the type defintion{" "}
        <code>{"Record<string, FilterState>"}</code>.
      </p>
      <h3>FilterState</h3>
      <p>
        <code>FilterState</code> represents the state of the filtering UI for a
        single column. There are three types of <code>FilterState</code> that
        represent different column types. It has the type definition{" "}
        <code>{"StringFilterState | NumberFilterState | DateFilterState"}</code>
        .
      </p>
      <h3>AbstractFilterState</h3>
      <p>
        Each type of <code>FilterState</code> extends{" "}
        <code>AbstractFilterState</code>, which provides a parameter to record
        the fact of whether the filter for a particular column is enabled or
        disabled.
      </p>
      <TypeSpecTable rows={abstractFilterState} />
      <h3>StringFilterState</h3>
      <p>The first type of filter state is for string columns.</p>
      <TypeSpecTable rows={stringFilterState} />
      <h3>StringFilterScheme</h3>
      <p>
        The <code>StringFilterScheme</code> specifies the type of filter to
        apply for string columns and has the following possible values and
        corresponding behaviors:
      </p>
      <dl>
        <dt>contains</dt>
        <dd>
          {
            "Does not filter out the column if the substring is present anywhere in the cells value"
          }
        </dd>
        <dt>startsWith</dt>
        <dd>
          {
            "Filters out the column unless the cell's value starts with the specified string"
          }
        </dd>
        <dt>endsWith</dt>
        <dd>
          {
            "Filters out the column unless the cell's value ends with the specified string"
          }
        </dd>
      </dl>
      <h3>NumberFilterState</h3>
      <p>The second type of filter state is for number columns.</p>
      <TypeSpecTable rows={numberFilterState} />
      <h3>NumberFilterScheme</h3>
      <p>
        The <code>NumberFilterScheme</code> specifies the type of filter to
        apply for number columns and has the following possible values and
        corresponding behaviors:
      </p>
      <dl>
        <dt>equals</dt>
        <dd>
          {
            "Filters out the column unless the cell's value is equal to the specified value"
          }
        </dd>
        <dt>greaterThan</dt>
        <dd>
          {
            "Filters out the column unless the cell's value is greater than the specified value"
          }
        </dd>
        <dt>lessThan</dt>
        <dd>
          {
            "Filters out the column unless the cell's value is less than the specified value"
          }
        </dd>
        <dt>greaterOrEqual</dt>
        <dd>
          {
            "Filters out the column unless the cell's value is greater than or equal to the specified value"
          }
        </dd>
        <dt>lessOrEqual</dt>
        <dd>
          {
            "Filters out the column unless the cell's value is less than or equal to the specified value"
          }
        </dd>
      </dl>
      <h3>DateFilterState</h3>
      <p>
        The third type of filter state is for both date and datetime columns. It
        is one of the following 3 subtypes, representing different filter types:
      </p>
      <dl>
        <dt>StartDateFilterState</dt>
        <dd>
          {
            "The row is filtered out unless the cell's value is the same as or after the specified date."
          }
        </dd>
        <dt>EndDateFilterState</dt>
        <dd>
          {
            "The row is filtered out unless the cell's value is the same as or before the specified date."
          }
        </dd>
        <dt>BetweenDatesFilterState</dt>
        <dd>
          {
            "The row is filtered out unless the cell's value is between the specified dates, inclusive."
          }
        </dd>
      </dl>
      <p>
        Note that in terms of timezones, the grid follows the{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#:~:text=When%20the%20time%20zone%20offset%20is%20absent%2C%20date%2Donly%20forms%20are%20interpreted%20as%20a%20UTC%20time%20and%20date%2Dtime%20forms%20are%20interpreted%20as%20a%20local%20time.">
          default behavior of the JavaScript Date constructor when parsing the
          values from browser date and datetime-local inputs.
        </a>{" "}
        In particular, the <code>Date</code> objects used for comparing dates{" "}
        <i>are in UTC</i> while the <code>Date</code> objects for comparing
        datetimes <i>are in the client browser&apos;s local timezone.</i> This
        means that when supplying the <code>Grid</code> with date and datetime
        data, you probably want to use <code>Date</code> objects for dates in
        UTC and <code>Date</code> objects for datetimes in the client&apos;s
        local timezone.
      </p>
      <h3>AbstractDateFilterState</h3>
      <p>
        All three date filter state types inherit from{" "}
        <code>AbstractDateFilterState</code>, which differentiates between date
        and datetime columns and between different filter schemes.
      </p>
      <p>
        Note that for now, there is no difference in filter behavior between
        date and datetime columns.
      </p>
      <TypeSpecTable rows={abstractDateFilterState} />
      <h3>StartDateFilterState</h3>
      <TypeSpecTable rows={startDateFilterState} />
      <h3>EndDateFilterState</h3>
      <TypeSpecTable rows={endDateFilterState} />
      <h3>BetweenDatesFilterState</h3>
      <TypeSpecTable rows={betweenDatesFilterState} />
      <h2>Example</h2>
      <h3>Code</h3>
      <HighlightedCodeBlock code={sampleFilteredGridCode} />
      <h3>Live Demo</h3>
      <SampleFilteredGrid />
    </>
  );
};

export default Filtering;

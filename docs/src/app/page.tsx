import BasicSampleGrid from "@/app/BasicSampleGrid";
import basicSampleGridCode from "@/app/BasicSampleGridCode";
import HighlightedTsCodeBlock from "@/shared/HighlightedTsCodeBlock";
import HighlightScssCodeBlock from "@/shared/HighlightScssCodeBlock";
import bootstrapScssImportCode from "@/app/bootstrapScssImportCode";
import styleScssImportCode from "@/app/styleScssImportCode";
import styleScssDirectImportCode from "@/app/styleScssDirectImportCode";
import styleCssDirectImportCode from "@/app/styleCssDirectImportCode";

export default function Home() {
  return (
    <>
      <h1>Introduction</h1>
      <p>Welcome to the documentation for React Boostrap Data Grid!</p>
      <p>
        Inspired by{" "}
        <a href="https://react-bootstrap-table.github.io/react-bootstrap-table2/">
          react-bootstrap-table2
        </a>{" "}
        and <a href="https://mui.com/x/react-data-grid/">MUI X Data Grid</a>,
        React Bootstrap Data Grid aims to fill the specific niche of a data grid
        UI component for the combination of Bootstrap and React.
      </p>
      <h1>Getting Started</h1>
      <h2>NPM Package Installation</h2>
      <p>
        React Bootstrap Data Grid is published as an npm package with the name{" "}
        <code>@absreim/react-bootstrap-data-grid</code>.
      </p>
      <p>
        To add the component to you project, install it with your package
        manager of choice.
      </p>
      <p>For example:</p>
      <p>
        <code>npm install @absreim/react-bootstrap-data-grid</code>
      </p>
      <h2>Dependency on Bootstrap</h2>
      <p>
        React Bootstrap Data Grid is designed to work with CSS styles from
        Bootstrap version 5 or later. If you project does not already include
        Bootstrap, install it according to the installation instructions in the
        official documentation. More specifically, since React Bootstrap Data
        Grid is designed to work with projects using a package manager like NPM,
        you will most likely want to follow the{" "}
        <a href="https://getbootstrap.com/docs/5.3/getting-started/download/#package-managers">
          installation instructions for installing Bootstrap using a package
          manager
        </a>
        .
      </p>
      <p>
        If you are only including Bootstrap partially in your project, note that
        React Bootstrap Data Grid currently depends on the following Sass
        imports among{" "}
        <a href="https://getbootstrap.com/docs/5.3/customize/optimize/">
          the list of Sass imports
        </a>
        .
      </p>
      <HighlightScssCodeBlock code={bootstrapScssImportCode} />
      <h2>Styles Specific to React Bootstrap Data Grid</h2>
      React Bootstrap Data Grid contains styles of it&apos;s own that are
      distributed as an SCSS file and CSS file. Depending on whether your
      project is using SCSS or CSS, add in the appropriate import. The following
      code examples are for NextJS. Only one of the following three options is
      needed.
      <h3>Import the SCSS file in another SCSS file</h3>
      <HighlightScssCodeBlock code={styleScssImportCode} />
      <h3>Import the SCSS file in a TSX file</h3>
      <HighlightedTsCodeBlock code={styleScssDirectImportCode} />
      <h3>Import the CSS file in a TSX file</h3>
      <HighlightedTsCodeBlock code={styleCssDirectImportCode} />
      <h2>Using the Component in Your Project</h2>
      <p>
        Once the React Bootstrap Data Grid and Bootstrap are both installed,
        define rows and columns for a grid according to the following example:
      </p>
      <section>
        <h3>Code</h3>
        <HighlightedTsCodeBlock code={basicSampleGridCode} />
        <h3>Live Demo</h3>
        <BasicSampleGrid />
      </section>
      <h1>Further information</h1>
      <ul>
        <li>
          See the source code in the project&apos;s{" "}
          <a href="https://github.com/absreim/react-bootstrap-data-grid">
            GitHub repo
          </a>
          .
        </li>
        <li>
          The project is under active development. See the{" "}
          <a href="https://github.com/users/absreim/projects/2/views/1">
            development roadmap
          </a>
          .
        </li>
        <li>
          See the{" "}
          <a href="https://www.npmjs.com/package/@absreim/react-bootstrap-data-grid">
            page for the published NPM package
          </a>{" "}
          in case you are curious about download statistics.
        </li>
        <li>
          If you have a question, concern, or suggestion, feel free to create a
          GitHub issue on the repo&apos;s{" "}
          <a href="https://github.com/absreim/react-bootstrap-data-grid/issues">
            issue page
          </a>
          .
        </li>
      </ul>
      <h1>Change Log</h1>
      <h2>1.4.0</h2>
      <p>February 9, 2026</p>
      <p>
        This release adds a feature that allows the developer to specify CSS
        classes for various components of the Grid. Details can be found under
        the <i>Styling</i> section of the documentation.
      </p>
      <p>This release also contains various relatively minor bug fixes.</p>
      <h2>1.3.0</h2>
      <p>January 28, 2026</p>
      <p>
        This release adds a feature that allows a user to edit the contents of
        rows.
      </p>
      <h2>1.2.2</h2>
      <p>January 19, 2026</p>
      <p>
        This release contains bug fixes, documentation updates, and other
        enhancements.
      </p>
      <ul>
        <li>
          Fixed an issue where the distributed NPM package was not working
          NextJS due to the output preserving JSX sytnax
        </li>
        <li>
          Styles specific to React Bootstrap Data Grid were not being
          distributed with the NPM package. They are now included, and
          documentation has been updated to give examples on how to import them.
        </li>
        <li>
          Adjusted class names for styles specific to React Bootstrap Data Grid
          to have a &quot;rbdg&quot; prefix to distinguish them from class names
          from other sources.
        </li>
      </ul>
      <h2>1.2.1</h2>
      <p>January 16, 2026</p>
      <p>
        Selection feature no longer in experimental state due to it now having
        an automated test suite. Fixed a bug involving accessibility for the
        selection feature.
      </p>
      <h2>1.2.0</h2>
      <p>January 14, 2026</p>
      <p>Added Selection feature, but in an experimental state.</p>
      <h2>1.1.4</h2>
      <p>December 29, 2025</p>
      <p>
        Changed behavior of pagination feature when selecting a new page size
        that would make the existing index out-of-bounds. The index will be set
        to the maximum available for the page size.
      </p>
      <h2>1.1.3</h2>
      <p>December 23, 2025</p>
      <p>
        Fixed bug with datetime filter functionality involving timezones and
        updated documentation to explain how filtering works with timezones.
      </p>
      <h2>1.1.2</h2>
      <p>December 20, 2025</p>
      <p>Fixed bug that prevented filtering from working at all.</p>
      <h2>1.1.1</h2>
      <p>December 20, 2025</p>
      <p>
        Change React keys of rows to be based on original ordering in order to
        improve rendering performance when using pagination and sorting.
      </p>
      <h2>1.1.0</h2>
      <p>December 18, 2025</p>
      <p>Added filtering feature.</p>
      <h2>1.0.0</h2>
      <p>December 17, 2025</p>
      <p>
        Added <i>aria-colindex</i> and <i>aria-rowindex</i> attributes to
        improve accessibility and facilitate testing.
      </p>
      <p>
        Bumped peer dependency of package to React 19.{" "}
        <b>This change may break projects still using React 18.</b>
      </p>
      <p>
        Migrated tests to Playwright due to limitations introduced by more
        recent versions of React Testing Library.
      </p>
      <h2>0.1.4</h2>
      <p>May 9, 2024</p>
      <p>Added sorting feature.</p>
      <p>Added syntax highlighting to code blocks in documentation.</p>
      <h2>0.1.3</h2>
      <p>Apr. 18, 2024</p>
      <p>Added pagination feature.</p>
      <h2>0.1.2</h2>
      <p>Mar. 14, 2024</p>
      <p>
        Added automated tests and a build script to generate files meant for
        publishing as an NPM package.
      </p>
      <h2>0.1.0</h2>
      <p>Feb. 27, 2024</p>
      <p>
        Initial release with baseline row definition, column definition, and
        data display functionality.
      </p>
    </>
  );
}

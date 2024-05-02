import BasicSampleGrid from "@/app/BasicSampleGrid";
import BasicSampleGridCode from "@/app/BasicSampleGridCode";

export default function Home() {
  return (
    <>
      <h1>Introduction</h1>
      <p>Welcome to documentation for React Boostrap Data Grid!</p>
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
        React Bootstrap Data Grid currently only depends on the <i>tables</i>{" "}
        Sass import among{" "}
        <a href="https://getbootstrap.com/docs/5.3/customize/optimize/">
          the list of Sass imports
        </a>
        .
      </p>
      <h2>Using the Component in Your Project</h2>
      <p>
        Once the React Bootstrap Data Grid and Bootstrap are both installed,
        define rows and columns for a grid according to the following example:
      </p>
      <section>
        <h3>Code</h3>
        <BasicSampleGridCode />
        <h3>Live Demo</h3>
        <BasicSampleGrid />
      </section>
      <h1>Change Log</h1>
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

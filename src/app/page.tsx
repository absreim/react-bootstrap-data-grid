import BasicSampleGrid from "@/app/BasicSampleGrid";

export default function Home() {
  return (
    <main>
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
      <p>
        React Bootstrap Data Grid is published as an npm package with the name
        {" "}<code>@absreim/react-bootstrap-data-grid</code>.
      </p>
      <p>
        To add the component to you project, install it with your package manager
        of choice.
      </p>
      <p>For example:</p>
      <p><code>npm install @absreim/react-bootstrap-data-grid</code></p>
      <p>Once installed, define rows and columns for a grid according to the
      following example:</p>
      <BasicSampleGrid />
      <h1>Change Log</h1>
      <h2>0.1.2</h2>
      <p>Mar. 14, 2024</p>
      <p>Added automated tests and a build script to generate files meant for
      publishing as an NPM package.</p>
      <h2>0.1.0</h2>
      <p>Feb. 27, 2024</p>
      <p>
        Initial release with baseline row definition, column definition, and
        data display functionality.
      </p>
    </main>
  );
}

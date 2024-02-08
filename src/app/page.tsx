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
        React Bootstrap Data Grid is not yet published as an npm package, but
        the following example illustrates the likely usage of the module once it
        is published.
      </p>
      <BasicSampleGrid />
      <h1>Change Log</h1>
      <h2>0.1.0</h2>
      <p>Feb. 27, 2024</p>
      <p>
        Initial release with baseline row definition, column definition, and
        data display functionality.
      </p>
    </main>
  );
}

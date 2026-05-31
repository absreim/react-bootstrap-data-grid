import { FC } from "react";
import ExportTestHarness from "@/app/export/ExportTestHarness";

const TestDivs: FC<{ pro?: boolean }> = ({ pro }) => (
  <>
    <div data-testid="options disabled test container">
      <ExportTestHarness
        enableFiltering={false}
        enablePagination={false}
        enableFormatters={false}
        enableStyles={false}
        pro={pro}
      />
    </div>
    <div data-testid="options enabled test container">
      <ExportTestHarness
        enableFiltering={true}
        enablePagination={true}
        enableFormatters={true}
        enableStyles={false}
        pro={pro}
      />
    </div>
    <div data-testid="styles test container">
      <ExportTestHarness
        enableFiltering={true}
        enablePagination={true}
        enableFormatters={true}
        enableStyles={true}
        pro={pro}
      />
    </div>
  </>
);

export default TestDivs;

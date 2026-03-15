import { FC } from "react";
import ExportTestHarness from "@/app/export/ExportTestHarness";

const Page: FC = () => {
  return (
    <>
      <div data-testid="options disabled test container">
        <ExportTestHarness
          enableFiltering={false}
          enablePaginaton={false}
          enableFormatters={false}
          enableStyles={false}
        />
      </div>
      <div data-testid="options enabled test container">
        <ExportTestHarness
          enableFiltering={true}
          enablePaginaton={true}
          enableFormatters={true}
          enableStyles={false}
        />
      </div>
      <div data-testid="styles test container">
        <ExportTestHarness
          enableFiltering={true}
          enablePaginaton={true}
          enableFormatters={true}
          enableStyles={true}
        />
      </div>
    </>
  );
};

export default Page;

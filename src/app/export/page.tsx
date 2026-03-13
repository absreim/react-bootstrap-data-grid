import { FC } from "react";
import ExportTestHarness from "@/app/export/ExportTestHarness";

const Page: FC = () => {
  return (
    <>
      <ExportTestHarness
        enableFiltering={true}
        enablePaginaton={true}
        enableFormatters={true}
      />
    </>
  );
};

export default Page;

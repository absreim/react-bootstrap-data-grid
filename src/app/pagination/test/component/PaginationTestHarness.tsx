import { PaginationProps } from "@/grid";
import { FC, useEffect, useState } from "react";
import PageSelector from "@/grid/pagination/PageSelector";

type PaginationTestHarnessProps = Omit<PaginationProps, "setPageNum">;

const PaginationTestHarness: FC<PaginationTestHarnessProps> = ({
  pageNum,
  ...props
}) => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  useEffect(() => {
    setCurrentPageNum(pageNum);
  }, [pageNum]);

  return (
    <PageSelector
      {...props}
      pageNum={currentPageNum}
      setPageNum={(pageNum: number) => setCurrentPageNum(pageNum)}
    />
  );
};

export default PaginationTestHarness;

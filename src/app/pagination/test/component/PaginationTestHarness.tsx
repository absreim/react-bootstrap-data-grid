import { PaginationProps } from "@/grid";
import { FC, useEffect, useState } from "react";
import Pagination from "@/grid/Pagination";

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
    <Pagination
      {...props}
      pageNum={currentPageNum}
      setPageNum={(pageNum: number) => setCurrentPageNum(pageNum)}
    />
  );
};

export default PaginationTestHarness;

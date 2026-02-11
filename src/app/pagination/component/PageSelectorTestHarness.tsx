import { FC, useEffect, useState } from "react";
import PageSelector, {
  PageSelectorProps,
} from "@/grid/pagination/PageSelector";

type PageSelectorTestHarnessProps = Omit<PageSelectorProps, "setPageNum">;

const PageSelectorTestHarness: FC<PageSelectorTestHarnessProps> = ({
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

export default PageSelectorTestHarness;

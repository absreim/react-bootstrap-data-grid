import { FC, useState } from "react";
import PageSelector, {
  PageSelectorProps,
} from "../../../common/pagination/PageSelector";

type PageSelectorTestHarnessProps = Omit<PageSelectorProps, "setPageNum">;

const PageSelectorTestHarness: FC<PageSelectorTestHarnessProps> = ({
  pageNum,
  ...props
}) => {
  const [currentPageNum, setCurrentPageNum] = useState(pageNum);

  return (
    <PageSelector
      {...props}
      pageNum={currentPageNum}
      setPageNum={(pageNum: number) => setCurrentPageNum(pageNum)}
    />
  );
};

export default PageSelectorTestHarness;

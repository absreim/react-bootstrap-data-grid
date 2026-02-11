"use client";

import { FC } from "react";
import PageSelector from "@/grid/pagination/PageSelector";
import PageSelectorTestHarness from "@/app/pagination/test/component/PageSelectorTestHarness";

const Test: FC = () => {
  return (
    <>
      <div data-testid="component test container">
        <div data-testid="even number of buttons test case">
          <PageSelector
            numPages={10}
            pageNum={5}
            numButtons={4}
            setPageNum={() => {}}
          />
        </div>
        <div data-testid="fewer pages than buttons test case">
          <PageSelector
            numPages={3}
            pageNum={2}
            numButtons={4}
            setPageNum={() => {}}
          />
        </div>
        <div data-testid="symmetrical button list test case">
          <PageSelector
            numPages={10}
            pageNum={5}
            numButtons={3}
            setPageNum={() => {}}
          />
        </div>
        <div data-testid="broken symmetry test case">
          <PageSelector
            numPages={10}
            pageNum={2}
            numButtons={5}
            setPageNum={() => {}}
          />
        </div>
        <div data-testid="first page link test case">
          <PageSelector
            numPages={10}
            pageNum={7}
            numButtons={3}
            setPageNum={() => {}}
          />
        </div>
        <div data-testid="prev page link test case">
          <PageSelector
            numPages={10}
            pageNum={7}
            numButtons={3}
            setPageNum={() => {}}
          />
        </div>
        <div data-testid="last page link test case">
          <PageSelector
            numPages={10}
            pageNum={5}
            numButtons={3}
            setPageNum={() => {}}
          />
        </div>
        <div data-testid="next page link test case">
          <PageSelector
            numPages={10}
            pageNum={2}
            numButtons={3}
            setPageNum={() => {}}
          />
        </div>
      </div>
      <div data-testid="pagination interaction test container">
        <div data-testid="index link click test case">
          <PageSelectorTestHarness numPages={5} pageNum={1} numButtons={5} />
        </div>
        <div data-testid="prev link click test case">
          <PageSelectorTestHarness numPages={10} pageNum={2} numButtons={5} />
        </div>
        <div data-testid="first link click test case">
          <PageSelectorTestHarness numPages={10} pageNum={5} numButtons={3} />
        </div>
        <div data-testid="next link click test case">
          <PageSelectorTestHarness numPages={10} pageNum={2} numButtons={5} />
        </div>
        <div data-testid="last link click test case">
          <PageSelectorTestHarness numPages={10} pageNum={5} numButtons={3} />
        </div>
      </div>
    </>
  );
};

export default Test;

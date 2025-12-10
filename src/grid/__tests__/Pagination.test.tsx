import { expect, test } from 'vitest'
import { render, screen, within } from "@testing-library/react";
import Pagination, { PaginationProps } from "../Pagination";
import userEvent from "@testing-library/user-event";
import { FC, useEffect, useState } from "react";

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

test("Renders a number of index links equal to the number specified if possible", () => {
  render(
    <Pagination
      numPages={10}
      pageNum={5}
      numButtons={4}
      setPageNum={() => {}}
    />,
  );

  const indexLinks = screen.getAllByRole("link", { name: /^\d$/ });
  expect(indexLinks.length).toBe(4);
  screen.getByRole("link", { name: "4" });
  screen.getByRole("link", { name: "5" });
  screen.getByRole("link", { name: "6" });
  screen.getByRole("link", { name: "7" });
});

test("Renders the maximum number of index links possible if there are fewer pages than numButtons", () => {
  render(
    <Pagination
      numPages={3}
      pageNum={2}
      numButtons={4}
      setPageNum={() => {}}
    />,
  );

  const indexLinks = screen.getAllByRole("link", { name: /^\d$/ });
  expect(indexLinks.length).toBe(3);
  screen.getByRole("link", { name: "1" });
  screen.getByRole("link", { name: "2" });
  screen.getByRole("link", { name: "3" });
});

test("Renders an equal number of index links on each side of the selected link if possible", () => {
  render(
    <Pagination
      numPages={10}
      pageNum={5}
      numButtons={3}
      setPageNum={() => {}}
    />,
  );

  const indexLinks = screen.getAllByRole("link", { name: /^\d$/ });
  expect(indexLinks.length).toBe(3);
  screen.getByRole("link", { name: "4" });
  screen.getByRole("link", { name: "5" });
  screen.getByRole("link", { name: "6" });
});

test("Renders a number of index links equal to numButtons even if one side of the selected link has more links than the other", () => {
  render(
    <Pagination
      numPages={10}
      pageNum={2}
      numButtons={5}
      setPageNum={() => {}}
    />,
  );

  const indexLinks = screen.getAllByRole("link", { name: /^\d$/ });
  expect(indexLinks.length).toBe(5);
  screen.getByRole("link", { name: "1" });
  screen.getByRole("link", { name: "2" });
  screen.getByRole("link", { name: "3" });
  screen.getByRole("link", { name: "4" });
  screen.getByRole("link", { name: "5" });
});

test("Displays a link to the first page if the first page is not already shown as an index button", () => {
  render(
    <Pagination
      numPages={10}
      pageNum={7}
      numButtons={3}
      setPageNum={() => {}}
    />,
  );

  screen.getByRole("link", { name: "First" });
});

test("Displays a link to the previous page if not already on the first page", () => {
  render(
    <Pagination
      numPages={10}
      pageNum={2}
      numButtons={3}
      setPageNum={() => {}}
    />,
  );

  screen.getByRole("link", { name: "Previous" });
});

test("Displays a link to the last page if the last page is not already shown as an index button", () => {
  render(
    <Pagination
      numPages={10}
      pageNum={5}
      numButtons={3}
      setPageNum={() => {}}
    />,
  );

  screen.getByRole("link", { name: "Last" });
});

test("Displays a link to the next page if not already on the last page", () => {
  render(
    <Pagination
      numPages={10}
      pageNum={2}
      numButtons={3}
      setPageNum={() => {}}
    />,
  );

  screen.getByRole("link", { name: "Next" });
});

test("Responds correctly to a click on an index link", async () => {
  const user = userEvent.setup();
  render(<PaginationTestHarness numPages={5} pageNum={1} numButtons={5} />);

  await user.click(screen.getByRole("link", { name: "5" }));

  within(screen.getByRole("listitem", { current: "page" })).getByRole("link", {
    name: "5",
  });
});

test("Responds correctly to a click a Previous link", async () => {
  const user = userEvent.setup();
  render(<PaginationTestHarness numPages={10} pageNum={2} numButtons={5} />);

  await user.click(screen.getByRole("link", { name: "Previous" }));

  within(screen.getByRole("listitem", { current: "page" })).getByRole("link", {
    name: "1",
  });
});

test("Responds correctly to a click on a First link", async () => {
  const user = userEvent.setup();
  render(<PaginationTestHarness numPages={10} pageNum={5} numButtons={3} />);

  await user.click(screen.getByRole("link", { name: "First" }));

  within(screen.getByRole("listitem", { current: "page" })).getByRole("link", {
    name: "1",
  });
});

test("Responds correctly to a click a Next link", async () => {
  const user = userEvent.setup();
  render(<PaginationTestHarness numPages={10} pageNum={2} numButtons={5} />);

  await user.click(screen.getByRole("link", { name: "Next" }));

  within(screen.getByRole("listitem", { current: "page" })).getByRole("link", {
    name: "3",
  });
});

test("Responds correctly to a click on a Last link", async () => {
  const user = userEvent.setup();
  render(<PaginationTestHarness numPages={10} pageNum={5} numButtons={3} />);

  await user.click(screen.getByRole("link", { name: "Last" }));

  within(screen.getByRole("listitem", { current: "page" })).getByRole("link", {
    name: "10",
  });
});

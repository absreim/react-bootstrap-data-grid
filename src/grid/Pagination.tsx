"use client";

import { JustifyContentSetting, Size } from "./types";
import { FC, ReactNode, useMemo } from "react";
import classNames from "classnames";

export interface PaginationProps {
  numPages: number;
  pageNum: number;
  numButtons: number; // max number of indices to display in the UI at any one time
  setPageNum: (pageNum: number) => void;
  ariaLabel?: string;
  alignment?: JustifyContentSetting;
  size?: Size;
}

/**
 * An interactive pagination component that parameterizes Bootstrap styling
 * options as props.
 * @param numPages - Total number of pages
 * @param numButtons - Number of buttons of numerical indices to show at once
 * @param pageNum - The currently selected page
 * @param setPageNum - Callback function to set the selected page
 * @param ariaLabel - Aria label of the <nav> element
 * @param alignment - Flexbox justify-content setting on the <ul> element
 * @param size - Size variant of the <ul> element
 */
const Pagination: FC<PaginationProps> = ({
  numPages,
  numButtons,
  pageNum,
  setPageNum,
  ariaLabel,
  alignment,
  size,
}) => {
  const ulClasses: string[] = ["pagination"];

  if (size === "small") {
    ulClasses.push("pagination-sm");
  } else if (size === "large") {
    ulClasses.push("pagination-lg");
  }

  if (alignment) {
    ulClasses.push(`justify-content-${alignment}`);
  }

  let lowerBound = pageNum - Math.floor((numButtons - 1) / 2);
  let upperBound = pageNum + Math.ceil((numButtons - 1) / 2);
  if (upperBound > numPages) {
    const diff = upperBound - numPages;
    lowerBound = Math.max(lowerBound - diff, 1);
    upperBound -= diff;
  } else if (lowerBound < 1) {
    const diff = 1 - lowerBound;
    lowerBound = 1;
    upperBound = Math.min(numPages, upperBound + diff);
  }
  const buttonIndices: number[] = useMemo(() => {
    const indices: number[] = [];
    for (let i = lowerBound; i <= upperBound; i++) {
      indices.push(i);
    }
    return indices;
  }, [lowerBound, upperBound]);

  function getFirstArrowButton() {
    if (lowerBound === 1) {
      return null;
    }

    return (
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          aria-label="First"
          onClick={(event) => {
            event.preventDefault();
            setPageNum(1);
          }}
        >
          <span aria-hidden="true">&lt;&lt;</span>
        </a>
      </li>
    );
  }

  function getPrevArrowButton() {
    if (pageNum === 1) {
      return null;
    }

    return (
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          aria-label="Previous"
          onClick={(event) => {
            event.preventDefault();
            setPageNum(pageNum - 1);
          }}
        >
          <span aria-hidden="true">&lt;</span>
        </a>
      </li>
    );
  }

  function getNextArrowButton() {
    if (pageNum === numPages) {
      return null;
    }

    return (
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          aria-label="Next"
          onClick={(event) => {
            event.preventDefault();
            setPageNum(pageNum + 1);
          }}
        >
          <span aria-hidden="true">&gt;</span>
        </a>
      </li>
    );
  }

  function getLastArrowButton() {
    if (upperBound === numPages) {
      return null;
    }

    return (
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          aria-label="Last"
          onClick={(event) => {
            event.preventDefault();
            setPageNum(numPages);
          }}
        >
          <span aria-hidden="true">&gt;&gt;</span>
        </a>
      </li>
    );
  }

  const indexButtons: ReactNode = buttonIndices.map((buttonIndex) => (
    <li
      key={buttonIndex}
      className={classNames({
        "page-item": true,
        active: pageNum === buttonIndex,
      })}
      aria-current={pageNum === buttonIndex ? "page" : undefined}
    >
      <a
        className="page-link"
        href="#"
        onClick={(event) => {
          event.preventDefault();
          setPageNum(buttonIndex);
        }}
      >
        {buttonIndex}
      </a>
    </li>
  ));

  return (
    <nav aria-label={ariaLabel}>
      <ul className={classNames(ulClasses)}>
        {getFirstArrowButton()}
        {getPrevArrowButton()}
        {indexButtons}
        {getNextArrowButton()}
        {getLastArrowButton()}
      </ul>
    </nav>
  );
};

export default Pagination;

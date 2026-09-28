import classNames from "classnames";
import { FC } from "react";

export interface UpArrowProps {
  grayed: boolean;
}

const UpArrow: FC<UpArrowProps> = ({ grayed }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className={classNames([...(grayed ? ["text-body-secondary"] : [])])}
    viewBox="0 0 16 16"
  >
    <title>Up arrow</title>
    <desc>Upward-pointing arrow</desc>
    <path
      fillRule="evenodd"
      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
    />
  </svg>
);

export default UpArrow;

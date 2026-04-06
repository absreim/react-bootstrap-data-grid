import { CSSProperties, FC, MouseEventHandler } from "react";
import classNames from "classnames";

export interface EditControlsCellProps {
  ariaColIndex: number;
  beginEditingCallback: () => void;
  cancelEditingCallback: () => void;
  isEditing: boolean;
  saveCallback: () => void;
  deleteCallback?: () => void; // omit prop to disable deletion
  editControlsCellClasses: string[];
  saveButtonClasses: string[];
  deleteButtonClasses: string[];
  startButtonClasses: string[];
  cancelButtonClasses: string[];
  style?: CSSProperties;
}

const stopPropagationWrapper: (
  fn: () => void,
) => MouseEventHandler<HTMLButtonElement> = (fn) => (event) => {
  event.stopPropagation();
  fn();
};

const EditControlsCell: FC<EditControlsCellProps> = ({
  ariaColIndex,
  beginEditingCallback,
  cancelEditingCallback,
  isEditing,
  saveCallback,
  deleteCallback,
  editControlsCellClasses,
  saveButtonClasses,
  deleteButtonClasses,
  startButtonClasses,
  cancelButtonClasses,
}) => {
  return (
    <td
      aria-colindex={ariaColIndex}
      className={classNames(editControlsCellClasses)}
    >
      <div className="hstack gap-2">
        {isEditing ? (
          <>
            <button
              aria-label="Cancel"
              className={classNames(
                "btn",
                cancelButtonClasses.length === 0
                  ? ["btn-secondary"]
                  : cancelButtonClasses,
              )}
              onClick={stopPropagationWrapper(cancelEditingCallback)}
              title="Cancel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
              </svg>
            </button>
            <button
              aria-label="Save"
              className={classNames(
                "btn",
                saveButtonClasses.length === 0
                  ? ["btn-primary"]
                  : saveButtonClasses,
              )}
              onClick={stopPropagationWrapper(saveCallback)}
              title="Save"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12 2h-2v3h2z" />
                <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
              </svg>
            </button>
          </>
        ) : (
          <>
            {deleteCallback && (
              <button
                aria-label="Delete"
                className={classNames(
                  "btn",
                  deleteButtonClasses.length === 0
                    ? ["btn-secondary"]
                    : deleteButtonClasses,
                )}
                onClick={stopPropagationWrapper(deleteCallback)}
                title="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </button>
            )}
            <button
              aria-label="Edit"
              className={classNames(
                "btn",
                startButtonClasses.length === 0
                  ? ["btn-primary"]
                  : startButtonClasses,
              )}
              onClick={stopPropagationWrapper(beginEditingCallback)}
              title="Edit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </td>
  );
};

export default EditControlsCell;

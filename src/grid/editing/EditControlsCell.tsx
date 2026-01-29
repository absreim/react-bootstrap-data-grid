import { FC, MouseEventHandler } from "react";
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
              className={classNames(
                "btn",
                cancelButtonClasses.length === 0
                  ? ["btn-secondary"]
                  : cancelButtonClasses,
              )}
              onClick={stopPropagationWrapper(cancelEditingCallback)}
            >
              Cancel
            </button>
            <button
              className={classNames(
                "btn",
                saveButtonClasses.length === 0
                  ? ["btn-primary"]
                  : saveButtonClasses,
              )}
              onClick={stopPropagationWrapper(saveCallback)}
            >
              Save
            </button>
          </>
        ) : (
          <>
            {deleteCallback && (
              <button
                className={classNames(
                  "btn",
                  deleteButtonClasses.length === 0
                    ? ["btn-primary"]
                    : deleteButtonClasses,
                )}
                onClick={stopPropagationWrapper(deleteCallback)}
              >
                Delete
              </button>
            )}
            <button
              className={classNames(
                "btn",
                startButtonClasses.length === 0
                  ? ["btn-primary"]
                  : startButtonClasses,
              )}
              onClick={stopPropagationWrapper(beginEditingCallback)}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </td>
  );
};

export default EditControlsCell;

import { FC } from "react";
import classNames from "classnames";

export interface EditControlsCellProps {
  ariaColIndex: number;
  beginEditingCallback: () => void;
  cancelEditingCallback: () => void;
  isEditing: boolean;
  saveCallback: () => void;
  deleteCallback?: () => void; // omit prop to disable deletion
  editControlsCellClasses: string[];
  primaryButtonClasses: string[];
  secondaryButtonClasses: string[];
}

const EditControlsCell: FC<EditControlsCellProps> = ({
  ariaColIndex,
  beginEditingCallback,
  cancelEditingCallback,
  isEditing,
  saveCallback,
  deleteCallback,
  editControlsCellClasses,
  primaryButtonClasses,
  secondaryButtonClasses,
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
                "btn-secondary",
                secondaryButtonClasses,
              )}
              onClick={cancelEditingCallback}
            >
              Cancel
            </button>
            <button
              className={classNames("btn", "btn-primary", primaryButtonClasses)}
              onClick={saveCallback}
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
                  "btn-secondary",
                  secondaryButtonClasses,
                )}
                onClick={deleteCallback}
              >
                Delete
              </button>
            )}
            <button
              className={classNames("btn", "btn-primary", primaryButtonClasses)}
              onClick={beginEditingCallback}
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

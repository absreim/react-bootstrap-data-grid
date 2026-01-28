import { FC } from "react";

export interface EditControlsCellProps {
  ariaColIndex: number;
  beginEditingCallback: () => void;
  cancelEditingCallback: () => void;
  isEditing: boolean;
  saveCallback: () => void;
  deleteCallback?: () => void; // omit prop to disable deletion
}

const EditControlsCell: FC<EditControlsCellProps> = ({
  ariaColIndex,
  beginEditingCallback,
  cancelEditingCallback,
  isEditing,
  saveCallback,
  deleteCallback,
}) => {
  return (
    <td aria-colindex={ariaColIndex}>
      <div className="hstack gap-2">
        {isEditing ? (
          <>
            <button
              className="btn btn-secondary"
              onClick={cancelEditingCallback}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={saveCallback}>
              Save
            </button>
          </>
        ) : (
          <>
            {deleteCallback && (
              <button className="btn btn-secondary" onClick={deleteCallback}>
                Delete
              </button>
            )}
            <button className="btn btn-primary" onClick={beginEditingCallback}>
              Edit
            </button>
          </>
        )}
      </div>
    </td>
  );
};

export default EditControlsCell;

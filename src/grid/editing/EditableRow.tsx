"use client";

import { FC, ReactNode, useRef, useState } from "react";
import { dateToDatetimeInputStr, dateToInputStr } from "../util/datetime";
import { CellData, ColDataType, ColDataTypeStrings } from "../types";
import EditControlsCell from "./EditControlsCell";
import React from "react";

export type EditableRowProps = Pick<
  React.ComponentProps<"tr">,
  "onClick" | "className" | "aria-rowindex" | "aria-selected"
> & {
  ariaColIndexOffset: number;
  dataRowIndex: number;
  children: ReactNode; // Fragment of cells that come in front, such as the one for the selection control
  cellData: CellData[]; // contains initial values and metadata
  updateCallback?: (values: string[]) => void; // undefined here means row is not editable at all
  deleteCallback?: () => void;
};

const initValueToFormValue: (
  value: ColDataType,
  type: ColDataTypeStrings,
) => string = (value, type) => {
  switch (type) {
    case "date":
      return dateToInputStr(value as Date);
    case "datetime":
      return dateToDatetimeInputStr(value as Date);
    case "number":
      return String(value as number);
    default:
      return value as string;
  }
};

const colDataTypeToInputType: (colDataType: ColDataTypeStrings) => string = (
  colDataType,
) => {
  switch (colDataType) {
    case "date":
      return "date";
    case "datetime":
      return "datetime-local";
    case "number":
      return "number";
    default:
      return "text";
  }
};

const EditableRow: FC<EditableRowProps> = ({
  ariaColIndexOffset,
  cellData,
  children,
  updateCallback,
  deleteCallback,
  onClick,
  className,
  "aria-rowindex": ariaRowIndex,
  "aria-selected": ariaSelected,
  dataRowIndex,
}) => {
  const trRef = useRef<HTMLTableRowElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave: () => void = () => {
    let failedValidationFound = false;
    const formValues: string[] = [];

    for (const rowChild of Array.from(trRef.current!.children)) {
      if (!(rowChild instanceof HTMLTableCellElement)) {
        console.warn("Found non-td element inside EditableRow");
        continue;
      }

      for (const cellChild of Array.from(rowChild.children)) {
        if (
          !(cellChild instanceof HTMLInputElement) ||
          cellChild.type === "checkbox" ||
          cellChild.type === "radio"
        ) {
          continue;
        }

        formValues.push(cellChild.value);
        failedValidationFound =
          !cellChild.reportValidity() || failedValidationFound;
        break; // Each cell should only have one input element
      }
    }

    if (!failedValidationFound) {
      updateCallback!(formValues);
      setIsEditing(false);
    }
  };

  return (
    <tr
      ref={trRef}
      onClick={onClick}
      className={className}
      aria-rowindex={ariaRowIndex}
      aria-selected={ariaSelected}
      data-rowindex={dataRowIndex}
    >
      {children}
      {cellData.map(({ type, value, formattedValue, label }, index) => (
        <td key={index} aria-colindex={index + ariaColIndexOffset + 1}>
          {isEditing && !!updateCallback ? (
            <input
              aria-label={label}
              name={`editable-cell-input-${dataRowIndex}-${index}`}
              className="form-control"
              type={colDataTypeToInputType(type)}
              defaultValue={initValueToFormValue(value, type)}
              required={type !== "string"}
            />
          ) : (
            formattedValue
          )}
        </td>
      ))}
      {updateCallback && (
        <EditControlsCell
          ariaColIndex={ariaColIndexOffset + cellData.length + 1}
          beginEditingCallback={() => setIsEditing(true)}
          cancelEditingCallback={() => setIsEditing(false)}
          isEditing={isEditing}
          saveCallback={handleSave}
          deleteCallback={deleteCallback}
        />
      )}
    </tr>
  );
};

export default EditableRow;

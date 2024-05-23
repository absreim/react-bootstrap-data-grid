import {
  ChangeEventHandler,
  ForwardRefRenderFunction,
  MutableRefObject,
} from "react";
import { StringFilterScheme, StringFilterState } from "../types";

interface StringFilterRowProps {
  columnName: string;
  columnLabel: string;
  filterState: StringFilterState;
  setFilterState: (filterState: StringFilterState) => void;
}

const StringFilterRow: ForwardRefRenderFunction<
  Record<string, Record<string, HTMLInputElement>>,
  StringFilterRowProps
> = ({ columnName, columnLabel, filterState, setFilterState }, ref) => {
  const handleOpChange: ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    setFilterState({
      ...filterState,
      scheme: target.value as StringFilterScheme,
    });
  };

  return (
    <tr>
      <td>{columnLabel}</td>
      <td>String</td>
      <td>
        <select className="form-select" value={filterState.scheme}>
          <option value="contains">Contains</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
        </select>
      </td>
      <td>
        <input
          ref={(el) => {
            const inputRefsByRow = (
              ref as MutableRefObject<
                Record<string, Record<string, HTMLInputElement>>
              >
            ).current;
            if (el === null) {
              delete inputRefsByRow[columnName]["searchTerm"];
              return
            }
            inputRefsByRow[columnName]["searchTerm"] = el
          }}
        />
      </td>
    </tr>
  );
};

export default StringFilterRow;

import { FC, ReactNode } from "react";

export interface SpecTableRow {
  propertyName: string;
  typeDefinition: string;
  isRequired: boolean;
  description: string | ReactNode;
}

interface Props {
  caption?: string;
  rows: SpecTableRow[];
}

const TypeSpecTable: FC<Props> = ({ caption, rows }) => {
  return (
    <table className="table">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          <th>Property name</th>
          <th>Type definition</th>
          <th>Required/Optional</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(
          (
            { propertyName, typeDefinition, isRequired, description },
            index,
          ) => (
            <tr key={index}>
              <td>{propertyName}</td>
              <td>{typeDefinition}</td>
              <td>{isRequired ? "Required" : "Optional"}</td>
              <td>{description}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};

export default TypeSpecTable;

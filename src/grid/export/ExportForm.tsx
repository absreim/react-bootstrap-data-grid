import { ExportFnInfo, FileType, Stage } from "./useExportFn";
import { FC, Fragment, useId, useState } from "react";

export interface ExportFormProps {
  exportFnInfo: ExportFnInfo;
}

interface FormState {
  stage: Stage;
  formatted: boolean;
  fileType: FileType;
}

const ExportForm: FC<ExportFormProps> = ({
  exportFnInfo: {
    exportFn,
    formattersExist,
    paginationEnabled,
    filteringEnabled,
  },
}) => {
  const formId = useId();
  const [formState, setFormState] = useState<FormState>({
    stage: "original",
    formatted: false,
    fileType: "json",
  });

  const getChangeHandler: (field: keyof FormState, value: any) => () => void = (field, value) => {
    return () => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  }

  const stageOptions: { value: Stage; label: string; disabled: boolean }[] = [
    {
      value: "original",
      label: "Original rows",
      disabled: false
    },
    {
      value: "filtered",
      label: `After filters applied${filteringEnabled ? "" : " (filtering disabled)"}`,
      disabled: !filteringEnabled
    },
    {
      value: "paged",
      label: `Current page only${paginationEnabled ? "" : " (pagination disabled)"}`,
      disabled: !paginationEnabled
    }
  ];

  const formatOptions: { formatted: boolean; label: string; disabled: boolean }[] = [
    {
      formatted: false,
      label: "Use original data",
      disabled: false,
    },
    {
      formatted: true,
      label: `Apply formatters to data${formattersExist ? "" : " (no formatters defined)"}`,
      disabled: !formattersExist
    }
  ];

  const fileTypeOptions: { fileType: FileType, label: string }[] = [
    {
      fileType: "json",
      label: "JSON"
    },
    {
      fileType: "csv",
      label: "CSV"
    }
  ]

  const handleSubmit = () => {
    const { stage, fileType, formatted } = formState;
    exportFn(stage, fileType, formatted)
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Choose data to export</legend>
        {stageOptions.map(({ value, label, disabled }) => (
          <Fragment key={value}>
            <input
              className="form-check-input"
              type="radio"
              id={`${formId}-${value}`}
              value={value}
              checked={formState.stage === value}
              onChange={getChangeHandler("stage", value)}
              disabled={disabled}
            />
            <label className="form-check-label" htmlFor={`${formId}-${value}`}>
              {label}
            </label>
          </Fragment>
        ))}
      </fieldset>
      <fieldset>
        <legend>Choose whether to apply formatters</legend>
        {formatOptions.map(({ formatted, label, disabled }) => (
          <Fragment key={String(formatted)}>
            <input
              className="form-check-input"
              type="radio"
              id={`${formId}-${formatted}`}
              value={String(formatted)}
              checked={formState.formatted === formatted}
              onChange={getChangeHandler("formatted", formatted)}
              disabled={disabled}
            />
            <label
              className="form-check-label"
              htmlFor={`${formId}-${formatted}`}
            >
              {label}
            </label>
          </Fragment>
        ))}
      </fieldset>
      <fieldset>
        <legend>Choose the file type</legend>
        {fileTypeOptions.map(({ fileType, label }) => (
          <Fragment key={fileType}>
            <input
              className="form-check-input"
              type="radio"
              id={`${formId}-${fileType}`}
              value={fileType}
              checked={formState.fileType === fileType}
              onChange={getChangeHandler("fileType", fileType)}
            />
            <label
              className="form-check-label"
              htmlFor={`${formId}-${fileType}`}
            >
              {label}
            </label>
          </Fragment>
        ))}
      </fieldset>
      <button type="submit" className="btn btn-secondary">
        Submit
      </button>
    </form>
  );
};

export default ExportForm;

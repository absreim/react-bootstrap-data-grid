import { ExportFnInfo, FileType, Stage } from "./useExportFn";
import { FC, SubmitEventHandler, useId, useState } from "react";
import { ExportFormStyleModel } from "../styling/types";
import classNames from "classnames";

export interface ExportFormProps {
  exportFnInfo: ExportFnInfo;
  styleModel?: ExportFormStyleModel;
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
  styleModel
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

  const handleSubmit: SubmitEventHandler = (event) => {
    event.preventDefault();
    const { stage, fileType, formatted } = formState;
    exportFn(stage, fileType, formatted)
  }

  const legendClasses = classNames(styleModel?.legend || [])
  const radioContainerClasses = classNames(
    styleModel?.radioContainer || ["form-check"],
  );
  const radioInputClasses = classNames(
    styleModel?.radioInput || ["form-check-input"],
  );
  const radioLabelClasses = classNames(
    styleModel?.radioLabel || ["form-check-label"],
  );
  const submitButtonClasses = classNames(
    styleModel?.submitButton || ["btn", "btn-secondary"],
  );

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className={legendClasses}>Choose data to export</legend>
        {stageOptions.map(({ value, label, disabled }) => (
          <div className={radioContainerClasses} key={value}>
            <input
              className={radioInputClasses}
              type="radio"
              id={`${formId}-${value}`}
              value={value}
              checked={formState.stage === value}
              onChange={getChangeHandler("stage", value)}
              disabled={disabled}
            />
            <label className={radioLabelClasses} htmlFor={`${formId}-${value}`}>
              {label}
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend className={legendClasses}>
          Choose whether to apply formatters
        </legend>
        {formatOptions.map(({ formatted, label, disabled }) => (
          <div className={radioContainerClasses} key={String(formatted)}>
            <input
              className={radioInputClasses}
              type="radio"
              id={`${formId}-${formatted}`}
              value={String(formatted)}
              checked={formState.formatted === formatted}
              onChange={getChangeHandler("formatted", formatted)}
              disabled={disabled}
            />
            <label
              className={radioLabelClasses}
              htmlFor={`${formId}-${formatted}`}
            >
              {label}
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend className={legendClasses}>Choose the file type</legend>
        {fileTypeOptions.map(({ fileType, label }) => (
          <div className={radioContainerClasses} key={fileType}>
            <input
              className={radioInputClasses}
              type="radio"
              id={`${formId}-${fileType}`}
              value={fileType}
              checked={formState.fileType === fileType}
              onChange={getChangeHandler("fileType", fileType)}
            />
            <label
              className={radioLabelClasses}
              htmlFor={`${formId}-${fileType}`}
            >
              {label}
            </label>
          </div>
        ))}
      </fieldset>
      <button type="submit" className={submitButtonClasses}>
        Submit
      </button>
    </form>
  );
};

export default ExportForm;

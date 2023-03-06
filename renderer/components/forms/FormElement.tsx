import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  errorLabel?: string;
  label: string;
};

const FormElement = ({ children, error = null, errorLabel, label }: Props) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
      {errorLabel && error && (
        <label className="label">
          <span className="label-text-alt text-error">{errorLabel}</span>
        </label>
      )}
    </div>
  );
};

export default FormElement;

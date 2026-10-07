import type { ReactNode } from "react";
import "./FormField.css";

type FormFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
};

export default function FormField({
  label,
  hint,
  error,
  children,
  required,
}: FormFieldProps) {
  return (
    <div className="field">
      <label>
        {label}
        {required ? <span>*</span> : null}
      </label>
      {children}
      {hint && !error ? <small>{hint}</small> : null}
      {error ? <small className="field__error">{error}</small> : null}
    </div>
  );
}

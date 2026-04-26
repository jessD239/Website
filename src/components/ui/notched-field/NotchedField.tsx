import type { ReactNode } from "react";
// import Help from "../help/Help";
import "./NotchedField.css";

export interface NotchedFieldProps {
  /** The floating label text (also used for the legend notch). */
  label: string;
  /** Whether the wrapped control currently holds a value. */
  hasValue?: boolean;
  /** Error message — triggers error styling when truthy. */
  error?: string | null;
  /** Helper text shown below the field (hidden when error is present). */
  subtext?: string;
  /** Disables the field visually. */
  disabled?: boolean;
  /** Shows a required asterisk after the label. */
  required?: boolean;
  /** Shows a Help tooltip next to the label. */
  helperText?: string;
  /** Extra class names on the outer wrapper. */
  className?: string;
  /** Stacks label at top-left for multiline controls (textarea). */
  multiline?: boolean;
  /** Stretches the field to fill 100% of its parent. */
  fullWidth?: boolean;
  /** Called when clicking the field container (e.g. to focus the inner control). */
  onClick?: () => void;
  /** The form control(s) to render inside the notched border. */
  children: ReactNode;
}

export default function NotchedField({
  label,
  hasValue = false,
  error = null,
  subtext,
  disabled = false,
  required = false,
  className = "",
  multiline = false,
  fullWidth = false,
  onClick,
  children,
}: NotchedFieldProps) {
  const classes = [
    "notched-field",
    multiline && "notched-field--multiline",
    fullWidth && "notched-field--full-width",
    hasValue && "has-value",
    disabled && "disabled",
    error && "error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const labelContent = (
    <>
      {label}
      {required && " *"}
    </>
  );

  return (
    <div>
      <div className={classes} onClick={onClick}>
        <label className="notched-field-label">{labelContent}</label>

        <div className="notched-field-content">{children}</div>

        <fieldset aria-hidden="true">
          <legend>
            <span>{labelContent}</span>
          </legend>
        </fieldset>
      </div>

      {error ? (
        <div className="notched-field-error">{error}</div>
      ) : subtext ? (
        <div className="notched-field-subtext">{subtext}</div>
      ) : null}
    </div>
  );
}

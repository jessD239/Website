import { forwardRef, useEffect, useRef, useState, type InputHTMLAttributes } from "react";
import NotchedField from "./notched-field/NotchedField";
import type { PIWError } from "./types";
import "./TextField.css";

export interface TextFieldProps {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: PIWError | null;
  subtext?: string;
  placeholder?: string;
  label?: string;
  id?: string;
  type?: "text" | "password" | "email" | "phone";
  showPassword?: boolean;
  helperText?: string;
  autoComplete?: "email" | "password" | "new-password" | "current-password";
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  adornment?: "left" | "right";
  icon?: React.ReactNode;
  maxLength?: number;
  fullWidth?: boolean;
}

const TextField = forwardRef<
  HTMLInputElement,
  TextFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof TextFieldProps>
>(
  (
    {
      label = "",
      id,
      value,
      defaultValue,
      placeholder = " ",
      disabled = false,
      required = false,
      error = null,
      subtext,
      className = "",
      type = "text",
      showPassword: _showPassword,
      helperText,
      autoComplete,
      onChange,
      onFocus,
      onBlur,
      adornment,
      icon,
      maxLength,
      fullWidth,
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [localHasValue, setLocalHasValue] = useState(Boolean(defaultValue));
    const [internalError, setInternalError] = useState<PIWError | null>(null);

    // For controlled inputs use the value prop directly; for uncontrolled track
    // via onChange because refs are mutable and don't trigger re-renders.
    const hasValue = value !== undefined ? Boolean(value) : localHasValue;
    const isPassword = type === "password";
    const resolvedType = isPassword ? (passwordVisible ? "text" : "password") : type === "phone" ? "tel" : type;

    const wrapperClasses = [
      "text-field-wrapper",
      adornment === "left" && icon && "text-field-wrapper--icon-left",
      ((adornment === "right" && icon) || isPassword) && "text-field-wrapper--icon-right",
    ]
      .filter(Boolean)
      .join(" ");

    useEffect(() => {
      if (error) setInternalError(error);
    }, [error]);

    return (
      <NotchedField
        label={label}
        hasValue={hasValue}
        error={internalError?.message ?? null}
        subtext={subtext}
        disabled={disabled}
        required={required}
        helperText={helperText}
        className={className}
        fullWidth={fullWidth}
        onClick={() => innerRef.current?.focus()}
      >
        <div className={wrapperClasses}>
          {adornment === "left" && icon && (
            <span className="text-field-adornment text-field-adornment--left" aria-hidden="true">
              {icon}
            </span>
          )}

          <input
            className="text-field-input"
            ref={(el) => {
              innerRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
            }}
            id={id}
            type={resolvedType}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            maxLength={maxLength}
            onChange={(e) => {
              if (value === undefined) setLocalHasValue(Boolean(e.target.value));
              if (error) setInternalError(null);
              onChange?.(e);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
          />

          {adornment === "right" && icon && !isPassword && (
            <span className="text-field-adornment text-field-adornment--right" aria-hidden="true">
              {icon}
            </span>
          )}

          {isPassword && (
            <button
              type="button"
              className="text-field-toggle"
              onClick={() => setPasswordVisible((v) => !v)}
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>
      </NotchedField>
    );
  },
);

TextField.displayName = "TextField";
export default TextField;

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

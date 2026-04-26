import { forwardRef, useRef, useState, useEffect, useCallback, type TextareaHTMLAttributes } from "react";
import NotchedField from "./notched-field/NotchedField";
import type { PIWError } from "./types";
import "./TextArea.css";

export interface TextAreaProps {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: PIWError | null;
  subtext?: string;
  placeholder?: string;
  label?: string;
  id?: string;
  helperText?: string;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  maxLength?: number;
  minHeight?: number;
  maxHeight?: number;
  required?: boolean;
  /** Auto-grow to fit content up to maxHeight. Defaults to true. */
  autoGrow?: boolean;
  /** Show a character counter when maxLength is provided. */
  showCharCount?: boolean;
  fullWidth?: boolean;
}

const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof TextAreaProps>
>(
  (
    {
      label = "Message",
      id,
      value,
      defaultValue,
      placeholder = " ",
      disabled = false,
      error = null,
      subtext,
      className = "",
      helperText,
      onChange,
      onFocus,
      onBlur,
      maxLength,
      minHeight = 80,
      maxHeight,
      autoGrow = true,
      showCharCount = false,
      fullWidth,
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    const [localHasValue, setLocalHasValue] = useState(Boolean(defaultValue));
    const [internalError, setInternalError] = useState<PIWError | null>(null);

    const charCount = typeof value === "string" ? value.length : undefined;
    const hasValue = value !== undefined ? Boolean(value) : localHasValue;

    const adjustHeight = useCallback(() => {
      const el = innerRef.current;
      if (!el || !autoGrow) return;
      el.style.height = "auto";
      const next = Math.max(minHeight, el.scrollHeight);
      el.style.height = `${maxHeight ? Math.min(next, maxHeight) : next}px`;
    }, [autoGrow, minHeight, maxHeight]);

    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      if (value === undefined) setLocalHasValue(Boolean(e.target.value));
      if (error) setInternalError(null);
      onChange?.(e);
    };

    useEffect(() => {
      if (error) setInternalError(error);
    }, [error]);

    const showCount = showCharCount && maxLength !== undefined;

    return (
      <>
        <NotchedField
          label={label}
          hasValue={hasValue}
          error={internalError?.message ?? null}
          subtext={subtext}
          disabled={disabled}
          helperText={helperText}
          className={className}
          multiline
          required={rest.required}
          fullWidth={fullWidth}
          onClick={() => innerRef.current?.focus()}
        >
          <textarea
            className={["text-area-input", !autoGrow && "text-area-input--resizable"].filter(Boolean).join(" ")}
            ref={(el) => {
              innerRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
            }}
            id={id}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            style={{
              minHeight: `${minHeight}px`,
              ...(maxHeight ? { maxHeight: `${maxHeight}px` } : {}),
            }}
            {...rest}
          />
        </NotchedField>

        {showCount && (
          <div className="text-area-char-count" aria-live="polite">
            {charCount ?? 0}/{maxLength}
          </div>
        )}
      </>
    );
  },
);

TextArea.displayName = "TextArea";
export default TextArea;

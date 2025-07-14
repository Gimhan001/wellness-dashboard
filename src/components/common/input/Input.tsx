import React from "react";

import styles from "./Input.module.css";

interface InputProps {
  type?: "text" | "email" | "password" | "number";
  name: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  className = "",
}) => {
  const inputGroupClasses = [styles.inputGroup, className]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [styles.input, error ? styles.error : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={inputGroupClasses}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <span id={`${name}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};

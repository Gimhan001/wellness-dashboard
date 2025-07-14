import React from "react";
import styles from "./Slider.module.css";

interface SliderProps {
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  name,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  error,
  required = false,
  disabled = false,
  className = "",
}) => {
  const sliderClasses = [styles.slider, error ? styles.error : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.sliderGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.sliderContainer}>
        <input
          id={name}
          type="range"
          name={name}
          value={value}
          onChange={(e) => onChange(name, parseFloat(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={sliderClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        <span className={styles.sliderValue}>{value}h</span>
      </div>
      {error && (
        <span id={`${name}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};

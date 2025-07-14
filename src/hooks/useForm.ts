import { useState, useCallback } from "react";

import { ValidationErrors } from "../types";

interface UseFormReturn<T> {
  data: T;
  errors: ValidationErrors;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: T[keyof T]) => void;
  handleSubmit: (
    onSubmit: (data: T) => Promise<void>,
    validate?: (data: T) => ValidationErrors
  ) => Promise<void>;
  setErrors: (errors: ValidationErrors) => void;
  reset: () => void;
}

export const useForm = <T extends Record<string, any>>(
  initialData: T
): UseFormReturn<T> => {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name as string]) {
        setErrors((prev) => {
          const { [name]: _removed, ...rest } = prev;
          return rest;
        });
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (
      onSubmit: (data: T) => Promise<void>,
      validate?: (data: T) => ValidationErrors
    ) => {
      try {
        setIsSubmitting(true);
        setErrors({});

        // Validate if validator is provided
        if (validate) {
          const validationErrors = validate(data);
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
          }
        }

        await onSubmit(data);
      } catch (error: any) {
        if (error.errors) {
          setErrors(error.errors);
        } else {
          setErrors({ submit: error.message || "An error occurred" });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [data]
  );

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setIsSubmitting(false);
  }, [initialData]);

  return {
    data,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setErrors,
    reset,
  };
};

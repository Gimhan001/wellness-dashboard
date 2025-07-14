import React from "react";
import { Input, Button } from "../../common";

import { useForm } from "../../../hooks";
import { validateLoginForm } from "../../../utils";

import { LoginFormData } from "../../../types";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { data, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<LoginFormData>({
      email: "",
      password: "",
    });

  const handleFormSubmit = async (formData: LoginFormData) => {
    await onSubmit(formData);
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleFormSubmit, validateLoginForm);
      }}
    >
      <h2 className={styles.title}>Login</h2>

      <Input
        type="email"
        name="email"
        label="Email"
        value={data.email}
        onChange={
          handleChange as unknown as (
            name: string,
            value: string | number
          ) => void
        }
        error={errors.email}
        required
        placeholder="Enter your email"
      />

      <Input
        type="password"
        name="password"
        label="Password"
        value={data.password}
        onChange={
          handleChange as unknown as (
            name: string,
            value: string | number
          ) => void
        }
        error={errors.password}
        required
        placeholder="Enter your password"
      />

      {errors.submit && (
        <div className={styles.errorMessage}>{errors.submit}</div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        Login
      </Button>
    </form>
  );
};

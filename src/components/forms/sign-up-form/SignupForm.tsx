import React from "react";
import { Input, Button } from "../../common";

import { useForm } from "../../../hooks";
import { validateSignupForm } from "../../../utils";

import { SignupFormData } from "../../../types";
import styles from "./SignupForm.module.css";

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const { data, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<SignupFormData>({
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleFormSubmit = async (formData: SignupFormData) => {
    await onSubmit(formData);
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleFormSubmit, validateSignupForm);
      }}
    >
      <h2 className={styles.title}>Sign Up</h2>

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

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        value={data.confirmPassword}
        onChange={
          handleChange as unknown as (
            name: string,
            value: string | number
          ) => void
        }
        error={errors.confirmPassword}
        required
        placeholder="Confirm your password"
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
        Sign Up
      </Button>
    </form>
  );
};

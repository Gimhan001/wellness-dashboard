import React from "react";
import { useNavigate, Link } from "react-router-dom";

import { SignupForm } from "../../components/forms/sign-up-form/SignupForm";

import { useAuth } from "../../hooks";

import { ROUTES } from "../../constants";
import styles from "./SignupPage.module.css";

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    await signup(data.email, data.password);
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>
        <SignupForm onSubmit={handleSignup} />
        <p className={styles.footer}>
          Already have an account? <Link to={ROUTES.LOGIN}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

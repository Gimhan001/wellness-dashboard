import React from "react";
import { useNavigate, Link } from "react-router-dom";

import { LoginForm } from "../../components/forms/login-form/LoginForm";

import { useAuth } from "../../hooks";

import { ROUTES } from "../../constants";
import styles from "./LoginPage.module.css";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    await login(data.email, data.password);
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>
        <LoginForm onSubmit={handleLogin} />
        <p className={styles.footer}>
          Don&apos;t have an account? <Link to={ROUTES.SIGNUP}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

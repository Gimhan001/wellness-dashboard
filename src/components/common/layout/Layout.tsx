import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faPowerOff } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../button/Button";

import { useAuth } from "../../../hooks";
import { useTheme } from "../../../contexts/ThemeContext";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
}) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.layout}>
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.logo}>Wellness Log</h1>
            {isAuthenticated && (
              <div className={styles.headerActions}>
                <span className={styles.userInfo}>Welcome, {user?.name}</span>
                <Button variant="icon" onClick={logout}>
                  {/* logout icon */}
                  <FontAwesomeIcon icon={faPowerOff} size="lg" />
                </Button>
              </div>
            )}
          </div>
        </header>
      )}

      <main className={styles.main}>{children}</main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <Button
          className={styles.themeButton}
          variant="icon"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <FontAwesomeIcon icon={faSun} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faMoon} size="lg" />
          )}
        </Button>
      </footer>
    </div>
  );
};

import React, { ReactNode, useEffect, useRef } from "react";

import { Button } from "..";

import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onRequestClose,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onRequestClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onRequestClose]);

  const handleClickAway = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onRequestClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div className={styles.overlay} ref={overlayRef} onClick={handleClickAway}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button
            aria-label="Close"
            className={styles.closeButton}
            onClick={onRequestClose}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {description && <p className={styles.description}>{description}</p>}
          {children}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button variant="secondary" onClick={onRequestClose}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

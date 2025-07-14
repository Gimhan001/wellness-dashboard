import React, { ReactNode, useState, useRef, useEffect } from "react";

import styles from "./DropdownMenu.module.css";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  trigger: ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((o) => !o);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownWrapper} ref={ref}>
      <div onClick={toggle} className={styles.trigger}>
        {trigger}
      </div>
      {open && (
        <div className={styles.menu}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className={styles.menuItem}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

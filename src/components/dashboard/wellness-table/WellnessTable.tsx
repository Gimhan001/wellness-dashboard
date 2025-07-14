import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

import { DropdownMenu } from "../../common";

import { formatDate, formatSleepDuration } from "../../../utils/format";

import styles from "./WellnessTable.module.css";
import { WellnessLog } from "../../../types";

interface WellnessTableProps {
  logs: WellnessLog[];
  loading: boolean;
  error: string | null;
  onUpdate: (log: WellnessLog) => void;
  onDelete: (id: string) => void;
}

const Row: React.FC<
  ListChildComponentProps & {
    onUpdate: (log: WellnessLog) => void;
    onDelete: (id: string) => void;
  }
> = ({ index, style, data, onUpdate, onDelete }) => {
  const log: WellnessLog = data[index];

  const handleUpdate = () => onUpdate(log);
  const handleDelete = () => onDelete(log.id);

  return (
    <div className={styles.row} style={style}>
      <div className={styles.cell}>{formatDate(log.createdAt)}</div>
      <div className={styles.cell}>{log.mood}</div>
      <div className={styles.cell}>
        {formatSleepDuration(log.sleepDuration)}
      </div>
      <div className={styles.cell}>{log.activityNotes}</div>
      <div className={styles.cellActions}>
        <DropdownMenu
          trigger={<button className={styles.menuButton}>⋮</button>}
          items={[
            { label: "Update", onClick: handleUpdate },
            { label: "Delete", onClick: handleDelete },
          ]}
        />
      </div>
    </div>
  );
};

export const WellnessTable: React.FC<WellnessTableProps> = ({
  logs,
  loading,
  error,
  onUpdate,
  onDelete,
}) => {
  if (loading) {
    return <div className={styles.message}>Loading wellness logs...</div>;
  }
  if (error) {
    return <div className={styles.messageError}>{error}</div>;
  }
  if (!logs.length) {
    return <div className={styles.message}>No wellness logs found.</div>;
  }

  const height = Math.min(400, logs.length * 50);

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.cell}>Date</div>
        <div className={styles.cell}>Mood</div>
        <div className={styles.cell}>Sleep</div>
        <div className={styles.cell}>Activity Notes</div>
        <div className={styles.cellActions}>Actions</div>
      </div>
      <List
        height={height}
        itemCount={logs.length}
        itemSize={50}
        width="100%"
        itemData={logs}
      >
        {(props) => <Row {...props} onUpdate={onUpdate} onDelete={onDelete} />}
      </List>
    </div>
  );
};

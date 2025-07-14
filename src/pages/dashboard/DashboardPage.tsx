import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Layout, Button, Modal } from "../../components/common";

import { useAuth } from "../../hooks";
import { useWellnessLogs } from "../../hooks/useWellnessLogs";
import { loadable } from "../../utils/loadable";

import { WellnessLog, WellnessLogFormData } from "../../types";
import styles from "./DashboardPage.module.css";

const WellnessTable = loadable(() =>
  import("../../components/dashboard/wellness-table/WellnessTable").then(
    (mod) => ({ default: mod.WellnessTable })
  )
);
const SearchBar = loadable(() =>
  import("../../components/dashboard/search-bar/SearchBar").then((mod) => ({
    default: mod.SearchBar,
  }))
);

const WellnessLogForm = loadable(() =>
  import("../../components/forms/wellness-log-form/WellnessLogForm").then(
    (mod) => ({ default: mod.WellnessLogForm })
  )
);

export const DashboardPage: React.FC = () => {
  const {
    filteredLogs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    createLog,
    updateLog,
    deleteLog,
  } = useWellnessLogs();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<WellnessLog | null>(null);
  const [deleting, setDeleting] = useState<WellnessLog | null>(null);
  const handleCloseForm = () => setFormOpen(false);

  // Minimum sleep filter
  const [minSleep, setMinSleep] = useState<number>(0);
  const { isAuthenticated } = useAuth();

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (log: WellnessLog) => {
    setEditing(log);
    setFormOpen(true);
  };

  const openDelete = (log: WellnessLog) => setDeleting(log);
  const cancelDelete = () => setDeleting(null);
  const confirmDelete = async () => {
    if (deleting) {
      await deleteLog(deleting.id);
      setDeleting(null);
    }
  };

  const closeForm = () => setFormOpen(false);

  return (
    <Layout showHeader={isAuthenticated}>
      <div className={styles.container}>
        <div className={styles.buttonWrapper}>
          <Button variant="primary" size="lg" onClick={openNew}>
            <FontAwesomeIcon icon={faPlus} size="lg" />
            Add New
          </Button>
        </div>

        {formOpen && (
          <div className={styles.overlay} onClick={handleCloseForm} />
        )}

        <div className={`${styles.slidePanel} ${formOpen ? styles.open : ""}`}>
          <Button variant="secondary" size="sm" onClick={handleCloseForm}>
            Close
          </Button>
          <WellnessLogForm
            initialData={editing ?? undefined}
            submitLabel={editing ? "Update Entry" : "Add Entry"}
            onSubmit={async (data: WellnessLogFormData) => {
              if (editing) {
                await updateLog(editing.id, data);
              } else {
                await createLog(data);
              }
              closeForm();
            }}
          />
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {/* Table */}
        <WellnessTable
          logs={filteredLogs.filter((log) => log.sleepDuration >= minSleep)}
          loading={loading}
          error={error}
          onUpdate={openEdit}
          onDelete={(id: string) => {
            const log = filteredLogs.find((l) => l.id === id);
            if (log) openDelete(log);
          }}
        />

        <Modal
          title="Are you sure you want to delete this entry?"
          isOpen={!!deleting}
          onRequestClose={cancelDelete}
          onConfirm={confirmDelete}
        />
      </div>
    </Layout>
  );
};

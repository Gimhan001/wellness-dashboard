import React from "react";

import { Input, Button, Select, Slider } from "../../common";

import { useForm } from "../../../hooks";
import { validateWellnessLogForm } from "../../../utils";

import { WellnessLogFormData } from "../../../types";
import { MOOD_OPTIONS } from "../../../constants";
import styles from "./WellnessLogForm.module.css";

interface WellnessLogFormProps {
  onSubmit: (data: WellnessLogFormData) => Promise<void>;
  initialData?: Partial<WellnessLogFormData>;
  submitLabel?: string;
}

export const WellnessLogForm: React.FC<WellnessLogFormProps> = ({
  onSubmit,
  initialData,
  submitLabel = "Add Entry",
}) => {
  const { data, errors, isSubmitting, handleChange, handleSubmit, reset } =
    useForm<WellnessLogFormData>({
      mood: initialData?.mood ?? MOOD_OPTIONS[0].value,
      sleepDuration: initialData?.sleepDuration || 7,
      activityNotes: initialData?.activityNotes || "",
    });

  const handleFormSubmit = async (formData: WellnessLogFormData) => {
    await onSubmit(formData);
    if (!initialData) {
      reset();
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleFormSubmit, validateWellnessLogForm);
      }}
    >
      <h3 className={styles.title}>
        {initialData ? "Edit Wellness Entry" : "Add New Wellness Entry"}
      </h3>

      <Select
        name="mood"
        label="Mood"
        value={data.mood}
        onChange={(name, value) =>
          handleChange(name as keyof WellnessLogFormData, value)
        }
        options={[...MOOD_OPTIONS]}
        error={errors.mood}
        required
        placeholder="Select your mood"
      />

      <Slider
        name="sleepDuration"
        label="Sleep Duration"
        value={data.sleepDuration}
        onChange={(name, value) =>
          handleChange(name as keyof WellnessLogFormData, value)
        }
        min={0}
        max={12}
        step={0.5}
        error={errors.sleepDuration}
        required
      />

      <Input
        type="text"
        name="activityNotes"
        label="Activity Notes"
        value={data.activityNotes}
        onChange={(name, value) =>
          handleChange(name as keyof WellnessLogFormData, value)
        }
        error={errors.activityNotes}
        placeholder="Describe your activities (max 200 characters)"
      />

      <div className={styles.characterCount}>
        {data.activityNotes.length}/200 characters
      </div>

      {errors.submit && (
        <div className={styles.errorMessage}>{errors.submit}</div>
      )}

      <div className={styles.buttonGroup}>
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {submitLabel}
        </Button>

        {!initialData && (
          <Button
            type="button"
            variant="secondary"
            onClick={reset}
            disabled={isSubmitting}
          >
            Clear
          </Button>
        )}
      </div>
    </form>
  );
};

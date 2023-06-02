"use client";

import React, { ChangeEvent, FormEvent, useReducer, useEffect } from "react";

import Modal from "../../components/Modal";
import { TaskMutationPayload } from "@/types/task";
import FormField from "../../components/FormField";

export interface TaskFormModalProps {
  show?: boolean;
  title: string;
  isLoading?: boolean;
  payload?: TaskMutationPayload;
  errors?: Partial<Record<keyof TaskMutationPayload, string[]>>;
  onSubmit?: (payload: TaskMutationPayload) => void;
  onClose?: () => void;
}

function createEmptyPayload(): TaskMutationPayload {
  return {
    name: "",
    description: "",
    checkList: [],
    labels: [],
    startsAt: "",
    endsAt: "",
    isCompleted: false,
  };
}

export default function TaskFormModal({
  show = false,
  title,
  isLoading = false,
  payload = createEmptyPayload(),
  errors = {},
  onSubmit,
  onClose,
}: TaskFormModalProps) {
  const [data, setData] = useReducer(
    (data: TaskMutationPayload, payload: Partial<TaskMutationPayload>) =>
      ({ ...data, ...payload } as TaskMutationPayload),
    payload,
  );

  useEffect(() => {
    if (show) setData(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  function handleChange(field: keyof TaskMutationPayload) {
    return (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>,
    ) => {
      const value = e.target.value;
      setData({ [field]: value });
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit && onSubmit(data);
  }

  function handleClose() {
    if (!onClose) return;
    setData(createEmptyPayload());
    onClose();
  }

  return (
    <Modal
      show={show}
      title={title}
      isLoading={isLoading}
      confirmLabel="Submit"
      width="500px"
      onConfirm={() => onSubmit && onSubmit(data)}
      onClose={handleClose}
    >
      <form noValidate onSubmit={handleSubmit}>
        <FormField
          type="text"
          placeholder="Name of the task"
          value={data.name}
          errorMessage={errors.name && errors.name[0]}
          onChange={handleChange("name")}
        />
        <FormField
          as="textarea"
          placeholder="Description"
          rows={3}
          value={data.description}
          errorMessage={errors.description && errors.description[0]}
          onChange={handleChange("description")}
        />
        {data.checkList.length > 0 ? (
          <ul className="mb-3">
            {data.checkList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mb-3 text-gray-500">No check list items</p>
        )}
        <div className="flex items-start">
          <div className="w-6/12 pr-1">
            <FormField
              type="datetime-local"
              value={data.startsAt}
              errorMessage={errors.startsAt && errors.startsAt[0]}
              onChange={handleChange("startsAt")}
            />
          </div>
          <div className="w-6/12 pl-1">
            <FormField
              type="datetime-local"
              value={data.endsAt}
              errorMessage={errors.endsAt && errors.endsAt[0]}
              onChange={handleChange("endsAt")}
            />
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="task-field-completion"
            checked={data.isCompleted}
            className="mr-2"
            onChange={() => setData({ isCompleted: !data.isCompleted })}
          />
          <label htmlFor="task-field-completion">Completion</label>
        </div>
      </form>
    </Modal>
  );
}

"use client";

import React, { useMemo, useState, PropsWithChildren } from "react";

import { PartialTaskAttributes, TaskAttributes } from "@/types/task";

export default function DeleteTaskModalProvider({ children }: PropsWithChildren) {
  const [deleteIsOpen, setDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<PartialTaskAttributes | TaskAttributes | null>(null);

  const deleteTaskContextValue = useMemo<DeleteTasksContextAttributes>(
    () => ({ deleteIsOpen, taskToDelete, openDeleteTaskModal, closeDeleteTaskModal }),
    [deleteIsOpen, taskToDelete],
  );

  function openDeleteTaskModal(task: PartialTaskAttributes | TaskAttributes) {
    setTaskToDelete(task);
    setDeleteOpen(true);
  }

  function closeDeleteTaskModal() {
    setDeleteOpen(false);
    setTaskToDelete(null);
  }

  return <deleteTaskContext.Provider value={deleteTaskContextValue}>{children}</deleteTaskContext.Provider>;
}

export interface DeleteTasksContextAttributes {
  deleteIsOpen: boolean;
  taskToDelete: PartialTaskAttributes | TaskAttributes | null;
  openDeleteTaskModal(task: PartialTaskAttributes | TaskAttributes): void;
  closeDeleteTaskModal(): void;
}

export const deleteTaskContext = React.createContext<DeleteTasksContextAttributes>({
  deleteIsOpen: false,
  taskToDelete: null,
  openDeleteTaskModal: () => {},
  closeDeleteTaskModal: () => {},
});

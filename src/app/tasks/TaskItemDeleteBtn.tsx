"use client";

import React, { useContext } from "react";

import { deleteTaskContext } from "./DeleteTaskModalProvider";
import { PartialTaskAttributes } from "@/types/task";

export interface TaskItemDeleteBtnProps {
  task: PartialTaskAttributes;
}

export default function TaskItemDeleteBtn({ task }: TaskItemDeleteBtnProps) {
  const { openDeleteTaskModal } = useContext(deleteTaskContext);

  return (
    <button
      className="bg-red-600 hover:bg-red-700 duration-300 text-white px-2 py-1 text-sm"
      onClick={() => openDeleteTaskModal(task)}
    >
      Delete
    </button>
  );
}

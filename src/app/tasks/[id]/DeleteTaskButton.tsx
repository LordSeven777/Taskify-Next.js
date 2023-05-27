"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { TaskAttributes } from "@/types/task";
import DeleteTaskModalProvider, { deleteTaskContext } from "../DeleteTaskModalProvider";
import DeleteTaskModal from "../DeleteTaskModal";

export interface DeleteTaskButtonProps {
  task: TaskAttributes;
}

export default function DeleteTaskButton({ task }: DeleteTaskButtonProps) {
  const router = useRouter();

  return (
    <DeleteTaskModalProvider>
      <deleteTaskContext.Consumer>
        {({ openDeleteTaskModal }) => (
          <>
            <button
              className="px-3 py-2 text-white duration-300 bg-red-600 hover:bg-red-700 duration"
              onClick={() => openDeleteTaskModal(task)}
            >
              Delete
            </button>
            <DeleteTaskModal onDeleted={() => router.push("/tasks")} />
          </>
        )}
      </deleteTaskContext.Consumer>
    </DeleteTaskModalProvider>
  );
}

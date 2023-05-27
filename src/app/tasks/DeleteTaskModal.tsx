"use client";

import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { deleteTaskContext } from "./DeleteTaskModalProvider";
import "./DeleteTaskModal.css";
import { TaskAttributes } from "@/types/task";
import Modal from "@/components/Modal";

export interface DeleteTaskModalProps {
  onDeleted?: () => void;
}

async function deleteTask({ id, token }: { id: string; token: string }) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL as string}/tasks/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status >= 400) {
    const errorData = await res.json();
    throw { statusCode: res.status, data: errorData };
  }
  return (await res.json()) as TaskAttributes;
}

export default function DeleteTaskModal({ onDeleted }: DeleteTaskModalProps) {
  const { data: session, status } = useSession();

  const router = useRouter();

  const { deleteIsOpen, taskToDelete, closeDeleteTaskModal } = useContext(deleteTaskContext);

  const [isLoading, setLoading] = useState(false);

  async function handleDelete() {
    if (status === "loading") return;
    setLoading(true);
    try {
      await deleteTask({ id: (taskToDelete as TaskAttributes)._id, token: session?.accessToken as string });
      onDeleted ? onDeleted() : router.refresh();
      return closeDeleteTaskModal();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <Modal
      show={deleteIsOpen}
      title="Delete the task?"
      variant="danger"
      confirmLabel="Delete"
      isLoading={isLoading}
      onClose={closeDeleteTaskModal}
      onConfirm={handleDelete}
    >
      <p>
        Do you really want to delete the task: <strong className="font-semibold">{taskToDelete?.name}</strong>
        ?
      </p>
    </Modal>
  );
}

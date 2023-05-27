"use client";

import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import TaskFormModal from "@/components/TaskFormModal";
import { TaskMutationPayload, TaskAttributes } from "@/types/task";
import isApiError from "@/helpers/is-api-error.helper";

export interface UpdateTaskSectionProps {
  task: TaskAttributes;
}

async function updateTask({
  id,
  payload,
  token,
}: {
  id: string;
  payload: TaskMutationPayload;
  token: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL as string}/tasks/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status >= 400) {
    const errorData = await res.json();
    throw { statusCode: res.status, data: errorData };
  }
  return (await res.json()) as TaskAttributes;
}

export default function UpdateTaskSection({ task }: UpdateTaskSectionProps) {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [show, setShow] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TaskMutationPayload, string[]>>>({});

  const payload = useMemo<TaskMutationPayload>(
    () => ({
      name: task.name,
      description: task.description ?? "",
      checkList: task.checkList,
      labels: task.labels.map((label) => label._id),
      startsAt: task.startsAt.slice(0, 16),
      endsAt: task.endsAt.slice(0, 16),
      isCompleted: task.isCompleted,
    }),
    [task],
  );

  async function handleSubmit(payload: TaskMutationPayload) {
    if (status === "loading") return;
    setErrors({});
    setLoading(true);
    try {
      await updateTask({ id: task._id, payload, token: session?.accessToken as string });
      setShow(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      if (isApiError<Partial<Record<keyof TaskMutationPayload, string[]>>>(error)) {
        if (error.statusCode === 400) setErrors(error.data);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <button
        className="px-3 py-2 text-white duration-300 bg-green-700 hover:bg-green-800 duration"
        onClick={() => setShow(true)}
      >
        Edit
      </button>
      <TaskFormModal
        show={show}
        title="Edit the task"
        payload={payload}
        isLoading={isLoading}
        errors={errors}
        onClose={() => setShow(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}

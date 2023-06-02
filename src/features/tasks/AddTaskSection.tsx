"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import TaskFormModal from "@/features/tasks/TaskFormModal";
import { TaskMutationPayload, TaskAttributes } from "@/types/task";
import isApiError from "@/helpers/is-api-error.helper";

async function addTask({ payload, token }: { payload: TaskMutationPayload; token: string }) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL as string}/tasks`;
  const res = await fetch(url, {
    method: "POST",
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

export default function AddTaskSection() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [show, setShow] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TaskMutationPayload, string[]>>>({});

  async function handleSubmit(payload: TaskMutationPayload) {
    if (status === "loading") return;
    setLoading(true);
    try {
      await addTask({ payload, token: session?.accessToken as string });
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
    <section className="mb-4">
      <button
        className="py-2 px-3 text-white bg-green-700 hover:bg-green-800 duration-300"
        onClick={() => setShow(true)}
      >
        <span className="mr-2">+</span>
        New task
      </button>
      <TaskFormModal
        show={show}
        isLoading={isLoading}
        errors={errors}
        title="Add a task"
        onClose={() => setShow(false)}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

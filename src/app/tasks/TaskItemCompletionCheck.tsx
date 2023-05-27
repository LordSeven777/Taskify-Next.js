"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { PartialTaskAttributes, TaskAttributes } from "@/types/task";

export interface TaskItemCompletionCheckProps {
  task: PartialTaskAttributes;
}

async function updateTaskCompletion({
  id,
  isCompleted,
  token,
}: {
  id: string;
  isCompleted: boolean;
  token: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL as string}/tasks/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ isCompleted }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status >= 400) {
    const errorData = await res.json();
    throw { statusCode: res.status, data: errorData };
  }
  return (await res.json()) as TaskAttributes;
}

export default function TaskItemCompletionCheck({ task }: TaskItemCompletionCheckProps) {
  const router = useRouter();

  const { status, data: session } = useSession();

  const [isLoading, setLoading] = useState(false);

  async function handleChange() {
    if (status === "loading") return;
    setLoading(true);
    try {
      await updateTaskCompletion({
        id: task._id,
        isCompleted: !task.isCompleted,
        token: session?.accessToken as string,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <input
      type="checkbox"
      className="mr-2"
      checked={task.isCompleted}
      disabled={isLoading}
      onChange={handleChange}
    />
  );
}

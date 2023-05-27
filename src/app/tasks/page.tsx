import React from "react";
import { getServerSession } from "next-auth";

import DeleteTaskModalProvider from "./DeleteTaskModalProvider";
import { PartialTaskAttributes } from "@/types/task";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import TaskItem from "./TaskItem";
import AddTaskSection from "./AddTaskSection";
import TasksDateSection from "./TasksDateSection";
import DeleteTaskModal from "./DeleteTaskModal";

interface TasksPageSearchParams {
  date?: string;
}

async function getTasks({ token, userId, date }: { token: string; userId: string; date?: string }) {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL as string}/users/${userId}/tasks`;
  if (date) url += `?date=${date}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status >= 400) {
    const errorData = await res.json();
    throw { statusCode: res.status, data: errorData };
  }
  return (await res.json()) as PartialTaskAttributes[];
}

export default async function TasksPage({ searchParams }: { searchParams: TasksPageSearchParams }) {
  const session = await getServerSession(authOptions);

  if (!session) return;

  let tasks: PartialTaskAttributes[];
  try {
    tasks = await getTasks({ token: session.accessToken, userId: session.id, date: searchParams.date });
  } catch (error) {
    console.log(error);
    return null;
  }

  return (
    <main>
      <div className="mb-6 flex justify-between">
        <h1 className="font-bold text-2xl">Tasks</h1>
        <TasksDateSection />
      </div>
      <AddTaskSection />
      <DeleteTaskModalProvider>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
        {tasks.length === 0 && <p className="text-gray-700">No tasks</p>}
        <DeleteTaskModal />
      </DeleteTaskModalProvider>
    </main>
  );
}

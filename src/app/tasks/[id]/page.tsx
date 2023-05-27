import React from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { TaskAttributes } from "@/types/task";
import UpdateTaskSection from "./UpdateTaskSection";
import DeleteTaskButton from "./DeleteTaskButton";

interface TasksPageContext {
  params: {
    id: string;
  };
}

async function getTask({ id, token }: { id: string; token: string }) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL as string}/tasks/${id}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status >= 400) {
    if (res.status === 404) notFound();
    const errorData = await res.json();
    throw { statusCode: res.status, data: errorData };
  }
  return (await res.json()) as TaskAttributes;
}

function displayReadableDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    hour: "numeric",
    hour12: true,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function TaskPage({ params }: TasksPageContext) {
  const session = await getServerSession(authOptions);

  const task = await getTask({ id: params.id, token: session?.accessToken as string });

  return (
    <div>
      <header>
        <h1 className="font-bold text-2xl mb-6">Task details:</h1>
      </header>
      <main>
        <h2 className="font-semibold text-lg mb-3">{task.name}</h2>
        {task.description ? (
          <p className="mb-3">{task.description}</p>
        ) : (
          <p className="text-gray-700 italic mb-3">No description</p>
        )}
        {task.checkList.length > 0 ? (
          <ul className="mb-3">
            {task.checkList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 italic mb-3">No check list items</p>
        )}
        <p className="mb-3">
          Starts the{" "}
          <strong className="font-semibold">{displayReadableDateTime(new Date(task.startsAt))}</strong>
          <br />
          Ends the <strong className="font-semibold">{displayReadableDateTime(new Date(task.endsAt))}</strong>
        </p>
        <p className="mb-3">{task.isCompleted ? "Completed" : "Not completed"}</p>
        <div className="mt-5 flex gap-3">
          <UpdateTaskSection task={task} />
          <DeleteTaskButton task={task} />
        </div>
      </main>
    </div>
  );
}

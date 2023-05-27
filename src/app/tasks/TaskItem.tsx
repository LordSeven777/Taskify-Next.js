import Link from "next/link";
import { useMemo } from "react";

import { PartialTaskAttributes } from "@/types/task";
import TaskItemCompletionCheck from "./TaskItemCompletionCheck";
import TaskItemDeleteBtn from "./TaskItemDeleteBtn";
import { getHourAndMinutes, getStrictDateISO } from "@/utils/dates.utils";

export interface TaskItemProps {
  task: PartialTaskAttributes;
}

export default function TaskItem({ task }: TaskItemProps) {
  const icon = task.isCompleted ? "✅" : "❌";
  let completionClassName = task.isCompleted ? "text-green-500" : "text-red-600";
  completionClassName += ` ml-2`;
  const completionLabel = task.isCompleted ? "Completed" : "Not completed";

  const startDate = useMemo(() => new Date(task.startsAt), [task.startsAt]);
  const finishDate = useMemo(() => new Date(task.endsAt), [task.endsAt]);

  return (
    <div className="p-3 border-b border-solid border-gray-200 first:border-t hover:bg-gray-100 duration-300 cursor-pointer flex gap-x-2">
      <div className="basis-auto shrink grow flex flex-col">
        <p className="mb-2">{task.name}</p>
        <p className="mb-2">
          <TaskItemCompletionCheck task={task} />
          {icon}
          <span className={completionClassName}>{completionLabel}</span>
        </p>
        <p className="mb-2 font-semibold text-sm">
          {getStrictDateISO(startDate)} {getHourAndMinutes(startDate)}
          <span className="font-normal mx-2">-</span>
          {getStrictDateISO(finishDate)} {getHourAndMinutes(finishDate)}
        </p>
        <div className="flex flex-wrap gap-1">
          {task.labels.map((label) => (
            <span
              key={label._id}
              style={{ background: label.color }}
              className="text-xs text-white p-1 rounded"
            >
              {label.name}
            </span>
          ))}
          {task.labels.length === 0 && <span className="text-gray-500 text-sm">No label</span>}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 items-start">
        <Link
          href={`/tasks/${task._id}`}
          className="bg-green-700 hover:bg-green-800 duration-300 text-white px-2 py-1 text-sm"
        >
          View
        </Link>
        <TaskItemDeleteBtn task={task} />
      </div>
    </div>
  );
}

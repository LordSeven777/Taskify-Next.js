import type { UserAttributes } from "./user";
import type { LabelAttributes } from "./label";
import type { Timestamps } from "./timestamps";

export interface TaskAttributes extends Timestamps {
  _id: string;
  name: string;
  description?: string;
  checkList: string[];
  startsAt: string;
  endsAt: string;
  isCompleted: boolean;
  user: UserAttributes;
  labels: LabelAttributes[];
}

export type PartialTaskAttributes = Omit<TaskAttributes, "description" | "checklist"> & {
  user: string;
};

export type TaskMutationPayload = Required<
  Omit<TaskAttributes, "_id" | "user" | "labels" | "createdAt" | "updatedAt">
> & {
  // Labels ids
  labels: string[];
};

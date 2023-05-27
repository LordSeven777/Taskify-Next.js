import type { Timestamps } from "./timestamps";

export interface LabelAttributes extends Timestamps {
  _id: string;
  name: string;
  color: string;
  user: string;
}

export type LabelCreationAttributes = Omit<LabelAttributes, "_id" | "user" | "createdAt" | "updatedAt">;

export type LabelUpdateMutationPayload = LabelCreationAttributes & Pick<LabelAttributes, "_id">;

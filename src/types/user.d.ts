import type { Timestamps } from "./timestamps";

export interface UserAttributes extends Timestamps {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

import type { UserAttributes } from "./user";

export interface AuthenticationResult {
  user: UserAttributes;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
  }

  type Session = DefaultSession["user"] & User;
}

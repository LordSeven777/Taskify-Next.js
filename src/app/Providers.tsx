"use client";

import { PropsWithChildren } from "react";

import NextAuthProvider from "@/features/auth/NextAuthProvider";

export default function Providers({ children }: PropsWithChildren) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}

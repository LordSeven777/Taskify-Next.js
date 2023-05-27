import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { AuthenticationResult } from "@/types/auth";

async function login(credentials: { email: string; password: string }) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL as string}/auth/login`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(credentials),
  });
  if (res.status >= 400) {
    const errorData = await res.json();
    throw { statusCode: res.status, data: errorData };
  }
  return (await res.json()) as AuthenticationResult;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Crendentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "E-mail address" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const authResult = await login(credentials as Record<"email" | "password", string>);
          return {
            id: authResult.user._id,
            accessToken: authResult.accessToken,
            refreshToken: authResult.refreshToken,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.id = token.id;
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);

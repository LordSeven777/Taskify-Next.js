"use client";

import React from "react";

import NavLink from "@/components/NavLink";
import { signOut, useSession } from "next-auth/react";

export interface NavbarLinksProps {
  initialAuthenticated?: boolean;
}

export default function NavbarLinks({ initialAuthenticated = false }: NavbarLinksProps) {
  const { status } = useSession();

  const isAuthenticated = status === "authenticated" || (status === "loading" && initialAuthenticated);

  return (
    <div className="flex">
      <NavLink
        href="/"
        className="py-3 px-3 duration-300 hover:opacity-80 hover:scale-95"
        activeClassName="text-green-600"
      >
        Home
      </NavLink>
      {!isAuthenticated && (
        <>
          <NavLink
            href="/login"
            className="py-3 px-3 duration-300 hover:opacity-80 hover:scale-95"
            activeClassName="text-green-600"
          >
            Login
          </NavLink>
          <NavLink
            href="/register"
            className="py-3 px-3 duration-300 hover:opacity-80 hover:scale-95"
            activeClassName="text-green-600"
          >
            Sign up
          </NavLink>
        </>
      )}
      {isAuthenticated && (
        <>
          <NavLink
            href="/tasks"
            className="py-3 px-3 duration-300 hover:opacity-80 hover:scale-95"
            activeClassName="text-green-600"
          >
            Tasks
          </NavLink>
          <button
            className="py-3 px-3 duration-300 hover:opacity-80 hover:scale-95 text-red-600"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </>
      )}
    </div>
  );
}

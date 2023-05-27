"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export type NavLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
  activeClassName?: string;
}>;

export default function NavLink({
  href,
  className = "",
  activeClassName = "active",
  children,
}: NavLinkProps) {
  const pathname = usePathname() ?? "";

  if (pathname === href) {
    className += ` ${activeClassName}`;
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

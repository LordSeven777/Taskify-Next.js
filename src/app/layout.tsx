import { Metadata } from "next";

import Navbar from "./Navbar";
import Providers from "./Providers";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body suppressHydrationWarning={true}>
        <Providers>
          <div className="main-body">
            {/* @ts-expect-error Async Server Component */}
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Taskify",
};

import React, { PropsWithChildren } from "react";

export default function TasksLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="mx-auto pt-6 pb-8" style={{ width: "500px" }}>
      {children}
    </div>
  );
}

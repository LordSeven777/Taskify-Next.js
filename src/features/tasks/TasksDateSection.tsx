"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useMemo } from "react";

import { getStrictDateISO } from "@/utils/dates.utils";

export default function TasksDateSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const dateQuery = searchParams?.get("date");
  const date = useMemo(() => (dateQuery ? new Date(dateQuery) : new Date()), [dateQuery]);
  const readableDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }, [date]);
  const dateISO = getStrictDateISO(date);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    router.push(`/tasks?date=${e.target.value}`);
  }

  return (
    <section className="flex flex-col items-end gap-2">
      <h2 className="font-semibold">{readableDate}</h2>
      <input
        type="date"
        value={dateISO}
        className="bg-slate-200 py-1 px-2 rounded border-gray-200"
        onChange={handleChange}
      />
    </section>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { eventConfig } from "@/config/event";
import { ATTENDANCE_STATUS_VALUES } from "@/lib/rsvp/schema";

export function RSVPFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(searchParam);
  // Keeps the input in sync when the URL changes from outside typing
  // (e.g. browser back/forward), without a setState-in-effect.
  const [syncedSearchParam, setSyncedSearchParam] = useState(searchParam);
  if (searchParam !== syncedSearchParam) {
    setSyncedSearchParam(searchParam);
    setSearch(searchParam);
  }
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/admin?${params.toString()}`);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParam("search", value), 350);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="search"
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="جستجوی نام مهمان"
        aria-label="جستجوی نام مهمان"
        className="w-full rounded-full border border-olive-300 bg-ivory-50 px-4 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:border-olive-700 focus:outline-none sm:max-w-xs"
      />

      <select
        value={searchParams.get("attendanceStatus") ?? ""}
        onChange={(e) => updateParam("attendanceStatus", e.target.value)}
        aria-label="فیلتر وضعیت حضور"
        className="rounded-full border border-olive-300 bg-ivory-50 px-4 py-2 text-sm text-ink-900 focus:border-olive-700 focus:outline-none"
      >
        <option value="">همه وضعیت‌ها</option>
        {ATTENDANCE_STATUS_VALUES.map((value) => (
          <option key={value} value={value}>
            {eventConfig.rsvp.attendanceOptions[value]}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("hasCompanion") ?? ""}
        onChange={(e) => updateParam("hasCompanion", e.target.value)}
        aria-label="فیلتر همراه"
        className="rounded-full border border-olive-300 bg-ivory-50 px-4 py-2 text-sm text-ink-900 focus:border-olive-700 focus:outline-none"
      >
        <option value="">همراه: همه</option>
        <option value="true">با همراه</option>
        <option value="false">تنها</option>
      </select>
    </div>
  );
}

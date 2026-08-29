"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function AdminHeader() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-lg font-semibold text-ink-900">پاسخ‌های حضور</h1>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => startTransition(() => router.refresh())}
          disabled={isPending}
          className="rounded-full border border-olive-300 px-4 py-1.5 text-sm text-ink-900 transition hover:border-olive-600 disabled:opacity-60"
        >
          {isPending ? "..." : "بروزرسانی"}
        </button>
        <a
          href="/api/admin/export"
          className="rounded-full border border-olive-300 px-4 py-1.5 text-sm text-ink-900 transition hover:border-olive-600"
        >
          خروجی CSV
        </a>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-full bg-olive-800 px-4 py-1.5 text-sm text-ivory-50 transition hover:bg-olive-900 disabled:opacity-60"
        >
          خروج
        </button>
      </div>
    </div>
  );
}

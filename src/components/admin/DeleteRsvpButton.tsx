"use client";

import { useState, useTransition } from "react";
import { deleteRsvpAction } from "@/app/admin/actions";

export function DeleteRsvpButton({ id, guestName }: { id: string; guestName: string }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div className="flex items-center justify-end gap-2 whitespace-nowrap">
        <span className="text-xs text-ink-600">حذف شود؟</span>
        <button
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              const result = await deleteRsvpAction(id);
              if (!result.ok) {
                setError(result.error ?? "حذف با مشکل مواجه شد");
                setConfirming(false);
              }
            })
          }
          className="rounded-full bg-red-700 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {isPending ? "..." : "تأیید"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded-full border border-olive-300 px-3 py-1 text-xs text-ink-600 transition hover:border-olive-600"
        >
          انصراف
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={() => {
          setError(null);
          setConfirming(true);
        }}
        aria-label={`حذف ${guestName}`}
        className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-700 transition hover:border-red-400 hover:bg-red-50"
      >
        حذف
      </button>
      {error && <span className="text-[0.65rem] text-red-700">{error}</span>}
    </div>
  );
}

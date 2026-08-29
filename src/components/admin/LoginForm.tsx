"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }

      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? "مشکلی پیش اومد. لطفاً دوباره امتحان کنین.");
    } catch {
      setError("مشکلی پیش اومد. لطفاً دوباره امتحان کنین.");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full max-w-xs flex-col gap-4">
      <div>
        <label htmlFor="password" className="mb-2 block text-sm text-ink-600">
          رمز عبور مدیریت
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "password-error" : undefined}
          className="w-full rounded-full border border-olive-300 bg-ivory-50 px-5 py-3 text-sm text-ink-900 focus:border-olive-700 focus:outline-none"
        />
        {error && (
          <p id="password-error" className="mt-1.5 px-2 text-xs text-red-700">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-olive-800 px-5 py-3 text-sm font-medium text-ivory-50 transition hover:bg-olive-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "در حال ورود..." : "ورود"}
      </button>
    </form>
  );
}

"use client";

import { useRef, useState } from "react";
import { eventConfig } from "@/config/event";
import { HeartIcon } from "@/components/icons";
import { createRsvpSchema, type AttendanceStatusValue } from "@/lib/rsvp/schema";

type Status = "idle" | "submitting" | "success" | "error";

const optionButtonBase =
  "w-full rounded-2xl border px-4 py-3 text-center text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700";

function optionClassName(selected: boolean) {
  return `${optionButtonBase} ${selected
    ? "border-olive-800 bg-olive-800 text-ivory-50"
    : "border-olive-300 bg-ivory-50 text-ink-900 hover:border-olive-600"
    }`;
}

export function RSVPForm() {
  const [guestName, setGuestName] = useState("");
  const [hasCompanion, setHasCompanion] = useState<boolean | null>(null);
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatusValue | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [companionError, setCompanionError] = useState<string | null>(null);
  const [attendanceError, setAttendanceError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  if (status === "success") {
    const message =
      attendanceStatus === "NOT_COMING"
        ? eventConfig.rsvp.successMessages.notAttending
        : eventConfig.rsvp.successMessages.attending;
    return (
      <section id="rsvp" className="bg-ivory-200 px-5 py-12 text-center">
        <div className="mx-auto max-w-xs rounded-3xl border border-olive-200 bg-ivory-50 px-6 py-10 shadow-sm">
          <HeartIcon className="mx-auto h-7 w-7 text-olive-700" />
          <p className="mt-4 whitespace-pre-line text-lg leading-8 text-ink-900">{message}</p>
        </div>
      </section>
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submittingRef.current) return;

    setNameError(null);
    setCompanionError(null);
    setAttendanceError(null);
    setErrorMessage(null);

    const parsed = createRsvpSchema.safeParse({
      guestName,
      attendanceStatus,
      hasCompanion: attendanceStatus === "NOT_COMING" ? null : hasCompanion,
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      if (fieldErrors.guestName?.[0]) setNameError(fieldErrors.guestName[0]);
      if (fieldErrors.attendanceStatus?.[0]) setAttendanceError(fieldErrors.attendanceStatus[0]);
      if (fieldErrors.hasCompanion?.[0]) setCompanionError(fieldErrors.hasCompanion[0]);
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      if (response.status === 400) {
        const body = (await response.json().catch(() => null)) as {
          fieldErrors?: Record<string, string[]>;
        } | null;
        const fieldErrors = body?.fieldErrors ?? {};
        if (fieldErrors.guestName?.[0]) setNameError(fieldErrors.guestName[0]);
        if (fieldErrors.attendanceStatus?.[0]) setAttendanceError(fieldErrors.attendanceStatus[0]);
        if (fieldErrors.hasCompanion?.[0]) setCompanionError(fieldErrors.hasCompanion[0]);
        setStatus("error");
        setErrorMessage(eventConfig.rsvp.genericError);
        return;
      }

      setStatus("error");
      setErrorMessage(eventConfig.rsvp.genericError);
    } catch {
      setStatus("error");
      setErrorMessage(eventConfig.rsvp.genericError);
    } finally {
      submittingRef.current = false;
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section id="rsvp" className="bg-ivory-200 px-5 pb-8 pt-10">
      <div className="mb-2 text-center">
        <h2 className="text-xl font-semibold leading-8 text-ink-900">{eventConfig.rsvp.heading}</h2>
        <HeartIcon className="mx-auto mt-2 h-5 w-5 text-ink-600" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-6">
        <div>
          <input
            id="guestName"
            name="guestName"
            type="text"
            autoComplete="name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder={eventConfig.rsvp.guestNamePlaceholder}
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? "guestName-error" : undefined}
            className="w-full rounded-full border border-olive-300 bg-ivory-50 px-5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-olive-700 focus:outline-none"
          />
          {nameError && (
            <p id="guestName-error" className="mt-1.5 px-2 text-xs text-red-700">
              {nameError}
            </p>
          )}
        </div>

        <div>
          <div role="radiogroup" className="grid grid-cols-2 gap-3">
            <button
              type="button"
              role="radio"
              aria-checked={hasCompanion === true}
              onClick={() => setHasCompanion(true)}
              className={optionClassName(hasCompanion === true)}
            >
              {eventConfig.rsvp.companionOptions.withCompanion}
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={hasCompanion === false}
              onClick={() => setHasCompanion(false)}
              className={optionClassName(hasCompanion === false)}
            >
              {eventConfig.rsvp.companionOptions.alone}
            </button>
          </div>
          {companionError && <p className="mt-1.5 px-2 text-xs text-red-700">{companionError}</p>}
        </div>

        <div>
          <div
            role="radiogroup"
            aria-label="وضعیت حضور"
            className="grid grid-cols-2 gap-3"
          >
            {(["DEFINITELY_COMING", "COMING_WITH_LOVE"] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={attendanceStatus === value}
                onClick={() => setAttendanceStatus(value)}
                className={optionClassName(attendanceStatus === value)}
              >
                {eventConfig.rsvp.attendanceOptions[value]}
              </button>
            ))}
            <button
              type="button"
              role="radio"
              aria-checked={attendanceStatus === "NOT_COMING"}
              onClick={() => setAttendanceStatus("NOT_COMING")}
              className={`${optionClassName(attendanceStatus === "NOT_COMING")} col-span-2`}
            >
              {eventConfig.rsvp.attendanceOptions.NOT_COMING}
            </button>
          </div>
          {attendanceError && <p className="mt-1.5 px-2 text-xs text-red-700">{attendanceError}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-olive-800 px-5 py-3.5 text-base font-medium text-ivory-50 shadow-sm transition hover:bg-olive-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? eventConfig.rsvp.submittingLabel : eventConfig.rsvp.submitLabel}
        </button>

        <p role="status" aria-live="polite" className="min-h-5 text-center text-sm text-red-700">
          {status === "error" ? errorMessage : ""}
        </p>
      </form>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { eventConfig } from "@/config/event";
import { toPersianTwoDigits } from "@/lib/persian";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function computeTimeLeft(): TimeLeft | "finished" {
  const diff = new Date(eventConfig.eventDateTimeIso).getTime() - Date.now();
  if (diff <= 0) return "finished";
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function Unit({ value, label }: { value: number | undefined; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 px-1">
      <span className="text-3xl font-semibold tabular-nums">
        {value === undefined ? "--" : toPersianTwoDigits(value)}
      </span>
      <span className="text-xs text-ivory-100/70">{label}</span>
    </div>
  );
}

export function Countdown() {
  // Starts as null on both server and first client render so the markup
  // matches exactly; the real value is filled in after mount, and the
  // interval only ever runs client-side.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | "finished" | null>(null);

  useEffect(() => {
    // Intentional: this reads Date.now(), which must never run during SSR
    // or the initial client render (it would mismatch the server output).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(computeTimeLeft());
    const id = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const finished = timeLeft === "finished";
  const values = timeLeft && timeLeft !== "finished" ? timeLeft : undefined;

  return (
    <section className="px-4 pb-2 pt-4">
      <div className="rounded-[2rem] bg-olive-800 px-4 py-7 text-ivory-50 shadow-[0_10px_25px_-12px_rgba(41,42,33,0.5)]">
        <h2 className="mb-6 text-center text-base font-medium">{eventConfig.countdown.title}</h2>
        {finished ? (
          <p className="text-center text-lg leading-8">{eventConfig.countdown.finishedMessage}</p>
        ) : (
          <div className="flex items-stretch justify-between divide-x divide-ivory-50/15">
            <Unit value={values?.seconds} label={eventConfig.countdown.labels.seconds} />
            <Unit value={values?.minutes} label={eventConfig.countdown.labels.minutes} />
            <Unit value={values?.hours} label={eventConfig.countdown.labels.hours} />
            <Unit value={values?.days} label={eventConfig.countdown.labels.days} />
          </div>
        )}
      </div>
    </section>
  );
}

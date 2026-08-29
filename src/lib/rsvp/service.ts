import "server-only";
import type { RSVP } from "@prisma/client";
import {
  countCompanions,
  createRsvpRecord,
  deleteRsvpById,
  findAllRsvpsForExport,
  findManyRsvps,
  groupByAttendanceStatus,
} from "./repository";
import { createRsvpSchema, type AdminListQuery, type CreateRsvpInput } from "./schema";

export type RsvpListItem = {
  id: string;
  guestName: string;
  attendanceStatus: RSVP["attendanceStatus"];
  hasCompanion: boolean | null;
  partySize: number;
  createdAt: Date;
};

function toListItem(record: RSVP): RsvpListItem {
  return {
    id: record.id,
    guestName: record.guestName,
    attendanceStatus: record.attendanceStatus,
    hasCompanion: record.hasCompanion,
    partySize: partySizeFor(record.attendanceStatus, record.hasCompanion),
    createdAt: record.createdAt,
  };
}

function partySizeFor(
  attendanceStatus: RSVP["attendanceStatus"],
  hasCompanion: boolean | null
): number {
  if (attendanceStatus === "NOT_COMING") return 0;
  return hasCompanion ? 2 : 1;
}

export type SubmitRsvpResult =
  | { ok: true; attendanceStatus: CreateRsvpInput["attendanceStatus"] }
  | { ok: false; fieldErrors: Partial<Record<keyof CreateRsvpInput, string[]>>; formError?: string };

export async function submitRsvp(
  rawInput: unknown,
  meta: { userAgent?: string | null }
): Promise<SubmitRsvpResult> {
  const parsed = createRsvpSchema.safeParse(rawInput);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as Partial<
      Record<keyof CreateRsvpInput, string[]>
    >;
    return { ok: false, fieldErrors };
  }

  try {
    const record = await createRsvpRecord({ ...parsed.data, userAgent: meta.userAgent });
    return { ok: true, attendanceStatus: record.attendanceStatus };
  } catch {
    return {
      ok: false,
      fieldErrors: {},
      formError: "مشکلی پیش اومد. لطفاً دوباره امتحان کنین.",
    };
  }
}

export async function listRsvps(filters: AdminListQuery): Promise<RsvpListItem[]> {
  const records = await findManyRsvps(filters);
  return records.map(toListItem);
}

export type RsvpStats = {
  totalResponses: number;
  comingCount: number;
  notComingCount: number;
  companionCount: number;
  totalPeopleCount: number;
};

export async function getRsvpStats(): Promise<RsvpStats> {
  const [grouped, companionCount] = await Promise.all([groupByAttendanceStatus(), countCompanions()]);

  let totalResponses = 0;
  let comingCount = 0;
  let notComingCount = 0;
  let totalPeopleCount = 0;

  for (const group of grouped) {
    const count = group._count._all;
    totalResponses += count;
    if (group.attendanceStatus === "NOT_COMING") {
      notComingCount += count;
    } else {
      comingCount += count;
    }
  }

  // Every attending guest is at least 1 person; companions add 1 more each.
  totalPeopleCount = comingCount + companionCount;

  return { totalResponses, comingCount, notComingCount, companionCount, totalPeopleCount };
}

export async function removeRsvp(id: string): Promise<void> {
  await deleteRsvpById(id);
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function buildRsvpCsv(): Promise<string> {
  const records = await findAllRsvpsForExport();
  const header = ["guestName", "attendanceStatus", "hasCompanion", "createdAt"];
  const rows = records.map((r) =>
    [
      csvEscape(r.guestName),
      r.attendanceStatus,
      r.hasCompanion === null ? "" : String(r.hasCompanion),
      r.createdAt.toISOString(),
    ].join(",")
  );
  const csvBody = [header.join(","), ...rows].join("\r\n");
  // Prepend a UTF-8 BOM so Excel opens Persian text correctly.
  return "﻿" + csvBody;
}

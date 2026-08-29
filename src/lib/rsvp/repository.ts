import "server-only";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { AdminListQuery, CreateRsvpInput } from "./schema";

export function createRsvpRecord(input: CreateRsvpInput & { userAgent?: string | null }) {
  return prisma.rSVP.create({
    data: {
      guestName: input.guestName,
      attendanceStatus: input.attendanceStatus,
      hasCompanion: input.attendanceStatus === "NOT_COMING" ? null : input.hasCompanion ?? false,
      userAgent: input.userAgent ?? null,
    },
  });
}

export function findManyRsvps(filters: AdminListQuery) {
  const where: Prisma.RSVPWhereInput = {};

  if (filters.search) {
    where.guestName = { contains: filters.search, mode: "insensitive" };
  }
  if (filters.attendanceStatus) {
    where.attendanceStatus = filters.attendanceStatus;
  }
  if (filters.hasCompanion !== undefined) {
    where.hasCompanion = filters.hasCompanion;
  }

  return prisma.rSVP.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export function findAllRsvpsForExport() {
  return prisma.rSVP.findMany({ orderBy: { createdAt: "desc" } });
}

export function deleteRsvpById(id: string) {
  return prisma.rSVP.delete({ where: { id } });
}

export function countAllRsvps() {
  return prisma.rSVP.count();
}

export function groupByAttendanceStatus() {
  return prisma.rSVP.groupBy({
    by: ["attendanceStatus"],
    _count: { _all: true },
  });
}

export function countCompanions() {
  return prisma.rSVP.count({
    where: {
      hasCompanion: true,
      attendanceStatus: { not: "NOT_COMING" },
    },
  });
}

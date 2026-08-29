-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('COMING_WITH_LOVE', 'DEFINITELY_COMING', 'NOT_COMING');

-- CreateTable
CREATE TABLE "RSVP" (
    "id" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "attendanceStatus" "AttendanceStatus" NOT NULL,
    "hasCompanion" BOOLEAN,
    "companionName" TEXT,
    "optionalNote" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RSVP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RSVP_createdAt_idx" ON "RSVP"("createdAt");

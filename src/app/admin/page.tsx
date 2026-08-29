import type { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/admin";
import { adminListQuerySchema } from "@/lib/rsvp/schema";
import { getRsvpStats, listRsvps } from "@/lib/rsvp/service";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { RSVPStats } from "@/components/admin/RSVPStats";
import { RSVPFilters } from "@/components/admin/RSVPFilters";
import { RSVPTable } from "@/components/admin/RSVPTable";

export const metadata: Metadata = {
  title: "پنل مدیریت | شقایق و نیما",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin();

  const rawParams = await searchParams;
  const parsed = adminListQuerySchema.safeParse({
    search: typeof rawParams.search === "string" ? rawParams.search : undefined,
    attendanceStatus:
      typeof rawParams.attendanceStatus === "string" ? rawParams.attendanceStatus : undefined,
    hasCompanion: typeof rawParams.hasCompanion === "string" ? rawParams.hasCompanion : undefined,
  });
  const filters = parsed.success
    ? parsed.data
    : { search: undefined, attendanceStatus: undefined, hasCompanion: undefined };

  const [stats, items] = await Promise.all([getRsvpStats(), listRsvps(filters)]);

  return (
    <main className="min-h-svh bg-ivory-200 px-4 py-8 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <AdminHeader />
        <RSVPStats stats={stats} />
        <Suspense fallback={<div className="h-10" />}>
          <RSVPFilters />
        </Suspense>
        <RSVPTable items={items} />
      </div>
    </main>
  );
}

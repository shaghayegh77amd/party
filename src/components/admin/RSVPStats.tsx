import { toPersianDigits } from "@/lib/persian";
import type { RsvpStats } from "@/lib/rsvp/service";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-olive-200 bg-ivory-50 px-4 py-4 text-center">
      <p className="text-2xl font-semibold text-ink-900">{toPersianDigits(value)}</p>
      <p className="mt-1 text-xs text-ink-400">{label}</p>
    </div>
  );
}

export function RSVPStats({ stats }: { stats: RsvpStats }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      <StatCard label="کل پاسخ‌ها" value={stats.totalResponses} />
      <StatCard label="میان" value={stats.comingCount} />
      <StatCard label="نمیان" value={stats.notComingCount} />
      <StatCard label="تعداد همراه‌ها" value={stats.companionCount} />
      <StatCard label="تعداد کل افراد" value={stats.totalPeopleCount} />
    </div>
  );
}

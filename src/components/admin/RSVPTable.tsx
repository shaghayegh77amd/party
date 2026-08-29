import { eventConfig } from "@/config/event";
import { formatJalaliDateTime, toPersianDigits } from "@/lib/persian";
import type { RsvpListItem } from "@/lib/rsvp/service";
import { DeleteRsvpButton } from "./DeleteRsvpButton";

function companionLabel(item: RsvpListItem): string {
  if (item.attendanceStatus === "NOT_COMING") return "—";
  return item.hasCompanion ? "با همراه" : "تنها";
}

export function RSVPTable({ items }: { items: RsvpListItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-olive-300 bg-ivory-50 py-12 text-center text-sm text-ink-400">
        هنوز پاسخی ثبت نشده.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-olive-200 bg-ivory-50">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-olive-200 text-right text-xs text-ink-400">
            <th className="px-4 py-3 font-medium">نام مهمان</th>
            <th className="px-4 py-3 font-medium">وضعیت حضور</th>
            <th className="px-4 py-3 font-medium">همراه</th>
            <th className="px-4 py-3 font-medium">تعداد نفر</th>
            <th className="px-4 py-3 font-medium">زمان ثبت</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-olive-100 last:border-0">
              <td className="px-4 py-3 text-ink-900">{item.guestName}</td>
              <td className="px-4 py-3 text-ink-900">
                {eventConfig.rsvp.attendanceOptions[item.attendanceStatus]}
              </td>
              <td className="px-4 py-3 text-ink-600">{companionLabel(item)}</td>
              <td className="px-4 py-3 text-ink-600">{toPersianDigits(item.partySize)}</td>
              <td className="px-4 py-3 text-ink-600 tabular-nums">
                {formatJalaliDateTime(item.createdAt)}
              </td>
              <td className="px-4 py-3">
                <DeleteRsvpButton id={item.id} guestName={item.guestName} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

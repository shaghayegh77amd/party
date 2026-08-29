import { CalendarIcon, ClockIcon, PinIcon } from "@/components/icons";
import { eventConfig } from "@/config/event";

function Column({
  icon,
  label,
  value,
  secondary,
  divider,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  secondary: string;
  divider?: boolean;
  href?: string;
}) {
  const className = `flex flex-1 flex-col items-center gap-2 px-2 text-center ${divider ? "border-e border-olive-200" : ""}`;
  const content = (
    <>
      <span className="text-olive-700">{icon}</span>
      <span className="text-xs text-ink-400">{label}</span>
      <span className="text-base font-semibold text-ink-900">{value}</span>
      <span className="text-[0.7rem] leading-4 text-ink-400">{secondary}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label}: ${value} - نمایش جزئیات آدرس روی نقشه`}
        className={`${className} no-underline transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700`}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export function EventDetails() {
  const { mapUrl } = eventConfig.location;
  return (
    <section id="event" className="bg-ivory-200 px-4 py-10">
      <div className="flex items-stretch justify-between">
        <Column
          icon={<PinIcon className="h-6 w-6" />}
          label="مکان"
          value={eventConfig.location.city}
          secondary={mapUrl ? "جزئیات آدرس" : eventConfig.location.secondary}
          href={mapUrl || undefined}
          divider
        />
        <Column
          icon={<ClockIcon className="h-6 w-6" />}
          label="ساعت"
          value={eventConfig.time.primary}
          secondary={eventConfig.time.secondary}
          divider
        />
        <Column
          icon={<CalendarIcon className="h-6 w-6" />}
          label="تاریخ"
          value={eventConfig.date.primary}
          secondary={eventConfig.date.secondary}
        />
      </div>
    </section>
  );
}

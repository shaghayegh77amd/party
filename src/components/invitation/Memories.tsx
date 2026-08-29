import Image from "next/image";
import { eventConfig } from "@/config/event";
import { HeartIcon } from "@/components/icons";

export function Memories() {
  return (
    <section id="memories" className="overflow-hidden bg-ivory-200 px-4 pb-12 pt-4">
      <div className="flex items-start gap-4">
        <div className="relative w-[52%] max-w-[210px] shrink-0 pt-4">
          <span className="absolute -top-1 left-1/2 z-10 h-7 w-20 -translate-x-1/2 rotate-[-4deg] rounded-[1px] bg-ivory-100/80 shadow-sm" />
          <div className="relative rotate-3 rounded-[2px] bg-white p-2.5 pb-7 shadow-[0_14px_25px_-10px_rgba(41,42,33,0.35)]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-olive-200">
              <Image
                src={eventConfig.memories.image.src}
                alt={eventConfig.memories.image.alt}
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 pt-8 font-script text-[1.20rem] leading-[2.4rem] text-ink-900">
          {eventConfig.memories.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <HeartIcon className="mt-1 h-5 w-5 text-ink-600" />

        </div>
      </div>
    </section>
  );
}

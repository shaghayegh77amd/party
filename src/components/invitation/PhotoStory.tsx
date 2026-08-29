import Image from "next/image";
import { eventConfig } from "@/config/event";

export function PhotoStory() {
  return (
    <section className="relative h-[240px] w-full overflow-hidden bg-olive-900">
      <Image
        src={eventConfig.photoStory.image.src}
        alt={eventConfig.photoStory.image.alt}
        fill
        className="object-contain object-center !-top-[175px] !h-auto "

      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/45 to-transparent" />
      <div className="absolute inset-y-0 right-0 flex w-3/5 flex-col px-5 text-right pt-5">
        <p className="whitespace-pre-line text-[1.05rem] font-medium leading-8 text-white">
          {eventConfig.photoStory.text}
        </p>
      </div>
    </section>
  );
}

import Image from "next/image";
import { eventConfig } from "@/config/event";
import { ArrowDownIcon } from "@/components/icons";
import { HeroMenuButton } from "./HeroMenuButton";
import { Monogram } from "./Monogram";
import { TornDivider } from "./TornDivider";

export function Hero() {
  return (
    <section className="relative h-[70svh] min-h-[560px] w-full overflow-hidden bg-olive-900">
      <Image
        src={eventConfig.hero.image.src}
        alt={eventConfig.hero.image.alt}
        fill
        priority
        sizes="(max-width: 480px) 100vw, 480px"
        className="object-cover !-top-[16px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/75" />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <HeroMenuButton />
          <Monogram className="text-lg text-white" />
        </div>

        <div className="space-y-5 pb-3 text-white">
          <h1 className="text-[2.6rem] font-medium leading-[1.15]">
            <span className="block">{eventConfig.couple.him}</span>
            <span className="block text-2xl font-normal text-white/75">&amp;</span>
            <span className="block">{eventConfig.couple.her}</span>
          </h1>
          <p className="max-w-[230px] whitespace-pre-line text-[0.95rem] leading-8 text-white/90">
            {eventConfig.hero.intro}
          </p>
          <a
            href="#event"
            aria-label="برو به بخش اطلاعات مراسم"
            className="inline-flex rounded-full p-1 text-white/85 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowDownIcon className="h-6 w-6 animate-bounce" />
          </a>
        </div>
      </div>

      <TornDivider fillClassName="text-ivory-200" className="absolute inset-x-0 -bottom-px" />
    </section>
  );
}

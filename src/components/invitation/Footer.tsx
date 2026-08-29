import { eventConfig } from "@/config/event";
import { Monogram } from "./Monogram";
import { TornDivider } from "./TornDivider";

export function Footer() {
  return (
    <footer className="relative">
      <TornDivider fillClassName="text-olive-900" />
      <div className="bg-olive-900 px-5 pb-9 pt-3 text-center text-ivory-50">
        <Monogram className="text-sm 
        " />
        <p className="mt-3 text-sm text-ivory-50/70">{eventConfig.footer.date}</p>
        <p className="mt-1 text-base">{eventConfig.footer.message}</p>
      </div>
    </footer>
  );
}

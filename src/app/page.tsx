import { Hero } from "@/components/invitation/Hero";
import { EventDetails } from "@/components/invitation/EventDetails";
import { Countdown } from "@/components/invitation/Countdown";
import { Memories } from "@/components/invitation/Memories";
import { PhotoStory } from "@/components/invitation/PhotoStory";
import { RSVPForm } from "@/components/invitation/RSVPForm";
import { Footer } from "@/components/invitation/Footer";

export default function HomePage() {
  return (
    <main className="min-h-svh w-full bg-[radial-gradient(circle_at_top,_var(--color-ivory-100),_var(--color-ivory-300))] sm:flex sm:justify-center sm:py-10">
      <div className="relative mx-auto w-full max-w-[440px] overflow-hidden bg-ivory-200 sm:rounded-[2.25rem] sm:shadow-[0_30px_60px_-30px_rgba(41,42,33,0.35)]">
        <Hero />
        <EventDetails />
        <Countdown />
        <Memories />
        <PhotoStory />
        <RSVPForm />
        <Footer />
      </div>
    </main>
  );
}

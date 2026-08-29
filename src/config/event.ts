import type { AttendanceStatusValue } from "@/lib/rsvp/schema";

/**
 * Single source of truth for every piece of editable content on the public
 * invitation page. Change dates, copy, and image paths here only.
 *
 * IMPORTANT: `eventDateTimeIso` drives the live countdown, so keep it a real
 * ISO 8601 timestamp with an explicit UTC offset (Iran Standard Time is
 * +03:30) rather than a plain date string.
 */
export const eventConfig = {
  couple: {
    her: "شقایق",
    him: "نیما",
  },

  // Drives the countdown. Update this when the real date/time is finalized.
  eventDateTimeIso: "2026-09-23T19:00:00+03:30",

  date: {
    primary: "۱ مهر ۱۴۰۵",
    secondary: "چهارشنبه",
  },
  time: {
    primary: "۱۹:۰۰",
    secondary: "عصر",
  },
  location: {
    city: "کردان",
    // TODO: replace with the exact venue name/address once it's finalized.
    secondary: "جزئیات در ادامه",
    venueName: "",
    address: "آدرس دقیق به‌زودی اعلام می‌شه",
    // TODO: replace with a real Google Maps share link once the venue is finalized.
    mapUrl: "https://maps.google.com",
  },

  hero: {
    intro:
      "قراره یه شب کوچیک و صمیمی\nکنار هم باشیم و خیلی خوشحال\nمی‌شیم که کنارمون باشید.",
    image: {
      src: "/images/wedding/hero.jpeg",
      alt: "شقایق و نیما با فشفشه",
    },
  },

  countdown: {
    title: "تا اون شب",
    labels: {
      days: "روز",
      hours: "ساعت",
      minutes: "دقیقه",
      seconds: "ثانیه",
    },
    finishedMessage: "شب موعود رسید! 🤍",
  },

  memories: {
    lines: ["بعضی شب‌ها", "خودشون یه خاطره‌ان...", "مرسی که کنارمون هستین"],
    image: {
      src: "/images/wedding/polaroid.jpeg",
      alt: "شقایق و نیما در حال قدم زدن",
    },
  },

  photoStory: {
    text: "مهم نیست برنامه‌ چی هست،\nمهم اینه که کنار همیم.",
    image: {
      src: "/images/wedding/wide-section.jpeg",
      alt: "شقایق و نیما در آغوش هم کنار دریاچه",
    },
  },

  rsvp: {
    heading: "تو این شب همراهمون هستی؟",
    guestNamePlaceholder: "اسمتون ...",
    companionOptions: {
      alone: "تنها میام",
      withCompanion: "با همراه میام",
    },
    attendanceOptions: {
      COMING_WITH_LOVE: "شاید بیام",
      DEFINITELY_COMING: "حتماً میام",
      NOT_COMING: "نمیام",
    } satisfies Record<AttendanceStatusValue, string>,
    submitLabel: "ثبت حضورم",
    submittingLabel: "در حال ثبت...",
    successMessages: {
      attending: "مرسی که خبرمون کردی 🤍\nمنتظرتیم",
      notAttending: "ممنون که خبر دادی 🤍\nجات این شب خالیه",
    } satisfies Record<"attending" | "notAttending", string>,
    genericError: "مشکلی پیش اومد. لطفاً دوباره امتحان کنین.",
  },

  footer: {
    date: "۱ مهر ۱۴۰۵",
    message: "منتظرتون هستیم!",
  },
} as const;

export type EventConfig = typeof eventConfig;

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";

const links = [
  { href: "#event", label: "اطلاعات مراسم" },
  { href: "#memories", label: "خاطره‌ها" },
  { href: "#rsvp", label: "ثبت حضور" },
];

export function HeroMenuButton() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "بستن منو" : "باز کردن منو"}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-12 w-40 overflow-hidden rounded-2xl border border-ivory-200/60 bg-white/95 py-1 text-sm shadow-lg backdrop-blur-sm"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-ink-900 transition hover:bg-ivory-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

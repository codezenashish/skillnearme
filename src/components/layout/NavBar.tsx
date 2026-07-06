"use client";
import { useState } from "react";
import { Flame, Download, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full font-sans pointer-events-none transition-all duration-300 ${
        isScrolled ? "px-4 sm:px-6 pt-4" : "px-0 pt-0"
      }`}
    >
      <motion.nav
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
        className={`pointer-events-auto grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4 w-full transition-colors duration-300 ${
          isScrolled
            ? "max-w-6xl rounded-2xl bg-white/70 dark:bg-black/50 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-3 px-4 sm:px-6"
            : "max-w-full rounded-none bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 py-5 px-4 sm:px-8"
        }`}
      >
        <a href="#" className="flex items-center gap-2">
          <span className="grid place-items-center h-7 w-7 shrink-0 rounded-full bg-neutral-900">
            <Flame className="h-3.5 w-3.5 text-white" strokeWidth={2.2} />
          </span>
          <span className="tracking-[0.2em] text-sm font-semibold text-neutral-900">
            NORTHWIND
          </span>
        </a>

        <a
          href="#"
          className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-700 shadow-sm hover:shadow transition-shadow"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Early access is open. Northwind is live on iOS
          <span className="text-neutral-400">›</span>
        </a>

        <div className="col-start-3 flex items-center justify-end">
          <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold tracking-[0.15em] cursor-pointer mr-1.5">
            <Download className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">DOWNLOAD</span>
          </button>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid place-items-center h-9 w-9 shrink-0 rounded-full bg-white border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors"
          >
            <Menu className="h-4 w-4 text-neutral-900" strokeWidth={2.2} />
          </button>
        </div>
      </motion.nav>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 pointer-events-auto"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-[18px] right-4 sm:right-8 w-[min(92vw,420px)] h-[min(85vh,640px)] z-50 rounded-2xl bg-white text-neutral-900 border border-neutral-200 shadow-2xl overflow-hidden transition-transform duration-300 pointer-events-auto ${
          open
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 !pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 p-6 sm:p-7 pt-14 flex flex-col">
          <nav className="flex flex-col gap-2">
            <a
              href="#"
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
            >
              Homepage
            </a>
            <a
              href="#"
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
            >
              Careers
            </a>
          </nav>

          <div className="mt-10 pt-6 border-t border-dashed border-neutral-300">
            <p className="text-[11px] tracking-[0.2em] text-neutral-400">
              RESOURCES
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a href="#" className="text-base text-neutral-700">
                Privacy
              </a>
              <div className="h-px w-full border-t border-dashed border-neutral-200" />
              <a href="#" className="text-base text-neutral-700">
                Terms of Service
              </a>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <button className="w-full inline-flex items-center justify-between px-5 py-4 rounded-full border border-neutral-300 text-neutral-900 text-xs font-semibold tracking-[0.2em] hover:bg-neutral-50 transition-colors cursor-pointer">
              DOWNLOAD THE APP
              <Download className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute top-5 right-5 grid place-items-center h-9 w-9 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4 text-neutral-900" strokeWidth={2} />
        </button>
      </aside>
    </div>
  );
}

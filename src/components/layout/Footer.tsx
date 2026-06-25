"use client";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { FiTwitter, FiInstagram, FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white border-t border-dashed border-neutral-300">
      <div className="relative max-w-350 mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          <div className="flex items-start gap-5">
            <div className="shrink-0 w-18 h-18 rounded-full bg-[#1E40AF] flex items-center justify-center shadow-md">
              <MapPin className="w-9 h-9 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 leading-[1.05] tracking-tight uppercase">
              SKILL
              <br />
              <span className="text-[#1E40AF]">NEAR</span>
              <br />
              ME
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-500">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2 text-xl sm:text-2xl font-medium text-neutral-900">
              <li>
                <Link
                  href="#explore"
                  className="hover:text-[#1E40AF] transition-colors"
                >
                  Explore Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="hover:text-[#1E40AF] transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#safety"
                  className="hover:text-[#1E40AF] transition-colors"
                >
                  Safety & Trust
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-[#1E40AF] transition-colors"
                >
                  Login / Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-500">
              Our Vision
            </h4>
            <p className="text-xl sm:text-2xl text-neutral-900 leading-tight font-medium">
              A secure, marketplace
              <br />
              connecting verified local experts
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-500">
              Socials
            </h4>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-neutral-900 hover:text-[#1E40AF] transition-colors"
              >
                <FiTwitter className="w-5 h-5" strokeWidth={1.8} />
              </Link>
              <Link
                href="#"
                className="text-neutral-900 hover:text-[#1E40AF] transition-colors"
              >
                <FiInstagram className="w-5 h-5" strokeWidth={1.8} />
              </Link>
              <Link
                href="#"
                className="text-neutral-900 hover:text-[#1E40AF] transition-colors"
              >
                <FiGithub className="w-5 h-5" strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div className="flex flex-col gap-2 text-neutral-500 text-xs sm:text-sm">
            <p>
              © 2026 • SkillNearMe • Verified Local Skill Discovery Platform.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="hover:text-neutral-900 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-neutral-400">•</span>
              <Link
                href="#"
                className="hover:text-neutral-900 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-3">
              Get Updates
            </h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center rounded-full border border-neutral-300 bg-white p-1.5 focus-within:border-[#1E40AF] transition-colors"
            >
              <input
                placeholder="YOUR EMAIL"
                className="flex-1 min-w-0 bg-transparent rounded-full px-5 py-2 text-neutral-900 text-sm tracking-[0.15em] uppercase placeholder:text-neutral-400 focus:outline-none"
                type="email"
              />
              <button
                type="submit"
                className="rounded-full bg-[#10B981] hover:bg-emerald-600 text-white px-5 py-2.5 text-xs tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

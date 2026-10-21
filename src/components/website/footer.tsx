'use client';

import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50/50 py-12 dark:border-neutral-800 dark:bg-neutral-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-base font-bold text-neutral-900 dark:text-white">
              Skill<span className="text-blue-600">NearMe</span>
            </span>
          </div>

          <p className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            Built with <Heart className="mx-1 h-3.5 w-3.5 fill-red-500 text-red-500" /> for verified local educators & curious learners.
          </p>

          <div className="flex items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
            <Link href="/terms" className="hover:text-blue-600 transition">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition">
              Privacy
            </Link>
            <span>&copy; 2025 SkillNearMe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

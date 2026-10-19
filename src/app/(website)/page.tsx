'use client';

import { useState } from 'react';
import { AuthModal } from '@/features/auth/components/auth-modal';
import { 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  Search, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<'student' | 'teacher'>('student');

  const openAuth = (role: 'student' | 'teacher') => {
    setModalRole(role);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-neutral-900/50 dark:via-neutral-950 dark:to-neutral-950">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.100),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.950/30),transparent)] opacity-70" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300 mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Hyperlocal Teacher-Student Matchmaking</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Learn anything from verified tutors <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">right in your neighborhood</span>.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Whether it&apos;s Yoga, Coding, Guitar, or Academic coaching—discover top-rated teachers near you for offline and online 1-on-1 sessions.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openAuth('student')}
              className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <BookOpen className="h-5 w-5" />
              <span>Continue with Google as Student</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => openAuth('teacher')}
              className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-8 py-4 text-base font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95 transition"
            >
              <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>Join as a Teacher</span>
            </button>
          </div>

          {/* Trust stats / Highlights */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-neutral-900 dark:text-white">Hyperlocal Search</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Find tutors within 1-10 km radius</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-neutral-900 dark:text-white">100% Verified</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Government ID & skill certified</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-neutral-900 dark:text-white">Direct Chat</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Talk directly with no middleman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal triggered by any CTA */}
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultRole={modalRole}
      />
    </div>
  );
}

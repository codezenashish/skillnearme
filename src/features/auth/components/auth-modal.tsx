'use client';

import { useState } from 'react';
import { createClient } from '@/libs/supabase/client';
import { LogIn, GraduationCap, BookOpen, X, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'student' | 'teacher';
}

export function AuthModal({ isOpen, onClose, defaultRole = 'student' }: AuthModalProps) {
  const [role, setRole] = useState<'student' | 'teacher'>(defaultRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const origin = window.location.origin;

      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback?role=${role}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <LogIn className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Welcome to SkillNearMe
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Choose how you would like to continue
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition ${
              role === 'student'
                ? 'bg-white text-blue-600 shadow-sm dark:bg-neutral-900 dark:text-blue-400'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Student / Learner
          </button>
          <button
            type="button"
            onClick={() => setRole('teacher')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition ${
              role === 'teacher'
                ? 'bg-white text-blue-600 shadow-sm dark:bg-neutral-900 dark:text-blue-400'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            Teacher / Tutor
          </button>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 font-medium text-neutral-700 dark:text-neutral-200 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-700/60 active:scale-[0.99] transition disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>
            {loading
              ? 'Redirecting to Google...'
              : `Continue with Google as ${role === 'teacher' ? 'Teacher' : 'Student'}`}
          </span>
        </button>

        {error && (
          <p className="mt-3 text-center text-xs text-red-500">{error}</p>
        )}

        <div className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
          By continuing, you agree to SkillNearMe&apos;s Terms of Service & Privacy Policy.
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/libs/supabase/client';
import type { User } from '@supabase/supabase-js';
import { AuthModal } from './auth-modal';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<'student' | 'teacher'>('student');

  useEffect(() => {
    const supabase = createClient();

    // Check initial user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  };

  const openAuth = (role: 'student' | 'teacher') => {
    setModalRole(role);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="h-9 w-20 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
    );
  }

  if (user) {
    const displayName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split('@')[0] ||
      'Account';
    const avatar = user.user_metadata?.avatar_url;

    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 py-1 pl-1 pr-3 text-sm font-medium text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={displayName}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <UserIcon className="h-4 w-4" />
            </div>
          )}
          <span className="max-w-[120px] truncate">{displayName}</span>
        </div>

        <button
          onClick={handleSignOut}
          title="Sign Out"
          className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 transition"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => openAuth('teacher')}
          className="hidden sm:inline-flex text-sm font-medium text-neutral-700 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400 transition px-2 py-1.5"
        >
          Become a Teacher
        </button>

        <button
          onClick={() => openAuth('student')}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <LogIn className="h-4 w-4" />
          <span>Sign In</span>
        </button>
      </div>

      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultRole={modalRole}
      />
    </>
  );
}

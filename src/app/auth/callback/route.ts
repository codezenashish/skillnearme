import { NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';
import { db, users, teacherProfiles } from '@/libs/db';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const roleParam = (searchParams.get('role') as 'teacher' | 'student') || 'student';
  const next = searchParams.get('next');

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const authUser = data.user;

      try {
        // 1. Check if user already exists in our database
        const existingUser = await db.query.users.findFirst({
          where: eq(users.id, authUser.id),
        });

        let finalRole = roleParam;

        if (!existingUser) {
          // New user: insert into database
          await db.insert(users).values({
            id: authUser.id,
            email: authUser.email!,
            fullName:
              authUser.user_metadata?.full_name ||
              authUser.user_metadata?.name ||
              authUser.email?.split('@')[0] ||
              'User',
            avatarUrl: authUser.user_metadata?.avatar_url,
            role: roleParam,
          });

          // If Teacher, initialize empty teacher profile
          if (roleParam === 'teacher') {
            await db.insert(teacherProfiles).values({
              userId: authUser.id,
              verificationStatus: 'pending',
            });
          }
        } else {
          finalRole = existingUser.role as 'teacher' | 'student';
        }

        // If explicit next redirect is passed, prefer it
        if (next) {
          return NextResponse.redirect(`${origin}${next}`);
        }

        // Otherwise redirect based on role
        const redirectPath = finalRole === 'teacher' ? '/dashboard' : '/';
        return NextResponse.redirect(`${origin}${redirectPath}`);
      } catch (dbError) {
        console.error('Failed to sync user with database:', dbError);
        // Even if DB sync encounters an issue, the auth session is valid; redirect safely
        return NextResponse.redirect(`${origin}/`);
      }
    }
  }

  // Auth error fallback
  return NextResponse.redirect(`${origin}/?error=auth_failed`);
}

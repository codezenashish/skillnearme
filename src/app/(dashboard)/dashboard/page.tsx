import React, { Suspense } from "react";
import { StudentDashboard, TeacherDashboard, MobileBottomDock } from "@/features/dashboard";
import { createClient } from "@/libs/supabase/server";
import { db, users, teacherProfiles } from "@/libs/db";
import { eq } from "drizzle-orm";
import type { VerifiedTutor } from "@/features/dashboard/types/student";


async function DashboardContent({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  let isTeacher = params?.role === "teacher";
  let realUser: {
    id: string;
    email?: string;
    name: string;
    avatarUrl?: string;
    role: "student" | "teacher" | "admin";
  } | null = null;
  let realTutors: VerifiedTutor[] = [];

  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser) {
      const dbUser = await db.query.users.findFirst({
        where: eq(users.id, authUser.id),
      });

      const name =
        dbUser?.fullName ||
        authUser.user_metadata?.full_name ||
        authUser.user_metadata?.name ||
        authUser.email?.split("@")[0] ||
        "Student";

      realUser = {
        id: authUser.id,
        email: authUser.email,
        name,
        avatarUrl: dbUser?.avatarUrl || authUser.user_metadata?.avatar_url,
        role: dbUser?.role || "student",
      };

      // If user is a registered teacher and no explicit role parameter was supplied, show teacher view
      if (!params?.role && dbUser?.role === "teacher") {
        isTeacher = true;
      }
    }

    // Fetch real registered teachers from database
    const teachersFromDb = await db
      .select({
        id: users.id,
        name: users.fullName,
        avatar: users.avatarUrl,
        hourlyRate: teacherProfiles.hourlyRate,
        bio: teacherProfiles.bio,
        verificationStatus: teacherProfiles.verificationStatus,
      })
      .from(users)
      .innerJoin(teacherProfiles, eq(users.id, teacherProfiles.userId))
      .where(eq(users.role, "teacher"));

    realTutors = teachersFromDb.map((t) => ({
      id: t.id,
      name: t.name,
      avatar:
        t.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      verificationBadge:
        t.verificationStatus === "verified"
          ? "Govt ID & Degree Verified"
          : "Verification In Review",
      specialization: t.bio || "Registered Tutor & Subject Specialist",
      credentials: "Verified Faculty on SkillNearMe",
      hourlyRate: t.hourlyRate || 500,
      freeTrialNote: "Free 20-min consultation",
      rating: 5.0,
      reviewsCount: 0,
      distance: "Near you",
      locality: "Local Area",
      teachingMode: "Online & In-Person",
      activeStudentsNote: "Accepting new students",
    }));
  } catch (err) {
    console.error("Dashboard server data query error:", err);
  }

  return (
    <div className="relative pb-28 md:pb-16">
      {/* Conditionally rendered role dashboard without DashboardRoleSwitcher */}
      {isTeacher ? (
        <TeacherDashboard />
      ) : (
        <StudentDashboard user={realUser} tutors={realTutors} />
      )}

      {/* Role-Aware Mobile Bottom Dock */}
      <MobileBottomDock role={isTeacher ? "teacher" : "student"} />
    </div>
  );
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-8 animate-pulse">
          <div className="h-40 rounded-2xl bg-muted/60 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 h-96 rounded-2xl bg-muted/40" />
            <div className="lg:col-span-4 h-96 rounded-2xl bg-muted/40" />
          </div>
        </div>
      }
    >
      <DashboardContent searchParams={searchParams} />
    </Suspense>
  );
}

import React, { Suspense } from "react";
import { StudentDashboard, TeacherDashboard, MobileBottomDock } from "@/features/dashboard";
import { DashboardRoleSwitcher } from "./role-switcher";

async function DashboardContent({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const isTeacher = params?.role === "teacher";

  return (
    <div className="relative pb-28 md:pb-16">
      {/* Role Switcher Toolbar */}
      <DashboardRoleSwitcher currentRole={isTeacher ? "teacher" : "student"} />

      {/* Conditionally rendered role dashboard */}
      {isTeacher ? <TeacherDashboard /> : <StudentDashboard />}

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

"use client";

import React, { useEffect, useState } from "react";
import { StudentGreetingHero } from "./student-greeting-hero";
import { ActiveClassesSection } from "./active-classes-section";
import { VerifiedTutorsFeed } from "./verified-tutors-feed";
import { UpcomingSchedule } from "./upcoming-schedule";
import { RecentInquiries } from "./recent-inquiries";
import { createClient } from "@/libs/supabase/client";
import type {
  EnrolledClass,
  VerifiedTutor,
  ScheduleEvent,
  StudentInquiry,
} from "../../types/student";

export interface StudentDashboardProps {
  user?: {
    id?: string;
    email?: string;
    name?: string;
    avatarUrl?: string;
    role?: string;
  } | null;
  classes?: EnrolledClass[];
  tutors?: VerifiedTutor[];
  events?: ScheduleEvent[];
  inquiries?: StudentInquiry[];
}

export function StudentDashboard({
  user: initialUser,
  classes = [],
  tutors = [],
  events = [],
  inquiries = [],
}: StudentDashboardProps) {
  const [currentUser, setCurrentUser] = useState(initialUser);

  useEffect(() => {
    if (initialUser) {
      setCurrentUser(initialUser);
      return;
    }

    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        const name =
          data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          data.user.email?.split("@")[0] ||
          "Student";

        setCurrentUser({
          id: data.user.id,
          email: data.user.email,
          name,
          avatarUrl: data.user.user_metadata?.avatar_url,
          role: "student",
        });
      }
    });
  }, [initialUser]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* 1. Top Welcome Banner & Progress Ribbon */}
      <StudentGreetingHero profile={{ name: currentUser?.name || "Student" }} />

      {/* 2. 12-Column Responsive Dashboard Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: 8 Columns */}
        <div className="lg:col-span-8 flex flex-col gap-9 min-w-0">
          {/* Active Enrolled Classes */}
          <ActiveClassesSection classes={classes} />

          {/* Top Verified Tutors Near You */}
          <VerifiedTutorsFeed tutors={tutors} />
        </div>

        {/* RIGHT COLUMN: 4 Columns Sticky Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-20">
          {/* Upcoming Schedule Calendar */}
          <UpcomingSchedule events={events} />

          {/* Recent Inquiries & Chat Feeds */}
          <RecentInquiries inquiries={inquiries} />
        </aside>
      </div>
    </div>
  );
}

export default StudentDashboard;

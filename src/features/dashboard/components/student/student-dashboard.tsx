"use client";

import React from "react";
import { StudentGreetingHero } from "./student-greeting-hero";
import { ActiveClassesSection } from "./active-classes-section";
import { VerifiedTutorsFeed } from "./verified-tutors-feed";
import { UpcomingSchedule } from "./upcoming-schedule";
import { RecentInquiries } from "./recent-inquiries";

export function StudentDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* 1. Top Welcome Banner & Progress Ribbon */}
      <StudentGreetingHero />

      {/* 2. 12-Column Responsive Dashboard Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: 8 Columns */}
        <div className="lg:col-span-8 flex flex-col gap-9 min-w-0">
          {/* Active Enrolled Classes */}
          <ActiveClassesSection />

          {/* Top Verified Tutors Near You */}
          <VerifiedTutorsFeed />
        </div>

        {/* RIGHT COLUMN: 4 Columns Sticky Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-20">
          {/* Upcoming Schedule Calendar */}
          <UpcomingSchedule />

          {/* Recent Inquiries & Chat Feeds */}
          <RecentInquiries />
        </aside>
      </div>
    </div>
  );
}

export default StudentDashboard;

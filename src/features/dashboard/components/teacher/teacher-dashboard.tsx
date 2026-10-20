"use client";

import React from "react";
import { TeacherProfileBanner } from "./teacher-profile-banner";
import { TeacherKPIGrid } from "./teacher-kpi-grid";
import { StudentLeadsSection } from "./student-leads-section";
import { ActiveBatchesGrid } from "./active-batches-grid";
import { TeacherScheduleFeed } from "./teacher-schedule-feed";
import { QuickPayoutWidget } from "./quick-payout-widget";

export function TeacherDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* 1. Profile Status & Verification Banner */}
      <TeacherProfileBanner />

      {/* 2. Key KPI Metric Grid (4-Column Bento) */}
      <TeacherKPIGrid />

      {/* 3. Main 12-Column Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: 8 Columns */}
        <div className="lg:col-span-8 flex flex-col gap-8 min-w-0">
          {/* Actionable Student Leads */}
          <StudentLeadsSection />

          {/* Active Batches & Class Rosters */}
          <ActiveBatchesGrid />
        </div>

        {/* RIGHT COLUMN: 4 Columns Sticky Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-20">
          {/* Today's Teaching Schedule */}
          <TeacherScheduleFeed />

          {/* Payout & Banking Widget */}
          <QuickPayoutWidget />
        </aside>
      </div>
    </div>
  );
}

export default TeacherDashboard;

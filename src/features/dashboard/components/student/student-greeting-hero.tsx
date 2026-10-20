"use client";

import React from "react";
import { Clock, GraduationCap, FileText, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui";
import { STUDENT_PROFILE } from "../../data/student-mock";

interface StudentGreetingHeroProps {
  profile?: typeof STUDENT_PROFILE;
}

export function StudentGreetingHero({
  profile = STUDENT_PROFILE,
}: StudentGreetingHeroProps) {
  return (
    <div id="overview" className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-6 lg:p-8 shadow-xs scroll-mt-16">
      {/* Subtle radial accent aura */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* Left Welcome Copy & Progress */}
        <div className="max-w-2xl space-y-3">
          {/* Zone Indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              {profile.zone}
            </span>
            <span className="text-muted-foreground text-xs">•</span>
            <span className="text-xs font-medium text-muted-foreground">
              {profile.gridLabel}
            </span>
          </div>

          {/* Heading */}
          <h1 className="heading flex items-center gap-2">
            Welcome back, {profile.name}!{" "}
            <span className="inline-block transition-transform hover:scale-110 cursor-default">
              🎯
            </span>
          </h1>

          {/* Subtitle */}
          <p className="body-text leading-relaxed">
            Continue mastering{" "}
            <strong className="font-semibold text-foreground">
              {profile.currentSubject}
            </strong>
            . {profile.nextLessonSnippet}
          </p>

          {/* Interactive Linear Progress Bar */}
          <div className="max-w-md pt-2">
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1 small-text">
              <span className="font-semibold text-foreground">
                Curriculum Progress (Stage 1)
              </span>
              <span className="font-bold text-primary">
                {profile.progressLabel}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{ width: `${profile.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Metrics & Action CTAs */}
        <div className="flex flex-col items-start justify-between gap-4 shrink-0 sm:flex-row lg:flex-col lg:items-end">
          {/* Stats Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 shadow-2xs">
              <Clock className="size-4 text-primary" />
              <span className="small-text font-bold text-foreground">
                {profile.hoursLearnedMonth}
              </span>
              <span className="small-text">this month</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 shadow-2xs">
              <GraduationCap className="size-4 text-primary" />
              <span className="small-text font-bold text-foreground">
                {profile.activeCoursesCount}
              </span>
              <span className="small-text">courses</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full items-center gap-2.5 sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none gap-2 rounded-lg text-xs font-medium border-border"
            >
              <FileText className="size-4 text-muted-foreground" />
              View Notes
            </Button>
            <Button
              size="sm"
              className="flex-1 sm:flex-none gap-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground shadow-xs"
            >
              <SlidersHorizontal className="size-4" />
              Prepare Material
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Clock, GraduationCap, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui";

export interface StudentGreetingProfile {
  name: string;
  zone?: string;
  gridLabel?: string;
  currentSubject?: string;
  nextLessonSnippet?: string;
  progressPercent?: number;
  progressLabel?: string;
  hoursLearnedMonth?: string;
  activeCoursesCount?: string;
}

interface StudentGreetingHeroProps {
  profile?: StudentGreetingProfile;
}

export function StudentGreetingHero({ profile }: StudentGreetingHeroProps) {
  const studentName = profile?.name || "Student";
  const hasActiveSubject = Boolean(profile?.currentSubject);
  const progressPercent = profile?.progressPercent ?? 0;
  const progressLabel =
    profile?.progressLabel ?? (hasActiveSubject ? `${progressPercent}%` : "0% (No active batch)");
  const hoursLearned = profile?.hoursLearnedMonth ?? "0 hrs";
  const activeCourses = profile?.activeCoursesCount ?? "0 active";
  const zone = profile?.zone || "Live Area";
  const gridLabel = profile?.gridLabel || "Local Learning Grid";

  const handleScrollToTutors = () => {
    document.getElementById("tutors")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToClasses = () => {
    document.getElementById("active-classes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="overview"
      data-slot="card"
      className="relative overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm scroll-mt-16"
    >
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              {zone}
            </span>
            <span className="text-muted-foreground text-xs">•</span>
            <span className="text-xs font-medium text-muted-foreground">
              {gridLabel}
            </span>
          </div>

          {/* Heading */}
          <h1 className="heading flex items-center gap-2">
            Welcome back, {studentName}!{" "}
            <span className="inline-block transition-transform hover:scale-110 cursor-default">
              🎯
            </span>
          </h1>

          {/* Subtitle */}
          <p className="body-text leading-relaxed">
            {hasActiveSubject ? (
              <>
                Continue mastering{" "}
                <span className="font-medium text-foreground">
                  {profile?.currentSubject}
                </span>
                . {profile?.nextLessonSnippet}
              </>
            ) : (
              "Welcome to your personalized learning dashboard! Connect with verified mentors and tutors in your area, attend trial classes, and track your learning milestones."
            )}
          </p>

          {/* Interactive Linear Progress Bar */}
          <div className="max-w-md pt-2">
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm">
              <span className="font-medium text-foreground">
                Curriculum Progress
              </span>
              <span className="font-medium text-primary">
                {progressLabel}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
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
              <span className="text-sm font-semibold text-foreground">
                {hoursLearned}
              </span>
              <span className="text-xs text-muted-foreground">this month</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 shadow-2xs">
              <GraduationCap className="size-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {activeCourses}
              </span>
              <span className="text-xs text-muted-foreground">courses</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full items-center gap-2.5 sm:w-auto">
            <Button
              variant="outline"
              size="default"
              onClick={handleScrollToClasses}
              className="flex-1 sm:flex-none h-10 px-4 gap-2 rounded-lg text-sm font-medium border-border hover:bg-muted/60"
            >
              <BookOpen className="size-4 text-muted-foreground" />
              My Classes
            </Button>
            <Button
              size="default"
              onClick={handleScrollToTutors}
              className="flex-1 sm:flex-none h-10 px-4 gap-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
            >
              <Search className="size-4" />
              Find Tutors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

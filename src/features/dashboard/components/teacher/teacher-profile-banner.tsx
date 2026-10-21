"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Award, Eye } from "lucide-react";
import { Button } from "@/components/ui";
import { TEACHER_PROFILE } from "../../data/teacher-mock";

interface TeacherProfileBannerProps {
  profile?: typeof TEACHER_PROFILE;
}

export function TeacherProfileBanner({
  profile = TEACHER_PROFILE,
}: TeacherProfileBannerProps) {
  return (
    <section
      id="overview"
      data-slot="card"
      className="flex flex-col justify-between gap-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm md:flex-row md:items-center scroll-mt-16"
    >
      {/* Left Info & Progress */}
      <div className="flex-1 max-w-3xl space-y-2.5">
        <div className="flex flex-wrap items-center gap-2 small-text">
          <span className="flex items-center gap-1 font-medium text-primary">
            <CheckCircle2 className="size-4" />
            Profile Status: {profile.completionPercentage}% Complete
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="size-3.5" />
            ID & Degree Verified
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 font-medium text-amber-700 dark:text-amber-400">
            <Award className="size-3.5" />
            Top Rated Badge Active
          </span>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3 pt-1">
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${profile.completionPercentage}%` }}
            />
          </div>
          <span className="shrink-0 small-text font-medium">
            {profile.completionStep}
          </span>
        </div>
      </div>

      {/* Right Action Button */}
      <Link
        href="/dashboard?role=student"
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/60 h-10 px-4 text-sm font-medium text-foreground hover:bg-muted transition-colors shadow-2xs shrink-0"
      >
        <Eye className="size-4 text-primary" />
        <span>Preview How Students See You</span>
      </Link>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  MapPin,
  Video,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { ENROLLED_CLASSES } from "../../data/student-mock";
import { EnrolledClass } from "../../types/student";

interface ActiveClassesSectionProps {
  classes?: EnrolledClass[];
}

export function ActiveClassesSection({
  classes = ENROLLED_CLASSES,
}: ActiveClassesSectionProps) {
  return (
    <section id="active-classes" className="flex flex-col gap-4 scroll-mt-16">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="subheading font-bold">
            Active Enrolled Classes
          </h2>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 small-text font-bold text-primary">
            {classes.length} Active
          </span>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 small-text font-semibold text-primary hover:underline transition-colors"
        >
          <span>View all enrollments</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* 2-Column Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-2xs hover:shadow-xs transition-all hover:border-primary/40"
          >
            <div>
              {/* Batch Pill & Rating */}
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 small-text font-semibold text-primary">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {cls.type}
                </span>

                <div className="flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 small-text font-bold text-amber-600 dark:text-amber-400">
                  <Star className="size-3 fill-amber-500 text-amber-500" />
                  <span>{cls.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Class Title */}
              <h3 className="subheading leading-snug">
                {cls.title}
              </h3>

              {/* Tutor Row */}
              <div className="mt-2.5 flex items-center gap-2">
                <Avatar className="size-7 ring-1 ring-border">
                  <AvatarImage src={cls.tutorAvatar} alt={cls.tutorName} />
                  <AvatarFallback className="text-[10px] font-semibold">
                    {cls.tutorName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="body-text font-medium text-foreground">
                  {cls.tutorName}
                </span>
                {cls.isVerified && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5 small-text font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3" />
                    Verified
                  </span>
                )}
              </div>

              {/* Timing & Location Box */}
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-border/60 bg-muted/50 p-3">
                {cls.mode === "offline" ? (
                  <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                ) : (
                  <Video className="size-4 text-primary shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <p className="body-text font-semibold text-foreground">{cls.timing}</p>
                  <p className="small-text truncate mt-0.5">
                    {cls.locationOrPlatform}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex items-center gap-2.5 border-t border-border/50 pt-4">
              <Button
                size="sm"
                className="flex-1 gap-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground shadow-2xs"
              >
                {cls.mode === "online" ? (
                  <>
                    <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                    Join Class Room
                  </>
                ) : (
                  <>
                    <MessageSquare className="size-3.5" />
                    Join Chat
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg text-xs font-medium border-border"
              >
                {cls.mode === "online" ? "Lesson Plan" : "View Schedule"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

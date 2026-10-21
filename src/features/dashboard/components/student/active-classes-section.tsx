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
  BookOpen,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { EnrolledClass } from "../../types/student";

interface ActiveClassesSectionProps {
  classes?: EnrolledClass[];
}

export function ActiveClassesSection({
  classes = [],
}: ActiveClassesSectionProps) {
  return (
    <section id="active-classes" className="flex flex-col gap-4 scroll-mt-16">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="subheading">
            Active Enrolled Classes
          </h2>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {classes.length} Active
          </span>
        </div>
        {classes.length > 0 && (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:underline transition-colors"
          >
            <span>View all enrollments</span>
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>

      {classes.length === 0 ? (
        <div
          data-slot="card"
          className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/60 p-8 text-center text-card-foreground shadow-xs"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BookOpen className="size-6" />
          </div>
          <div className="max-w-md space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              No Active Classes Yet
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              You haven&apos;t enrolled in any active tutoring batches or 1-on-1 sessions. Explore verified local mentors below to book your first trial class!
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              document.getElementById("tutors")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-lg gap-2 text-xs font-medium mt-1"
          >
            <Search className="size-3.5" />
            <span>Browse Local Tutors</span>
          </Button>
        </div>
      ) : (
        /* 2-Column Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {classes.map((cls) => (
            <div
              key={cls.id}
              data-slot="card"
              className="flex flex-col justify-between gap-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm hover:shadow-md transition-all hover:border-primary/40"
            >
              <div>
                {/* Batch Pill & Rating */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {cls.type}
                  </span>

                  <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                    <Star className="size-3 fill-amber-500 text-amber-500" />
                    <span>{cls.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Class Title */}
                <h3 className="text-base font-semibold tracking-tight text-foreground leading-snug">
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
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
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
                    <p className="text-sm font-medium text-foreground">{cls.timing}</p>
                    <p className="small-text truncate mt-0.5">
                      {cls.locationOrPlatform}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 flex items-center gap-2.5 border-t border-border/50 pt-4">
                <Button
                  size="default"
                  className="flex-1 h-10 px-4 gap-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground shadow-2xs hover:bg-primary/90"
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
                  size="default"
                  className="h-10 px-4 rounded-lg text-sm font-medium border-border hover:bg-muted/60"
                >
                  {cls.mode === "online" ? "Lesson Plan" : "View Schedule"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

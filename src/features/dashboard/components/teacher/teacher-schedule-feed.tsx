"use client";

import React from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui";
import { TODAY_TEACHING_SCHEDULE } from "../../data/teacher-mock";
import { TeacherScheduleSlot } from "../../types/teacher";

interface TeacherScheduleFeedProps {
  slots?: TeacherScheduleSlot[];
}

export function TeacherScheduleFeed({
  slots = TODAY_TEACHING_SCHEDULE,
}: TeacherScheduleFeedProps) {
  return (
    <div
      id="schedule"
      data-slot="card"
      className="flex flex-col gap-6 rounded-xl border border-border bg-card py-6 text-card-foreground shadow-sm scroll-mt-16"
    >
      {/* Header */}
      <div data-slot="card-header" className="flex items-center justify-between px-6 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-5 text-primary" />
          <h3 data-slot="card-title" className="text-base font-semibold leading-none tracking-tight">
            Today's Schedule
          </h3>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <Radio className="size-3 animate-pulse" />
          Live Ready
        </span>
      </div>

      {/* Slots List Content */}
      <div data-slot="card-content" className="flex flex-col gap-3 px-6">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`rounded-xl border p-3.5 transition-all ${
              slot.isLiveNow
                ? "border-primary/50"
                : "border-border/70 hover:border-border"
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
                  slot.isLiveNow
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <Clock className="size-3" />
                {slot.time}
              </span>
              <span className="text-muted-foreground font-normal">
                {slot.duration}
              </span>
            </div>

            <p className="mt-2 text-sm font-semibold tracking-tight text-foreground">
              {slot.subject}
            </p>
            <p className="small-text mt-0.5">
              {slot.batchOrStudent}
            </p>

            <div className="mt-2.5 flex items-center justify-between border-t border-border/50 pt-2 small-text">
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                {slot.mode === "offline" ? (
                  <MapPin className="size-3.5 text-primary" />
                ) : (
                  <Video className="size-3.5 text-primary" />
                )}
                {slot.location}
              </span>

              <Button
                size="default"
                className={`h-8 px-3 rounded-lg text-xs font-medium ${
                  slot.isLiveNow
                    ? "bg-primary text-primary-foreground shadow-2xs hover:bg-primary/90"
                    : "border-border hover:bg-muted/60"
                }`}
                variant={slot.isLiveNow ? "default" : "outline"}
              >
                {slot.isLiveNow ? "Live Now" : "Details"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

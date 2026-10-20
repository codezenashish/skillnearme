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
    <div id="schedule" className="rounded-2xl border border-border bg-card p-5 shadow-2xs scroll-mt-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-5 text-primary" />
          <h3 className="subheading font-bold">
            Today's Schedule
          </h3>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 small-text font-bold text-emerald-600 dark:text-emerald-400">
          <Radio className="size-3 animate-pulse" />
          Live Ready
        </span>
      </div>

      {/* Slots List */}
      <div className="flex flex-col gap-3 pt-3">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`rounded-xl border p-3.5 transition-all ${
              slot.isLiveNow
                ? "border-primary/50 bg-primary/5"
                : "border-border/70 bg-muted/40 hover:border-border"
            }`}
          >
            <div className="flex items-center justify-between small-text">
              <span
                className={`flex items-center gap-1 rounded px-2 py-0.5 font-bold ${
                  slot.isLiveNow
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <Clock className="size-3" />
                {slot.time}
              </span>
              <span className="small-text font-medium">
                {slot.duration}
              </span>
            </div>

            <p className="mt-2 body-text font-bold text-foreground">
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
                size="sm"
                className={`small-text font-semibold rounded-md ${
                  slot.isLiveNow
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "border-border"
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

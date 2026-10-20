"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Store,
  Video,
  Navigation,
  CalendarPlus,
} from "lucide-react";
import { Button } from "@/components/ui";
import { UPCOMING_SCHEDULE_EVENTS } from "../../data/student-mock";
import { ScheduleEvent } from "../../types/student";

interface UpcomingScheduleProps {
  events?: ScheduleEvent[];
}

const CALENDAR_DAYS = [
  { day: "MO", date: 13, active: false },
  { day: "TU", date: 14, active: false },
  { day: "WE", date: 15, active: true }, // Today / selected
  { day: "TH", date: 16, active: false },
  { day: "FR", date: 17, hasEvent: true },
  { day: "SA", date: 18, active: false },
  { day: "SU", date: 19, active: false },
];

export function UpcomingSchedule({
  events = UPCOMING_SCHEDULE_EVENTS,
}: UpcomingScheduleProps) {
  const [selectedDate, setSelectedDate] = useState(15);

  return (
    <div id="schedule" className="rounded-2xl border border-border bg-card p-5 shadow-2xs scroll-mt-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-5 text-primary" />
          <h3 className="subheading font-bold">
            Upcoming Schedule
          </h3>
        </div>
        <span className="rounded-lg bg-muted px-2 py-1 small-text font-bold text-muted-foreground">
          OCT 2025
        </span>
      </div>

      {/* Mini Calendar Strip */}
      <div className="grid grid-cols-7 gap-1 border-b border-border/60 py-3 text-center">
        {CALENDAR_DAYS.map((item) => {
          const isSelected = selectedDate === item.date;
          return (
            <Button
              key={item.date}
              variant={isSelected ? "default" : "ghost"}
              size="xs"
              onClick={() => setSelectedDate(item.date)}
              className={`flex flex-col items-center h-auto py-1 px-1 rounded-lg transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                  : item.hasEvent
                  ? "bg-primary/10 text-primary font-bold hover:bg-primary/15"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="text-[10px] uppercase font-semibold">
                {item.day}
              </span>
              <span className="small-text font-medium">{item.date}</span>
            </Button>
          );
        })}
      </div>

      {/* Agenda Event Cards */}
      <div className="flex flex-col gap-3 pt-3">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="rounded-xl border border-border/70 bg-muted/40 p-3.5 transition-colors hover:border-border"
          >
            <div className="mb-1 flex items-center justify-between small-text">
              <span className="rounded bg-primary/10 px-2 py-0.5 font-bold text-primary">
                {evt.badge}
              </span>
              <span className="text-muted-foreground font-medium">
                {evt.duration}
              </span>
            </div>

            <p className="mt-1 body-text font-semibold text-foreground">
              {evt.title}
            </p>

            <div className="mt-2.5 flex items-center justify-between border-t border-border/50 pt-2 small-text">
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                {evt.mode === "offline" ? (
                  <Store className="size-3.5" />
                ) : (
                  <Video className="size-3.5" />
                )}
                {evt.locationOrPlatform}
              </span>

              {evt.actionType === "link" ? (
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
                >
                  <Navigation className="size-3" />
                  {evt.actionText}
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  size="xs"
                  className="inline-flex items-center gap-1 font-bold text-muted-foreground hover:text-foreground h-auto p-0"
                >
                  <CalendarPlus className="size-3" />
                  {evt.actionText}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

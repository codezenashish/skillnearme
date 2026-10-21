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
import { ScheduleEvent } from "../../types/student";

interface UpcomingScheduleProps {
  events?: ScheduleEvent[];
}

const CALENDAR_DAYS = [
  { day: "MO", date: 13, active: false },
  { day: "TU", date: 14, active: false },
  { day: "WE", date: 15, active: true },
  { day: "TH", date: 16, active: false },
  { day: "FR", date: 17, hasEvent: false },
  { day: "SA", date: 18, active: false },
  { day: "SU", date: 19, active: false },
];

export function UpcomingSchedule({
  events = [],
}: UpcomingScheduleProps) {
  const [selectedDate, setSelectedDate] = useState(15);

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
            Upcoming Schedule
          </h3>
        </div>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          THIS WEEK
        </span>
      </div>

      {/* Content */}
      <div data-slot="card-content" className="flex flex-col gap-4 px-6">
        {/* Mini Calendar Strip */}
        <div className="grid grid-cols-7 gap-1 border-b border-border/60 pb-4 text-center">
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
                    ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : item.hasEvent
                    ? "bg-primary/10 text-primary font-medium hover:bg-primary/15"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="text-[10px] uppercase font-medium">
                  {item.day}
                </span>
                <span className="text-xs font-medium">{item.date}</span>
              </Button>
            );
          })}
        </div>

        {/* Agenda Events or Empty State */}
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <CalendarIcon className="size-5" />
            </div>
            <p className="text-sm font-medium text-foreground">No Classes Scheduled</p>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Your confirmed classes and trial slots will automatically show up on this schedule.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="rounded-xl border border-border/70 bg-muted/40 p-3.5 transition-colors hover:border-border"
              >
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                    {evt.badge}
                  </span>
                  <span className="text-muted-foreground font-normal">
                    {evt.duration}
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-foreground">
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
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Navigation className="size-3" />
                      {evt.actionText}
                    </Link>
                  ) : (
                    <Button
                      variant="ghost"
                      size="xs"
                      className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground h-auto p-0"
                    >
                      <CalendarPlus className="size-3" />
                      {evt.actionText}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

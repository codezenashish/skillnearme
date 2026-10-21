"use client";

import React from "react";
import { Plus, Clock, MapPin, Users, Video } from "lucide-react";
import { Button } from "@/components/ui";
import { TEACHER_BATCHES } from "../../data/teacher-mock";
import { TeacherBatch } from "../../types/teacher";

interface ActiveBatchesGridProps {
  batches?: TeacherBatch[];
}

export function ActiveBatchesGrid({
  batches = TEACHER_BATCHES,
}: ActiveBatchesGridProps) {
  return (
    <section
      id="batches"
      data-slot="card"
      className="flex flex-col gap-6 rounded-xl border border-border bg-card py-6 text-card-foreground shadow-sm scroll-mt-16"
    >
      {/* Header */}
      <div data-slot="card-header" className="flex items-center justify-between px-6 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <h2 data-slot="card-title" className="text-base font-semibold leading-none tracking-tight">Active Batches & Class Rosters</h2>
          <span className="rounded-full bg-muted px-2.5 py-0.5 small-text text-foreground">
            {batches.length} Active
          </span>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 rounded-lg small-text border-border text-primary hover:text-primary"
        >
          <Plus className="size-4" />
          <span>Create New Batch</span>
        </Button>
      </div>

      {/* 2-Column Batch Grid Content */}
      <div data-slot="card-content" className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
        {batches.map((batch) => {
          const isFull = batch.capacityFilled >= batch.capacityTotal;
          const fillPercentage = Math.round(
            (batch.capacityFilled / batch.capacityTotal) * 100,
          );

          return (
            <div
              key={batch.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-border/70 bg-muted/40 p-4 transition-all hover:bg-muted/70 hover:border-primary/40 shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">{batch.title}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isFull
                        ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                        : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    }`}
                  >
                    {isFull ? "Full" : "Active"}
                  </span>
                </div>

                <div className="space-y-1 small-text text-muted-foreground">
                  <div className="flex items-center gap-1.5 body-text font-medium text-foreground">
                    <Clock className="size-3.5 text-primary" />
                    <span>{batch.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-muted-foreground" />
                    <span>{batch.location}</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="rounded-lg bg-card p-3 border border-border/50 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-normal">Capacity</span>
                    <span
                      className={`font-medium ${
                        isFull
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {batch.capacityFilled} / {batch.capacityTotal} Students
                      Filled
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons using components/ui Button */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <Button
                  size="default"
                  className="flex-1 h-10 px-4 gap-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground shadow-2xs hover:bg-primary/90 transition-all"
                >
                  {batch.location.toLowerCase().includes("online") ? (
                    <>
                      <Video className="size-4" />
                      <span>Start Class</span>
                    </>
                  ) : (
                    <>
                      <Users className="size-4" />
                      <span>Take Attendance</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="h-10 px-4 rounded-lg text-sm font-medium border-border hover:bg-muted/60 transition-colors"
                >
                  View Roster
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

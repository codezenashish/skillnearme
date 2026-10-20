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
    <section id="batches" className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs scroll-mt-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <h2 className="subheading font-bold">
            Active Batches & Class Rosters
          </h2>
          <span className="rounded-full bg-muted px-2.5 py-0.5 small-text font-semibold text-foreground">
            {batches.length} Active
          </span>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 rounded-lg small-text font-semibold border-border text-primary hover:text-primary"
        >
          <Plus className="size-4" />
          <span>Create New Batch</span>
        </Button>
      </div>

      {/* 2-Column Batch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {batches.map((batch) => {
          const isFull = batch.capacityFilled >= batch.capacityTotal;
          const fillPercentage = Math.round(
            (batch.capacityFilled / batch.capacityTotal) * 100
          );

          return (
            <div
              key={batch.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-border/70 bg-muted/40 p-4 transition-all hover:bg-muted/70 hover:border-primary/40 shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="subheading font-bold">
                    {batch.title}
                  </h3>
                  <span
                    className={`rounded-md px-2 py-0.5 small-text font-bold uppercase tracking-wider ${
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
                  <div className="flex items-center justify-between small-text font-medium">
                    <span className="text-muted-foreground">Capacity</span>
                    <span
                      className={`font-bold ${
                        isFull
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {batch.capacityFilled} / {batch.capacityTotal} Students Filled
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
                  size="sm"
                  className="flex-1 gap-1.5 rounded-lg small-text font-semibold bg-primary text-primary-foreground shadow-2xs"
                >
                  {batch.location.toLowerCase().includes("online") ? (
                    <>
                      <Video className="size-3.5" />
                      Start Class
                    </>
                  ) : (
                    <>
                      <Users className="size-3.5" />
                      Take Attendance
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg small-text font-medium border-border"
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

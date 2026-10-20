"use client";

import React from "react";
import {
  Mail,
  GraduationCap,
  Compass,
  Wallet,
  TrendingUp,
  Flame,
  CheckCheck,
} from "lucide-react";
import { TEACHER_KPIS } from "../../data/teacher-mock";
import { TeacherKPI } from "../../types/teacher";

interface TeacherKPIGridProps {
  kpis?: TeacherKPI[];
}

export function TeacherKPIGrid({ kpis = TEACHER_KPIS }: TeacherKPIGridProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        return (
          <div
            key={kpi.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-2xs hover:shadow-xs transition-shadow"
          >
            {/* Top Row: Label & Icon */}
            <div className="flex items-start justify-between gap-2">
              <span className="small-text font-semibold uppercase tracking-wider">
                {kpi.label}
              </span>
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                {kpi.iconType === "mail" && <Mail className="size-4" />}
                {kpi.iconType === "students" && <GraduationCap className="size-4" />}
                {kpi.iconType === "views" && <Compass className="size-4" />}
                {kpi.iconType === "payout" && <Wallet className="size-4" />}
              </div>
            </div>

            {/* Bottom Row: Metric & Subtitle */}
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex flex-col">
                <span className="heading">
                  {kpi.value}
                </span>

                <div className="mt-1 flex items-center gap-1.5 small-text">
                  {kpi.changeNote && (
                    <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="size-3.5" />
                      {kpi.changeNote}
                    </span>
                  )}
                  <span className="small-text">{kpi.subLabel}</span>
                </div>
              </div>

              {/* Sparkline or Badge */}
              {kpi.sparklineData ? (
                <div className="w-16 h-8 shrink-0">
                  <svg
                    className="w-full h-full text-emerald-500 overflow-visible"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 80 40"
                  >
                    <path d="M 0 32 Q 15 28 25 30 T 45 18 T 62 14 T 80 6" />
                    <circle className="fill-current" cx="80" cy="6" r="3" />
                  </svg>
                </div>
              ) : kpi.badgeText ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 small-text font-semibold text-foreground shrink-0">
                  {kpi.id === "kpi-2" && <CheckCheck className="size-3.5 text-emerald-600" />}
                  {kpi.id === "kpi-3" && <Flame className="size-3.5 text-orange-500 fill-orange-500" />}
                  {kpi.badgeText}
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
    </section>
  );
}

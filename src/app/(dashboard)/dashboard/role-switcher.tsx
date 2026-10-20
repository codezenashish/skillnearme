"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Briefcase } from "lucide-react";

interface DashboardRoleSwitcherProps {
  currentRole: "student" | "teacher";
}

export function DashboardRoleSwitcher({ currentRole }: DashboardRoleSwitcherProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="small-text font-semibold uppercase tracking-wider">
          View Mode:
        </span>
        <div className="inline-flex items-center rounded-xl border border-border bg-card p-1 shadow-2xs">
          <Link
            href="/dashboard?role=student"
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 small-text font-bold transition-all ${
              currentRole === "student"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap className="size-3.5" />
            <span>Student Hub</span>
          </Link>
          <Link
            href="/dashboard?role=teacher"
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 small-text font-bold transition-all ${
              currentRole === "teacher"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Briefcase className="size-3.5" />
            <span>Teacher Desk</span>
          </Link>
        </div>
      </div>

      <span className="small-text hidden sm:inline-block">
        Stitch UI Synced • Pixel-perfect Light & Dark modes
      </span>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  Compass,
  Home,
  Calendar,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { STUDENT_LEADS } from "../../data/teacher-mock";
import { StudentLead } from "../../types/teacher";

interface StudentLeadsSectionProps {
  leads?: StudentLead[];
}

export function StudentLeadsSection({
  leads = STUDENT_LEADS,
}: StudentLeadsSectionProps) {
  return (
    <section
      id="leads"
      data-slot="card"
      className="flex flex-col gap-6 rounded-xl border border-border bg-card py-6 text-card-foreground shadow-sm scroll-mt-16"
    >
      {/* Header */}
      <div data-slot="card-header" className="flex items-center justify-between px-6 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2.5">
          <h2 data-slot="card-title" className="text-base font-semibold leading-none tracking-tight">
            New Student Inquiries & Actionable Leads
          </h2>
          <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary animate-pulse">
            <span className="size-1.5 rounded-full bg-primary" />
            3 Pending
          </span>
        </div>
        <Link
          href="#"
          className="inline-flex items-center gap-1 small-text font-medium text-primary hover:underline"
        >
          <span>View All Leads</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Leads List Content */}
      <div data-slot="card-content" className="flex flex-col gap-4 px-6">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex flex-col gap-3 rounded-xl border border-border/70 p-4 transition-all hover:border-primary/40"
          >
            {/* Top row: Avatar, Name, Subject, Distance */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <Avatar className="size-11 ring-1 ring-border shadow-2xs">
                  <AvatarImage src={lead.studentAvatar} alt={lead.studentName} />
                  <AvatarFallback className="text-xs font-bold">
                    {lead.studentName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold tracking-tight text-foreground">
                      {lead.studentName}
                    </span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {lead.subject}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 small-text mt-0.5">
                    <Clock className="size-3" />
                    {lead.timeAgo}
                  </span>
                </div>
              </div>

              {/* Distance Pill */}
              <div className="flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-xs text-muted-foreground border border-border/60">
                <Compass className="size-3.5 text-primary" />
                <span className="font-medium text-foreground">
                  {lead.distance}
                </span>
                <span>({lead.locality})</span>
              </div>
            </div>

            {/* Preferences metadata */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 small-text text-muted-foreground">
              <span className="flex items-center gap-1">
                <Home className="size-3.5 text-primary" />
                Prefers:{" "}
                <span className="font-medium text-foreground">
                  {lead.teachingPreference}
                </span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5 text-primary" />
                Frequency:{" "}
                <span className="font-medium text-foreground">
                  {lead.frequency}
                </span>
              </span>
            </div>

            {/* Message Snippet Box */}
            <div className="rounded-lg bg-card p-3 text-sm text-foreground/85 italic border border-border/50">
              “{lead.messageSnippet}”
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <Button
                  size="default"
                  className="h-9 px-3.5 gap-1.5 rounded-lg text-xs sm:text-sm font-medium bg-primary text-primary-foreground shadow-2xs hover:bg-primary/90"
                >
                  <CheckCircle2 className="size-4" />
                  Accept & Send Trial Invite
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="h-9 px-3 gap-1.5 rounded-lg text-xs sm:text-sm font-medium border-border hover:bg-muted/60"
                >
                  <MessageSquare className="size-3.5 text-primary" />
                  Chat
                </Button>
              </div>

              <Button
                variant="ghost"
                size="default"
                className="h-9 px-3 rounded-lg text-xs sm:text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

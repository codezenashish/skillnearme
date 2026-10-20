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
    <section id="leads" className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs scroll-mt-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <h2 className="subheading font-bold">
            New Student Inquiries & Actionable Leads
          </h2>
          <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 small-text font-bold text-primary animate-pulse">
            <span className="size-1.5 rounded-full bg-primary" />
            3 Pending
          </span>
        </div>
        <Link
          href="#"
          className="inline-flex items-center gap-1 small-text font-semibold text-primary hover:underline"
        >
          <span>View All Leads</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Leads List */}
      <div className="flex flex-col gap-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex flex-col gap-3 rounded-xl border border-border/70 bg-muted/40 p-4 transition-all hover:bg-muted/70 hover:border-primary/40"
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
                    <span className="subheading font-bold">
                      {lead.studentName}
                    </span>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 small-text font-semibold text-primary">
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
              <div className="flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 small-text text-muted-foreground border border-border/60">
                <Compass className="size-3.5 text-primary" />
                <span className="font-semibold text-foreground">
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
                <strong className="font-semibold text-foreground">
                  {lead.teachingPreference}
                </strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5 text-primary" />
                Frequency:{" "}
                <strong className="font-semibold text-foreground">
                  {lead.frequency}
                </strong>
              </span>
            </div>

            {/* Message Snippet Box */}
            <div className="rounded-lg bg-card p-3 body-text text-foreground italic border border-border/50">
              “{lead.messageSnippet}”
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="gap-1.5 rounded-lg small-text font-semibold bg-primary text-primary-foreground shadow-2xs"
                >
                  <CheckCircle2 className="size-4" />
                  Accept & Send Trial Invite
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-lg small-text font-medium border-border"
                >
                  <MessageSquare className="size-3.5 text-primary" />
                  Chat
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="small-text text-muted-foreground hover:text-destructive hover:bg-destructive/10"
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

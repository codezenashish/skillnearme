"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { StudentInquiry } from "../../types/student";

interface RecentInquiriesProps {
  inquiries?: StudentInquiry[];
}

export function RecentInquiries({
  inquiries = [],
}: RecentInquiriesProps) {
  return (
    <div
      id="inquiries"
      data-slot="card"
      className="flex flex-col gap-6 rounded-xl border border-border bg-card py-6 text-card-foreground shadow-sm scroll-mt-16"
    >
      <div data-slot="card-header" className="flex items-center justify-between px-6 border-b border-border/60 pb-4">
        <h3 data-slot="card-title" className="text-base font-semibold leading-none tracking-tight">
          Recent Inquiries
        </h3>
        {inquiries.length > 0 && (
          <Link
            href="#"
            className="text-xs sm:text-sm font-medium text-primary hover:underline"
          >
            See all ({inquiries.length})
          </Link>
        )}
      </div>

      <div data-slot="card-content" className="px-6">
        {inquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <MessageSquare className="size-5" />
            </div>
            <p className="text-sm font-medium text-foreground">No Messages Yet</p>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Reach out to verified tutors near you to discuss syllabus, schedule, and book demo classes.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="flex items-start gap-3 py-3 px-1 transition-colors hover:bg-muted/50 rounded-lg cursor-pointer"
              >
                <div className="relative shrink-0 mt-0.5">
                  <Avatar className="size-9 ring-1 ring-border">
                    <AvatarImage src={inq.avatar} alt={inq.name} />
                    <AvatarFallback className="text-xs font-bold">
                      {inq.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {inq.isOnline && (
                    <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="truncate text-sm font-semibold tracking-tight text-foreground">
                      {inq.name}
                    </p>
                    <span className="small-text shrink-0">
                      {inq.timeAgo}
                    </span>
                  </div>
                  <p className="truncate small-text mt-0.5">
                    {inq.lastMessage}
                  </p>
                </div>

                {inq.unreadCount && inq.unreadCount > 0 ? (
                  <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shrink-0 mt-1">
                    {inq.unreadCount}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

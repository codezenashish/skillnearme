"use client";

import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { RECENT_INQUIRIES } from "../../data/student-mock";
import { StudentInquiry } from "../../types/student";

interface RecentInquiriesProps {
  inquiries?: StudentInquiry[];
}

export function RecentInquiries({
  inquiries = RECENT_INQUIRIES,
}: RecentInquiriesProps) {
  return (
    <div id="inquiries" className="rounded-2xl border border-border bg-card p-5 shadow-2xs scroll-mt-16">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <h3 className="subheading font-bold">
          Recent Inquiries
        </h3>
        <Link
          href="#"
          className="small-text font-semibold text-primary hover:underline"
        >
          See all ({inquiries.length})
        </Link>
      </div>

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
                <p className="truncate body-text font-bold text-foreground">
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
    </div>
  );
}

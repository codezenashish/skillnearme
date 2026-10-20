"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Star,
  MapPin,
  Home,
  Flame,
  MessageSquare,
  ArrowRight,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { VERIFIED_TUTORS } from "../../data/student-mock";
import { VerifiedTutor } from "../../types/student";

interface VerifiedTutorsFeedProps {
  tutors?: VerifiedTutor[];
}

const RADIUS_FILTERS = [
  { id: "all", label: "All Results" },
  { id: "2km", label: "Within 2 km (Active)", icon: Compass },
  { id: "5km", label: "Within 5 km" },
  { id: "offline", label: "Offline Home Tutors", icon: Home },
  { id: "trial", label: "Trial Available First" },
];

export function VerifiedTutorsFeed({
  tutors = VERIFIED_TUTORS,
}: VerifiedTutorsFeedProps) {
  const [activeFilter, setActiveFilter] = useState("2km");

  return (
    <section id="tutors" className="flex flex-col gap-5 pt-2 scroll-mt-16">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="subheading font-bold">
              Top Verified Tutors Near You
            </h2>
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 small-text font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-3.5" />
              100% Background-Checked
            </span>
          </div>
          <p className="mt-1 small-text">
            Hyperlocal tutor matchmaking based on PostGIS geospatial radius and verified qualifications.
          </p>
        </div>
        <span className="small-text shrink-0">
          Updated 14 mins ago
        </span>
      </div>

      {/* Radius Filter Pills using components/ui Button */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {RADIUS_FILTERS.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          return (
            <Button
              key={filter.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full small-text font-medium shrink-0 px-3.5 gap-1.5 ${
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {Icon && <Icon className="size-3.5" />}
              {filter.label}
            </Button>
          );
        })}
      </div>

      {/* Tutors Feed List */}
      <div className="flex flex-col gap-4">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all hover:border-primary/40"
          >
            {/* Top row with details & pricing */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div className="flex items-start gap-4">
                {/* Tutor Avatar */}
                <div className="relative shrink-0">
                  <Avatar className="size-14 sm:size-16 rounded-2xl ring-1 ring-border shadow-2xs">
                    <AvatarImage src={tutor.avatar} alt={tutor.name} className="object-cover" />
                    <AvatarFallback className="text-sm font-bold">
                      {tutor.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="absolute -bottom-1 -right-1 rounded-full bg-card p-0.5 text-emerald-600 dark:text-emerald-400"
                    title="Verified ID & Credentials"
                  >
                    <CheckCircle2 className="size-4" />
                  </span>
                </div>

                {/* Info Text */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="subheading font-bold">
                      {tutor.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 small-text font-semibold text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="size-3" />
                      {tutor.verificationBadge}
                    </span>
                  </div>

                  <p className="body-text font-medium text-foreground">
                    {tutor.specialization}
                  </p>
                  <p className="small-text leading-relaxed">
                    {tutor.credentials}
                  </p>
                </div>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline justify-between border-t border-border/40 pt-3 md:border-t-0 md:pt-0 md:flex-col md:items-end shrink-0">
                <div className="md:text-right">
                  <span className="subheading font-bold text-foreground">
                    ₹{tutor.hourlyRate}
                  </span>
                  <span className="small-text">/hour</span>
                </div>
                <span className="small-text font-semibold text-emerald-600 dark:text-emerald-400 md:mt-0.5">
                  {tutor.freeTrialNote}
                </span>
              </div>
            </div>

            {/* Bottom Metadata & CTAs */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
              <div className="flex flex-wrap items-center gap-2 small-text">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 font-bold text-amber-700 dark:text-amber-400">
                  <Star className="size-3 fill-amber-500 text-amber-500" />
                  {tutor.rating.toFixed(2)} ({tutor.reviewsCount} reviews)
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-medium text-foreground">
                  <MapPin className="size-3 text-primary" />
                  {tutor.distance} ({tutor.locality})
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                  <Home className="size-3" />
                  {tutor.teachingMode}
                </span>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 font-semibold text-orange-600 dark:text-orange-400">
                  <Flame className="size-3.5" />
                  {tutor.activeStudentsNote}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex w-full items-center gap-2 sm:w-auto mt-2 sm:mt-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg border-border"
                  title="Message Tutor"
                >
                  <MessageSquare className="size-4" />
                </Button>
                <Button
                  size="sm"
                  className="flex-1 sm:flex-none gap-1.5 rounded-lg small-text font-semibold bg-primary text-primary-foreground shadow-2xs"
                >
                  <span>Book Free Trial</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

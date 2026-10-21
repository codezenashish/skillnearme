"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Home,
  CheckCircle2,
  ShieldCheck,
  Star,
  MapPin,
  Flame,
  MessageSquare,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
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
  tutors = [],
}: VerifiedTutorsFeedProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <section id="tutors" className="flex flex-col gap-5 pt-2 scroll-mt-16">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="subheading">
              Top Verified Tutors Near You
            </h2>
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-3.5" />
              100% Background-Checked
            </span>
          </div>
          <p className="mt-1 small-text">
            Hyperlocal tutor matchmaking based on PostGIS geospatial radius and verified qualifications.
          </p>
        </div>
        <span className="small-text shrink-0">
          {tutors.length} {tutors.length === 1 ? "tutor" : "tutors"} available
        </span>
      </div>

      {/* Radius Filter Pills */}
      {tutors.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {RADIUS_FILTERS.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <Button
                key={filter.id}
                variant={isActive ? "default" : "outline"}
                size="default"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full h-8 px-3.5 text-xs sm:text-sm font-medium shrink-0 gap-1.5 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {Icon && <Icon className="size-3.5" />}
                {filter.label}
              </Button>
            );
          })}
        </div>
      )}

      {/* Tutors Feed List or Empty State */}
      {tutors.length === 0 ? (
        <div
          data-slot="card"
          className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/60 p-8 text-center text-card-foreground shadow-xs"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <GraduationCap className="size-6" />
          </div>
          <div className="max-w-md space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              No Registered Tutors Found Yet
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              There are no tutors registered in your immediate neighborhood yet. Sign up as a tutor or invite local mentors to join SkillNearMe!
            </p>
          </div>
          <Link href="/dashboard?role=teacher">
            <Button size="sm" variant="outline" className="rounded-lg gap-2 text-xs font-medium mt-1">
              <GraduationCap className="size-3.5" />
              <span>Register as a Teacher</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              data-slot="card"
              className="flex flex-col justify-between gap-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm hover:shadow-md transition-all hover:border-primary/40"
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
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
                        {tutor.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        <ShieldCheck className="size-3" />
                        {tutor.verificationBadge}
                      </span>
                    </div>

                    <p className="small-text font-medium text-primary">
                      {tutor.specialization}
                    </p>

                    <p className="small-text text-muted-foreground/80 leading-relaxed max-w-xl">
                      {tutor.credentials}
                    </p>
                  </div>
                </div>

                {/* Pricing / Trial Block */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-1 shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-border/50">
                  <div className="text-left md:text-right">
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      ₹{tutor.hourlyRate}
                    </span>
                    <span className="small-text text-muted-foreground"> / hr</span>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    {tutor.freeTrialNote}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Rating, Locality, Badges & CTA Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/60 pt-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 font-semibold text-amber-700 dark:text-amber-400">
                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                    {tutor.rating.toFixed(1)}
                    <span className="font-normal text-muted-foreground">
                      ({tutor.reviewsCount})
                    </span>
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-medium text-foreground">
                    <MapPin className="size-3 text-primary" />
                    {tutor.distance} ({tutor.locality})
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                    <Home className="size-3" />
                    {tutor.teachingMode}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 font-medium text-orange-600 dark:text-orange-400">
                    <Flame className="size-3.5" />
                    {tutor.activeStudentsNote}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex w-full items-center gap-2 sm:w-auto mt-2 sm:mt-0">
                  <Button
                    variant="outline"
                    size="default"
                    className="size-10 rounded-lg border-border hover:bg-muted/60"
                    title="Message Tutor"
                  >
                    <MessageSquare className="size-4" />
                  </Button>
                  <Button
                    size="default"
                    className="flex-1 sm:flex-none h-10 px-4 gap-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground shadow-2xs hover:bg-primary/90"
                  >
                    <span>Book Free Trial</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

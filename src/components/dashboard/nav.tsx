"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  MapPin,
  MessageSquare,
  ChevronDown,
  X,
} from "lucide-react";
import {
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
  ModeToggle,
} from "@/components/ui";

interface NavBarProps {
  /** Student's selected location string */
  location?: string;
  /** Unread notification alerts count */
  notificationCount?: number;
  /** Unread messages count */
  messageCount?: number;
  /** Current logged in user/student profile */
  user?: {
    name?: string;
    avatarUrl?: string;
    initials?: string;
  };
  /** Callback when student submits teacher search query */
  onSearch?: (query: string) => void;
  /** Callback when "Find Tutors" CTA is clicked */
  onFindTutorsClick?: () => void;
  /** Callback when location pill is clicked */
  onLocationClick?: () => void;
}

export const NavBar = ({
  location = "Indiranagar, Bengaluru (Within 5 km)",
  notificationCount = 2,
  messageCount = 1,
  user = {
    name: "Aakash Sharma",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    initials: "AS",
  },
  onSearch,
  onFindTutorsClick,
  onLocationClick,
}: NavBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global search focus shortcut: ⌘K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch?.("");
    searchInputRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-card border-b border-border transition-colors">
      {/* Constrained layout container (max-w-7xl) with standard spacing */}
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* 1. BRAND SECTION (Single unified logo, Theme Tokens)      */}
        {/* ========================================================= */}
        <div className="flex shrink-0 items-center">
          <Link
            href="/dashboard"
            aria-label="SkillNearMe Dashboard Home"
            className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {/* Primary squircle with 4-point star icon */}
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0 shadow-xs">
              <svg
                className="size-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                <circle cx="19.5" cy="4.5" r="1.5" />
              </svg>
            </div>

            {/* Brand Title: Uses foreground and primary theme tokens */}
            <span className="text-base font-bold tracking-tight text-foreground font-sans">
              Skill<span className="text-primary">NearMe</span>
            </span>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* 2. STUDENT LOCATION PILL (Uses muted & border tokens)     */}
        {/* ========================================================= */}
        <div className="hidden md:flex shrink-0 items-center">
          <button
            type="button"
            onClick={onLocationClick}
            title={`${location}. Click to change`}
            aria-label={`Student selected location: ${location}. Click to change`}
            className="group flex h-9 items-center gap-2 rounded-full bg-muted hover:bg-muted/80 text-foreground px-3.5 border border-border text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MapPin className="size-3.5 text-primary shrink-0" />
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-medium text-foreground truncate max-w-[210px] lg:max-w-xs">
                {location}
              </span>
              <span className="hidden xl:inline text-xs text-muted-foreground font-normal whitespace-nowrap">
                · Click to change
              </span>
            </div>
            <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* 3. TEACHER SEARCH BAR (Fully theme-bound, Pill shaped)    */}
        {/* ========================================================= */}
        <div className="flex flex-1 items-center justify-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-1">
          <form
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Search teachers by subject, skill, or mentor name"
            className="relative flex h-9 w-full items-center rounded-full bg-muted border border-border px-3.5 focus-within:bg-background focus-within:border-ring focus-within:ring-1 focus-within:ring-ring transition-colors"
          >
            <Search className="size-4 text-muted-foreground shrink-0 mr-2" />

            <input
              ref={searchInputRef}
              type="search"
              name="teacher-query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teachers, subjects, skills..."
              className="h-full w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0 font-normal"
              autoComplete="off"
            />

            {searchQuery ? (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search query"
                className="flex size-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground shrink-0 ml-1.5 cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            ) : (
              <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-xs font-medium text-muted-foreground bg-background border border-border shrink-0 select-none">
                ⌘ K
              </kbd>
            )}
          </form>
        </div>

        {/* ========================================================= */}
        {/* 4. ACTIONS & PROFILE (Uses theme Button & tokens)         */}
        {/* ========================================================= */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-4">
          {/* "Find Tutors" Primary Action Button (Desktop only; on mobile it's in bottom dock) */}
          <Button
            type="button"
            variant="default"
            onClick={onFindTutorsClick}
            className="hidden sm:inline-flex h-9 px-4 rounded-full text-sm font-medium shrink-0 cursor-pointer"
          >
            Find Tutors
          </Button>

          {/* "My Bookings" Student Navigation Link */}
          <Link
            href="/dashboard"
            className="hidden sm:inline-block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap px-0.5 shrink-0"
          >
            My Bookings
          </Link>

          {/* Clean 1px Vertical Divider */}
          <div
            className="hidden sm:block h-4.5 w-px bg-border shrink-0"
            aria-hidden="true"
          />

          {/* Notifications Bell */}
          <button
            type="button"
            aria-label={`Notifications, ${notificationCount} unread`}
            className="relative flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            <Bell className="size-4.5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-primary text-xs font-bold leading-none text-primary-foreground">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Messages Bubble (Desktop only; on mobile it's in bottom dock) */}
          <button
            type="button"
            aria-label={`Messages, ${messageCount} unread`}
            className="hidden sm:flex relative size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            <MessageSquare className="size-4.5" />
            {messageCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-primary text-xs font-bold leading-none text-primary-foreground">
                {messageCount}
              </span>
            )}
          </button>

          {/* Student Profile Avatar & Status */}
          <button
            type="button"
            aria-label={`Student profile menu for ${user.name}`}
            className="flex items-center gap-1.5 rounded-full p-0.5 hover:bg-muted transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            <div className="relative">
              <Avatar
                size="default"
                className="size-8 rounded-full ring-1 ring-border"
              >
                {user.avatarUrl && (
                  <AvatarImage
                    src={user.avatarUrl}
                    alt={user.name ?? "Student"}
                  />
                )}
                <AvatarFallback className="bg-muted text-xs font-semibold text-muted-foreground">
                  {user.initials ?? "ST"}
                </AvatarFallback>
              </Avatar>

              {/* Online Green Status Dot */}
              <span
                className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background"
                aria-hidden="true"
              />
            </div>

            <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
          </button>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default NavBar;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Home,
  BookOpen,
  Search,
  Calendar,
  MessageSquare,
  LayoutDashboard,
  Users,
  Sparkles,
  Clock,
  Wallet,
} from "lucide-react";

interface DockItem {
  id: string;
  label: string;
  icon: React.ElementType;
  anchor: string;
  badge?: number;
  badgeColor?: string;
}

const STUDENT_DOCK_ITEMS: DockItem[] = [
  {
    id: "overview",
    label: "Hub",
    icon: Home,
    anchor: "#overview",
  },
  {
    id: "active-classes",
    label: "Classes",
    icon: BookOpen,
    anchor: "#active-classes",
  },
  {
    id: "tutors",
    label: "Explore",
    icon: Search,
    anchor: "#tutors",
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: Calendar,
    anchor: "#schedule",
  },
  {
    id: "inquiries",
    label: "Chats",
    icon: MessageSquare,
    anchor: "#inquiries",
    badge: 1,
  },
];

const TEACHER_DOCK_ITEMS: DockItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    anchor: "#overview",
  },
  {
    id: "batches",
    label: "Batches",
    icon: Users,
    anchor: "#batches",
  },
  {
    id: "leads",
    label: "Leads",
    icon: Sparkles,
    anchor: "#leads",
    badge: 2,
    badgeColor: "bg-primary",
  },
  {
    id: "schedule",
    label: "Timetable",
    icon: Clock,
    anchor: "#schedule",
  },
  {
    id: "payouts",
    label: "Payouts",
    icon: Wallet,
    anchor: "#payouts",
  },
];

interface MobileBottomDockProps {
  role?: "student" | "teacher";
}

export function MobileBottomDock({ role: propRole }: MobileBottomDockProps) {
  const searchParams = useSearchParams();
  const roleFromUrl = searchParams.get("role") === "teacher" ? "teacher" : "student";
  const activeRole = propRole || roleFromUrl;

  const [activeTab, setActiveTab] = useState<string>("overview");

  const items = activeRole === "teacher" ? TEACHER_DOCK_ITEMS : STUDENT_DOCK_ITEMS;

  // Track active section on scroll using IntersectionObserver
  useEffect(() => {
    const sectionIds = items.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, activeRole]);

  const handleTabClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: DockItem
  ) => {
    setActiveTab(item.id);
    const targetEl = document.getElementById(item.id);
    if (targetEl) {
      e.preventDefault();
      const navOffset = 68;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.replaceState(null, "", item.anchor);
    }
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/90 dark:bg-card/85 backdrop-blur-md border-t border-border shadow-lg transition-colors pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
    >
      <div className="mx-auto flex h-14 max-w-md items-center justify-around px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Link
              key={item.id}
              href={item.anchor}
              onClick={(e) => handleTabClick(e, item)}
              className={`group relative flex flex-1 flex-col items-center justify-center py-1 transition-all active:scale-95 select-none ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {/* Icon Container with active pill highlight */}
              <div
                className={`relative flex items-center justify-center rounded-xl p-1.5 transition-all ${
                  isActive ? "bg-primary/10" : "group-hover:bg-muted/50"
                }`}
              >
                <Icon className={`size-5 transition-transform ${isActive ? "scale-105" : ""}`} />

                {/* Badge Indicator */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold leading-none text-primary-foreground ${
                      item.badgeColor || "bg-primary"
                    } ring-1 ring-background animate-pulse`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] leading-tight transition-all mt-0.5 ${
                  isActive ? "font-bold text-primary" : "font-medium"
                }`}
              >
                {item.label}
              </span>

              {/* Active Bottom Glow Dot */}
              {isActive && (
                <span
                  className="absolute bottom-0 size-1 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

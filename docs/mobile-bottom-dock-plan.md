# Feature Plan: Role-Aware Mobile Bottom Dock & Mobile UI Architecture

**Feature Name**: Mobile Responsiveness, Role-Aware Bottom Dock & Touch Standardization  
**Roles Impacted**: Student Learning Hub & Teacher Control Center  
**Status**: In Progress  
**Authors**: PM Agent (Alex), UI Designer Agent, Frontend Developer Agent  
**Last Updated**: October 2026  

---

## 1. Executive Summary & Problem Statement

### The Problem
SkillNearMe's dashboard is optimized for desktop viewports, but when tested on standard mobile viewports (e.g., iPhone 13/14/15 375px–390px, Android 360px–412px):
1. **Missing Persistent Navigation**: Mobile users must scroll up and down repeatedly to reach critical sections (Batches, Leads, Tutors, Chats, Schedule). There is no persistent bottom navigation bar ("dock").
2. **Horizontal Viewport Overflow**: The top navbar overflows horizontally due to crowded action items (Find Tutors button, search input, notification bell, message bubble, avatar, theme toggle), triggering an unwanted horizontal scrollbar.
3. **Substandard Touch Targets**: Buttons have fixed heights as small as `h-7` (28px) and `h-8` (32px), violating WCAG AA minimum touch target guidelines (minimum 44x44px or 38-40px on mobile touchscreens).
4. **Unscaled Architecture for Upcoming Sections**: No unified routing pattern exists for forthcoming high-priority flows such as full **Chat Messenger**, **Notification Center**, and **"Show All" / Full List views**.

---

## 2. Product Requirements & User Stories

### User Stories
- **As a Student on Mobile**, I want a persistent bottom dock with quick 1-tap access to **Hub (Overview)**, **My Classes**, **Find Tutors**, **Schedule**, and **Chats** (with unread counter) so I can manage my learning on the go without friction.
- **As a Teacher on Mobile**, I want a persistent bottom dock with 1-tap access to **Overview**, **Batches**, **Leads** (with pulse badge for new inquiries), **Timetable**, and **Payouts** so I never miss a high-intent trial lead or class.
- **As any Mobile User**, I want all buttons and touch targets to be at least 38px–44px tall with adequate spacing so I can tap accurately with one thumb.

---

## 3. UI / UX Design Specifications

### 3.1 Mobile Bottom Dock Architecture

| Role | Tab 1 | Tab 2 | Tab 3 | Tab 4 | Tab 5 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Student Hub** | **Hub**<br/>`Compass` / `Home`<br/>Anchor: `#overview` | **Classes**<br/>`BookOpen`<br/>Anchor: `#active-classes` | **Tutors**<br/>`Search`<br/>Anchor: `#tutors` | **Schedule**<br/>`Calendar`<br/>Anchor: `#schedule` | **Chats**<br/>`MessageSquare`<br/>Badge: `1`<br/>Anchor: `#inquiries` |
| **Teacher Desk** | **Overview**<br/>`LayoutDashboard`<br/>Anchor: `#overview` | **Batches**<br/>`Users`<br/>Anchor: `#batches` | **Leads**<br/>`Sparkles`<br/>Badge: `2`<br/>Anchor: `#leads` | **Schedule**<br/>`Clock`<br/>Anchor: `#schedule` | **Payouts**<br/>`Wallet`<br/>Anchor: `#payouts` |

### 3.2 Visual & Ergonomic Design Tokens
- **Positioning**: `fixed bottom-0 left-0 right-0 z-50 md:hidden`
- **Surface**: `bg-card/90 dark:bg-card/85 backdrop-blur-md border-t border-border shadow-lg`
- **Height & Safe Area**: `h-16 pb-[env(safe-area-inset-bottom,0px)]`
- **Active State Indicator**: `text-primary font-bold bg-primary/10 rounded-xl` with micro-scale feedback (`active:scale-95 transition-transform`).
- **Badge Indicator**: `bg-primary text-primary-foreground text-[10px] font-bold rounded-full size-4 flex items-center justify-center animate-pulse`.

### 3.3 Button Touch Target Standardization
Base UI button height scaling in `src/components/ui/button.tsx`:
- `size="default"`: `h-10 sm:h-9 px-3.5 sm:px-3 text-sm` (40px touch height on mobile)
- `size="sm"`: `h-9 sm:h-8 px-3 sm:px-2.5 text-xs sm:text-[0.8rem]` (36px touch height on mobile)
- `size="lg"`: `h-11 sm:h-10 px-4 text-base sm:text-sm` (44px touch height on mobile)
- `size="icon"`: `size-10 sm:size-8`
- `size="icon-sm"`: `size-9 sm:size-7`

---

## 4. Scalability Architecture: Chat, Notifications & "Show All" Views

To allow upcoming features to scale seamlessly into this structure:

```
src/
├── app/
│   └── (dashboard)/
│       ├── dashboard/
│       │   ├── page.tsx               # Main dual-role hub
│       │   └── role-switcher.tsx
│       ├── chat/                      # Upcoming: Full screen chat / thread list
│       │   └── page.tsx
│       ├── notifications/             # Upcoming: Notification center
│       │   └── page.tsx
│       └── [role]/
│           ├── classes/page.tsx       # Upcoming: "Show All" classes
│           ├── tutors/page.tsx        # Upcoming: "Show All" tutors with PostGIS filters
│           └── leads/page.tsx         # Upcoming: "Show All" student inquiries
```

1. **Dock Action Dispatcher**:
   The bottom dock items will check if dedicated routes exist (e.g. `/chat`, `/notifications`), or smoothly scroll to in-page anchors (`#inquiries`, `#leads`). When dedicated pages are shipped, the dock will route to them directly without breaking existing navigation.
2. **Notification Badging**:
   Badge numbers (`messageCount`, `leadsCount`) will read from a shared lightweight store or server props, synchronizing top bar bell alerts and bottom dock badges.

---

## 5. Step-by-Step Implementation Roadmap

- [x] **Phase 1: Feature Planning & Spec** (`docs/mobile-bottom-dock-plan.md`)
- [ ] **Phase 2: Mobile Button Touch Targets** (Update `button.tsx` & clean hardcoded heights)
- [ ] **Phase 3: Top Navbar Mobile Responsiveness** (Eliminate horizontal overflow, hide redundant mobile CTA)
- [ ] **Phase 4: Role-Aware Mobile Bottom Dock** (Create `mobile-bottom-dock.tsx` with dynamic student/teacher items, active state, badges, and safe area)
- [ ] **Phase 5: Section Anchors & Container Padding** (Add `id` attributes and `scroll-mt-16` to dashboard cards, add `pb-28` to avoid dock occlusion)
- [ ] **Phase 6: Verification & QA** (Playwright MCP browser testing at 375x812, 0 horizontal scroll, dark/light mode parity)

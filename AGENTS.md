<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design System & Component Creation Rules

1. **Reference Mockups (`/design` folder)**:
   - Before creating or fixing any UI components or pages, ALWAYS reference the images in `/design`:
     - `image.png` & `image copy 7.png`: Cards & Widgets (Dark & Light)
     - `image copy.png` & `image copy 6.png`: Dashboard, Stats Cards, Area Charts, Data Tables (Dark & Light)
     - `image copy 2.png` & `image copy 5.png`: Application Views, Activity Feeds, Chat Messenger (Dark & Light)
     - `image copy 3.png` & `image copy 4.png`: Marketing, Profiles, Reviews (Dark & Light)
   - Ensure component structure, hierarchy, and interaction patterns match these mockups.

2. **Global CSS Theme Tokens (`src/app/globals.css`)**:
   - Strictly use the project's CSS variables and semantic Tailwind classes:
     - `bg-background` / `text-foreground`
     - `bg-card` / `text-card-foreground`
     - `bg-primary` / `text-primary-foreground`
     - `bg-secondary` / `text-secondary-foreground`
     - `bg-muted` / `text-muted-foreground`
     - `border-border` / `border-input`
     - `ring-ring`
   - **NO hardcoded hex colors** (`#hex`, `rgb`, `slate-*`, `blue-*` etc.). Everything must dynamically support both Light and Dark modes.
   - **NO arbitrary font sizes** (`text-[...]`). Use standard Tailwind scale (`text-xs`, `text-sm`, `text-base`, `text-lg`, etc.).
   - Default typeface is **Open Sans** (`font-sans`).

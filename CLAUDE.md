# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3001
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # Run ESLint
```

No test suite is configured yet.

## Stack

- **Next.js 16** with the App Router (`app/` directory)
- **React 19**
- **TypeScript** (strict mode, path alias `@/*` maps to repo root)
- **Tailwind CSS v4** (configured via PostCSS; imported with `@import "tailwindcss"` in globals.css — no `tailwind.config` file)

## Architecture

This is a freshly bootstrapped `create-next-app` project. The `app/` directory is the entire application:

- `app/layout.tsx` — root layout; loads Geist Sans and Geist Mono via `next/font/google`, sets global metadata
- `app/globals.css` — global styles; defines CSS custom properties for background/foreground with dark mode support via `@media (prefers-color-scheme: dark)`
- `app/page.tsx` — the single page (still the default boilerplate; needs to be replaced with actual personal site content)

Fonts are exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`) and mapped to Tailwind's `font-sans` / `font-mono` utilities via `@theme inline` in globals.css.

## Deployment target

Intended to be deployed at **https://zkhowes.me** (Vercel recommended).

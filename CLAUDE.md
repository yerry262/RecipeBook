# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

Jerry & Krista's Recipe Book — a family recipe site built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Recipes are stored as JSON files on disk; no database.

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build (also runs lint + type checks)
- `npm run lint` — ESLint

There is no test suite; `npm run build` is the verification step.

## Architecture

- **Recipes are flat JSON files** under `data/recipes/<category>/<slug>.json`, loaded server-side by `src/lib/recipes.ts` (`getAllRecipes`, etc.). To add a recipe, add a JSON file matching the `Recipe` type in `src/types/recipe.ts` — no code changes needed.
- **Categories** are defined once in the `CATEGORIES` array in `src/lib/recipes.ts` (breakfast, lunch, dinner, dessert, drinks). The `Navbar` has its own copy of this list.
- **Likes and comments** persist to a single file, `data/interactions.json`, via `src/lib/interactions.ts` — read-modify-write, no locking. Fine for its scale; don't assume concurrent safety.
- **Auth** is NextAuth with Google OAuth only (`src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`). Requires `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `NEXTAUTH_SECRET` in `.env.local` (see README). Likes/comments require sign-in.
- **API routes** under `src/app/api/`: `search`, `likes`, `comments`.
- Pages are server components; interactive pieces (`Navbar`, `SearchModal`, `LikeButton`, `CommentSection`, `ShareButton`) are client components.

## Conventions

- Styling is Tailwind with a custom palette in `tailwind.config.js` (`rust`, `cream`, warm `amber`); shared component classes (`.btn-primary`, `.card`, `.section-heading`, `.input-field`) and entrance animations (`.animate-fade-in`, `.animate-slide-up`, `.animate-slide-down`) live in `src/app/globals.css`.
- Fonts: Inter is self-hosted via `next/font` in `src/app/layout.tsx` (exposed as `--font-inter`); do not add Google Fonts `@import`s.
- Animations must respect `prefers-reduced-motion` — a global media query in `globals.css` already handles CSS transitions/animations.
- Use `next/image` for all images; remote hosts are allowlisted in `next.config.js` (Unsplash, Google avatars). Mark above-the-fold images with `priority`.

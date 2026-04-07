# Jerry & Krista's Recipe Book

A personal recipe website built with Next.js, Tailwind CSS, and Google Auth.

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

You'll need:
- **Google OAuth credentials** — create a project at [console.developers.google.com](https://console.developers.google.com/), enable the Google+ API, and create OAuth 2.0 credentials. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.
- **NEXTAUTH_SECRET** — generate with `openssl rand -base64 32`

### 3. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## Adding a New Recipe

1. Choose the right category folder under `data/recipes/`:
   - `data/recipes/breakfast/`
   - `data/recipes/lunch/`
   - `data/recipes/dinner/`
   - `data/recipes/dessert/`
   - `data/recipes/drinks/`

2. Create a new `.json` file with the recipe slug as the filename (e.g., `banana-bread.json`).

3. Use this template:

```json
{
  "id": "banana-bread",
  "slug": "banana-bread",
  "title": "Banana Bread",
  "category": "breakfast",
  "description": "Moist, flavorful banana bread perfect for ripe bananas.",
  "image": "https://images.unsplash.com/photo-...",
  "prepTime": "15 min",
  "cookTime": "60 min",
  "totalTime": "1 hr 15 min",
  "servings": 8,
  "difficulty": "Easy",
  "tags": ["breakfast", "baking", "banana"],
  "ingredients": [
    { "amount": "3", "unit": "large", "item": "ripe bananas", "note": "mashed" },
    { "amount": "2", "unit": "cups", "item": "all-purpose flour" }
  ],
  "steps": [
    { "step": 1, "instruction": "Preheat oven to 350°F..." },
    { "step": 2, "instruction": "Mash the bananas..." }
  ],
  "notes": "Optional tips or variations go here."
}
```

That's it! The recipe will automatically appear on the site.

---

## Deploying to Vercel

1. Push your code to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add your environment variables in Vercel's project settings
4. Update `NEXTAUTH_URL` to your production URL
5. Add your production callback URL to Google OAuth settings

> **Note about likes & comments in production:** The current implementation stores likes and comments in `data/interactions.json`. This works for local dev, but on Vercel the file system is read-only. To persist in production, connect a database like [Supabase](https://supabase.com) (free tier) and update `src/lib/interactions.ts`.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js with Google OAuth
- **Recipe data**: JSON files in `data/recipes/`
- **Icons**: Lucide React

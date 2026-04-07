import { NextRequest, NextResponse } from 'next/server';
import { searchRecipes } from '@/lib/recipes';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';

  if (!q.trim()) {
    return NextResponse.json({ results: [] });
  }

  const recipes = searchRecipes(q);
  const results = recipes.slice(0, 8).map((r) => ({
    slug: r.slug,
    title: r.title,
    category: r.category,
    image: r.image,
    description: r.description,
  }));

  return NextResponse.json({ results });
}

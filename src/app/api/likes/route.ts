import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { toggleLike, getLikes } from '@/lib/interactions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  const session = await getServerSession(authOptions);
  const likes = getLikes(slug);
  const liked = session?.user?.email ? likes.includes(session.user.email) : false;

  return NextResponse.json({ count: likes.length, liked });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { recipeSlug } = await req.json();
  if (!recipeSlug) return NextResponse.json({ error: 'Missing recipeSlug' }, { status: 400 });

  const result = toggleLike(recipeSlug, session.user.email);
  return NextResponse.json(result);
}

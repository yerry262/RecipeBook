import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { addComment, deleteComment, getComments } from '@/lib/interactions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  return NextResponse.json(getComments(slug));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { recipeSlug, text } = await req.json();
  if (!recipeSlug || !text?.trim()) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const comment = addComment({
    recipeSlug,
    userId: session.user.email,
    userName: session.user.name ?? 'Anonymous',
    userImage: session.user.image ?? '',
    text: text.trim(),
  });

  return NextResponse.json(comment);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { commentId } = await req.json();
  if (!commentId) return NextResponse.json({ error: 'Missing commentId' }, { status: 400 });

  const success = deleteComment(commentId, session.user.email);
  if (!success) return NextResponse.json({ error: 'Not found or not authorized' }, { status: 404 });

  return NextResponse.json({ success: true });
}

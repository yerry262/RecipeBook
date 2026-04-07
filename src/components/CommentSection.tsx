'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { MessageCircle, Send, Trash2 } from 'lucide-react';
import { Comment } from '@/types/recipe';

interface CommentSectionProps {
  recipeSlug: string;
  initialComments: Comment[];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function CommentSection({ recipeSlug, initialComments }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !text.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeSlug, text: text.trim() }),
      });
      const newComment = await res.json();
      setComments((prev) => [...prev, newComment]);
      setText('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    const res = await fetch('/api/comments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId }),
    });
    if (res.ok) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
  };

  return (
    <section className="mt-10 pt-8 border-t border-gray-100">
      <h2 className="flex items-center gap-2 text-xl font-serif font-bold text-gray-900 mb-6">
        <MessageCircle size={20} className="text-rust-500" />
        Comments {comments.length > 0 && <span className="text-sm font-normal text-gray-400">({comments.length})</span>}
      </h2>

      {/* Comment Input */}
      {session ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="You"
                width={36}
                height={36}
                className="rounded-full flex-shrink-0 mt-1"
              />
            )}
            <div className="flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts on this recipe..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rust-400 focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!text.trim() || submitting}
                  className="flex items-center gap-2 bg-rust-500 hover:bg-rust-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <Send size={14} />
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 bg-cream-100 border border-orange-100 rounded-xl p-5 text-center">
          <p className="text-sm text-gray-600 mb-3">Sign in to leave a comment</p>
          <button
            onClick={() => signIn('google')}
            className="bg-rust-500 hover:bg-rust-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <ul className="space-y-6">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-3">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src={comment.userImage || '/placeholder-avatar.png'}
                  alt={comment.userName}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">{comment.userName}</span>
                  <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
              </div>
              {session?.user?.email === comment.userId && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 mt-1"
                  title="Delete comment"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

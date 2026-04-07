'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';

interface LikeButtonProps {
  recipeSlug: string;
  initialLikes: number;
  initialLiked: boolean;
}

export default function LikeButton({ recipeSlug, initialLikes, initialLiked }: LikeButtonProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!session) {
      signIn('google');
      return;
    }
    if (loading) return;
    setLoading(true);

    // Optimistic update
    setLiked(!liked);
    setCount((c) => (liked ? c - 1 : c + 1));

    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeSlug }),
      });
      const data = await res.json();
      setLiked(data.liked);
      setCount(data.count);
    } catch {
      // Revert on error
      setLiked(liked);
      setCount(count);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
        liked
          ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
          : 'bg-white text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200'
      }`}
      title={session ? (liked ? 'Unlike' : 'Like') : 'Sign in to like'}
    >
      <Heart
        size={18}
        className={`transition-all ${liked ? 'fill-current' : ''} ${loading ? 'animate-pulse' : ''}`}
      />
      <span>{count > 0 ? count : ''} {count === 1 ? 'Like' : 'Likes'}</span>
    </button>
  );
}

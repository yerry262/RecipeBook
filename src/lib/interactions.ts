import fs from 'fs';
import path from 'path';
import { Interactions, Comment } from '@/types/recipe';

const INTERACTIONS_FILE = path.join(process.cwd(), 'data', 'interactions.json');

function readInteractions(): Interactions {
  if (!fs.existsSync(INTERACTIONS_FILE)) {
    return { likes: {}, comments: [] };
  }
  return JSON.parse(fs.readFileSync(INTERACTIONS_FILE, 'utf-8'));
}

function writeInteractions(data: Interactions): void {
  fs.writeFileSync(INTERACTIONS_FILE, JSON.stringify(data, null, 2));
}

export function getLikes(recipeSlug: string): string[] {
  const data = readInteractions();
  return data.likes[recipeSlug] ?? [];
}

export function toggleLike(recipeSlug: string, userId: string): { liked: boolean; count: number } {
  const data = readInteractions();
  if (!data.likes[recipeSlug]) data.likes[recipeSlug] = [];

  const idx = data.likes[recipeSlug].indexOf(userId);
  if (idx === -1) {
    data.likes[recipeSlug].push(userId);
  } else {
    data.likes[recipeSlug].splice(idx, 1);
  }

  writeInteractions(data);
  return {
    liked: idx === -1,
    count: data.likes[recipeSlug].length,
  };
}

export function getComments(recipeSlug: string): Comment[] {
  const data = readInteractions();
  return data.comments.filter((c) => c.recipeSlug === recipeSlug);
}

export function addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Comment {
  const data = readInteractions();
  const newComment: Comment = {
    ...comment,
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
  };
  data.comments.push(newComment);
  writeInteractions(data);
  return newComment;
}

export function deleteComment(commentId: string, userId: string): boolean {
  const data = readInteractions();
  const idx = data.comments.findIndex((c) => c.id === commentId && c.userId === userId);
  if (idx === -1) return false;
  data.comments.splice(idx, 1);
  writeInteractions(data);
  return true;
}

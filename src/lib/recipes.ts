import fs from 'fs';
import path from 'path';
import { Recipe, Category } from '@/types/recipe';

const RECIPES_DIR = path.join(process.cwd(), 'data', 'recipes');

export const CATEGORIES: { id: Category; label: string; emoji: string; description: string }[] = [
  { id: 'breakfast', label: 'Breakfast', emoji: '🍳', description: 'Start your day right' },
  { id: 'lunch', label: 'Lunch', emoji: '🥗', description: 'Midday meals' },
  { id: 'dinner', label: 'Dinner', emoji: '🍽️', description: 'Evening favorites' },
  { id: 'dessert', label: 'Dessert', emoji: '🍰', description: 'Sweet endings' },
  { id: 'drinks', label: 'Drinks', emoji: '🥤', description: 'Refreshing beverages' },
];

export function getAllRecipes(): Recipe[] {
  const recipes: Recipe[] = [];

  for (const category of CATEGORIES) {
    const categoryDir = path.join(RECIPES_DIR, category.id);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(categoryDir, file), 'utf-8');
      recipes.push(JSON.parse(content) as Recipe);
    }
  }

  return recipes;
}

export function getRecipesByCategory(category: Category): Recipe[] {
  const categoryDir = path.join(RECIPES_DIR, category);
  if (!fs.existsSync(categoryDir)) return [];

  return fs
    .readdirSync(categoryDir)
    .filter((f) => f.endsWith('.json'))
    .map((file) => {
      const content = fs.readFileSync(path.join(categoryDir, file), 'utf-8');
      return JSON.parse(content) as Recipe;
    });
}

export function getRecipeBySlug(slug: string): Recipe | null {
  for (const category of CATEGORIES) {
    const categoryDir = path.join(RECIPES_DIR, category.id);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(categoryDir, file), 'utf-8');
      const recipe = JSON.parse(content) as Recipe;
      if (recipe.slug === slug) return recipe;
    }
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllRecipes().map((r) => r.slug);
}

export function searchRecipes(query: string): Recipe[] {
  const q = query.toLowerCase();
  return getAllRecipes().filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q)) ||
      r.ingredients.some((i) => i.item.toLowerCase().includes(q))
  );
}

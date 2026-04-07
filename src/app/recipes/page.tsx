import { getAllRecipes, CATEGORIES } from '@/lib/recipes';
import RecipeCard from '@/components/RecipeCard';
import { Category } from '@/types/recipe';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';

interface RecipesPageProps {
  searchParams: { category?: string };
}

export default function RecipesPage({ searchParams }: RecipesPageProps) {
  const allRecipes = getAllRecipes();
  const activeCategory = searchParams.category as Category | undefined;

  const filtered = activeCategory
    ? allRecipes.filter((r) => r.category === activeCategory)
    : allRecipes;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-gray-900 mb-2">All Recipes</h1>
        <p className="text-gray-500">
          {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
          {activeCategory ? ` in ${CATEGORIES.find((c) => c.id === activeCategory)?.label}` : ' in our collection'}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <Link
          href="/recipes"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !activeCategory
              ? 'bg-rust-500 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-rust-300 hover:text-rust-600'
          }`}
        >
          All ({allRecipes.length})
        </Link>
        {CATEGORIES.map((cat) => {
          const count = allRecipes.filter((r) => r.category === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/recipes?category=${cat.id}`}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-rust-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-rust-300 hover:text-rust-600'
              }`}
            >
              {cat.emoji} {cat.label} ({count})
            </Link>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <ChefHat size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No recipes in this category yet.</p>
          <p className="text-gray-400 text-sm mt-1">Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

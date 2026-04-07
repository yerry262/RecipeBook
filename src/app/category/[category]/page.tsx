import { notFound } from 'next/navigation';
import { getRecipesByCategory, CATEGORIES } from '@/lib/recipes';
import { Category } from '@/types/recipe';
import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';
import { ArrowLeft, ChefHat } from 'lucide-react';

interface CategoryPageProps {
  params: { category: string };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const cat = CATEGORIES.find((c) => c.id === params.category);
  if (!cat) return {};
  return {
    title: `${cat.label} Recipes | Jerry & Krista's Recipe Book`,
    description: `Browse all ${cat.label.toLowerCase()} recipes from our family collection.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const cat = CATEGORIES.find((c) => c.id === params.category);
  if (!cat) notFound();

  const recipes = getRecipesByCategory(params.category as Category);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        href="/recipes"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-rust-600 mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        All Recipes
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-4xl shadow-sm">
          {cat.emoji}
        </div>
        <div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-gray-900">{cat.label}</h1>
          <p className="text-gray-500 mt-0.5">{cat.description}</p>
        </div>
      </div>

      <p className="text-gray-500 mb-8 text-sm">
        {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
      </p>

      {/* Other Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.filter((c) => c.id !== cat.id).map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-rust-300 hover:text-rust-600 transition-colors"
          >
            {c.emoji} {c.label}
          </Link>
        ))}
      </div>

      {/* Recipes Grid */}
      {recipes.length === 0 ? (
        <div className="text-center py-16">
          <ChefHat size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No {cat.label.toLowerCase()} recipes yet.</p>
          <p className="text-gray-400 text-sm mt-1">
            Add a JSON file to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">data/recipes/{cat.id}/</code> to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

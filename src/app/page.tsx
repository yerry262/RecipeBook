import Link from 'next/link';
import Image from 'next/image';
import { getAllRecipes, CATEGORIES } from '@/lib/recipes';
import RecipeCard from '@/components/RecipeCard';
import { ArrowRight, Search } from 'lucide-react';

export default function HomePage() {
  const allRecipes = getAllRecipes();
  const featured = allRecipes.slice(0, 3);
  const recent = allRecipes.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-cream-100 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-rust-500 font-medium text-sm tracking-widest uppercase mb-4">Welcome to our kitchen</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
            Jerry &amp; Krista&apos;s
            <br />
            <span className="text-rust-600">Recipe Book</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            A collection of our favorite family recipes — from quick weeknight dinners to weekend bakes,
            all made with love and meant to be shared.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/recipes"
              className="inline-flex items-center justify-center gap-2 bg-rust-500 hover:bg-rust-600 text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              Browse All Recipes
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/recipes"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-medium px-6 py-3 rounded-xl transition-colors"
            >
              <Search size={16} />
              Search Recipes
            </Link>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-100 rounded-full opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-100 rounded-full opacity-50 blur-3xl pointer-events-none" />
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-heading">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="group flex flex-col items-center justify-center gap-2 bg-white border border-orange-100 rounded-2xl p-5 hover:border-rust-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.emoji}</span>
              <span className="font-semibold text-sm text-gray-800">{cat.label}</span>
              <span className="text-xs text-gray-400 text-center">{cat.description}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      {featured.length > 0 && (
        <section className="bg-white py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-heading">Featured Recipes</h2>
              <Link href="/recipes" className="text-sm font-medium text-rust-500 hover:text-rust-600 flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Recent Recipes */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-heading">Latest Recipes</h2>
          <Link href="/recipes" className="text-sm font-medium text-rust-500 hover:text-rust-600 flex items-center gap-1">
            All recipes <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* About Banner */}
      <section className="bg-gradient-to-r from-rust-600 to-rust-500 text-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl mb-4">Our Family Kitchen</h2>
          <p className="text-orange-100 leading-relaxed mb-6">
            These are the recipes that have filled our home with amazing smells and even better memories.
            We&apos;re so happy to share them with you. Every recipe is tested, loved, and ready for your table.
          </p>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 bg-white text-rust-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors"
          >
            Start Cooking <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

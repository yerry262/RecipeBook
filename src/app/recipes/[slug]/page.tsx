import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getRecipeBySlug, getAllSlugs } from '@/lib/recipes';
import { getLikes, getComments } from '@/lib/interactions';
import CategoryBadge from '@/components/CategoryBadge';
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import CommentSection from '@/components/CommentSection';
import { Clock, Users, ChefHat, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface RecipePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RecipePageProps) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return {};
  return {
    title: `${recipe.title} | Jerry & Krista's Recipe Book`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) notFound();

  const session = await getServerSession(authOptions);
  const likes = getLikes(recipe.slug);
  const comments = getComments(recipe.slug);
  const userLiked = session?.user?.email ? likes.includes(session.user.email) : false;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-rust-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/recipes" className="hover:text-rust-600 transition-colors">Recipes</Link>
        <span>/</span>
        <Link href={`/category/${recipe.category}`} className="hover:text-rust-600 transition-colors capitalize">{recipe.category}</Link>
        <span>/</span>
        <span className="text-gray-600 truncate">{recipe.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <CategoryBadge category={recipe.category} />
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-gray-900 mt-3 mb-3 leading-tight">
          {recipe.title}
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">{recipe.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <LikeButton
          recipeSlug={recipe.slug}
          initialLikes={likes.length}
          initialLiked={userLiked}
        />
        <ShareButton title={recipe.title} />
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden mb-8 bg-gray-100 shadow-sm">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Prep Time', value: recipe.prepTime, icon: <Clock size={18} className="text-rust-500" /> },
          { label: 'Cook Time', value: recipe.cookTime, icon: <Clock size={18} className="text-rust-500" /> },
          { label: 'Servings', value: `${recipe.servings} servings`, icon: <Users size={18} className="text-rust-500" /> },
          { label: 'Difficulty', value: recipe.difficulty, icon: <ChefHat size={18} className="text-rust-500" /> },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
            <div className="font-semibold text-gray-900 text-sm">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Ingredients */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-20">
            <h2 className="flex items-center gap-2 font-serif font-bold text-xl text-gray-900 mb-4">
              <UtensilsCrossed size={18} className="text-rust-500" />
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-rust-400 mt-1.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    <span className="font-medium text-gray-900">
                      {ing.amount} {ing.unit}
                    </span>{' '}
                    {ing.item}
                    {ing.note && <span className="text-gray-400 italic">, {ing.note}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div className="md:col-span-3">
          <h2 className="flex items-center gap-2 font-serif font-bold text-xl text-gray-900 mb-5">
            <ChefHat size={18} className="text-rust-500" />
            Instructions
          </h2>
          <ol className="space-y-6">
            {recipe.steps.map((step) => (
              <li key={step.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rust-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div className="pt-1">
                  <p className="text-gray-700 leading-relaxed">{step.instruction}</p>
                </div>
              </li>
            ))}
          </ol>

          {recipe.notes && (
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-semibold text-amber-800 mb-2">💡 Notes</h3>
              <p className="text-sm text-amber-700 leading-relaxed">{recipe.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {recipe.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Comments */}
      <CommentSection recipeSlug={recipe.slug} initialComments={comments} />
    </div>
  );
}

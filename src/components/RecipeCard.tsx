import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import CategoryBadge from './CategoryBadge';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

export default function RecipeCard({ recipe, featured = false }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <article className={`card hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5 ${featured ? 'h-full' : ''}`}>
        {/* Image */}
        <div className={`relative overflow-hidden bg-gray-100 ${featured ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <CategoryBadge category={recipe.category} small />
          </div>
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              recipe.difficulty === 'Easy'
                ? 'bg-green-100 text-green-700'
                : recipe.difficulty === 'Medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-serif font-semibold text-gray-900 text-lg leading-snug mb-1 group-hover:text-rust-600 transition-colors line-clamp-2">
            {recipe.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{recipe.description}</p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {recipe.totalTime}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} />
              Serves {recipe.servings}
            </span>
            <span className="flex items-center gap-1">
              <ChefHat size={12} />
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

import { Category } from '@/types/recipe';

const categoryConfig: Record<Category, { label: string; emoji: string; bg: string; text: string }> = {
  breakfast: { label: 'Breakfast', emoji: '🍳', bg: 'bg-yellow-50', text: 'text-yellow-700' },
  lunch: { label: 'Lunch', emoji: '🥗', bg: 'bg-green-50', text: 'text-green-700' },
  dinner: { label: 'Dinner', emoji: '🍽️', bg: 'bg-blue-50', text: 'text-blue-700' },
  dessert: { label: 'Dessert', emoji: '🍰', bg: 'bg-pink-50', text: 'text-pink-700' },
  drinks: { label: 'Drinks', emoji: '🥤', bg: 'bg-purple-50', text: 'text-purple-700' },
};

interface CategoryBadgeProps {
  category: Category;
  small?: boolean;
}

export default function CategoryBadge({ category, small = false }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full ${config.bg} ${config.text} ${
        small ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      }`}
    >
      <span>{config.emoji}</span>
      {config.label}
    </span>
  );
}

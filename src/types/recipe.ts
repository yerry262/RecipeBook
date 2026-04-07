export type Category = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'drinks';

export interface Ingredient {
  amount: string;
  unit: string;
  item: string;
  note?: string;
}

export interface Step {
  step: number;
  instruction: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  category: Category;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  ingredients: Ingredient[];
  steps: Step[];
  notes?: string;
  author?: string;
}

export interface Comment {
  id: string;
  recipeSlug: string;
  userId: string;
  userName: string;
  userImage: string;
  text: string;
  createdAt: string;
}

export interface Interactions {
  likes: Record<string, string[]>; // recipeSlug -> array of userIds
  comments: Comment[];
}

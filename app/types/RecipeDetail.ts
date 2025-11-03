export type RecipeDetail = {
  id: number;
  title: string;
  image: string;
  extendedIngredients: Array<{
    original: string;
    amount: number;
    unit: string;
    name: string;
  }>;
  analyzedInstructions: Array<{
    steps: Array<{
      number: number;
      step: string;
    }>;
  }>;
  summary?: string;
  readyInMinutes?: number;
  servings?: number;
};
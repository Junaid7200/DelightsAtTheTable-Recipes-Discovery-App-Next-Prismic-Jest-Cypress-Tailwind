import "server-only";
import axios from "axios";
import type { RecipeCardProps } from "@/app/types/CardType";
import placeholderImage from "@/public/imgNotFound.jpg";
import type { SimilarRecipe } from "@/app/types/SimilarRecipe";
import { BASE, HOST } from '@/app/lib/utils';

const IMAGE_BASE = "https://img.spoonacular.com/recipes";



export async function getSimilarRecipes(
  id: string | number
): Promise<RecipeCardProps[]> {

  try {
    const response = await fetch(
      `${BASE}/recipes/${id}/similar?number=4`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host": HOST,
        },
        next: { revalidate: 3600 }, // Cache results for one hour
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data: SimilarRecipe[] = await response.json();

    return data.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: `${IMAGE_BASE}/${recipe.id}-556x370.${recipe.imageType}` || placeholderImage,
      subtitle: `Ready in ${recipe.readyInMinutes} minutes.`,
    }));
  } catch (error) {
    return [];
  }
}
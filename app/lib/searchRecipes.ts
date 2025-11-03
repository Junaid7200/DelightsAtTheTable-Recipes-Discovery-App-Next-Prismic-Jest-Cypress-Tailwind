import "server-only";
import axios from "axios";
import type { RecipeCardProps } from "@/app/types/CardType";

const BASE = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
const HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

function stripHtml(input = "") {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function searchRecipes(query: string): Promise<RecipeCardProps[]> {
  const { data } = await axios.get<{
    results: Array<{
      id: number;
      title: string;
      image: string;
      summary?: string;
    }>;
  }>(`${BASE}/recipes/complexSearch`, {
    params: {
      query,
      number: 10,
      addRecipeInformation: true,
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      "x-rapidapi-host": HOST,
    },
  });

  return data.results.map((r) => ({
    id: r.id,
    image: r.image,
    title: r.title,
    subtitle: stripHtml(r.summary ?? "").slice(0, 120) + (r.summary ? "…" : ""),
  }));
}
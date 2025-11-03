import "server-only";
import axios from "axios";
import type { RecipeCardProps } from "@/app/types/CardType";

const BASE = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
const HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

function stripHtml(input = "") {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function getRandomRecipeCards(
  { number = 6, tags = [] as string[] } = {}
): Promise<RecipeCardProps[]> {
  const params = new URLSearchParams({ number: String(number) });
  if (tags.length) params.set("tags", tags.join(","));

  const { data } = await axios.get<{ recipes: { id: number, title: string; image: string; summary?: string }[] }>(
    `${BASE}/recipes/random?${params.toString()}`,
    {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": HOST,
      },
    }
  );

  return data.recipes.map((r) => ({
    id: r.id,
    image: r.image,
    title: r.title,
    subtitle: stripHtml(r.summary ?? "").slice(0, 120) + (r.summary ? "…" : ""),
  }));
}
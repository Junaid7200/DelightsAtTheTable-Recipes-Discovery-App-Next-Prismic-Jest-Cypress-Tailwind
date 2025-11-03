import "server-only";
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

  const res = await fetch(`${BASE}/recipes/random?${params.toString()}`, {
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      "x-rapidapi-host": HOST,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Spoonacular: ${res.status}`);

  const data: { recipes: { title: string; image: string; summary?: string }[] } = await res.json();

  // Map API -> RecipeCardProps
  return data.recipes.map((r) => ({
    image: r.image,
    title: r.title,
    subtitle: stripHtml(r.summary ?? "").slice(0, 120) + (r.summary ? "…" : ""),
  }));
}
import "server-only";
import axios from "axios";
import type { RecipeCardProps } from "@/app/types/CardType";
import placeholderImage from "@/public/imgNotFound.jpg";
import stripHtml, { BASE, HOST} from "@/app/lib/utils";

export async function getRandomRecipeCards(
  { number = 6, tags = [] as string[] } = {}
): Promise<RecipeCardProps[]> {
  
  try {
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
      image: r.image || placeholderImage,
      title: r.title,
      subtitle: stripHtml(r.summary ?? "").slice(0, 120) + (r.summary ? "…" : ""),
    }));
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    return [];
  }
}
import "server-only";
import axios from "axios";
import type { RecipeDetail } from "@/app/types/RecipeDetail";

const BASE = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
const HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";


export async function getRecipeById(id: number): Promise<RecipeDetail> {
  const { data } = await axios.get<RecipeDetail>(
    `${BASE}/recipes/${id}/information`,
    {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": HOST,
      },
    }
  );
  
  return data;
}
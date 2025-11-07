import axios from "axios";
import stripHtml, {BASE, HOST} from "./utils";



const RECIPES_PER_PAGE = 8;

export async function searchRecipes(query: string, page: number = 1) {
  if (!query) {
    return { results: [], totalResults: 0 };
  }

  const offset = (page - 1) * RECIPES_PER_PAGE;

  try {
    const response = await axios.get(
      `${BASE}/recipes/complexSearch`,
      {
        params: {
          query,
          number: RECIPES_PER_PAGE,
          offset,
          addRecipeInformation: true,
          fillIngredients: true,
        },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host": HOST,
        },
      }
    );

    const cards = response.data.results.map((recipe: any) => ({
      id: recipe.id,
      image: recipe.image,
      title: recipe.title,
      subtitle: stripHtml(recipe.summary),
    }));

    return {
      results: cards,
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    return { results: [], totalResults: 0 };
  }
} 
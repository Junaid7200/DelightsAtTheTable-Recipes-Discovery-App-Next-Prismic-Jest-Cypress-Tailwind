import axios from "axios";

const RECIPES_PER_PAGE = 9;


function stripHtml(input = "") {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function searchRecipes(query: string, page: number = 1) {
  if (!query) {
    return { results: [], totalResults: 0 };
  }

  const offset = (page - 1) * RECIPES_PER_PAGE;

  try {
    const response = await axios.get(
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
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
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
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
    console.error("Failed to fetch recipes:", error);
    return { results: [], totalResults: 0 };
  }
} 
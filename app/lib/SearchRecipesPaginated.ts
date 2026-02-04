import stripHtml, {BASE, HOST} from "@/app/lib/utils";

const RECIPES_PER_PAGE = 6;

export async function searchRecipes(query: string, page: number = 1) {
  if (!query) {
    return { results: [], totalResults: 0 };
  }

  const offset = (page - 1) * RECIPES_PER_PAGE;

  try {
    const response = await fetch(
      `${BASE}/recipes/complexSearch?${new URLSearchParams({
        query,
        number: String(RECIPES_PER_PAGE),
        offset: String(offset),
        addRecipeInformation: 'true',
        fillIngredients: 'true',
      })}`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host": HOST,
        },
        next: { revalidate: 172800 }
      }
    );

    const data = await response.json();

    const cards = data.results.map((recipe: any) => ({
      id: recipe.id,
      image: recipe.image,
      title: recipe.title,
      subtitle: stripHtml(recipe.summary),
    }));

    return {
      results: cards,
      totalResults: data.totalResults,
    };
  } catch (error) {
    return { results: [], totalResults: 0 };
  }
}
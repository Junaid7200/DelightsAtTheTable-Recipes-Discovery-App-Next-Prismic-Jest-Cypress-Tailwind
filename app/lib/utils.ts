export default function stripHtml(input = "") {
    return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export const BASE = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
export const HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

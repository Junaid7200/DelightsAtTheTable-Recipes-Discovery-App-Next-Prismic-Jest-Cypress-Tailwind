import { getRecipeById } from "@/app/lib/getRecipeById";
import Image from "next/image";
import { createClient } from "@/prismicio";
import { getSimilarRecipes } from "@/app/lib/similarRecipes";
import Card from "@/app/components/Card";

type RecipePageProps = {
  params: Promise<{ id: string }>;
};

function stripHtml(input = "") {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(Number(id));
  const client = createClient();
  const recipeData = await client.getSingle("recipe_details");
  const homeData = await client.getSingle("home");
  const similarRecipes = await getSimilarRecipes(id);





  return (
    <div className="min-h-screen">
    {/* Hero image with title */}
    <div className="relative aspect-21/9 w-full min-h-[640px] md:min-h-[560px] overflow-hidden bg-white">
      <Image
        src={recipe.image}
        alt={recipe.title}
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
          {recipe.title}
        </h1>
      </div>
    </div>

      {/* Content */}
      <div className="md:pl-32 mx-auto px-6 py-10 space-y-8">
        {/* Ingredients */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{recipeData.data.ingredients}</h2>
          <ul className="space-y-2">
            {recipe.extendedIngredients.map((ing, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{ing.original}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{recipeData.data.instructions}</h2>
          {recipe.analyzedInstructions.length > 0 ? (
            <ol className="space-y-3">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number} className="flex items-start">
                  <span className="text-black rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 shrink-0">
                    {step.number}
                  </span>
                  <span>{step.step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">{recipeData.data.no_instructions_available}</p>
          )}
        </section>

        {/* Additional info */}
        {recipe.summary && (
          <section>
            <h2 className="text-2xl font-bold mb-4">{recipeData.data.summary}</h2>
            <p className="leading-relaxed">{stripHtml(recipe.summary)}</p>
            {recipe.readyInMinutes && (
              <p className="mt-2 text-sm text-gray-600">
                {recipeData.data.ready_in_minutes} {recipe.readyInMinutes} {recipeData.data.minutes}
              </p>
            )}
          </section>
        )}
        {similarRecipes.length > 0 && (
        <div className="mt-10">
          <h2 className="w-full text-2xl font-bold mb-4">{recipeData.data.similar_recipes}</h2>
          <div className="flex flex-col justify-center md:justify-start md:flex-row gap-24">
            {similarRecipes.map((recipe) => (
              <Card key={recipe.id} {...recipe} layout="vertical" buttonText={homeData.data.card_button_text || "View Recipe"} />
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
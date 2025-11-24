import { getRecipeById } from "@/app/lib/GetRecipeById";
import { createClient } from "@/prismicio";
import { getSimilarRecipes } from "@/app/lib/SimilarRecipes";
import Card from "@/app/components/Card";
import stripHtml from "@/app/lib/utils";
import RecipeHeroImage  from "@/app/components/RecipeHeroImage";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getHomeData } from "@/app/lib/GetHomeData";

type RecipePageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { id } = params;
  const recipe = await getRecipeById(Number(id));

  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }

  // Create a clean description from the summary, limited to 160 characters for SEO best practices.
  const description = stripHtml(recipe.summary).substring(0, 160);

  return {
    title: `${recipe.title} | Delícias à Mesa`,
    description: description,
    openGraph: {
      title: recipe.title,
      description: description,
      images: [
        {
          url: recipe.image,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
  };
}


export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(Number(id));
  const client = createClient();
  const recipeData = await client.getSingle("recipe_details");
  const homeData = await getHomeData();
  const similarRecipes = await getSimilarRecipes(id);

  if (!recipe) {
    notFound();
  }




  return (
    <div className="min-h-screen">
    {/* Hero image with title */}
    <RecipeHeroImage src={recipe.image} alt={recipe.title} />

      {/* Content */}
      <div className="px-6 lg:px-18 mx-auto py-10 space-y-8 md:w-full 2xl:max-w-[1600px]">
        {/* Ingredients */}
        <section>
          <h2 className="text-[24px] text-[#2C2B2B] font-bold mb-4">{recipeData.data.ingredients}</h2>
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
          <h2 className="text-[24px] text-[#2C2B2B] font-bold mb-4">{recipeData.data.instructions}</h2>
          {recipe.analyzedInstructions.length > 0 ? (
            <ol className="space-y-3">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number} className="flex items-start">
                  <span className="text-black rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 shrink-0"
                  aria-hidden="true">
                    {step.number}.
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
            <h2 className="text-[24px] text-[#2C2B2B] font-bold mb-4">{recipeData.data.summary}</h2>
            <p className="leading-relaxed">{stripHtml(recipe.summary)}</p>
            {recipe.readyInMinutes && (
              <p className="mt-2 text-sm text-gray-600">
                {recipeData.data.ready_in_minutes} {recipe.readyInMinutes} {recipeData.data.minutes}
              </p>
            )}
          </section>
        )}
        {similarRecipes.length > 0 && (
        <div className="mt-10 flex flex-col justify-center items-center  lg:items-start">
          <h2 className="text-[24px] text-[#2C2B2B] font-bold mb-4">{recipeData.data.similar_recipes}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
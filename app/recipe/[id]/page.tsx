import { getRecipeById } from "@/app/lib/getRecipeById";
import Image from "next/image";

type RecipePageProps = {
  params: Promise<{ id: string }>;
};

function stripHtml(input = "") {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(Number(id));

  return (
    <div className="min-h-screen">
    {/* Hero image with title */}
    <div className="relative w-full aspect-[21/9]">
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
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Ingredients */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
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
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
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
            <p className="text-gray-500">No instructions available.</p>
          )}
        </section>

        {/* Additional info */}
        {recipe.summary && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Informações Adicionais</h2>
            <p className="leading-relaxed">{stripHtml(recipe.summary)}</p>
            {recipe.readyInMinutes && (
              <p className="mt-2 text-sm text-gray-600">
                Ready in {recipe.readyInMinutes} minutes
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
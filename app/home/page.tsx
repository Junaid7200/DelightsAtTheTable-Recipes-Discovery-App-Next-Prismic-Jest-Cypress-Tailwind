import Hero from "../components/Hero";
import RecipeCard from "../components/PopularCard"
import RecentsCard from "../components/RecentsCard"
import { getRandomRecipeCards } from "../lib/getRecipes"


export default async function Home() {
    const cards = await getRandomRecipeCards({ number: 3, tags: ["vegetable"] });
    const recentCards = await getRandomRecipeCards({ number: 3, tags: ["dinner"] });

    return (
        <div>
            <Hero />
            {/* popular recipes section */}
        <div className="flex flex-col justify-center items-center p-6">
                <h1 className="text-3xl font-bold leading-tight">
                    Popular Recipes
                </h1>
            <div className="px-6 py-10">
                <div className="grid gap-50 sm:grid-cols-1 md:grid-cols-3">
                    {cards.map((c, i) => (
                <RecipeCard key={i} {...c} />
                ))}
                </div>
            </div>
        </div>
        {/* recent recipes section */}
        <div className="flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold leading-tight">
            Recent Recipes
        </h1>
        <div className="flex flex-col justify-center items-center gap-16 mt-16">
            {recentCards.map((c, i) => (
                <RecentsCard key={i} {...c} />
            ))}
        </div>
</div>
</div>  
    )
}
import { searchRecipes } from "@/app/lib/searchRecipes";
import PopularCard from "@/app/components/PopularCard";

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.q || "";
    const cards = query ? await searchRecipes(query) : [];

    return (
    <div className="flex flex-col items-center px-6 py-10 min-h-screen">
      {/* Search recipe section */}
        <section className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Search Recipes</h1>
        <form action="/search" method="get" className="w-full">
            <label className="relative block">
            <span className="sr-only">Search recipes</span>
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                </svg>
            </span>
            <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search for recipes..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-base placeholder-gray-400 shadow-sm focus:border-[#FFDB63] focus:outline-none focus:ring-2 focus:ring-[#FFDB63]/60"
            />
            </label>
        </form>
        </section>

      {/* Search results section */}
        <section className="mt-12 w-full max-w-7xl">
        {query ? (
            <>
            <h2 className="mb-6 text-2xl font-bold">
                Results for &ldquo;{query}&rdquo;
            </h2>
            {cards.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((c, i) => (
                        <PopularCard key={i} {...c} />
                ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No recipes found. Try a different search term.</p>
            )}
            </>
        ) : (
            <p className="text-center text-gray-500">Enter a search term to find recipes.</p>
        )}
        </section>
        <div className="grow">
        </div>
    </div>
    );
}
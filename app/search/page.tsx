import { searchRecipes } from "@/app/lib/searchRecipes";
import Card from "@/app/components/Card";
import { IoSearch } from "react-icons/io5";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.q || "";
    const cards = query ? await searchRecipes(query) : [];
    const client = createClient();
    const searchData = await client.getSingle("search_recipes");
    const homeData = await client.getSingle("home");


    return (
    <div className="flex flex-col items-center px-6 py-10 min-h-screen">
      {/* Search recipe section */}
        <section className="w-full max-w-4xl">
        <div className="text-3xl font-bold text-center mb-8">
            <PrismicRichText field={searchData.data.main_heading} />
        </div>
        <form action="/search" method="get" className="w-full">
            <label className="relative block">
            <span className="sr-only">Search recipes</span> {/* for visually disabled homies, outside the scope of this project I assume */}
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
                <IoSearch size={20} />
            </span>
            <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder={searchData.data.placeholder_text_for_search_bar ?? ""}
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
                {searchData.data.results_heading} &ldquo;{query}&rdquo;
            </h2>
            {cards.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((c, i) => (
                        <Card key={i} {...c} layout="vertical" buttonText={homeData.data.card_button_text} />
                ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">{searchData.data.no_recipes_found}</p>
            )}
            </>
        ) : (
            <p className="text-center text-gray-500">{searchData.data.text_when_no_search}</p>
        )}
        </section>
        <div className="grow">
        </div>
    </div>
    );
}
import { searchRecipes } from "@/app/lib/SearchRecipesPaginated";
import Card from "@/app/components/Card";
import { IoSearch } from "react-icons/io5";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { Metadata } from "next";

const RECIPES_PER_PAGE = 8;

type SearchPageProps = {
  searchParams: { q?: string; page?: string };
};


export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || "";
  if (query) {
    return {
      title: `Search results for "${query}"`,
      description: `Find recipes matching your search for ${query}.`,
    };
  }
  // Default for when there is no search query
  return {
    title: "Search Recipes",
    description: "Search for your next favorite recipe.",
  };
}



// ...existing code...
export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const userQuery = params.q || "";
    const page = Number(params.page) || 1;

    // If the user hasn't provided a query, we use a generic default to simulate "All Recipes".
    // The API requires a query, so we can't send an empty one.
    const effectiveQuery = userQuery || "Food";

    // Fetch API and Prismic data concurrently
    const [searchResponse, searchData, homeData] = await Promise.all([
        searchRecipes(effectiveQuery, page),
        createClient().getSingle("search_recipes"),
        createClient().getSingle("home"),
    ]);

    const { results: cards, totalResults } = searchResponse;

    // Determine if pagination buttons should be shown
    const hasNextPage = page * RECIPES_PER_PAGE < totalResults;
    const hasPrevPage = page > 1;

    return (
    <div className="flex flex-col items-center px-6 py-10 min-h-screen">
      {/* Search recipe section */}
        <section className="w-full max-w-3xl">
            {/* prismicrichtext below: */}
            <div className="mb-12 flex items-center justify-center gap-3 text-3xl font-bold text-[#2C2B2B]">
            <PrismicRichText field={searchData.data.main_heading}/>
            </div>
            <form action="/recipe" method="GET" className="flex items-center gap-2">
                <input
                    type="search"
                    name="q"
                    defaultValue={userQuery}
                    placeholder={searchData.data.placeholder_text_for_search_bar ?? "Search for recipes..."}
                    className="w-full rounded-full bg-[#F5F2F2] border-gray-100 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFDB63]/60 focus:border-transparent"
                />
            </form>
        </section>

      {/* Search results section */}
        <section className="mt-16 md:mt-32 w-full">
        {cards.length > 0 ? (
            <>
            {userQuery &&  
            <h2 className="mb-6 text-2xl font-bold">
            {`${searchData.data.results_heading} "${userQuery}"`}
            </h2>}
            {/* <h2 className="mb-6 text-2xl font-bold">
                {userQuery ? `${searchData.data.results_heading} "${userQuery}"` : (searchData.data.results_heading || "Foods")}
            </h2> */}
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-w-full">
            {cards.map((c: any) => (
                    <Card key={c.id} {...c} layout="vertical" buttonText={homeData.data.card_button_text ?? "View Recipe"} />
            ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-10 flex items-center justify-center gap-4">
                {hasPrevPage && (
                    <Link href={{ query: { q: userQuery, page: page - 1 } }} className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300">
                        Previous
                    </Link>
                )}
                {hasNextPage && (
                    <Link href={{ query: { q: userQuery, page: page + 1 } }} className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300">
                        Next
                    </Link>
                )}
            </div>
            </>
        ) : (
            <>
            {userQuery ? (
                <p className="text-center text-gray-500">{searchData.data.no_recipes_found}</p>
            ) : (
                <p className="text-center text-gray-500">Could not load recipes. Please try again later.</p>
            )}
            </>
        )}
        </section>
    </div>
    );
}
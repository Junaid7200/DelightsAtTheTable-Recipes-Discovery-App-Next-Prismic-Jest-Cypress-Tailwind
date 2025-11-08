import { searchRecipes } from "@/app/lib/SearchRecipesPaginated";
import Card from "@/app/components/Card";
import { IoSearch } from "react-icons/io5";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { Metadata } from "next";

const RECIPES_PER_PAGE = 6;

type SearchPageProps = {
  searchParams: { q?: string; page?: string };
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  // Correctly access the search query.
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";

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
          <PrismicRichText field={searchData.data.main_heading} />
        </div>
        <form
          action="/recipe"
          method="GET"
          className="flex justify-center items-center gap-2"
        >
          <label className="relative block w-full">
            <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-gray-400">
              <IoSearch size={20} aria-hidden="true" />
            </span>
            <input
              type="search"
              name="q"
              defaultValue={userQuery}
              placeholder={
                searchData.data.placeholder_text_for_search_bar ??
                "Search Recipe"
              }
              className="w-full rounded-full bg-[#F5F2F2] border border-gray-200/50 px-6 py-3.5 pl-14 text-base placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFDB63]/60 focus:border-transparent"
            />
          </label>
        </form>
      </section>

      {/* Search results section */}
      <section className="mt-16 md:mt-32 w-full">
        {cards.length > 0 ? (
          <>
            {userQuery && (
              <h2 className="mb-6 text-2xl font-bold">
                {`${searchData.data.results_heading} "${userQuery}"`}
              </h2>
            )}
            <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 min-w-full">
              {cards.map((c: any) => (
                <Card
                  key={c.id}
                  {...c}
                  layout="vertical"
                  buttonText={homeData.data.card_button_text ?? "View Recipe"}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-10 flex items-center justify-center gap-4">
              {hasPrevPage && (
                <Link
                  href={{ query: { q: userQuery, page: page - 1 } }}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-[#FFDB63]"
                >
                  {searchData.data.prev_button_text || "Previous"}
                </Link>
              )}
              {hasNextPage && (
                <Link
                  href={{ query: { q: userQuery, page: page + 1 } }}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-[#FFDB63]"
                >
                  {searchData.data.next_button_text || "Next"}
                </Link>
              )}
            </div>
          </>
        ) : (
          <>
            {userQuery ? (
              <p className="text-center text-gray-500">
                {searchData.data.no_recipes_found}
              </p>
            ) : (
              <p className="text-center text-gray-500">
                {searchData.data.no_recipes_found}
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

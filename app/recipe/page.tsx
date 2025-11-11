import { searchRecipes } from "@/app/lib/SearchRecipesPaginated";
import Card from "@/app/components/Card";
import Search from "@/app/components/Search";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { Metadata } from "next";

const RECIPES_PER_PAGE = 3;

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

  const effectiveQuery = userQuery || "Food";

  const [searchResponse, searchData, homeData] = await Promise.all([
    searchRecipes(effectiveQuery, page),
    createClient().getSingle("search_recipes"),
    createClient().getSingle("home"),
  ]);

  const { results: cards, totalResults } = searchResponse;

  const hasNextPage = page * RECIPES_PER_PAGE < totalResults;
  const hasPrevPage = page > 1;

  return (
    <div className="flex flex-col items-center px-6 py-10 max-w-[1440px] 2xl:max-w-[1600px] mx-auto">
      {/* Search recipe section */}
      <section className="w-full max-w-3xl">
        {/* prismicrichtext below: */}
        <div className="mb-12 flex items-center justify-center gap-3 text-3xl font-bold text-[#2C2B2B]">
          <PrismicRichText field={searchData.data.main_heading} />
        </div>
        <Search 
          placeholder={searchData.data.placeholder_text_for_search_bar ?? "Search Recipe"}
          defaultValue={userQuery}
          inputClassName="px-6 py-3.5 pl-14 text-base"
        />
      </section>

      {/* Search results section */}
      <section className="mt-16 md:mt-32 w-full">
        {cards.length > 0 ? (
          <>
            {userQuery && (
              <h2 className="mb-6 text-[40px] font-bold md:px-[10vw]">
                {`${searchData.data.results_heading} "${userQuery}"`}
              </h2>
            )}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:px-16">
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
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 md:hover:bg-[#FFDB63] active:bg-[#FFDB63]"
                >
                  {searchData.data.prev_button_text || "Previous"}
                </Link>
              )}
              {hasNextPage && (
                <Link
                  href={{ query: { q: userQuery, page: page + 1 } }}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 md:hover:bg-[#FFDB63] active:bg-[#FFDB63]"
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

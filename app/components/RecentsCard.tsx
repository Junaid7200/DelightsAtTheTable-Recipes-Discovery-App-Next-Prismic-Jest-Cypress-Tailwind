import Image from "next/image";
import type { RecipeCardProps } from "@/app/types/CardType";

export default function RecentsCard({ image, title, subtitle }: RecipeCardProps) {
  return (
    <article className="flex w-full items-stretch overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* left image (rounded only on the left) */}
      <div className="relative h-40 sm:h-44 md:h-48 w-44 sm:w-56 md:w-64 shrink-0 overflow-hidden rounded-l-2xl">
        <Image
          src={image}
          alt={`${title} image`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 256px"
        />
      </div>

      {/* right content */}
      <div className="flex flex-1 items-start rounded-r-2xl bg-[#F5F2EE] px-6 py-5">
        <div className="w-full">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{subtitle}</p>
          <button
            type="button"
            className="mt-4 inline-flex items-center rounded-full bg-[#FFDB63] px-4 py-2 text-sm font-semibold text-gray-900 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FFDB63]/60"
          >
            View Recipe
          </button>
        </div>
      </div>
    </article>
  );
}
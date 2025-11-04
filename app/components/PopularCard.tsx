import Image from "next/image";
import Link from "next/link";
import type { RecipeCardProps } from "@/app/types/CardType";

export default function RecipeCard({ id, image, title, subtitle, buttonText }: RecipeCardProps) {
  console.log("RecipeCard props:", { id, image, title, subtitle, buttonText });
    return (
    <article className="w-[340px] bg-[#F5F2EE] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      {/* image */}
    <div className="relative h-40 w-full">
        <Image
        src={image}
        alt={`${title} image`}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 50vw, 280px"
        />
    </div>

      {/* content */}
    <div className="space-y-3 bg-[#F5F2EE] px-5 py-5">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{subtitle}</p>
        {id ? (
          <Link href={`/recipe/${id}`}>
            <button className="mt-2 inline-flex items-center rounded-full bg-[#FFDB63] px-4 py-2 text-sm font-semibold text-gray-900">
              {buttonText || "View Recipe"}
            </button>
          </Link>
        ) : (
          <button className="mt-2 inline-flex items-center rounded-full bg-[#FFDB63] px-4 py-2 text-sm font-semibold text-gray-900">
            {buttonText || "View Recipe"}
          </button>
        )}
    </div>
    </article>
);
}
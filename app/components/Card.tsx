import Image from "next/image";
import Link from "next/link";
import type { RecipeCardProps } from "@/app/types/CardType";
import clsx from "clsx";

// Add layout to the props
interface EnhancedRecipeCardProps extends RecipeCardProps {
  layout?: 'vertical' | 'horizontal';
}

export default function RecipeCard({ id, image, title, subtitle, buttonText, layout = 'vertical' }: EnhancedRecipeCardProps) {
  const isHorizontal = layout === 'horizontal';
  console.log("RecipeCard props:", { id, image, title, subtitle, layout });

  return (
    <article className={clsx(
      "overflow-hidden rounded-2xl border border-gray-200 shadow-sm",
      isHorizontal ? "flex w-full items-stretch" : "w-[340px] bg-[#F5F2EE]"
    )}>
      {/* Image Section */}
      <div className={clsx(
        "relative shrink-0",
        isHorizontal 
          ? "h-40 sm:h-44 md:h-48 w-44 sm:w-56 md:w-64 rounded-l-2xl" 
          : "h-40 w-full"
      )}>
        <Image
          src={image || "/imgNotFound.jpg"}
          alt={`${title} image`}
          fill
          className="object-cover object-center"
          sizes={isHorizontal 
            ? "(max-width: 640px) 176px, (max-width: 768px) 224px, 256px" 
            : "(max-width: 768px) 50vw, 280px"
          }
        />
      </div>

      {/* Content Section */}
      <div className={clsx(
        "flex-1 bg-[#F5F2EE] px-5 py-5",
        isHorizontal && "rounded-r-2xl"
      )}>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">{subtitle}</p>
        
        <Link href={`/recipe/${id}`} className="mt-4 inline-block">
          <button className="inline-flex items-center rounded-full bg-[#FFDB63] px-4 py-2 text-sm font-semibold text-gray-900">
            {buttonText || "View Recipe"}
          </button>
        </Link>
      </div>
    </article>
  );
}
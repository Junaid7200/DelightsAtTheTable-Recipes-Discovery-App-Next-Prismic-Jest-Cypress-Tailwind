'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import type { RecipeCardProps } from "@/app/types/CardType";
import clsx from "clsx";
import placeholderImage from '@/public/imgNotFound.jpg';

// Add layout to the props
export interface EnhancedRecipeCardProps extends RecipeCardProps {
  layout?: 'vertical' | 'horizontal';
}

export default function RecipeCard({ id, image, title, subtitle, buttonText, layout = 'vertical' }: EnhancedRecipeCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [imageSrc, setImageSrc] = useState(image);

  useEffect(() => {
    setImageSrc(image);
  }, [image]);

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

const isHorizontal = layout === 'horizontal' && !isMobile;


  return (
    <article className={clsx(
      "overflow-hidden rounded-2xl border border-gray-200 shadow-sm",
      isHorizontal ? "flex md:min-w-[1187px] items-stretch md:min-h-[260px]" : "md:w-[410px] md:min-h-[480px] bg-[#F5F2EE]"
    )}>
      {/* Image Section */}
      <div className={clsx(
        "relative shrink-0",
        isHorizontal 
          ? "md:w-80 rounded-l-2xl" 
          : "h-50 w-full"
      )}>
        <Image
          src={imageSrc || "/imgNotFound.jpg"}
          alt={`${title} image`}
          fill
          onError={() => {
            setImageSrc(placeholderImage)
          }}
          className="object-cover object-center scale-110"
          sizes={isHorizontal 
            ? "(max-width: 640px) 176px, (max-width: 768px) 224px, 256px" 
            : "(max-width: 768px) 50vw, 280px"
          }
        />
      </div>

      {/* Content Section */}
      <div className={clsx(
        "flex-1 bg-[#F5F2EE] px-12 py-5",
        isHorizontal && "rounded-r-2xl"
      )}>
        <h3 className="mb-10 text-xl font-bold text-gray-900">{title}</h3>
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
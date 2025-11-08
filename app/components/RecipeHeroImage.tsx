// app/components/RecipeHeroImage.tsx
'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';

import placeholderImage from '@/public/imgNotFound.jpg'; // Import your placeholder

type HeroImageProps = {
  src: string | null | StaticImageData;
  alt: string;
};

export default function RecipeHeroImage({ src, alt }: HeroImageProps) {
  // Initialize state with the 'src' prop
  const [imageSrc, setImageSrc] = useState(src);

  // Reset imageSrc if the 'src' prop changes
  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <div className="relative w-full h-[710px] md:h-[360px] overflow-hidden">
      <Image
        // Use the state variable, fallback to placeholder
        src={imageSrc || placeholderImage}
        alt={alt}
        fill
        className="object-cover object-center"
        priority
        onError={() => {
          // If it fails, set state to the placeholder
          setImageSrc(placeholderImage);
        }}
      />
      {/* Overlay with Title */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
          {alt}
        </h1>
      </div>
    </div>
  );
}
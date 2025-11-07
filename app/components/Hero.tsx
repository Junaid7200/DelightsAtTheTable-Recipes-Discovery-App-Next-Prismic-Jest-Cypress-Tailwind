import { PrismicNextImage } from '@prismicio/next';
import { HomeDocument } from '@/prismicio-types';

export default function Hero({page}: {page: HomeDocument}) {
  // Access the first item in the hero_section group field.
  const heroData = page.data.hero_section[0];
  if (!heroData) {
    return null;
  }
  return (
    // 640px height on mobile view since i want it to be stretched in mobile view.
    <section className="relative w-full min-h-[640px] md:min-h-[560px] overflow-hidden">
      {/* two diff hero images depending on the screen size */}
      <PrismicNextImage
        field={heroData.background_hero_image_mobile}
        fill
        className="object-cover object-center"
      />
      {/* this hero image is for laptop and higher */}
      <PrismicNextImage
        field={heroData.background_hero_image}
        fill
        className="object-cover object-center hidden md:block"
      />

      {/* that black/40, the 40 is opacity, gotta keep the opacity low to add that dark overlay to the hero image. also, aria-hidden makes it so a screen read can't read this stuff (again, WCAG stuff)  */}
      <div className="absolute inset-0 bg-black/50" aria-hidden />

      {/* Centered content: simple absolute div so text is on top of the image and grid place-items-center to center it */}
      <div className="absolute inset-0 z-10 grid place-items-center px-6">
        <h1 className="max-w-5xl mx-auto text-center text-white text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          {heroData.hero_text}
        </h1>
      </div>
    </section>
  );
}
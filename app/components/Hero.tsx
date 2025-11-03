import Image from 'next/image';
import HeroSection from "@/public/Hero_image.png";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[480px] md:min-h-[560px] overflow-hidden">
      <Image
        src={HeroSection}
        alt="Breakfast table with waffles and berries"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40" aria-hidden />

      {/* Centered content */}
      <div className="absolute inset-0 z-10 grid place-items-center px-6">
        <h1 className="max-w-5xl mx-auto text-center text-white text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Get Inspired, Cook with passion and enjoy unforgettable moments at the table
        </h1>
      </div>
    </section>
  );
}
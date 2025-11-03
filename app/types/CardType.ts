import type { StaticImageData } from "next/image";

export type RecipeCardProps = {
    image: StaticImageData | string; // static import or /public path
    title: string;
    subtitle: string;
};
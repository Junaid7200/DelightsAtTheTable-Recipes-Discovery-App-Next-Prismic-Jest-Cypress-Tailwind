import type { StaticImageData } from "next/image";

export type RecipeCardProps = {
    id?: number;
    image: StaticImageData | string; // static import or /public path
    title: string;
    subtitle: string;
};
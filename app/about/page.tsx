import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("about_us").catch(() => null);

  return {
    title: page?.data.meta_title || "About Us",
    description: page?.data.meta_description || "Learn more about our project.",
  };
}

export default async function AboutPage() {
  const client = createClient();
  const page = await client.getSingle("about_us").catch(() => null);

  if (!page) {
    notFound();
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}

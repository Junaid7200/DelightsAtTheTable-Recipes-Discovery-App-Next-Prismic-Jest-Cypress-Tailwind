import { createClient } from '@/prismicio'
import { PrismicLink } from '@prismicio/react';

export default async function NotFound() {
  const client = createClient();
  const page = await client.getSingle('not_found');
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-4">{page?.data.main_heading}</h1>
      <p className="text-lg mb-6">{page?.data.paragraph_text}</p>
      <PrismicLink 
        field={page.data.button_link} 
        className="px-6 py-2 bg-[#bc971e] text-white font-semibold rounded-md hover:bg-[#a07c1e] transition-colors duration-300"
      >
        {page.data.button_text}
      </PrismicLink>
    </div>
  );
}
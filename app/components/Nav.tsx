import Link from 'next/link';
import { PrismicNextImage } from '@prismicio/next';
import { HomeDocument } from '@/prismicio-types';
import { asLink } from '@prismicio/client';
import { IoSearch } from "react-icons/io5";



export default function Nav({ page }: { page: HomeDocument }) {
  return (
    <nav className="w-full">
      <div className="bg-[#FFDB63] h-3 w-full" />
      <div className="bg-white grid grid-cols-3 items-center px-7 py-4">
        {/* Left: logo + brand */}
        <div className="flex items-center gap-4">
          <PrismicNextImage field={page.data.website_logo} width={40} height={40} />
          <span className="text-2xl font-bold">{page.data.website_name}</span>
        </div>

        {/* Center: menu */}
        <div className="justify-self-center flex items-center gap-10">
          {page.data.navbar_link.map((item) => (
            <Link key={item.navbar_link_text} href={asLink(item.navbar_link) || "www.google.com"} className="text-lg font-semibold hover:text-[#FFDB63] transition-colors">
              {item.navbar_link_text}
            </Link>
          ))}
        </div>

        {/* Right: search form */}
        <div className="justify-self-end">
          <form action="/search" method="get">
            <label className="relative block">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <IoSearch size={18} />
              </span>
              <input
                type="text"
                name="q"
                placeholder={page.data.nav_search_bar_placeholder || "Search recipes..."}
                className="w-64 rounded-full bg-gray-50 border border-gray-100 pl-10 pr-4 py-2 text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#FFDB63]/60 focus:border-transparent"
              />
            </label>
          </form>
        </div>
      </div>
    </nav>
  );
}
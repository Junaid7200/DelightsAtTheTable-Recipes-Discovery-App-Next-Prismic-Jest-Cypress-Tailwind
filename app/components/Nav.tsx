'use client';

import Link from 'next/link';
import { PrismicNextImage } from '@prismicio/next';
import { HomeDocument } from '@/prismicio-types';
import { asLink } from '@prismicio/client';
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { useState } from 'react';

export default function Nav({ page }: { page: HomeDocument }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log('Nav page data:', page.data);

  return (
    <nav className="w-full">
      {/* Top Yellow Bar */}
      <div className="bg-[#FFDB63] h-3 w-full" />

      {/* Main Navbar */}
      <div className="bg-white flex md:grid md:grid-cols-3 items-center justify-between px-7 py-4">
        
        {/* Left: logo + brand */}
        <div className="flex items-center gap-4">
          <PrismicNextImage field={page.data.website_logo} width={40} height={40} />
          {/* Hide text on mobile, show on medium+ */}
          <span className="text-2xl font-bold hidden md:block">{page.data.website_name}</span>
        </div>

        {/* Center: menu (Desktop) */}
        <div className="justify-self-center hidden md:flex items-center gap-10">
          {page.data.navbar_link.map((item) => (
            <Link key={item.navbar_link_text} href={asLink(item.navbar_link) || "www.google.com"} className="text-lg font-semibold hover:text-[#FFDB63] transition-colors">
              {item.navbar_link_text}
            </Link>
          ))}
        </div>

        {/* Right: search form (Desktop) */}
        <div className="justify-self-end hidden md:block">
          <form action="/recipe" method="get">
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

        {/* Hamburger Button (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <IoMenu size={32} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Top Bar */}
        <div className="bg-[#FFDB63] h-3 w-full" />

        {/* Drawer Header (Logo + Close Button) */}
        <div className="flex items-center justify-between px-7 py-4">
          <div className="flex items-center gap-4">
            <PrismicNextImage field={page.data.website_logo} width={40} height={40} />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <IoClose size={32} />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col items-center gap-8 mt-16">
          {page.data.navbar_link.map((item) => (
            <Link
              key={item.navbar_link_text}
              href={asLink(item.navbar_link) || "www.google.com"}
              className="text-2xl font-semibold hover:text-[#FFDB63] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              {item.navbar_link_text}
            </Link>
          ))}
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-16 px-7">
          <form action="/recipe" method="get">
            <label className="relative block">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <IoSearch size={18} />
              </span>
              <input
                type="text"
                name="q"
                placeholder={page.data.nav_search_bar_placeholder || "Search recipes..."}
                className="w-full rounded-full bg-gray-50 border border-gray-100 pl-10 pr-4 py-2 text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#FFDB63]/60 focus:border-transparent"
              />
            </label>
          </form>
        </div>
      </div>
    </nav>
  );
}
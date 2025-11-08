'use client';
import { PrismicNextImage } from '@prismicio/next'; // prismic library to get the special image component from there
import { HomeDocument } from '@/prismicio-types'; // whatever custom types I make in 9999 server in prismic, a typescript type for it is created in prismicio-types.d.ts
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";  // simple icons for search icon, hamburger menu, and the cross to close
import { useState } from 'react'; // ganna need useState for the mobile menu
import { PrismicLink } from '@prismicio/react';

export default function Nav({ page }: { page: HomeDocument }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  // mobile menu is not open initially

  return (
    // using the semantic nav tag
    <nav className="w-full"> 
      {/* Top Yellow Bar */}
      <div className="bg-[#FFDB63] h-[30px] w-full" />

      {/* Main Navbar: ganna need a simple grid with 3 columns */}
      <div className='bg-white h-[110px]  py-[34px]'>
      <div className="flex px-5 md:px-0 max-w-[1285px] mx-auto my-0 md:grid md:grid-cols-3 items-center justify-between">
        
        {/* Left: logo + website name: the website name needs to be hidden for mobile view but block (visible) for md or bigger. other then that, this just needs to be horizontal so flex will do */}
        <PrismicLink href="/" className="flex items-center gap-4 md:justify-self-start" aria-label="Homepage">
          <PrismicNextImage field={page.data.website_logo} width={28} height={26} />
          {/* Hide text on mobile, show on medium+ */}
          <span className="text-2xl hidden md:block">{page.data.website_name}</span>
        </PrismicLink>

        {/* Center: menu: the whole thing needs to be hidden in mobile view, in md or higher view its a very simple flex with some gap */}
        <div className="justify-self-center hidden md:flex items-center gap-10">
          {page.data.navbar_link.map((item) => (
            <PrismicLink key={item.navbar_link_text} field={item.page_link} className="text-lg font-semibold hover:text-[#FFDB63] transition-colors">
              {item.navbar_link_text}
            </PrismicLink>
          ))}
        </div>

        {/* Right: search form: again, this should be hidden for mobile view and in md or higher it just needs to be at the end of the parent flex div */}
        <div className="justify-self-end hidden md:block">
          <form action="/recipe" method="get">
          {/* simple relative parent and absolute child trick to get the magnifying glass inside the main div. btw the icon and input are wrapped in label instead of div because of semantic tags, its better to associate label with input even if the input is literally a child of the label */}
            <label className="relative block">
              {/* pointer-even-none so the click passes through the icon and hits the input field */}
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <IoSearch size={18} aria-hidden="true" />
              </span>
              <input
                type="text"
                name="q"
                placeholder={page.data.nav_search_bar_placeholder || "Search recipes..."}
                className="w-64 h-[45px] rounded-full bg-[#F5F2F2] border border-gray-100 pl-10 pr-4 py-2 text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#FFDB63]/60 focus:border-transparent"
              />
            </label>
          </form>
        </div>

        {/* Hamburger Button: completly hidden in md or higher views and will use the state we made above to true when we click it (open the mobile menu basically) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            // aria-labels are just to follow the WCAG
            aria-label="Open navigation menu"
          >
            <IoMenu size={32} aria-hidden="true"/>
          </button>
        </div>
      </div>
      </div>


      {/* Mobile Menu Drawer: this only appears when the onClick even on the hamburger works, this menu needs to open then, so ganna use a ternary with the state */}
      <div
      // fixed to make this drawer float on top of the home page and then full widght and hight and top and left 0 to make it cover the entire browser window. also fixed elements don't move even when you scroll. transform enables transformation and translate-x-0 means to move the element 0% horizontally (it should be fully visible) and translate-x-full means to move the element 100% horizontally so its invisible basically 
        className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Top Bar */}
        <div className="bg-[#FFDB63] h-3 w-full" />

        {/* Drawer Header (Logo + Close Button): a simple flex div with  */}
        <div className="flex items-center justify-between px-7 py-4">
            <PrismicNextImage field={page.data.website_logo} width={40} height={40} />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <IoClose size={32} aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Links: 3 simple links and texts from prismic in a flex-col */}
        <div className="flex flex-col items-center gap-8 mt-16">
          {page.data.navbar_link.map((item) => (
            <PrismicLink
              key={item.navbar_link_text}
              field={item.page_link}
              className="text-2xl font-semibold hover:text-[#FFDB63] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              {item.navbar_link_text}
            </PrismicLink>
          ))}
        </div>

        {/* Mobile Search Bar: almost the same thing as the first search bar, this one is just in the mobile drawer thats the only difference, could make a component to reduce redundancy here */}
        <div className="mt-16 px-7">
          <form action="/recipe" method="get">
            <label className="relative block">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <IoSearch size={18} aria-hidden="true" />
              </span>
              <input
                type="text"
                name="q"
                placeholder={page.data.nav_search_bar_placeholder || "Search recipes..."}
                className="w-full rounded-full bg-[#F5F2F2] border border-gray-100 pl-10 pr-4 py-2 text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#FFDB63]/60 focus:border-transparent"
              />
            </label>
          </form>
        </div>
      </div>
    </nav>
  );
}
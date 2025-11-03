// ...existing code...
import Image from 'next/image';
import logo from "@/public/logo.svg";

export default function Nav() {
  return (
    <nav className="w-full">
      <div className="bg-[#FFDB63] h-5 w-full" />
      <div className="bg-white grid grid-cols-3 items-center px-7 py-4">
        {/* Left: logo + brand */}
        <div className="flex items-center gap-4">
          <Image src={logo} alt="Recipe App Logo" width={40} height={40} />
          <span className="text-2xl">Delícias à Mesa</span>
        </div>

        {/* Center: menu (perfectly centered) */}
        <div className="justify-self-center flex items-center gap-10">
          <span className="text-lg font-semibold">Home</span>
          <span className="text-lg font-semibold">Receitas</span>
          <span className="text-lg font-semibold">Sobre nós</span>
        </div>

        {/* Right: search */}
        <div className="justify-self-end">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search Recipe"
              className="w-64 rounded-full bg-gray-50 border border-gray-100 pl-10 pr-4 py-2 text-sm placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-[#FFDB63]/60 focus:border-transparent"
            />
          </label>
        </div>
      </div>
    </nav>
  );
}
// ...existing code...
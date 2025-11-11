import { IoSearch } from "react-icons/io5";

// A reusable skeleton card component
const SkeletonCard = () => (
  <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-6">
      <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
    </div>
  </div>
);

export default function Loading() {
  return (
    <div className="flex flex-col items-center px-6 py-10 min-h-screen max-w-[1440px] 2xl:max-w-[1600px] mx-auto">
      {/* Skeleton Search Bar */}
      <section className="w-full max-w-3xl">
        <div className="mb-12 h-9 w-1/2 mx-auto bg-gray-200 rounded animate-pulse"></div>
        <div className="relative block w-full">
          <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-gray-400">
            <IoSearch size={20} />
          </span>
          <div className="w-full rounded-full bg-gray-200 h-[50px] animate-pulse"></div>
        </div>
      </section>

      {/* Skeleton Search Results */}
      <section className="mt-16 md:mt-32 w-full">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 md:px-16 min-w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
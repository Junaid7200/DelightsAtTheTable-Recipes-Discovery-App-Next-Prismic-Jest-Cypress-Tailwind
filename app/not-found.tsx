// filepath: j:\Work\Career\Techloset - BootCampWise\Dev\recipe_app\app\not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Sorry, the page you are looking for doesn't exist</p>
      <Link href="/" className="px-6 py-2 bg-[#bc971e] text-white font-semibold rounded-md hover:bg-opacity-90">
        Return Home
      </Link>
    </div>
  );
}
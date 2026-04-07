import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <ChefHat size={64} className="text-rust-200 mb-6" />
      <h1 className="font-serif font-bold text-4xl text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Looks like this recipe went missing from the kitchen. Let&apos;s get you back on track.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="bg-rust-500 hover:bg-rust-600 text-white font-medium px-6 py-3 rounded-xl transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/recipes"
          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium px-6 py-3 rounded-xl transition-colors"
        >
          Browse Recipes
        </Link>
      </div>
    </div>
  );
}

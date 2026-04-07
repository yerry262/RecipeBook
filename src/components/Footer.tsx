import Link from 'next/link';

const categories = [
  { href: '/category/breakfast', label: 'Breakfast' },
  { href: '/category/lunch', label: 'Lunch' },
  { href: '/category/dinner', label: 'Dinner' },
  { href: '/category/dessert', label: 'Dessert' },
  { href: '/category/drinks', label: 'Drinks' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-orange-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📖</span>
              <div>
                <div className="font-serif font-bold text-rust-700 leading-none">Jerry &amp; Krista&apos;s</div>
                <div className="text-xs text-rust-500 font-medium">Recipe Book</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              A collection of our favorite family recipes, made with love and shared with joy.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-500 hover:text-rust-600 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-rust-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-sm text-gray-500 hover:text-rust-600 transition-colors">
                  All Recipes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-orange-100 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Jerry &amp; Krista&apos;s Recipe Book. Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}

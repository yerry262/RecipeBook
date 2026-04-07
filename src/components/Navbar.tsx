'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import SearchModal from './SearchModal';

const categories = [
  { href: '/category/breakfast', label: 'Breakfast', emoji: '🍳' },
  { href: '/category/lunch', label: 'Lunch', emoji: '🥗' },
  { href: '/category/dinner', label: 'Dinner', emoji: '🍽️' },
  { href: '/category/dessert', label: 'Dessert', emoji: '🍰' },
  { href: '/category/drinks', label: 'Drinks', emoji: '🥤' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-2xl">📖</span>
              <div className="leading-tight">
                <div className="font-serif font-bold text-rust-700 text-sm sm:text-base leading-none">
                  Jerry &amp; Krista&apos;s
                </div>
                <div className="text-xs text-rust-500 font-medium tracking-wide">Recipe Book</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-rust-600 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/recipes"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-rust-600 rounded-lg hover:bg-orange-50 transition-colors"
              >
                All Recipes
              </Link>

              {/* Categories dropdown */}
              <div className="relative" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-rust-600 rounded-lg hover:bg-orange-50 transition-colors">
                  Categories
                  <ChevronDown size={14} className={`transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {categoriesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-orange-100 py-2 z-50">
                    {categories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-rust-600 transition-colors"
                      >
                        <span>{cat.emoji}</span>
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-rust-600 hover:bg-orange-50 rounded-lg transition-colors"
                aria-label="Search recipes"
              >
                <Search size={20} />
              </button>

              {/* Auth */}
              {session ? (
                <div className="hidden sm:flex items-center gap-2">
                  {session.user?.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? 'User'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-gray-600 hover:text-rust-600 font-medium transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn('google')}
                  className="hidden sm:flex items-center gap-2 bg-rust-500 hover:bg-rust-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Sign in
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-rust-600 rounded-lg transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-orange-100 bg-white px-4 py-4 space-y-1">
            <Link href="/" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-rust-600 rounded-lg hover:bg-orange-50" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/recipes" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-rust-600 rounded-lg hover:bg-orange-50" onClick={() => setMobileOpen(false)}>
              All Recipes
            </Link>
            <div className="pt-1 pb-1">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-rust-600 rounded-lg hover:bg-orange-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{cat.emoji}</span> {cat.label}
                </Link>
              ))}
            </div>
            {session ? (
              <div className="pt-2 border-t border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {session.user?.image && (
                    <Image src={session.user.image} alt="User" width={28} height={28} className="rounded-full" />
                  )}
                  <span className="text-sm text-gray-700">{session.user?.name}</span>
                </div>
                <button onClick={() => signOut()} className="text-sm text-rust-600 font-medium">Sign out</button>
              </div>
            ) : (
              <button
                onClick={() => { signIn('google'); setMobileOpen(false); }}
                className="w-full mt-2 bg-rust-500 text-white text-sm font-medium py-2.5 rounded-lg"
              >
                Sign in with Google
              </button>
            )}
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

import Link from 'next/link';
import React from 'react';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <header className="bg-black sticky top-0 z-10">
      <nav className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center p-4 font-bold max-w-6xl mx-auto text-white">
        <Link
          href="/"
          className="text-2xl sm:text-3xl text-center whitespace-nowrap"
        >
          Image Gallery
        </Link>

        <SearchBar />
      </nav>
    </header>
  );
}

'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import useScrollTop from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const scrolled = useScrollTop();
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  return (
    <header
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
      className={cn(
        'z-50 fixed top-0 left-0 w-full p-4 bg-primary/90 transition-all ease-in duration-300',
        scrolled && !isMouseEnter && 'opacity-30',
      )}
    >
      <nav className="flex items-center justify-between mx-auto">
        <Link href="/" className="text-lg font-bold text-white sm:text-xl">
          이미지 찾기
        </Link>

        <SearchBar />
      </nav>
    </header>
  );
}

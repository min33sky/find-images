'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;

    router.push(`/results/${keyword}`);
    // setKeyword('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어 입력"
        className="bg-white/80 p-2 pl-8 w-[200px] sm:w-48 text-lg "
      />
    </form>
  );
}

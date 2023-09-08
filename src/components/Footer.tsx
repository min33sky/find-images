import Link from 'next/link';
import React from 'react';

interface FooterProps {
  keyword: string;
  page: string | undefined;
  prevPage: string | null;
  nextPage: string | null;
}

export default function Footer({
  keyword,
  page,
  prevPage,
  nextPage,
}: FooterProps) {
  if (!prevPage && !nextPage) return;

  const pageNums: number[] = [];
  if (prevPage && nextPage) {
    for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
      pageNums.push(i);
    }
  }

  const nextPageArea = nextPage ? (
    <Link
      href={`/results/${keyword}/${nextPage}`}
      className={!prevPage ? 'mx-auto' : ''}
    >
      {!prevPage ? 'more' : null} &gt;&gt;&gt;
    </Link>
  ) : null;

  const prevPageArea = prevPage ? (
    <>
      <Link
        href={`/results/${keyword}/${nextPage}`}
        className={!nextPage ? 'mx-auto' : ''}
      >
        &lt;&lt;&lt; {!nextPage ? 'back' : null}
      </Link>

      {pageNums.map((num, i) =>
        page && num === parseInt(page) ? (
          <span key={i}>{num}</span>
        ) : (
          <Link
            key={i}
            href={`/results/${keyword}/${num}`}
            className="underline"
          >
            {num}
          </Link>
        ),
      )}
    </>
  ) : null;

  return (
    <footer className="flex flex-row justify-between items-center px-2 py-4 font-bold w-60 mx-auto">
      {prevPageArea}
      {nextPageArea}
    </footer>
  );
}

'use client';

import { ImagesResults, Photo } from '@/schemes/images';
import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { LoaderIcon } from 'lucide-react';
import ImageContainer from './image-container';

interface ImagesClientProps {
  initData: ImagesResults;
  keyword?: string;
}

/**
 * 무한 스크롤링을 위한 이미지들을 처리할 클라이언트
 */
export default function ImagesClient({ initData, keyword }: ImagesClientProps) {
  const { inView, ref } = useInView();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['images', keyword ? keyword : 'curated'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        keyword
          ? `https://api.pexels.com/v1/search?query=${keyword}&page=${pageParam}`
          : `https://api.pexels.com/v1/curated?page=${pageParam}&per_page=20`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
          },
        },
      );

      const images = (await res.json()) as ImagesResults;

      return images;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next_page ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: {
      pages: [initData],
      pageParams: [1],
    },
  });

  // console.log('data: ', data);
  // console.log('hasNextPage: ', hasNextPage);

  const photos = data?.pages.flatMap((page) => page.photos) ?? [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      {/* Masonry UI를 위해 Grid Rows를 10px로 잘게 나눠서 설정한다. */}
      <section className="mt-24 px-1 my-3 grid grid-cols-auto-fit md:auto-rows-[10px] gap-2 md:gap-0 select-none">
        {photos.map((photo) => (
          <ImageContainer key={photo.id} photo={photo} />
        ))}
      </section>

      {/* Loading Bar */}
      {hasNextPage && (
        <div ref={ref} className="w-full flex items-center justify-center">
          <LoaderIcon className="w-20 h-20 animate-spin text-primary" />
        </div>
      )}
    </>
  );
}

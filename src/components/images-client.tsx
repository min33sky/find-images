'use client';

import { ImagesResults, Photo } from '@/schemes/images';
import React from 'react';
import ImageContainer from './image-container';
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchCuratedImages from '@/lib/fetch-curated-images';
import { Button } from './ui/button';

interface ImagesClientProps {
  photosWithBlur: Photo[];
  initData: ImagesResults;
}

export default function ImagesClient({
  photosWithBlur,
  initData,
}: ImagesClientProps) {
  console.log('초기 데이터: ', initData);

  // TODO: infinite scroll

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['images', 'curated'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `https://api.pexels.com/v1/curated?page=${pageParam}&per_page=20`,
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

  console.log('data: ', data);
  console.log('hasNextPage: ', hasNextPage);

  const photos = data?.pages.flatMap((page) => page.photos) ?? [];

  return (
    <>
      <section className="mt-24 px-1 my-3 grid grid-cols-auto-fit md:auto-rows-[10px] gap-2 md:gap-0 select-none">
        {photos.map((photo) => (
          <ImageContainer key={photo.id} photo={photo} />
        ))}
        <Button onClick={() => fetchNextPage()}>다음</Button>
      </section>
    </>
  );
}

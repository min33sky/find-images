'use client';

import { ImagesResults, Photo } from '@/schemes/images';
import React from 'react';
import ImageContainer from './image-container';
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchCuratedImages from '@/lib/fetch-curated-images';
import { Button } from './ui/button';

interface ImagesClientProps {
  photosWithBlur: Photo[];
  nextPage?: boolean;
}

export default function ImagesClient({
  photosWithBlur,
  nextPage,
}: ImagesClientProps) {
  // TODO: infinite scroll

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['images', 'curated'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `https://api.pexels.com/v1/curated?page=${pageParam}&per_page=15`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
          },
        },
      );

      const images = await res.json();

      console.log('이미지: ', images);

      return images.photos;
    },
    getNextPageParam: (lastPage, pages) => {
      console.log('pages: ', pages, pages.length);
      console.log('next_page: ', nextPage);

      // return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
    initialData: {
      pages: [photosWithBlur],
      pageParams: [1],
    },
  });

  console.log('hasNextPage: ', hasNextPage);

  const photos = data?.pages.flatMap((page) => page) ?? photosWithBlur;

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

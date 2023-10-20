'use client';

import { ImagesResults, Photo } from '@/schemes/images';
import React from 'react';
import ImageContainer from './image-container';

interface ImagesClientProps {
  photosWithBlur: Photo[];
}

export default function ImagesClient({ photosWithBlur }: ImagesClientProps) {
  // TODO: infinite scroll

  return (
    <>
      <section className="mt-24 px-1 my-3 grid grid-cols-auto-fit md:auto-rows-[10px] gap-2 md:gap-0 select-none">
        {photosWithBlur.map((photo) => (
          <ImageContainer key={photo.id} photo={photo} />
        ))}
      </section>
    </>
  );
}

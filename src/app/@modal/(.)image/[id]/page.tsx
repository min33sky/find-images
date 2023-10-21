import ImageModal from '@/components/modals/image-modal';
import fetchImage from '@/lib/fetch-image';
import { notFound } from 'next/navigation';
import React from 'react';

interface ImageModalPageProps {
  params: {
    id: string;
  };
}

export default async function ImageModalPage({
  params: { id },
}: ImageModalPageProps) {
  const image = await fetchImage(parseInt(id));

  if (!image) {
    return notFound();
  }

  return <ImageModal image={image} />;
}

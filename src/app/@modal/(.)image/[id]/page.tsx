import ImageModal from '@/components/image-modal';
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

  console.log('#### 모달 이미지: ', image);

  if (!image) {
    return notFound();
  }

  return <ImageModal image={image} />;
}

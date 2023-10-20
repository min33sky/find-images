import React from 'react';
import Image from 'next/image';
import fetchImage from '@/lib/fetch-image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ImageIdPageProps {
  params: {
    id: string;
  };
}

export default async function ImageIdPage({
  params: { id },
}: ImageIdPageProps) {
  const image = await fetchImage(parseInt(id));

  console.log('#### 하핳하하하핳하: ', image);

  if (!image) {
    return notFound();
  }

  return (
    <div className="h-full overflow-auto flex flex-col md:flex-row pt-24 pb-24 gap-4 w-full max-w-2xl mx-auto px-2 sm:px-0">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <Image
          src={image.src.large}
          alt={image.alt}
          fill
          // width={image.width}
          // height={image.height}
          // sizes="250px"
          // placeholder="blur"
          // blurDataURL={photo.blurredDataUrl}
          className=" object-cover"
        />
      </div>

      <div className="flex shrink-0">
        <Button asChild>
          <Link href={image.url} target="_blank" rel="noopener noreferrer">
            원본 이미지 링크
          </Link>
        </Button>
      </div>
    </div>
  );
}

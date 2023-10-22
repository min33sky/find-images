import fetchSearchImages from '@/lib/fetch-search-images';
import { ImagesResults, Photo } from '@/schemes/images';
import { Metadata } from 'next';
import React from 'react';
import addBlurredDataUrls from '@/lib/getBase64';
import { ImageOffIcon } from 'lucide-react';
import ImagesClient from '@/components/images/images-client';

interface Props {
  params: {
    search: (string | undefined)[];
  };
}

export function generateMetadata({ params: { search } }: Props): Metadata {
  const keyword = search?.[0] ?? 'curated';
  const page = search?.[1] ?? '1';

  return {
    title: `Results for ${keyword} - Page ${page}`,
  };
}

export default async function SearchResultsPage({ params: { search } }: Props) {
  const keyword = search?.[0] ?? 'curated';
  const page = search?.[1] ?? '1';

  const searchImages = await fetchSearchImages(keyword, parseInt(page));

  if (!searchImages || searchImages.photos.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 ">
        <ImageOffIcon className="w-24 h-24" />
        <h2 className="font-bold text-lg">
          조건에 맞는 이미지를 찾지 못했습니다.
        </h2>
      </div>
    );

  //? 기존의 이미지 데이터에 블러 처리된 이미지 데이터를 추가
  const photosWithBlur: Photo[] = await addBlurredDataUrls(searchImages);

  const initData: ImagesResults = {
    ...searchImages,
    photos: photosWithBlur,
  };

  return <ImagesClient initData={initData} keyword={keyword} />;
}

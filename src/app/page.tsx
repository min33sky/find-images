import Gallery from '@/components/gallery';
import ImagesClient from '@/components/images-client';
import fetchCuratedImages from '@/lib/fetch-curated-images';
import addBlurredDataUrls from '@/lib/getBase64';
import { Photo } from '@/schemes/images';
import { ImageOffIcon } from 'lucide-react';

interface HomeProps {
  searchParams: {
    // keyword?: string;
    page?: string;
  };
}

export default async function Home({
  searchParams: { page = '1' },
}: HomeProps) {
  const images = await fetchCuratedImages(parseInt(page));
  console.log('images: ', images);

  if (!images || images.per_page === 0)
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 ">
        <ImageOffIcon className="w-24 h-24" />
        <h2 className="font-bold text-lg">
          조건에 맞는 이미지를 찾지 못했습니다.
        </h2>
      </div>
    );

  // 기존의 이미지 데이터에 블러 처리된 이미지 데이터를 추가
  const photosWithBlur: Photo[] = await addBlurredDataUrls(images);

  // return <div>테스트</div>;
  return <ImagesClient photosWithBlur={photosWithBlur} />;
}

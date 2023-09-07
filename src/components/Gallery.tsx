import fetchImages from '@/lib/fetchImages';
import { ImagesResults } from '@/schemes/images';
import ImageContainer from './image-container';
import addBlurredDataUrls from '@/lib/getBase64';

interface GalleryProps {
  keyword?: string;
}

export default async function Gallery({ keyword }: GalleryProps = {}) {
  const url = !keyword
    ? 'https://api.pexels.com/v1/curated'
    : `https://api.pexels.com/v1/search?query=${keyword}`;

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;

  // 기존의 이미지 데이터에 블러 처리된 이미지 데이터를 추가
  const photosWithBlur = await addBlurredDataUrls(images);

  return (
    <section className="px-1 my-3 grid grid-cols-auto-fit md:auto-rows-[10px] gap-2 md:gap-0">
      {photosWithBlur.map((photo) => (
        <ImageContainer key={photo.id} photo={photo} />
      ))}
    </section>
  );
}

import fetchImages from '@/lib/fetch-images';
import { ImagesResults } from '@/schemes/images';
import ImageContainer from './images/image-container';
import addBlurredDataUrls from '@/lib/getBase64';
import Footer from './footer';
import getPrevNextPages from '@/lib/getPrevNextpages';
import { ImageOffIcon } from 'lucide-react';

interface GalleryProps {
  keyword?: string;
  page?: string;
}

export default async function Gallery({
  keyword = 'curated',
  page,
}: GalleryProps = {}) {
  let url;

  if (keyword === 'curated' && page) {
    // browsing beyond home
    url = `https://api.pexels.com/v1/curated?page=${page}`;
  } else if (keyword === 'curated') {
    // home
    url = 'https://api.pexels.com/v1/curated';
  } else if (!page) {
    // 1st page of search results
    url = `https://api.pexels.com/v1/search?query=${keyword}`;
  } else {
    // search result beyond 1st page
    url = `https://api.pexels.com/v1/search?query=${keyword}&page=${page}`;
  }

  const images: ImagesResults | undefined = await fetchImages(url);

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
  const photosWithBlur = await addBlurredDataUrls(images);

  const { prevPage, nextPage } = getPrevNextPages(images);

  return (
    <>
      <section className="mt-24 px-1 my-3 grid grid-cols-auto-fit md:auto-rows-[10px] gap-2 md:gap-0 select-none">
        {photosWithBlur.map((photo) => (
          <ImageContainer key={photo.id} photo={photo} />
        ))}
      </section>

      {/* Footer */}
      <Footer
        keyword={keyword}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </>
  );
}

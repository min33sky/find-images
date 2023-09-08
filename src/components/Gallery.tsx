import fetchImages from '@/lib/fetchImages';
import { ImagesResults } from '@/schemes/images';
import ImageContainer from './image-container';
import addBlurredDataUrls from '@/lib/getBase64';
import Footer from './Footer';
import getPrevNextPages from '@/lib/getPrevNextpages';

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
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;

  // 기존의 이미지 데이터에 블러 처리된 이미지 데이터를 추가
  const photosWithBlur = await addBlurredDataUrls(images);

  const { prevPage, nextPage } = getPrevNextPages(images);

  return (
    <>
      <section className="px-1 my-3 grid grid-cols-auto-fit md:auto-rows-[10px] gap-2 md:gap-0">
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

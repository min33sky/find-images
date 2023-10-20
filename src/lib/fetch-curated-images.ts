import { ImagesSchemaWithPhotos, type ImagesResults } from '@/schemes/images';

export default async function fetchCuratedImages(page: number = 1) {
  const res = await fetch(`https://api.pexels.com/v1/curated?page=${page}`, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch images');

  const imagesResults: ImagesResults = await res.json();

  const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);

  return parsedData;
}

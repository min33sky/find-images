import { ImagesSchemaWithPhotos, type ImagesResults } from '@/schemes/images';

export default async function fetchCuratedImages(page: number = 1) {
  try {
    const res = await fetch(`https://api.pexels.com/v1/curated?page=${page}`, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch images');

    const imagesResults: ImagesResults = await res.json();

    const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);

    if (parsedData.total_results === 0) return undefined;

    return parsedData;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }
  }
}

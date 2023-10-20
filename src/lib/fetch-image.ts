import { ImagesSchemaWithPhotos, type ImagesResults } from '@/schemes/images';
import { PexelImage } from './types';

export default async function fetchImage(imageId: number) {
  try {
    const res = await fetch(`https://api.pexels.com/v1/photos/${imageId}`, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch image');

    const result = (await res.json()) as PexelImage;

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }
  }
}

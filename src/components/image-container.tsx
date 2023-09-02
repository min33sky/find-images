import { Photo } from '@/schemes/images';
import Image from 'next/image';

interface ImageContainerProps {
  photo: Photo;
}

export default function ImageContainer({
  photo,
}: ImageContainerProps): JSX.Element {
  return (
    <div key={photo.id} className="h-64 bg-gray-200 rounded-xl">
      <Image src={photo.src.large} alt={photo.alt} width={250} height={250} />
    </div>
  );
}

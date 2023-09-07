import { Photo } from '@/schemes/images';
import Image from 'next/image';
import Link from 'next/link';

interface ImageContainerProps {
  photo: Photo;
}

export default function ImageContainer({ photo }: ImageContainerProps) {
  const widthHeightRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(250 * widthHeightRatio); //? 250은 tailwind grid-template-columns의 값을 250px로 설정했기 때문에 250으로 설정해놔서
  const photoSpans = Math.ceil(galleryHeight / 10) + 1; //? grid-auto-rows: 10px; 이기 때문에 10으로 나눠준다. 여백을 더 주기 위해서 1을 더해줌

  return (
    <div
      className="w-full md:w-[250px] justify-self-center"
      style={{ gridRow: `span ${photoSpans}` }} // 이미지가 세로로 몇 줄을 차지할지 설정
    >
      <Link
        href={photo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="grid place-content-center"
      >
        <div className="group rounded-xl overflow-hidden">
          <Image
            src={photo.src.large}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="250px"
            placeholder="blur"
            blurDataURL={photo.blurredDataUrl}
            className="object-cover group-hover:opacity-75"
          />
        </div>
      </Link>
    </div>
  );
}

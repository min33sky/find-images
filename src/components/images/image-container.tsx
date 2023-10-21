import { Photo } from '@/schemes/images';
import Image from 'next/image';
import Link from 'next/link';

interface ImageContainerProps {
  photo: Photo;
}

/**
 * 이미지가 세로로 몇 줄을 차지할지 설정하며 랜더링을 하는 컴포넌트
 */
export default function ImageContainer({ photo }: ImageContainerProps) {
  const widthHeightRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(250 * widthHeightRatio); //? 250은 tailwind grid-template-columns의 값을 250px로 설정했기 때문에 250으로 설정해놔서
  const photoSpans = Math.ceil(galleryHeight / 10) + 1; //? grid-auto-rows: 10px;로 설정했기 때문에 10으로 나눠준다. 여백을 더 주기 위해서 1을 더해줌

  return (
    <div
      className="w-full md:w-[250px] justify-self-center"
      style={{ gridRow: `span ${photoSpans}` }} // 이미지가 세로로 몇 줄을 차지할지 설정
    >
      <Link
        href={`/image/${photo.id}`}
        className="grid place-content-center shadow-lg"
      >
        <div className="group rounded-xl overflow-hidden">
          <Image
            src={photo.src.large}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="250px"
            placeholder="blur"
            blurDataURL={
              photo.blurredDataUrl ||
              'data:image/webp;base64,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'
            }
            className="object-cover group-hover:opacity-75"
          />
        </div>
      </Link>
    </div>
  );
}

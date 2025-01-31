'use client';

import StatusPlaceholder from '@/components/placeholder/StatusPlaceholder';
import NoPostImg from '@components/icons/placeholders/NoPostImg';
import { useRouter } from 'next/navigation';

export default function MyPostEmpty() {
  const router = useRouter();

  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage="아직 작성한 게시물이 없어요"
      lightMessage={
        <>
          첫 게시물을 작성하고
          <br />
          오늘의 룩을 공유해보세요!
        </>
      }
      btnText="게시물 작성하기"
      btnFunc={() => router.push('/post-write')}
    />
  );
}

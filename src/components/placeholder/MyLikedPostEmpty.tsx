'use client';

import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';
import NoPostImg from '@components/icons/placeholders/NoPostImg';
import { useRouter } from 'next/navigation';

export default function MyLikedPostEmpty() {
  const router = useRouter();
  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage="좋아요한 게시물이 없어요"
      lightMessage={
        <>
          맘에 드는 룩을 좋아요 하면
          <br />
          언제든 다시 볼 수 있어요.
        </>
      }
      btnText="둘러보기"
      btnFunc={() => router.push('/post')}
    />
  );
}

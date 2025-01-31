'use client';

import NotFoundImg from '@components/icons/placeholders/NotFoundImg';
import StatusPlaceholder from '@/components/placeholder/StatusPlaceholder';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <StatusPlaceholder
      ImgComp={NotFoundImg}
      boldMessage="Not Found"
      lightMessage={
        <>
          존재하지 않는 주소를 입력하셨거나,
          <br />
          요청하신 페이지의 주소가 변경,
          <br />
          삭제되어 찾을 수 없습니다.
        </>
      }
      btnText="홈으로"
      btnFunc={() => router.push('/')}
    />
  );
}

import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import SearchAddressForm from '@/components/search-address/SearchAddressForm';
import { Suspense } from 'react';

export default function SearchAddressPage() {
  return (
    <>
      <Header>주소 검색</Header>
      <div className="px-5 pt-10 flex flex-col gap-5">
        <Text size="xl" weight="bold">
          해당 지역의 룩을 보기 위해
          <br />
          현재 계신 주소를 알려주세요
        </Text>
        <Suspense>
          <SearchAddressForm />
        </Suspense>
      </div>
    </>
  );
}

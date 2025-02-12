'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useDebounce from '@/hooks/useDebounce';
import { searchAddresses } from '@/api/apis';
import { AddressItem } from '@/config/types';
import CurrentLocationBtn from './CurrentLocationBtn';
import AddressList from './AddressList';
import { useSearchParams } from 'next/navigation';
import Input from '../form/Input';

interface AddressForm {
  address: string;
}

export default function SearchAddressForm() {
  const formMethods = useForm<AddressForm>();
  const { handleSubmit, watch } = formMethods;

  const searchParams = useSearchParams();
  const previousPage = searchParams?.get('from');
  const isPostForm = previousPage === '/post-write';

  const addressInputValue = watch('address');
  const debouncedAddress = useDebounce(addressInputValue, 500);

  const [addressList, setAddressList] = useState<AddressItem[]>([]);

  useEffect(() => {
    if (debouncedAddress) {
      handleSubmit(onSubmit)(); // 디바운스된 값으로 자동 제출
    } else {
      setAddressList([]);
    }
  }, [debouncedAddress]); // 디바운스된 값이 변경될 때만 작동

  const onSubmit = async ({ address }: AddressForm) => {
    try {
      const nextAddressList = await searchAddresses(address);
      setAddressList(nextAddressList);
    } catch (error) {
      console.error(error);
      setAddressList([]);
    }
  };
  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input name="address" placeholder="지번 or 도로명으로 검색" search {...formMethods} />
      </form>
      <CurrentLocationBtn isPostForm={isPostForm} />
      <AddressList addressList={addressList} isPostForm={isPostForm} />
    </>
  );
}

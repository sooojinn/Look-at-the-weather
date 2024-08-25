import React, { useState } from 'react';
import useLocationData from '@/hooks/useLocationData';
import Header from '@components/common/Header';
import Location from '@components/common/molecules/Location';
import MinMaxTemps from '@components/weather/MinMaxTemps';
import WeatherImg from '@components/weather/WeatherImg';
import Text from '@components/common/atom/Text';
import HrLine from '@components/common/atom/HrLine';
import VeLine from '@components/common/atom/VeLine';
import FilterBtn from '@components/common/atom/FilterBtn';
import { ResetIcon } from '@components/icons/ResetIcon';
import PostFilterModal from '@components/common/atom/PostFilterModal';
import { PostList } from '@components/post/PostList';
import axios from 'axios';
import { PostMeta } from '@/config/types';
import { BASEURL } from '@/config/constants';
import { generateMockPosts } from '@/mocks/mockPostData';

type Props = {};

export default function Post({}: Props) {
  const { location } = useLocationData();

  const [isOpen, setIsOpen] = useState(false);
  const [btnIndex, setBtnIndex] = useState(0);
  const [btnValue, setBtnValue] = useState('');

  const onClickFilterBtn = (btnIndex: number, btnString: string) => {
    setBtnIndex(btnIndex);
    setBtnValue(btnString);
    setIsOpen(true);
  };

  return (
    <>
      <Header>Look</Header>
      <div className="px-5">
        <div className="flex flex-row items-center justify-between py-5">
          <div>
            <Location location={location} color="lightBlack" />
            <Text margin={'my-2.5'} color="lightBlack" size={'xl'} weight="bold">
              조금 쌀쌀해요!
            </Text>
            <MinMaxTemps minTemp={19} maxTemp={23} color="gray" />
          </div>
          <div>
            <WeatherImg weatherType="cloudy" width={134} height={110} />
          </div>
        </div>
        <HrLine height={1} />
        <div className="flex row py-4">
          <div className="pe-4">
            <ResetIcon />
          </div>
          <VeLine height={8} />
          <div className="flex row gap-4 pl-4">
            <FilterBtn onClickFunc={() => onClickFilterBtn(0, 'location')}>지역</FilterBtn>
            <FilterBtn onClickFunc={() => onClickFilterBtn(1, 'weather')}>날씨</FilterBtn>
            <FilterBtn onClickFunc={() => onClickFilterBtn(2, 'temperature')}>온도</FilterBtn>
            <FilterBtn onClickFunc={() => onClickFilterBtn(3, 'season')}>계절</FilterBtn>
          </div>
        </div>
        <HrLine height={8} />
        <div className="py-5">
          <div className="flex row justify-end">
            <div>
              <Text color="gray" weight="bold">
                최신순
              </Text>
            </div>
            <div className="mx-2">
              <VeLine height={8} />
            </div>
            <div>
              <Text color="lightGray">추천순</Text>
            </div>
          </div>
        </div>
        <div>
          <PostList postList={generateMockPosts(10)}></PostList>
        </div>
        <div className="relative">
          {isOpen ? <PostFilterModal isOpen={setIsOpen} btnIndex={btnIndex} btnValue={btnValue} /> : null}
        </div>
      </div>
    </>
  );
}

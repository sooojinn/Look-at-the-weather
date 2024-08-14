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

type Props = {};

export default function PostList({}: Props) {
  const { location } = useLocationData();

  const [isOpen, setIsOpen] = useState(false);
  const [btnValue, setBtnValue] = useState('');

  const onClickFilterBtn = (btnValue: string) => {
    setBtnValue(btnValue);
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
            <FilterBtn onClickFunc={() => onClickFilterBtn('지역')}>지역</FilterBtn>
            <FilterBtn onClickFunc={() => onClickFilterBtn('날씨')}>날씨</FilterBtn>
            <FilterBtn onClickFunc={() => onClickFilterBtn('온도')}>온도</FilterBtn>
            <FilterBtn onClickFunc={() => onClickFilterBtn('계절')}>계절</FilterBtn>
          </div>
        </div>
      </div>
      {isOpen ? <PostFilterModal isOpen={setIsOpen} btnValue={btnValue} /> : null}
    </>
  );
}

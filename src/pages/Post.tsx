import { useEffect, useState } from 'react';
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
import { usePostStore } from '@/store/postStore';
import { DistrictArray, FilterItem } from '@/config/types';
import { generateMockPosts } from '@/mocks/mockPostData';
import FooterNavi from '@components/common/FooterNavi';

type Props = {};

export default function Post({}: Props) {
  const { location } = useLocationData();
  const {
    locationIds,
    seasonTagIds,
    temperatureTagIds,
    weatherTagIds,
    updateLocation,
    updateWeatherTagIds,
    updateTemperatureTagIds,
    updateSeasonTagIds,
  } = usePostStore();

  const clearPostFilterStorage = usePostStore.persist.clearStorage;

  const [isOpen, setIsOpen] = useState(false);
  const [btnIndex, setBtnIndex] = useState(0);
  const [btnValue, setBtnValue] = useState('');
  const [locationArr, setLocationArr] = useState<DistrictArray>([]);
  const [weatherArr, setWeatherArr] = useState<FilterItem[]>([]);
  const [temperatureArr, setTemperatureArr] = useState<FilterItem[]>([]);
  const [seasonArr, setSeasonArr] = useState<FilterItem[]>([]);
  const [sortOrder, setSortOrder] = useState('L');

  const onClickFilterBtn = (btnIndex: number, btnString: string) => {
    setBtnIndex(btnIndex);
    setBtnValue(btnString);
    setIsOpen(true);
  };

  const onClickResetBtn = () => {
    clearPostFilterStorage();
    updateLocation([]);
    updateWeatherTagIds([]);
    updateTemperatureTagIds([]);
    updateSeasonTagIds([]);
    setLocationArr([]);
    setSeasonArr([]);
    setWeatherArr([]);
    setTemperatureArr([]);
  };

  useEffect(() => {
    setLocationArr(locationIds);
    setSeasonArr(seasonTagIds);
    setWeatherArr(weatherTagIds);
    setTemperatureArr(temperatureTagIds);
  }, [isOpen]);

  const options = {};
  const io = new IntersectionObserver((entries, observer) => {}, options);

  useEffect(() => {}, [sortOrder]);

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
          <div className="pe-4" onClick={onClickResetBtn}>
            <ResetIcon />
          </div>
          <VeLine height={8} />
          <div className="flex row gap-4 pl-4 overflow-y-auto whitespace-nowrap scrollbar-hide">
            <FilterBtn
              isActive={locationArr.length > 0 ? true : false}
              onClickFunc={() => onClickFilterBtn(0, 'location')}
            >
              {locationArr.length > 1
                ? `${locationArr[0].district} 외 ${locationArr.length - 1}`
                : locationArr.length === 1
                ? `${locationArr[0].district}`
                : '지역'}
            </FilterBtn>
            <FilterBtn
              isActive={weatherArr.length > 0 ? true : false}
              onClickFunc={() => onClickFilterBtn(1, 'weather')}
            >
              {weatherArr.length > 1
                ? `${weatherArr[0].tagName} 외 ${weatherArr.length - 1}`
                : weatherArr.length === 1
                ? `${weatherArr[0].tagName}`
                : '날씨'}
            </FilterBtn>
            <FilterBtn
              isActive={temperatureArr.length > 0 ? true : false}
              onClickFunc={() => onClickFilterBtn(2, 'temperature')}
            >
              {temperatureArr.length > 1
                ? `${temperatureArr[0].tagName} 외 ${temperatureArr.length - 1}`
                : temperatureArr.length === 1
                ? `${temperatureArr[0].tagName}`
                : '온도'}
            </FilterBtn>
            <FilterBtn isActive={seasonArr.length > 0 ? true : false} onClickFunc={() => onClickFilterBtn(3, 'season')}>
              {seasonArr.length > 1
                ? `${seasonArr[0].tagName} 외 ${seasonArr.length - 1}`
                : seasonArr.length === 1
                ? `${seasonArr[0].tagName}`
                : '계절'}
            </FilterBtn>
          </div>
        </div>
        <HrLine height={8} />
        <div className="py-5">
          <div className="flex row justify-end">
            <div onClick={() => setSortOrder('L')}>
              <Text color={sortOrder === 'L' ? 'gray' : 'lightGray'} weight={sortOrder === 'L' ? 'bold' : 'regular'}>
                최신순
              </Text>
            </div>
            <div className="mx-2">
              <VeLine height={8} />
            </div>
            <div onClick={() => setSortOrder('R')}>
              <Text color={sortOrder === 'R' ? 'gray' : 'lightGray'} weight={sortOrder === 'R' ? 'bold' : 'regular'}>
                추천순
              </Text>
            </div>
          </div>
        </div>
        <div className="relative">
          {isOpen ? <PostFilterModal isOpen={setIsOpen} btnIndex={btnIndex} btnValue={btnValue} /> : null}
        </div>
      </div>
      <div className="px-[-100px]">
        <PostList postList={generateMockPosts(10)}></PostList>
      </div>
      <div className="mt-[103px]">
        <FooterNavi />
      </div>
    </>
  );
}

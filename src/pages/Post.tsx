import { useEffect, useState } from 'react';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import HrLine from '@components/common/atom/HrLine';
import VeLine from '@components/common/atom/VeLine';
import FilterBtn from '@components/common/atom/FilterBtn';
import { ResetIcon } from '@components/icons/ResetIcon';
import PostFilterModal from '@components/common/atom/PostFilterModal';
import { PostList } from '@components/post/PostList';
import { usePostStore } from '@/store/postStore';
import { DistrictType, FilterItem, PostMeta, PostFilterState } from '@/config/types';
import FooterNavi from '@components/common/FooterNavi';
import axios from 'axios';
import { BASEURL } from '@/config/constants';
import LookWeatherInfo from '@components/weather/LookWeatherInfo';
import useLocationData from '@/hooks/useLocationData';

export default function Post() {
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

  const [locationArr, setLocationArr] = useState<DistrictType[]>([]);
  const [weatherArr, setWeatherArr] = useState<FilterItem[]>([]);
  const [temperatureArr, setTemperatureArr] = useState<FilterItem[]>([]);
  const [seasonArr, setSeasonArr] = useState<FilterItem[]>([]);

  const [sortOrder, setSortOrder] = useState('LATEST');
  const [postList, setPostList] = useState<PostMeta[]>([]);
  const [hasFilterData, setHasFilerData] = useState(false);
  const [filterState, setFilterState] = useState<PostFilterState>({
    location: [],
    seasonTagIds: [],
    temperatureTagIds: [],
    weatherTagIds: [],
  });

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

  useEffect(() => {
    if (hasFilterData) {
      setPostList([]);
      return;
    }
    if (!location || !location.city || !location.district) {
      return;
    }
    const slicedCity = location.city.substring(0, 2);

    const getAllPosts = async () => {
      const response = await axios.get(
        `${BASEURL}/posts?page=0&size=10&city=${slicedCity}&district=${location.district}&sort=${sortOrder} `,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
          },
        },
      );

      const updatePostList = response.data.posts.map((item: PostMeta) => ({ ...item, location }));
      console.log(updatePostList);

      setPostList(updatePostList);
    };
    getAllPosts();
  }, [location, hasFilterData]);

  useEffect(() => {
    if (hasFilterData) {
      setPostList([]);
      const getFilterdPosts = async () => {
        const response = await axios.post(
          `${BASEURL}/posts/search`,
          {
            page: 0,
            size: 10,
            location: filterState.location,
            sort: sortOrder,
            seasonTagIds: filterState.seasonTagIds,
            weatherTagIds: filterState.weatherTagIds,
            temperatureTagIds: filterState.temperatureTagIds,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('accessToken'),
            },
          },
        );
        setPostList(response.data.posts);
      };
      getFilterdPosts();
    }
  }, [filterState, sortOrder]);

  useEffect(() => {
    const areAllEmptyArrays = (...arrs: any[][]): boolean => {
      for (const arr of arrs) {
        if (!Array.isArray(arr) || arr.length !== 0) {
          return false;
        }
      }
      return true;
    };

    const isEmptyFilter = areAllEmptyArrays(locationIds, seasonTagIds, temperatureTagIds, weatherTagIds);

    if (!isEmptyFilter) {
      const locationIdArray = locationIds.map((loc) => ({
        city: loc.cityId,
        district: loc.districtId,
      }));
      const seasonIds = seasonTagIds.map((tag) => tag.id);
      const temperatureIds = temperatureTagIds.map((tag) => tag.id);
      const weatherIds = weatherTagIds.map((tag) => tag.id);

      setFilterState({
        location: locationIdArray,
        seasonTagIds: seasonIds,
        temperatureTagIds: temperatureIds,
        weatherTagIds: weatherIds,
      });
    }

    isEmptyFilter ? setHasFilerData(false) : setHasFilerData(true);
  }, [locationIds, seasonTagIds, temperatureTagIds, weatherTagIds]);

  return (
    <div className="h-screen relative">
      <Header>Look</Header>
      <div className="px-5">
        <LookWeatherInfo />
        <HrLine height={1} />
        <div className="flex gap-4 items-center py-4">
          <ResetIcon onClick={onClickResetBtn} />
          <VeLine height={8} />
          <div className="flex gap-2 overflow-y-auto scrollbar-hide">
            <FilterBtn isActive={locationArr.length} onClickFunc={() => onClickFilterBtn(0, 'location')}>
              {locationArr.length > 1
                ? `${locationArr[0].districtName} 외 ${locationArr.length - 1}`
                : locationArr.length === 1
                ? `${locationArr[0].districtName}`
                : '지역'}
            </FilterBtn>
            <FilterBtn isActive={weatherArr.length} onClickFunc={() => onClickFilterBtn(1, 'weather')}>
              {weatherArr.length > 1
                ? `${weatherArr[0].tagName} 외 ${weatherArr.length - 1}`
                : weatherArr.length === 1
                ? `${weatherArr[0].tagName}`
                : '날씨'}
            </FilterBtn>
            <FilterBtn isActive={temperatureArr.length} onClickFunc={() => onClickFilterBtn(2, 'temperature')}>
              {temperatureArr.length > 1
                ? `${temperatureArr[0].tagName} 외 ${temperatureArr.length - 1}`
                : temperatureArr.length === 1
                ? `${temperatureArr[0].tagName}`
                : '온도'}
            </FilterBtn>
            <FilterBtn isActive={seasonArr.length} onClickFunc={() => onClickFilterBtn(3, 'season')}>
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
            <div onClick={() => setSortOrder('LATEST')}>
              <Text
                color={sortOrder === 'LATEST' ? 'gray' : 'lightGray'}
                weight={sortOrder === 'LATEST' ? 'bold' : 'regular'}
              >
                최신순
              </Text>
            </div>
            <div className="mx-2">
              <VeLine height={8} />
            </div>
            <div onClick={() => setSortOrder('RECOMMENDED')}>
              <Text
                color={sortOrder === 'RECOMMENDED' ? 'gray' : 'lightGray'}
                weight={sortOrder === 'RECOMMENDED' ? 'bold' : 'regular'}
              >
                추천순
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[-100px]">
        <PostList postList={postList}></PostList>
      </div>
      <FooterNavi />
      {isOpen ? <PostFilterModal isOpen={setIsOpen} btnIndex={btnIndex} btnValue={btnValue} /> : null}
    </div>
  );
}

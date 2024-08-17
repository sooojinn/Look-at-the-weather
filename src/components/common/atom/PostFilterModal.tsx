import React, { useState, useEffect, useRef } from 'react';
import { POSTFILTERTAPLIST } from '@/config/constants';
import { mockSeasonData, mockWeatherData, mockTempData } from '@/mocks/mockFilterData';
import { city } from '@/mocks/city';
import { district } from '@/mocks/district';
import Text from './Text';
import CloseBtn from '@components/icons/CloseBtn';
import FilterBtn from './FilterBtn';
import HrLine from './HrLine';

type PostFilterModalProps = {
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
  btnValue: string;
  btnIndex: number;
};

interface FilterItem {
  id: number;
  tagName: string;
}

type SectionKey = 'location' | 'weather' | 'temperature' | 'season';

interface CategoryFilterItem extends FilterItem {
  category: 'location' | 'weather' | 'temperature' | 'season';
}

export default function PostFilterModal({ isOpen, btnValue, btnIndex }: PostFilterModalProps) {
  const [activeTab, setActiveTab] = useState<number>(btnIndex);
  const [selectedCity, setSelectedCity] = useState<{ city_id?: number; city?: string }[]>([]);
  const [selectedAllDistrict, setSelctedAllDistrict] = useState<
    { city_id: number; district_id: number; district: string }[]
  >([]);
  const [selectedDistrict, setSelectedDistrict] = useState<
    { city_id: number; district_id: number; district: string }[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<FilterItem[]>([]);
  const [selectedWeather, setSelectedWeather] = useState<FilterItem[]>([]);
  const [selectedTemperature, setSelectedTemperature] = useState<FilterItem[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<FilterItem[]>([]);
  const [selectedFilterItems, setSelectedFilterItems] = useState<CategoryFilterItem[]>([]);

  // Record<K, T> 타입 k는 key의 값, T는 각 키에 대응하는 값의 타입을 지정함
  const sectionRefs = useRef<Record<SectionKey, HTMLDivElement | null>>({
    location: null,
    weather: null,
    temperature: null,
    season: null,
  });

  const onClickFilterItemBtn = (
    id: number,
    tagName: string,
    setFilterState: React.Dispatch<React.SetStateAction<Array<{ id: number; tagName: string }>>>,
  ) => {
    setFilterState((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === id);
      if (isAlreadySelected) {
        return prev.filter((item) => item.id !== id);
      } else {
        return [...prev, { id, tagName }];
      }
    });
  };

  const onClickResetFilterBtn = () => {
    setSelectedLocation([]);
    setSelectedWeather([]);
    setSelectedTemperature([]);
    setSelectedSeason([]);
  };

  const onClickCityBtn = (city: { city_id: number; city: string }) => {
    setSelctedAllDistrict([]);
    const filteredDistrict = district.filter((item) => item.city_id === city.city_id);
    setSelctedAllDistrict(filteredDistrict);
  };

  const onClickDistrictBtn = (item: { district_id: number; city_id: number; district: string }) => {
    setSelectedDistrict((prev) => {
      const isAlreadySelected = prev.some((prevItem) => prevItem.district_id === item.district_id);
      if (isAlreadySelected) {
        return prev.filter((prevItem) => prevItem.district_id !== item.district_id);
      } else {
        return [...prev, item];
      }
    });
    onClickFilterItemBtn(item.district_id, item.district, setSelectedLocation);
  };

  useEffect(() => {
    setSelectedCity(() => {
      // selectedDistrict에서 고유한 city_id만 추출합니다.
      const uniqueCityIds = Array.from(new Set(selectedDistrict.map((district) => district.city_id)));

      // 각 city_id에 대해 객체를 생성합니다.
      return uniqueCityIds.map((city_id) => ({ city_id }));
    });
    console.log(selectedDistrict);
  }, [selectedDistrict]);

  const onClickSelectedItemBtn = (id: number, category: string) => {
    switch (category) {
      case 'location':
        setSelectedLocation((prev) => prev.filter((item) => item.id !== id));
        break;
      case 'weather':
        setSelectedWeather((prev) => prev.filter((item) => item.id !== id));
        break;
      case 'temperature':
        setSelectedTemperature((prev) => prev.filter((item) => item.id !== id));
        break;
      case 'season':
        setSelectedSeason((prev) => prev.filter((item) => item.id !== id));
        break;
    }
  };

  useEffect(() => {
    // as를 사용하여 SectionKey의 지정된 값중 하나라는 것을 타입 단언
    if (btnValue && sectionRefs.current[btnValue as SectionKey]) {
      sectionRefs.current[btnValue as SectionKey]?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    }
  }, [btnValue]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.6) {
            const tabId = entry.target.id;
            switch (tabId) {
              case 'location':
                setActiveTab(0);
                break;
              case 'weather':
                setActiveTab(1);
                break;
              case 'temperature':
                setActiveTab(2);
                break;
              case 'season':
                setActiveTab(3);
                break;
            }
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    if (sectionRefs.current.location) io.observe(sectionRefs.current.location);
    if (sectionRefs.current.weather) io.observe(sectionRefs.current.weather);
    if (sectionRefs.current.temperature) io.observe(sectionRefs.current.temperature);
    if (sectionRefs.current.season) io.observe(sectionRefs.current.season);

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const newSelectedFilterItems: CategoryFilterItem[] = [
      ...selectedLocation.map((item) => ({ ...item, category: 'location' as const })),
      ...selectedWeather.map((item) => ({ ...item, category: 'weather' as const })),
      ...selectedTemperature.map((item) => ({ ...item, category: 'temperature' as const })),
      ...selectedSeason.map((item) => ({ ...item, category: 'season' as const })),
    ];
    setSelectedFilterItems(newSelectedFilterItems);
  }, [selectedLocation, selectedWeather, selectedTemperature, selectedSeason]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className={'max-w-md fixed bottom-0 w-full shadow-md z-20 h-full'}>
        <div className="bg-background-white w-full px-5 pb-10 rounded-t-3xl h-[667px] absolute bottom-0">
          <div className="relative py-[13px]">
            <div
              onClick={() => {
                isOpen(false);
              }}
              className="flex justify-end text-center"
            >
              <div className="absolute text-center w-full">
                <Text weight="bold" size="2xl">
                  필터
                </Text>
              </div>
              <div>
                <CloseBtn />
              </div>
            </div>
          </div>

          <div className="flex row">
            {POSTFILTERTAPLIST.map((tab, index) => (
              <div
                id={String(index)}
                key={index}
                className={`me-3 p-2.5 ${activeTab === tab.id ? 'border-b-2 border-primary-main' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
              >
                <a href={`${tab.href}`}>
                  <Text size="l" color={activeTab === tab.id ? 'blue' : 'gray'}>
                    {tab.tabName}
                  </Text>
                </a>
              </div>
            ))}
          </div>

          <div className="overflow-y-scroll overflow-x-hidden scrollbar-hide h-2/5">
            <div id="location" className="py-5" ref={(el) => (sectionRefs.current.location = el)}>
              <a>
                <Text size="l" weight="bold" margin="mb-2.5">
                  지역
                </Text>
              </a>
              <div className="flex row flex-wrap gap-2">
                {city.map((item) => (
                  <FilterBtn
                    key={item.city_id}
                    isActive={
                      selectedCity.some((city) => city.city_id === item.city_id) &&
                      selectedDistrict.some((district) => district.city_id === item.city_id)
                    }
                    onClickFunc={() => {
                      onClickCityBtn(item);
                    }}
                  >
                    {item.city}
                  </FilterBtn>
                ))}
              </div>
            </div>
            {selectedCity ? (
              <div className="flex row flex-wrap gap-2 px-3 py-2 mb-5 rounded-[10px] bg-background-gray">
                {selectedAllDistrict.map((item) => (
                  <FilterBtn
                    key={item.district_id}
                    isActive={selectedLocation.some((selected) => selected.id === item.district_id)}
                    onClickFunc={() => {
                      onClickDistrictBtn(item);
                    }}
                  >
                    {item.district}
                  </FilterBtn>
                ))}
              </div>
            ) : null}

            <HrLine height={8} />

            <div id="weather" className="py-5" ref={(el) => (sectionRefs.current.weather = el)}>
              <a className="mb-4">
                <Text size="l" weight="bold" margin="mb-2.5">
                  날씨
                </Text>
              </a>
              <div className="flex row flex-wrap gap-2">
                {mockWeatherData.map((item) => (
                  <FilterBtn
                    key={item.id}
                    isActive={selectedWeather.some((selected) => selected.id === item.id)}
                    onClickFunc={() => {
                      onClickFilterItemBtn(item.id, item.name, setSelectedWeather);
                    }}
                  >
                    {item.name}
                  </FilterBtn>
                ))}
              </div>
            </div>
            <HrLine height={8} />

            <div id="temperature" className="py-5" ref={(el) => (sectionRefs.current.temperature = el)}>
              <a className="mb-4">
                <Text size="l" weight="bold" margin="mb-2.5">
                  온도
                </Text>
              </a>
              <div className="flex row flex-wrap gap-2">
                {mockTempData.map((item) => (
                  <FilterBtn
                    key={item.id}
                    isActive={selectedTemperature.some((selected) => selected.id === item.id)}
                    onClickFunc={() => {
                      onClickFilterItemBtn(item.id, item.name, setSelectedTemperature);
                    }}
                  >
                    {item.name}
                  </FilterBtn>
                ))}
              </div>
            </div>
            <HrLine height={8} />

            <div id="season" className="py-5" ref={(el) => (sectionRefs.current.season = el)}>
              <a className="mb-4">
                <Text size="l" weight="bold" margin="mb-2.5">
                  계절
                </Text>
              </a>
              <div className="flex row flex-wrap gap-2">
                {mockSeasonData.map((item) => (
                  <FilterBtn
                    key={item.id}
                    isActive={selectedSeason.some((selected) => selected.id === item.id)}
                    onClickFunc={() => {
                      onClickFilterItemBtn(item.id, item.name, setSelectedSeason);
                    }}
                  >
                    {item.name}
                  </FilterBtn>
                ))}
              </div>
            </div>
          </div>
          <div className="sticky">
            {selectedFilterItems.length > 0 ? (
              <div className="pt-5">
                <div className="flex row gap-1 mb-3">
                  <div>
                    <Text weight="bold" color="lightBlack">
                      적용된 필터
                    </Text>
                  </div>
                  <div>
                    <Text color="blue">{selectedFilterItems.length}</Text>
                  </div>
                </div>
                <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                  <div className="flex row gap-1">
                    {selectedFilterItems.map((item, index) => (
                      <FilterBtn
                        key={index}
                        isActive={true}
                        isSelected={true}
                        onClickFunc={() => onClickSelectedItemBtn(item.id, item.category)}
                      >
                        {item.tagName}
                      </FilterBtn>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            <div className="sticky bottom-0 flex gap-[7px] py-5 justify-between">
              <button
                className="w-[164px] h-[48px] py-3 text-center border border-line-light rounded-[8px]"
                onClick={onClickResetFilterBtn}
              >
                <Text size="l">필터 초기화</Text>
              </button>
              <button className="w-[164px] h-[48px] py-3 text-center bg-primary-main rounded-[8px]">
                <Text size="l" weight="bold" color="white">
                  적용하기
                </Text>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

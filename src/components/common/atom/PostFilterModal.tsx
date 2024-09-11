import React, { useState, useEffect, useRef } from 'react';
import { usePostStore } from '@/store/postStore';
import { BASEURL, POSTFILTERTAPLIST } from '@/config/constants';
import { mockSeasonData, mockWeatherData, mockTempData } from '@/mocks/mockFilterData';

import { FilterItem, SectionKey, PostFilterModalProps, CityType, DistrictType } from '@/config/types';
import Text from './Text';
import CloseBtn from '@components/icons/CloseBtn';
import FilterBtn from './FilterBtn';
import HrLine from './HrLine';
import axios from 'axios';

interface CategoryFilterItem extends FilterItem {
  category: 'location' | 'weather' | 'temperature' | 'season';
}

export default function PostFilterModal({ isOpen, btnValue, btnIndex }: PostFilterModalProps) {
  const {
    updateLocation,
    updateWeatherTagIds,
    updateTemperatureTagIds,
    updateSeasonTagIds,
    locationIds,
    weatherTagIds,
    temperatureTagIds,
    seasonTagIds,
  } = usePostStore();

  const [activeTab, setActiveTab] = useState<number>(btnIndex);

  const [selectedWeather, setSelectedWeather] = useState<FilterItem[]>([]);
  const [selectedTemperature, setSelectedTemperature] = useState<FilterItem[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<FilterItem[]>([]);
  const [selectedFilterItems, setSelectedFilterItems] = useState<CategoryFilterItem[]>([]);

  const [city, setCity] = useState<CityType[]>([]);
  const [district, setDistrict] = useState<DistrictType[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<CityType[]>([]);
  const [openDistrictOption, setOpenDistrictOption] = useState<boolean>(false);

  // Record<K, T> 타입 k는 key의 값, T는 각 키에 대응하는 값의 타입을 지정함
  const sectionRefs = useRef<Record<SectionKey, HTMLDivElement | null>>({
    location: null,
    weather: null,
    temperature: null,
    season: null,
  });

  const onClickFilterItemBtn = (
    id: number | { city: number; district: number },
    tagName: string,
    setFilterState: React.Dispatch<
      React.SetStateAction<Array<{ id: number | { city: number; district: number }; tagName: string }>>
    >,
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
    setSelectedWeather([]);
    setSelectedTemperature([]);
    setSelectedSeason([]);

    setSelectedDistrict([]);
  };

  const onClickCityBtn = (selectedOption: CityType) => {
    setOpenDistrictOption(false);
    if (selectedOption.district.length === 0) {
      setSelectedDistrict([]);
      setDistrict([]);
      setSelectedLocation([selectedOption]);
    } else {
      const updatedDistricts = selectedOption.district.map((item) => ({
        cityName: selectedOption.cityName,
        cityId: selectedOption.cityId,
        ...item,
      }));

      setOpenDistrictOption(true);
      setDistrict(updatedDistricts);
      console.log(city);

      // const filteredDistrict = district.filter((item) => item.cityId === city.cityId);
    }
  };

  const onClickDistrictBtn = (selectedOption: DistrictType) => {
    setSelectedDistrict((prev) => {
      const isAlreadySelected = prev.some((item) => item.districtId === selectedOption.districtId);
      if (isAlreadySelected) {
        return prev.filter((item) => item.districtId !== selectedOption.districtId);
      }
      if (selectedOption.districtId === 0) {
        return [selectedOption];
      } else {
        return [...prev, selectedOption];
      }
    });
  };

  const onClickSelectedItemBtn = (id: number | { city: number; district: number }, category: string) => {
    switch (category) {
      case 'location':
        // setSelectedDistrict((prev) => prev.filter((item) => item.district_id !== id));
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
    const getRegions = async () => {
      const response = await axios.get(`${BASEURL}regions`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      const slicedCities = response.data.region.map((item) => ({
        ...item,
        cityName: item.cityName.substring(0, 2),
      }));
      setCity(slicedCities);
    };
    getRegions();
  }, []);

  useEffect(() => {
    console.log(city);
  }, [city]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         console.log(entry.target.id, entry.intersectionRatio);
  //         if (entry.isIntersecting) {
  //           // setCurrentSection(entry.target.id);
  //         }
  //       });
  //     },
  //     {
  //       root: document.querySelector('#viewport'),
  //       rootMargin: '-50px 0px',
  //     },
  //   );

  //   Object.values(sectionRefs.current).forEach((section) => {
  //     if (section) observer.observe(section);
  //   });

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const newSelectedFilterItems: CategoryFilterItem[] = [
      ...selectedLocation.map((item) => ({
        ...{ cityName: item.cityName, district: item.district, cityId: item.cityId },
        category: 'location' as const,
      })),
      ...selectedWeather.map((item) => ({ ...item, category: 'weather' as const })),
      ...selectedTemperature.map((item) => ({ ...item, category: 'temperature' as const })),
      ...selectedSeason.map((item) => ({ ...item, category: 'season' as const })),
    ];
    setSelectedFilterItems(newSelectedFilterItems);
  }, [selectedDistrict, selectedWeather, selectedTemperature, selectedSeason]);

  const onClickSubmitBtn = () => {
    updateLocation(selectedLocation);
    updateSeasonTagIds(selectedSeason);
    updateTemperatureTagIds(selectedTemperature);
    updateWeatherTagIds(selectedWeather);
    isOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    // 렌더링 시 저장된 필터 데이터 매칭
    setSelectedDistrict(locationIds);
    setSelectedWeather(weatherTagIds);
    setSelectedTemperature(temperatureTagIds);
    setSelectedSeason(seasonTagIds);
  }, []);

  return (
    <div>
      <div className="relative">
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
        <div className="fixed bottom-0 left-0 right-0 w-full shadow-md z-20 h-[687px]">
          <div className="bg-background-white w-full h-full px-5 rounded-t-3xl flex flex-col">
            <div className="relative py-[13px]">
              <div
                onClick={() => {
                  isOpen(false);
                }}
                className="flex justify-end text-center"
              >
                <div className="text-center w-full">
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

            <div id="viewport" className="relative overflow-y-auto overflow-x-hidden flex-grow scrollbar-hide">
              {/* <div className="fixed z-20 h-[497px] w-80 bg-black"></div> */}
              <div id="location" className="py-5 w-full" ref={(el) => (sectionRefs.current.location = el)}>
                <a>
                  <Text size="l" weight="bold" margin="mb-2.5">
                    지역
                  </Text>
                </a>
                <div className="flex flex-wrap gap-2 w-full">
                  {city.map((item) => (
                    <FilterBtn
                      key={item.cityId}
                      isActive={
                        item.cityId === 55 ||
                        selectedDistrict.some((district) =>
                          city.some(
                            (cityItem) => cityItem.cityId === district.cityId && district.cityId === item.cityId,
                          ),
                        )
                      }
                      onClickFunc={() => {
                        onClickCityBtn(item);
                      }}
                    >
                      {item.cityName}
                    </FilterBtn>
                  ))}
                </div>
              </div>
              {openDistrictOption ? (
                <div className="flex flex-wrap gap-2 px-3 py-2 mb-5 rounded-[10px] bg-background-gray w-full">
                  {district.map((item) => (
                    <FilterBtn
                      key={item.districtId}
                      isActive={selectedDistrict.some((selected) => selected.districtId === item.districtId)}
                      onClickFunc={() => {
                        onClickDistrictBtn(item);
                      }}
                    >
                      {item.districtName}
                    </FilterBtn>
                  ))}
                </div>
              ) : null}

              <HrLine height={8} />

              <div id="weather" className="py-5 w-full" ref={(el) => (sectionRefs.current.weather = el)}>
                <a className="mb-4">
                  <Text size="l" weight="bold" margin="mb-2.5">
                    날씨
                  </Text>
                </a>
                <div className="flex flex-wrap gap-2 w-full">
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

              <div id="temperature" className="py-5 w-full" ref={(el) => (sectionRefs.current.temperature = el)}>
                <a className="mb-4">
                  <Text size="l" weight="bold" margin="mb-2.5">
                    온도
                  </Text>
                </a>
                <div className="flex flex-wrap gap-2 w-full">
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

              <div id="season" className="py-5 w-full" ref={(el) => (sectionRefs.current.season = el)}>
                <a className="mb-4">
                  <Text size="l" weight="bold" margin="mb-2.5">
                    계절
                  </Text>
                </a>
                <div className="flex flex-wrap gap-2 w-full">
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

            <div className="mt-auto">
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
                  <div className="overflow whitespace-nowrap scrollbar-hide">
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
            </div>

            <div>
              <div className="flex gap-[7px] py-5 justify-between">
                <button
                  className="w-[164px] h-[48px] py-3 text-center border border-line-light rounded-[8px]"
                  onClick={onClickResetFilterBtn}
                >
                  <Text size="l">필터 초기화</Text>
                </button>
                <button
                  className="w-[164px] h-[48px] py-3 text-center bg-primary-main rounded-[8px]"
                  onClick={onClickSubmitBtn}
                >
                  <Text size="l" weight="bold" color="white">
                    적용하기
                  </Text>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

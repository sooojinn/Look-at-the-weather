'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@components/icons/Spinner';
import Text from '@components/common/atom/Text';
import { fetchTopLikedPosts, getOutfitByTemperature } from '@/api/apis';
import NoPostImg from '@components/icons/placeholders/NoPostImg';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';
import HorizonScrollPostList from '@components/common/molecules/HorizonScrollPostList';
import QuestionMark from '@components/icons/QuestionMark';
import AlertModal from '@components/common/organism/AlertModal';
import Button from '@components/common/molecules/Button';
import useWeatherData from '@/hooks/useWeatherData';

export default function TodayBestWearList() {
  const { weatherData } = useWeatherData();
  const { currentTemp } = weatherData;

  const {
    data: topLikedRes,
    isLoading,
    isSuccess: isTopLikedPostsSuccess,
  } = useQuery({
    queryKey: ['topLikedPosts'],
    queryFn: fetchTopLikedPosts,
  });

  const { data: outfitRes, isSuccess: isOutfitSuccess } = useQuery({
    queryKey: ['getOutfitByTemperature'],
    queryFn: () => getOutfitByTemperature(currentTemp),
    enabled: !!currentTemp,
  });

  const [showDescModal, setShowDescModal] = useState(false);

  const topLikedPosts = topLikedRes?.topLikedPosts ?? [];
  const outfitPosts = outfitRes?.posts ?? [];

  return (
    <>
      <div className="mb-[24px]">
        <Text size="l" weight="bold" className="flex justify-start items-center h-[60px] px-5">
          현재 기온에 어울리는 룩
        </Text>
        {isOutfitSuccess && outfitPosts.length ? (
          <HorizonScrollPostList postList={outfitPosts} padding="0 20px" />
        ) : (
          <TempOutfitPostEmpty />
        )}
      </div>

      <div className="flex items-center gap-[4px] px-5">
        <Text size="l" weight="bold" className="flex justify-start items-center h-[60px]">
          오늘의 베스트 룩
        </Text>
        <div
          onClick={() => {
            setShowDescModal(true);
          }}
        >
          <QuestionMark className="cursor-pointer" />
          {showDescModal && (
            <AlertModal
              boldMessage={
                <>
                  Today Best Wear
                  <br />
                  선정 기준
                </>
              }
              regularMessage={
                <>
                  당일 게시물 중 좋아요를
                  <br />
                  많이 받은 게시물 기준으로 선정됩니다.
                </>
              }
              buttons={
                <>
                  <Button
                    size="m"
                    type="main"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDescModal(false);
                    }}
                  >
                    확인
                  </Button>
                </>
              }
            />
          )}
        </div>
      </div>

      {isTopLikedPostsSuccess &&
        (topLikedPosts.length ? (
          <HorizonScrollPostList postList={topLikedPosts} padding="0 20px" />
        ) : (
          <TopLikedPostEmpty />
        ))}
      {isLoading && (
        <div className="flex flex-grow justify-center items-center">
          <Spinner />
        </div>
      )}
    </>
  );
}

function TopLikedPostEmpty() {
  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage={
        <>
          오늘의 베스트 룩이
          <br /> 아직 선정되지 않았어요
        </>
      }
      lightMessage={
        <>
          맘에 드는 게시물에 좋아요를 눌러 직접
          <br /> 베스트 룩을 뽑아보세요!
        </>
      }
    />
  );
}

function TempOutfitPostEmpty() {
  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage={'이 기온에 적합한 게시글이 없어요.'}
      lightMessage={'스타일을 공유하여 다른 사람들에게 도움이 되어 주세요!'}
    />
  );
}

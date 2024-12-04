import { useQuery } from '@tanstack/react-query';
import Spinner from '@components/icons/Spinner';
import Text from '@components/common/atom/Text';
import { fetchTopLikedPosts } from '@/api/apis';
import NoPostImg from '@components/icons/placeholders/NoPostImg';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';
import HorizonScrollPostList from '@components/common/molecules/HorizonScrollPostList';

export default function TodayBestWearList() {
  const {
    data: response,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['topLikedPosts'],
    queryFn: fetchTopLikedPosts,
  });

  const topLikedPosts = response?.data.topLikedPosts;

  return (
    <div className="w-full h-full max-w-md flex flex-col flex-grow px-5">
      <Text size="l" color="black" weight="bold" className="flex justify-start items-center h-[60px]">
        오늘의 베스트 룩
      </Text>

      {isSuccess && (topLikedPosts.length ? <HorizonScrollPostList postList={topLikedPosts} /> : <TopLikedPostEmpty />)}
      {isLoading && (
        <div className="flex flex-grow justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
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

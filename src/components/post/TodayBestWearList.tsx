import { PostList } from '@/components/post/PostList';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@components/icons/Spinner';
import Text from '@components/common/atom/Text';
import { fetchTopLikedPosts } from '@/api/apis';
import NoPostImg from '@components/icons/placeholders/NoPostImg';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';

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
    <div className="w-full h-full max-w-md flex flex-col flex-grow">
      <Text size="l" color="black" weight="bold" className="px-5 flex justify-start items-center h-[60px]">
        Today Best Wear 👕
      </Text>
      {isSuccess && (topLikedPosts.length ? <PostList postList={topLikedPosts} /> : <TopLikedPostEmpty />)}
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
          오늘의 베스트 코디가
          <br /> 아직 선정되지 않았어요
        </>
      }
      lightMessage={
        <>
          맘에 드는 코디를 선택하고
          <br />
          직접 베스트 코디를 뽑아보는 건 어떠세요?
        </>
      }
    />
  );
}

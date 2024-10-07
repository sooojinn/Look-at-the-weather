import { PostList } from '@/components/post/PostList';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@components/icons/Spinner';
import Text from '@components/common/atom/Text';
import { fetchTopLikedPosts } from '@/api/apis';
import NoPost from '@components/icons/NoPost';

export default function TodayBestWearList() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['topLikedPosts'],
    queryFn: fetchTopLikedPosts,
  });

  const topLikedPosts = response?.data.topLikedPosts;

  return (
    <div className="w-full max-w-md flex flex-col flex-grow">
      <div className="w-full px-5 flex justify-start items-center h-[60px]">
        <Text size="l" color="black" weight="bold">
          Today Best Wear 👕
        </Text>
      </div>
      {topLikedPosts && topLikedPosts.length ? (
        <PostList postList={topLikedPosts} />
      ) : (
        <div className="flex flex-col justify-center items-center pt-[100px] pb-[119px]">
          <NoPost className="mb-[20px]" />
          <Text weight="bold" size="xl" color="lightBlack" className="mb-[6px]">
            오늘의 베스트 코디가
            <br /> 아직 선정되지 않았어요
          </Text>
          <Text color="gray">맘에 드는 코디를 선택하고</Text>
          <Text color="gray">직접 베스트 코디를 뽑아보는 건 어떠세요?</Text>
        </div>
      )}
      {isLoading && (
        <div className="flex flex-grow justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}

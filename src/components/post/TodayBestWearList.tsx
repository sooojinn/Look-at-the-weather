import axios from 'axios';
import { BASEURL } from '@/config/constants';
import { PostList } from '@/components/post/PostList';
import { PostMeta } from '@/config/types';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@components/icons/Spinner';
import Text from '@components/common/atom/Text';

const fetchTopLikedPosts = async (page: number, size: number): Promise<PostMeta[]> => {
  const response = await axios.get(`${BASEURL}/posts/top-liked`, {
    params: { page, size },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data.topLikedPosts;
};

export default function TodayBestWearList() {
  const { data: topLikedPosts, isLoading } = useQuery({
    queryKey: ['topLikedPosts'],
    queryFn: () => fetchTopLikedPosts(0, 10),
  });

  return (
    <div className="w-full max-w-md flex flex-col flex-grow">
      <div className="w-full px-5 flex justify-start items-center h-[60px]">
        <Text size="l" color="black" weight="bold">
          Today Best Wear 👕
        </Text>
      </div>
      {topLikedPosts && <PostList postList={topLikedPosts} />}
      {isLoading && (
        <div className="flex flex-grow justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}

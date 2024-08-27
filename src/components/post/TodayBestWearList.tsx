import axios from 'axios';
import { BASEURL } from '@/config/constants';
import { useEffect, useState } from 'react';
import { PostList } from '@/components/post/PostList';
import { PostMeta } from '@/config/types';

const getTopLikedPosts = async (page: number, size: number): Promise<PostMeta[]> => {
  const response = await axios.get(`${BASEURL}/api/v1/posts/top-liked`, {
    params: { page, size },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data.topLikedPosts;
};

export default function TodayBestWearList() {
  const [topLikedPosts, setTopLikedPosts] = useState<PostMeta[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const nextTopLikedPosts = await getTopLikedPosts(0, 10); // 첫 페이지, 10개 항목
        setTopLikedPosts(nextTopLikedPosts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-md flex flex-col">
      <div className="w-full px-5 font-bold flex justify-start items-center h-[60px]">
        <p>Today Best Wear 👕</p>
      </div>
      {topLikedPosts && <PostList postList={topLikedPosts} />}
    </div>
  );
}

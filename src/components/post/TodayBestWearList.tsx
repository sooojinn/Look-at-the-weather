import axios from 'axios';
import { BASEURL } from '@/config/constants';
import { useEffect, useState } from 'react';
import { PostList } from '@/components/post/PostList';
import { PostMeta } from '@/config/types';

const getBestPostList = async (page: number, size: number): Promise<PostMeta[]> => {
  const response = await axios.get<PostMeta[]>(`${BASEURL}/api/v1/posts/top-liked`, {
    params: { page, size },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export default function TodayBestWearList() {
  const [postList, setPostList] = useState<PostMeta[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const nextPostList = await getBestPostList(0, 10); // 첫 페이지, 10개 항목
        setPostList(nextPostList);
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
      {postList && <PostList postList={postList} />}
    </div>
  );
}

import axios from 'axios';
import { BASEURL } from '@/config/constants';
import { useEffect, useState } from 'react';
import { PostList } from '@components/post/PostList';
import { PostMeta } from '@/config/types';
import Header from '@components/common/Header';

const getBestPostList = async (page: number, size: number): Promise<PostMeta[]> => {
  const response = await axios.get<PostMeta[]>(`${BASEURL}/api/v1/posts/liked`, {
    params: { page, size },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
  console.log(response.data);
};

export default function MyPost() {
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
    <div>
      <Header>내 게시물</Header>
      <PostList postList={postList} />
    </div>
  );
}

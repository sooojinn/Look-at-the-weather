import axios from 'axios';
import { BASEURL } from '@/config/constants';
import { useEffect, useState } from 'react';
import { PostList } from '@components/post/PostList';
import { PostMeta } from '@/config/types';
import Header from '@components/common/Header';
import { getMyLikedPosts } from '@/api/apis';

export default function MyLikedPost() {
  const [postList, setPostList] = useState<PostMeta[]>([]);

  const getLikedPosts = async () => {
    const response = await getMyLikedPosts({ page: 0, size: 10 });
    console.log('rsd', response);
  };

  useEffect(() => {
    getLikedPosts();
  }, []);

  return (
    <div>
      <Header>내가 좋아요한 게시물</Header>
      <PostList postList={postList} />
    </div>
  );
}

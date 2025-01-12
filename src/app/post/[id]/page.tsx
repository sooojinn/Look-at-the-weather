// /app/post/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getPostDetail } from '@/api/apis';
import { usePostManageStore } from '@/store/postManageStore';

const PostDetailPage = () => {
  const { postId } = usePostManageStore((state) => ({ postId: state.postId }));
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (postId) {
      const fetchPostDetail = async () => {
        try {
          const postData = await getPostDetail(Number(postId)); // API 호출
          setPost(postData);
        } catch (error) {
          console.error('Error fetching post details:', error);
        }
      };

      fetchPostDetail();
    }
  }, [postId]);

  useEffect(() => {
    console.log(post);
  }, [post]);

  if (!post) return <div>Loading...</div>;

  return <div>asd</div>;
};

export default PostDetailPage;

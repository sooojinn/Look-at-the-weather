import { useState, useEffect, useRef, useCallback } from 'react';
import { PostList } from '@components/post/PostList';
import { PostMeta } from '@/config/types';
import Header from '@components/common/Header';
import Loading from '@components/common/atom/Loading';
import { getMyPosts } from '@/api/apis';

export default function MyPost() {
  const [postList, setPostList] = useState<PostMeta[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageEnd = useRef<HTMLDivElement>(null);

  const fetchPosts = useCallback(
    async (pageNum: number) => {
      if (!hasMore) return;
      console.log('page', pageNum);
      setLoading(true);
      try {
        const response = await getMyPosts({ page: pageNum, size: 10 });
        const newPosts = response.data.myPosts;
        if (newPosts.length > 0) {
          setPostList((prev) => [...prev, ...newPosts]);
          setPage(pageNum + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [hasMore],
  );

  useEffect(() => {
    fetchPosts(page);
  }, [fetchPosts]);

  useEffect(() => {
    if (!loading && hasMore) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchPosts(page);
          }
        },
        { threshold: 0.7 },
      );

      if (pageEnd.current) {
        observer.observe(pageEnd.current);
      }

      return () => {
        if (pageEnd.current) {
          observer.unobserve(pageEnd.current);
        }
      };
    }
  }, [loading]);
  return (
    <div>
      <Header>내 게시물</Header>
      <PostList postList={postList} isMyPost />
      <Loading ref={pageEnd} isLoading={loading} />
    </div>
  );
}

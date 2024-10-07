import { useEffect, useState, useRef, useCallback } from 'react';
import { PostList } from '@components/post/PostList';
import { PostMeta } from '@/config/types';
import Header from '@components/common/Header';
import { getMyLikedPosts } from '@/api/apis';
import Loading from '@components/common/atom/Loading';
import FooterNavi from '@components/common/FooterNavi';

export default function MyLikedPost() {
  const [postList, setPostList] = useState<PostMeta[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageEnd = useRef<HTMLDivElement>(null);

  const fetchPosts = useCallback(
    async (pageNum: number) => {
      if (!hasMore) return;

      setLoading(true);
      try {
        const response = await getMyLikedPosts({ page: pageNum, size: 10 });
        const newPosts = response.data.myLikedPosts;
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
      <Header>내가 좋아요한 게시물</Header>
      <PostList postList={postList} />
      <Loading ref={pageEnd} isLoading={loading} />
      <FooterNavi />
    </div>
  );
}

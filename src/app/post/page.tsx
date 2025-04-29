import PostDetail from '@/components/post/page/PostDetail';
import { BASEURL } from '@/config/constants';
import { fetchWithAuth } from '@/lib/fetcher';

export default async function PostDetailPage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams;

  const postDetailData = await fetchWithAuth(`${BASEURL}/posts/${id}`);

  return <PostDetail postId={+id} postData={postDetailData} />;
}

import { BASEURL } from '@/config/constants';
import { fetchWithAuth } from '@/lib/fetcher';
import PostDetail from '../page/PostDetail';
import FetchErrorPlaceholder from '@/components/placeholder/FetchErrorPlaceholder';

export default async function PostDetailTemplate({ postId }: { postId: number }) {
  try {
    const postDetailData = await fetchWithAuth(`${BASEURL}/posts/${postId}`);

    return <PostDetail postId={postId} postData={postDetailData} />;
  } catch (e) {
    console.error('게시글 상세 데이터 패칭 실패: ', e);
    return <FetchErrorPlaceholder />;
  }
}

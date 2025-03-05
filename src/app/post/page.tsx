import PostDetail from '@/components/post/page/PostDetail';

export default async function PostDetailPage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams;

  return <PostDetail postId={+id} />;
}

import Header from '@/components/common/organism/Header';
import PostDetailTemplate from '@/components/post/template/PostDetailTemplate';

export default async function PostDetailPage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams;

  return (
    <>
      <Header />
      <PostDetailTemplate postId={+id} />
    </>
  );
}

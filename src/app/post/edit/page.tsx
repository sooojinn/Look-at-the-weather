import PostEdit from '@/components/form/page/PostEdit';

export default async function PostEditPage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams;

  return <PostEdit postId={+id} />;
}

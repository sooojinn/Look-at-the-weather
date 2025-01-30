import KakaoRedirect from '@/components/login/KakaoRedirect';

export default async function KakaoRedirectPage({ searchParams }: { searchParams: Promise<{ code: string }> }) {
  const { code } = await searchParams;

  return <KakaoRedirect code={code} />;
}

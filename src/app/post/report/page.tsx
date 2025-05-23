import Header from '@/components/common/organism/Header';
import Text from '@components/common/atom/Text';
import ReportReasonSelector from '@/components/common/organism/ReportReasonSelector';

export default async function PostReport({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams;
  return (
    <>
      <Header>신고하기</Header>
      <div className="p-5 pt-10 flex flex-col gap-3">
        <Text size="xl" weight="bold">
          해당 게시물을 신고하는
          <br />
          이유를 알려주세요.
        </Text>
        <Text color="darkGray">신고된 게시물은 자동 숨김처리 됩니다.</Text>
      </div>
      <ReportReasonSelector postId={+id} />
    </>
  );
}

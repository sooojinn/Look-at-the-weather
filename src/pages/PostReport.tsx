'use client';

import { reportPost } from '@/api/apis';
import FooterNavi from '@components/common/FooterNavi';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import Button from '@components/common/molecules/Button';
import { showToast } from '@components/common/molecules/ToastProvider';
import UnderlineOptionList from '@components/common/molecules/UnderlineOptionList';
import AlertModal from '@components/common/organism/AlertModal';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/navigation';

export default function PostReport() {
  const { postId } = location.state;
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [showReportWarningModal, setShowReportWarningModal] = useState(false);

  const reportReasons = [
    '관련 없는 내용이에요',
    '광고/홍보성 게시글이에요',
    '선정적이거나 폭력/혐오적인 내용이에요',
    '무단 도용, 사칭, 저작권 침해가 의심돼요',
    '개인 정보 노출이 우려돼요',
  ];

  const reportPostMutation = useMutation({
    mutationFn: reportPost,
    onSuccess: () => {
      showToast('해당 게시물 신고가 완료되었습니다.');
      window.history.go(-2);
    },
    onError: (error) => {
      showToast('게시물을 신고하는 데 실패했습니다.');
      router.back();
      console.error(error);
    },
  });

  const handleReasonClick = (reason: string) => {
    setReason(reason);
    setShowReportWarningModal(true);
  };

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
      <UnderlineOptionList optionList={reportReasons} handleOptionClick={handleReasonClick} />
      <FooterNavi />
      {showReportWarningModal && (
        <AlertModal
          boldMessage="게시물을 정말 신고하시겠어요?"
          regularMessage="신고 처리는 취소할 수 없어요."
          buttons={
            <div className="w-full flex gap-2">
              <Button type="sub" size="m" onClick={() => setShowReportWarningModal(false)}>
                닫기
              </Button>
              <Button type="main" size="m" onClick={() => reportPostMutation.mutate({ postId, reason })}>
                신고하기
              </Button>
            </div>
          }
        />
      )}
    </>
  );
}

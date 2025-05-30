'use client';

import { reportPost } from '@/api/apis';
import { showToast } from '@/components/provider/ToastProvider';
import UnderlineOptionList from '@components/common/molecule/UnderlineOptionList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReportModal from '@/components/modal/ReportModal';

export default function ReportReasonSelector({ postId }: { postId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();

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
      queryClient.removeQueries({ queryKey: ['post', 'detail', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', 'list'], refetchType: 'none' });
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
      <UnderlineOptionList optionList={reportReasons} handleOptionClick={handleReasonClick} />
      {showReportWarningModal && (
        <ReportModal
          onCancel={() => setShowReportWarningModal(false)}
          onContinue={() => reportPostMutation.mutate({ postId, reason })}
        />
      )}
    </>
  );
}

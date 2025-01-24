import { AlertModalFunc } from '@/config/types';
import Button from '../common/molecules/Button';
import AlertModal from '../common/organism/AlertModal';

export default function ReportModal({ onCancel, onContinue }: AlertModalFunc) {
  return (
    <AlertModal
      boldMessage="게시물을 정말 신고하시겠어요?"
      regularMessage="신고 처리는 취소할 수 없어요."
      buttons={
        <div className="w-full flex gap-2">
          <Button type="sub" size="m" onClick={onCancel}>
            닫기
          </Button>
          <Button type="main" size="m" onClick={onContinue}>
            신고하기
          </Button>
        </div>
      }
    />
  );
}

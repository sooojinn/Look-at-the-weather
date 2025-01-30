import { AlertModalFunc } from '@/config/types';
import Button from '../common/molecules/Button';
import AlertModal from '../common/organism/AlertModal';

export default function HideWarningModal({ onContinue, onCancel }: AlertModalFunc) {
  return (
    <AlertModal
      boldMessage="게시물을 정말 숨기기 하시겠어요?"
      regularMessage="숨겨진 게시물은 복구되지 않아요."
      buttons={
        <div className="w-full flex gap-2">
          <Button type="sub" size="m" onClick={onCancel}>
            닫기
          </Button>
          <Button type="main" size="m" onClick={onContinue}>
            숨기기
          </Button>
        </div>
      }
    />
  );
}

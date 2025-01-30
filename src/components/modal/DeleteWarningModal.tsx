import { AlertModalFunc } from '@/config/types';
import Button from '../common/molecules/Button';
import AlertModal from '../common/organism/AlertModal';

export default function DeleteWarningModal({ onContinue, onCancel }: AlertModalFunc) {
  return (
    <AlertModal
      boldMessage="게시물 삭제"
      regularMessage={
        <>
          게시물을 정말 삭제하시겠어요?
          <br />
          삭제된 게시물은 복구되지 않아요.
        </>
      }
      buttons={
        <div className="w-full flex gap-2">
          <Button type="sub" size="m" onClick={onCancel}>
            취소
          </Button>
          <Button type="main" size="m" onClick={onContinue}>
            삭제하기
          </Button>
        </div>
      }
    />
  );
}

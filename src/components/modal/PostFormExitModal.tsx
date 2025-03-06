import { AlertModalFunc } from '@/config/types';
import Button from '../common/atom/Button';
import AlertModal from '../common/organism/AlertModal';

export default function PostFormExitModal({ type, onCancel, onContinue }: { type: string } & AlertModalFunc) {
  return (
    <AlertModal
      boldMessage={`게시물 ${type} 취소`}
      regularMessage={
        <>
          {`게시물을 ${type}하지 않고 나가시겠어요?`}
          <br />
          {`지금까지 ${type}한 내용은 삭제됩니다.`}
        </>
      }
      buttons={
        <>
          <Button type="sub" size="m" onClick={onCancel}>
            닫기
          </Button>
          <Button type="main" size="m" onClick={onContinue}>
            나가기
          </Button>
        </>
      }
    />
  );
}

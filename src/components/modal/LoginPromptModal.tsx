import { AlertModalFunc } from '@/config/types';
import Button from '../common/atom/Button';
import AlertModal from '../common/organism/AlertModal';

export default function LoginPromptModal({ onCancel, onContinue }: AlertModalFunc) {
  return (
    <AlertModal
      boldMessage="로그인 필요"
      regularMessage={
        <>
          해당 기능은 로그인 후 사용 가능합니다.
          <br />
          로그인 하시겠습니까?
        </>
      }
      buttons={
        <>
          <Button size="m" type="sub" onClick={onCancel}>
            취소
          </Button>
          <Button size="m" onClick={onContinue}>
            로그인
          </Button>
        </>
      }
    />
  );
}

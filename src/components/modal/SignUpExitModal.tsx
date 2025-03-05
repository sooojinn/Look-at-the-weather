import { AlertModalFunc } from '@/config/types';
import Button from '../common/atom/Button';
import AlertModal from '../common/organism/AlertModal';

export default function SignUpExitModal({ onCancel, onContinue }: AlertModalFunc) {
  return (
    <AlertModal
      boldMessage="회원가입 취소"
      regularMessage={
        <>
          회원가입을 취소하시겠어요?
          <br />
          다시 가입할 경우 처음부터
          <br />
          정보를 입력해야 합니다.
        </>
      }
      buttons={
        <>
          <Button size="m" type="sub" onClick={onContinue}>
            가입 계속하기
          </Button>
          <Button size="m" onClick={onCancel}>
            취소하기
          </Button>
        </>
      }
    />
  );
}

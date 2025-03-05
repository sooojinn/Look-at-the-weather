import { AlertModalFunc } from '@/config/types';
import Button from '../common/atom/Button';
import AlertModal from '../common/organism/AlertModal';

export default function DeleteAccountSuccessModal({ onContinue }: AlertModalFunc) {
  return (
    <AlertModal
      boldMessage="탈퇴 완료"
      regularMessage={
        <p>
          탈퇴가 완료되었습니다.
          <br />
          그동안 이용해주셔서 감사합니다.
        </p>
      }
      buttons={
        <Button size="m" onClick={onContinue}>
          확인
        </Button>
      }
    />
  );
}

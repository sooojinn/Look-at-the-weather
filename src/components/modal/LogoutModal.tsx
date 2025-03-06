import { AlertModalFunc } from '@/config/types';
import Button from '../common/atom/Button';
import AlertModal from '../common/organism/AlertModal';

export default function LogoutModal({ onContinue, onCancel }: AlertModalFunc) {
  return (
    <AlertModal
      boldMessage="로그아웃 확인"
      regularMessage="정말 로그아웃 하시겠습니까?"
      buttons={
        <>
          <Button size="m" type="sub" onClick={onCancel}>
            닫기
          </Button>
          <Button size="m" onClick={onContinue}>
            확인
          </Button>
        </>
      }
    />
  );
}

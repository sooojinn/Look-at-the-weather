import { AlertModalFunc } from '@/config/types';
import Button from '../common/atom/Button';
import AlertModal from '../common/organism/AlertModal';

export default function DeleteAccountModal({ onCancel, onContinue }: AlertModalFunc) {
  return (
    <AlertModal
      boldMessage="회원 탈퇴"
      regularMessage={
        <>
          <p>
            회원 탈퇴 시 계정이 완전히 삭제되며,
            <br />
            삭제된 계정 정보는 복구가 불가능합니다.
            <br />
            또한 삭제 후 서비스를 이용하시려면
            <br />
            새로 가입하셔야 합니다.
          </p>
          <p>정말로 탈퇴하시겠습니까?</p>
        </>
      }
      buttons={
        <>
          <Button type="sub" size="m" onClick={onCancel}>
            취소
          </Button>
          <Button type="main" size="m" onClick={onContinue}>
            탈퇴하기
          </Button>
        </>
      }
    />
  );
}

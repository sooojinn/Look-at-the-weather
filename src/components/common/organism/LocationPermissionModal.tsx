import Button from '../molecules/Button';
import WarningModal from './WarningModal';

export default function LocationPermissionModal({ onClose }: { onClose: () => void }) {
  return (
    <WarningModal
      mainMessage="내 위치 설정"
      subMessage="사용기기의 설정에서 위치 정보 접근을 허용해주시길 바랍니다."
      detailMessage={[
        '*iOS: 설정 > 개인정보 보호 및 보안 > 위치 서비스 > 현재 사용 중인 브라우저 > 허용',
        '*Android: 설정 > 애플리케이션 > 현재 사용 중인 브라우저 > 권한 > 허용',
      ]}
      buttons={
        <Button type="sub" size="m" width={100} onClick={onClose}>
          닫기
        </Button>
      }
    />
  );
}

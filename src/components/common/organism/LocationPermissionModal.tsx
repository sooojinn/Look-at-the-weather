import Button from '../molecules/Button';
import AlertModal from './AlertModal';

export default function LocationPermissionModal({ onClose }: { onClose: () => void }) {
  return (
    <AlertModal
      boldMessage="위치 권한 설정"
      regularMessage={
        <p>
          *iOS: 설정 &gt; 개인정보 보호 및 보안 &gt; 위치 서비스 &gt;
          <br />
          현재 사용 중인 브라우저 &gt; 허용
          <br />
          *Android: 설정 &gt; 애플리케이션 &gt;
          <br />
          현재 사용 중인 브라우저 &gt; 권한 &gt; 허용
        </p>
      }
      buttons={
        <Button size="m" onClick={onClose}>
          닫기
        </Button>
      }
    />
  );
}

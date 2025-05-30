import FooterNavi from '@/components/common/organism/FooterNavi';
import StatusPlaceholder from '@/components/placeholder/StatusPlaceholder';
import OfflineImg from '@components/icons/placeholders/OfflineImg';

export default function OfflinePage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <StatusPlaceholder
        ImgComp={OfflineImg}
        boldMessage="잠시 연결이 불안정해요"
        lightMessage="조금 뒤 다시 접속해주세요."
      />
      <FooterNavi />
    </div>
  );
}

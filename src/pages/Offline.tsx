import FooterNavi from '@components/common/FooterNavi';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';
import OfflineImg from '@components/icons/placeholders/OfflineImg';

export default function Offline() {
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

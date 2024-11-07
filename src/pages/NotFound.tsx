import NotFoundImg from '@components/icons/placeholders/NotFoundImg';
import FooterNavi from '@components/common/FooterNavi';
import { useNavigate } from 'react-router-dom';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex">
      <StatusPlaceholder
        ImgComp={NotFoundImg}
        boldMessage="Not Found"
        lightMessage={
          <>
            존재하지 않는 주소를 입력하셨거나,
            <br />
            요청하신 페이지의 주소가 변경,
            <br />
            삭제되어 찾을 수 없습니다.
          </>
        }
        btnText="홈으로"
        btnFunc={() => navigate('/')}
      />
      <FooterNavi />
    </div>
  );
}

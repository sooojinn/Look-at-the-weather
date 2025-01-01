import Header from '@components/common/Header';
import FooterNavi from '@components/common/FooterNavi';
import { getMyPosts } from '@/api/apis';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';
import NoPostImg from '@components/icons/placeholders/NoPostImg';
import { useNavigate } from 'react-router-dom';
import VirtualInfiniteScroll from '@components/common/template/VirtualInfiniteScroll';

export default function MyPost() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header>내 게시물</Header>
      <VirtualInfiniteScroll
        queryKey="myPosts"
        queryFn={getMyPosts}
        headerText="내 게시물"
        placeholderComp={MyPostEmpty}
      />
      <FooterNavi />
    </div>
  );
}

function MyPostEmpty() {
  const navigate = useNavigate();

  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage="아직 작성한 게시물이 없어요"
      lightMessage={
        <>
          첫 게시물을 작성하고
          <br />
          오늘의 룩을 공유해보세요!
        </>
      }
      btnText="게시물 작성하기"
      btnFunc={() => navigate('/post-write')}
    />
  );
}

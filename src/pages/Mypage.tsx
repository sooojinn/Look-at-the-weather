import FooterNavi from '@/components/common/FooterNavi';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import LinkMenu from '@/components/common/molecules/LinkMenu';
import { useAuthStore } from '@/store/authStore';
import LogoutBtn from '@components/login/LogoutBtn';
import TextWithArrow from '@components/common/atom/TextWithArrow';
import HrLine from '@components/common/atom/HrLine';

export default function Mypage() {
  const settingList = [{ menu: '내 정보 수정', href: '/profileedit' }];
  const activeList = [
    { menu: '내 게시물', href: '/mypage/mypost' },
    { menu: '내가 좋아요한 게시물', href: '/mypage/like' },
  ];

  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <div className="max-w-md min-h-screen flex flex-col">
      <Header>마이 페이지</Header>
      <div className="flex-col px-5 flex-grow">
        {isLogin ? (
          <UserProfile />
        ) : (
          <TextWithArrow href="/login">
            <div>
              <Text size="xl" weight="bold">
                로그인 및 회원가입
              </Text>
              <Text color="gray">로그인 후 모든 기능을 이용해보세요.</Text>
            </div>
          </TextWithArrow>
        )}

        <LinkMenu title="설정" menuList={settingList} />
        <HrLine height={8} />
        <LinkMenu title="활동" menuList={activeList} />
        <HrLine height={8} />
        {isLogin && (
          <div className="h-[57px] flex items-center">
            <LogoutBtn />
          </div>
        )}
      </div>
      <FooterNavi />
    </div>
  );
}

function UserProfile() {
  const nickName = useAuthStore((state) => state.nickName);

  return (
    <div className="flex gap-3 items-center py-5">
      <img src="/assets/user_icon.png" alt="Preloaded" />
      <Text size="xl" weight="bold">
        {nickName}
      </Text>
    </div>
  );
}

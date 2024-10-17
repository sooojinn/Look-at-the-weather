import FooterNavi from '@/components/common/FooterNavi';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import { Line } from '@components/common/atom/Line';
import LinkMenu from '@/components/common/molecules/LinkMenu';
import { useAuthStore } from '@/store/authStore';
import LogoutBtn from '@components/common/molecules/LogoutBtn';

export default function Mypage() {
  const settingList = [{ menu: '내 정보 수정', href: '/profileedit' }];
  const activeList = [
    { menu: '내 게시물', href: '/mypage/mypost' },
    { menu: '내가 좋아요한 게시물', href: '/mypage/like' },
  ];

  const { nickName } = useAuthStore();

  return (
    <>
      <Header>마이 페이지</Header>
      <div className="relative flex-col py-9">
        <div className="flex gap-3 items-center mb-6 px-5">
          <img src="/assets/user_icon.png" alt="Preloaded" />
          <Text size="xl" weight="bold">
            {nickName}
          </Text>
        </div>
        <LinkMenu title="설정" menuList={settingList} />
        <Line height={8} />
        <LinkMenu title="활동" menuList={activeList} />
        <Line height={8} />
        <div className="h-[57px] flex items-center px-5">
          <LogoutBtn />
        </div>
      </div>
      <FooterNavi />
    </>
  );
}

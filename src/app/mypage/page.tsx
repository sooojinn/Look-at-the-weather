import FooterNavi from '@/components/common/organism/FooterNavi';
import Header from '@/components/common/organism/Header';
import LinkMenu from '@/components/common/molecule/LinkMenu';
import LogoutBtn from '@components/login/LogoutBtn';
import HrLine from '@components/common/atom/HrLine';
import UserProfile from '@/components/common/molecule/UserProfile';

export default function Mypage() {
  const settingList = [{ menu: '내 정보 수정', href: '/profile-edit' }];
  const activeList = [
    { menu: '내 게시물', href: '/mypage/mypost' },
    { menu: '내가 좋아요한 게시물', href: '/mypage/like' },
  ];

  return (
    <>
      <Header>마이 페이지</Header>
      <div className="flex-col px-5 flex-grow">
        <UserProfile />
        <LinkMenu title="설정" menuList={settingList} />
        <HrLine height={8} />
        <LinkMenu title="활동" menuList={activeList} />
        <HrLine height={8} />
        <LogoutBtn />
      </div>
      <FooterNavi />
    </>
  );
}

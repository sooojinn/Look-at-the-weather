import { useEffect, useState } from 'react';
import FooterNavi from '@/components/common/FooterNavi';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import { Line } from '@components/common/atom/Line';
import LinkMenu from '@/components/common/molecules/LinkMenu';
import { getUserInfos } from '@/api/apis';

export default function Mypage() {
  const settingList = [{ menu: '내 정보 수정', href: '/profileedit' }];
  const activeList = [
    { menu: '내 게시물', href: '/mypost' },
    { menu: '내가 좋아요한 게시물', href: '/like' },
  ];

  const [userNickname, setUserNickname] = useState('');

  useEffect(() => {
    const getUserNickname = async () => {
      const response = await getUserInfos();

      setUserNickname(response.data.nickname);
    };
    getUserNickname();
  }, []);

  return (
    <>
      <div>
        <Header>마이 페이지</Header>
      </div>
      <div className="relative flex-col py-9 px-5">
        <div className="flex gap-3 items-center mb-6">
          <div>
            <img src="../../public/assets/user_icon.png" alt="" />
          </div>
          <Text size="xl" weight="bold">
            {userNickname}
          </Text>
        </div>
        <LinkMenu title="설정" menuList={settingList} />
        <Line height={8} />
        <LinkMenu title="활동" menuList={activeList} />
      </div>
      <FooterNavi />
    </>
  );
}

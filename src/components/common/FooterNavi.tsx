import HangerIcon from '@components/icons/nav/HangerIcon';
import HomeIcon from '@components/icons/nav/HomeIcon';
import MyPageIcon from '@components/icons/nav/MyPageIcon';
import WriteIcon from '@components/icons/nav/WriteIcon';
import { NavLink } from 'react-router-dom';
import Text from './atom/Text';

interface NavItem {
  path: string;
  label: string;
  Icon: React.FC<{ fill: string }>;
}

const navList: NavItem[] = [
  { path: '/', label: '홈', Icon: HomeIcon },
  { path: '/post', label: '룩', Icon: HangerIcon },
  { path: '/post-write', label: '글쓰기', Icon: WriteIcon },
  { path: '/mypage', label: '마이페이지', Icon: MyPageIcon },
];

export default function FooterNavi() {
  return (
    <nav className="max-w-md bottom-0 fixed w-full h-14 bg-background-white border-t border-line-lightest flex justify-around">
      {navList.map((navItem) => (
        <NavLink key={navItem.path} to={navItem.path} className="w-14 flex flex-col justify-center items-center gap-1">
          {({ isActive }) => {
            const { Icon } = navItem;
            return (
              <>
                <Icon fill={isActive ? 'rgb(var(--color-primary))' : 'rgb(var(--color-label-400))'} />
                <Text size="xs" color={isActive ? 'main' : 'gray'} weight={isActive ? 'bold' : 'regular'}>
                  {navItem.label}
                </Text>
              </>
            );
          }}
        </NavLink>
      ))}
    </nav>
  );
}

import { NavLink } from 'react-router-dom';
import HomeIcon from '../icons/HomeIcon';
import HangerIcon from '../icons/HangerIcon';
import WriteIcon from '../icons/WriteIcon';
import MyPageIcon from '../icons/MyPageIcon';

interface NavItem {
  path: string;
  label: string;
  Icon: React.FC<{ fill: string }>;
}

const navList: NavItem[] = [
  { path: '/', label: '홈', Icon: HomeIcon },
  { path: '/post', label: '코디', Icon: HangerIcon },
  { path: '/postwrite', label: '글쓰기', Icon: WriteIcon },
  { path: '/mypage', label: '마이페이지', Icon: MyPageIcon },
];

export default function FooterNavi() {
  return (
    <nav className="max-w-md fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around py-2">
      {navList.map((navItem) => (
        <NavLink
          key={navItem.path}
          to={navItem.path}
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? 'text-primary-lightest' : 'text-assistive'}`
          }
        >
          {({ isActive }) => {
            const { Icon } = navItem;
            return (
              <>
                <Icon fill={isActive ? '#0066ff' : '#C7C8C9'} />
                <span className="text-xs mt-1">{navItem.label}</span>
              </>
            );
          }}
        </NavLink>
      ))}
    </nav>
  );
}

import HangerIcon from '@components/icons/nav/HangerIcon';
import HomeIcon from '@components/icons/nav/HomeIcon';
import MyPageIcon from '@components/icons/nav/MyPageIcon';
import WriteIcon from '@components/icons/nav/WriteIcon';
import Text from './atom/Text';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
  const pathname = usePathname();

  return (
    <nav className="max-w-md bottom-0 sticky w-full h-14 bg-background-white border-t border-line-lightest flex justify-around flex-shrink-0 z-30">
      {navList.map((navItem) => {
        const { path, label, Icon } = navItem;
        const isActive = pathname === path;

        return (
          <Link key={path} href={path} className="w-14 flex flex-col justify-center items-center gap-1">
            <Icon fill={isActive ? 'rgb(var(--color-primary))' : 'rgb(var(--color-label-400))'} />
            <Text size="xs" color={isActive ? 'main' : 'gray'} weight={isActive ? 'bold' : 'regular'}>
              {label}
            </Text>
          </Link>
        );
      })}
    </nav>
  );
}

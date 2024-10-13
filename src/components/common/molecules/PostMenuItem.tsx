import { ReactNode } from 'react';
import Text from '../atom/Text';

interface PostMenuItemProps {
  children: ReactNode;
  Icon: React.ComponentType;
  onClick: () => void;
}

export default function PostMenuItem({ children, Icon, onClick }: PostMenuItemProps) {
  return (
    <div className="flex gap-3 px-5 py-3 items-center hover:bg-background-light cursor-pointer" onClick={onClick}>
      <Icon />
      <Text size="l">{children}</Text>
    </div>
  );
}

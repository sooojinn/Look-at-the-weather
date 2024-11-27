import HideIcon from '@components/icons/input/HideIcon';
import ShowIcon from '@components/icons/input/ShowIcon';

interface PasswordToggleBtnProps {
  onToggle: (e: React.MouseEvent<HTMLElement>) => void;
  isVisible: boolean;
}

export default function PasswordToggleBtn({ onToggle, isVisible }: PasswordToggleBtnProps) {
  const fill = 'rgb(var(--color-label-400))';
  return (
    <div onClick={onToggle} className="cursor-pointer">
      {isVisible ? <ShowIcon fill={fill} /> : <HideIcon fill={fill} />}
    </div>
  );
}

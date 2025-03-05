import HideIcon from '@components/icons/input/HideIcon';
import ShowIcon from '@components/icons/input/ShowIcon';

interface PasswordToggleBtn extends React.HTMLAttributes<HTMLDivElement> {
  isVisible: boolean;
}

export default function PasswordToggleBtn({ isVisible, ...props }: PasswordToggleBtn) {
  const fill = 'rgb(var(--color-label-400))';

  return (
    <div
      className="cursor-pointer"
      onMouseDown={(e) => e.preventDefault()} // 마우스 이벤트로 blur 방지
      onTouchStart={(e) => e.preventDefault()} // 터치 이벤트로 blur 방지
      {...props}
    >
      {isVisible ? <ShowIcon fill={fill} /> : <HideIcon fill={fill} />}
    </div>
  );
}

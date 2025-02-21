import InputDeleteIcon from '../../icons/input/InputDeleteIcon';

export default function InputDeleteBtn(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="cursor-pointer"
      onMouseDown={(e) => e.preventDefault()} // 마우스 이벤트로 blur 방지
      onTouchStart={(e) => e.preventDefault()} // 터치 이벤트로 blur 방지
      {...props}
    >
      <InputDeleteIcon />
    </div>
  );
}

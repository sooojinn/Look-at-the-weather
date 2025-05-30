interface CloseBtnProps {
  width?: number;
  fill?: string;
  onClick: () => void;
}

export default function CloseBtn({ width = 24, fill = 'rgb(var(--color-label-600))', onClick }: CloseBtnProps) {
  return (
    <svg
      className="cursor-pointer"
      onClick={onClick}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.40043 18.6537L5.34668 17.5999L10.9467 11.9999L5.34668 6.39994L6.40043 5.34619L12.0004 10.9462L17.6004 5.34619L18.6542 6.39994L13.0542 11.9999L18.6542 17.5999L17.6004 18.6537L12.0004 13.0537L6.40043 18.6537Z"
        fill={fill}
      />
    </svg>
  );
}

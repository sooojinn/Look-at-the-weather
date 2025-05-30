export default function BackBtn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className="cursor-pointer"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.373 12.75L13.0693 18.4462L12 19.5L4.5 12L12 4.5L13.0693 5.55375L7.373 11.25H19.5V12.75H7.373Z"
        fill="#171719"
      />
    </svg>
  );
}

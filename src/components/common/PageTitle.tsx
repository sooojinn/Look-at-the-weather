import { Link } from 'react-router-dom';

type PageTitleProps = {
  title: string;
};

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div>
      <div className="flex justify-between border-b-2 px-5 py-4">
        <Link to="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z" fill="#171719" />
          </svg>
        </Link>
        <div className="font-bold">{title}</div>
        <div className="w-6 h-6"></div>
      </div>
    </div>
  );
}

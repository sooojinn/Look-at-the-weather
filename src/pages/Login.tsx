import Logo from '@components/common/atom/Logo';
import Text from '@components/common/atom/Text';
import CloseBtn from '@components/icons/CloseBtn';
import LoginForm from '@components/login/LoginForm';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const linkList = [
    { path: '/signup', label: '회원가입', index: 1 },
    { path: '/find-email', label: '이메일 찾기', index: 2 },
    { path: '/find-password', label: '비밀번호 찾기', index: 3 },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="h-14 px-5 flex items-center flex-shrink-0">
        <CloseBtn onClick={() => navigate(-1)} />
      </div>

      <div className="min-h-[140px] max-h-[200px] flex flex-col gap-3 flex-grow justify-center items-center">
        <Logo width={120} height={54} />
        <Text size="l" color="gray">
          위치 기반 패션 공유 서비스
        </Text>
      </div>
      <div className="px-5 py-10">
        <LoginForm />
        <div className="h-12 mt-6 flex justify-between">
          {linkList.map(({ path, label, index }) => (
            <Link key={index} to={path} className="w-[106px] flex justify-center items-center">
              <Text weight="bold">{label}</Text>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

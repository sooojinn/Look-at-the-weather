import { postLogin } from '@/api/apis';
import { setAccessToken } from '@/api/instance';
import { ErrorResponse } from '@/config/types';
import { useAuthStore } from '@/store/authStore';
import Logo from '@components/common/atom/Logo';
import Text from '@components/common/atom/Text';
import Button from '@components/common/molecules/Button';
import { showToast } from '@components/common/molecules/ToastProvider';
import EmailInput from '@components/form/inputs/EmailInput';
import PasswordInput from '@components/form/inputs/PasswordInput';
import CloseBtn from '@components/icons/CloseBtn';
import KakaoLogin from '@components/login/KakaoLogin';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const { setIsLogin, setNickName, setIsSocial } = useAuthStore();
  const formMethods = useForm();
  const { handleSubmit, setError } = formMethods;

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ data }) => {
      const { accessToken, nickName, social } = data;
      setAccessToken(accessToken);
      setNickName(nickName);
      setIsLogin(true);
      setIsSocial(social);
      navigate(-1);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.errorCode === 'NOT_EXIST_EMAIL') {
        setError('email', { message: '이메일이 존재하지 않습니다.' });
      } else if (error.response?.data.errorCode === 'INVALID_PASSWORD') {
        setError('password', { message: '잘못된 비밀번호입니다.' });
      } else {
        console.error('로그인 실패: ', error);
        showToast('로그인 실패. 다시 시도해주세요.');
      }
    },
  });

  const handleLogin = async (data: any) => {
    loginMutation.mutate(data);
    const img = new Image();
    img.src = '/assets/user_icon.png';
  };

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
        <form className="flex flex-col gap-6">
          <div className="relative flex flex-col gap-4">
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
              <LoginTooltip />
            </div>
            <EmailInput {...formMethods} />
            <PasswordInput {...formMethods} />
          </div>
          <div className="flex flex-col gap-3">
            <Button type="main" onClick={handleSubmit(handleLogin)}>
              이메일로 로그인
            </Button>
            <KakaoLogin />
          </div>
        </form>
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

function LoginTooltip() {
  return (
    <div className="animate-bounceTooltip z-30">
      <div className="bg-white rounded-[10px] px-3 py-2.5 drop-shadow-custom">
        <Text size="xs" color="gray" className="text-center whitespace-nowrap">
          지금 로그인하고
          <br />더 <strong className="font-bold text-primary-main">자유롭게 룩엣더웨더를 즐겨</strong>보세요!
        </Text>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
    </div>
  );
}

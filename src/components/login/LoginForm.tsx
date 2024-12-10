import { useForm } from 'react-hook-form';
import { postLogin } from '@/api/apis';
import { setAccessToken } from '@/api/instance';
import { ErrorResponse } from '@/config/types';
import { useAuthStore } from '@/store/authStore';
import Button from '@components/common/molecules/Button';
import { showToast } from '@components/common/molecules/ToastProvider';
import EmailInput from '@components/form/inputs/EmailInput';
import PasswordInput from '@components/form/inputs/PasswordInput';
import KakaoLogin from '@components/login/KakaoLogin';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginTooltip from './LoginTooltip';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginForm() {
  const formMethods = useForm<LoginForm>();
  const { handleSubmit, setError } = formMethods;
  const { setIsLogin, setNickName, setIsSocial } = useAuthStore();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
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

  return (
    <form className="flex flex-col gap-6">
      <div className="relative flex flex-col gap-4">
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
          <LoginTooltip />
        </div>
        <EmailInput<LoginForm> {...formMethods} />
        <PasswordInput<LoginForm> {...formMethods} />
      </div>
      <div className="flex flex-col gap-3">
        <Button type="main" onClick={handleSubmit(handleLogin)}>
          이메일로 로그인
        </Button>
        <KakaoLogin />
      </div>
    </form>
  );
}

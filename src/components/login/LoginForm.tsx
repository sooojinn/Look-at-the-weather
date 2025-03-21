import { useForm } from 'react-hook-form';
import { postLogin } from '@/api/apis';
import { setAccessToken } from '@/api/instance';
import { ErrorResponse } from '@/config/types';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/common/atom/Button';
import { showToast } from '@/components/provider/ToastProvider';
import KakaoLogin from '@components/login/KakaoLogin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import LoginTooltip from './LoginTooltip';
import { useRouter } from 'next/navigation';
import EmailInput from '../form/organism/inputs/EmailInput';
import PasswordInput from '../form/organism/inputs/PasswordInput';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginForm() {
  const formMethods = useForm<LoginForm>();
  const { handleSubmit, setError } = formMethods;
  const { setIsLogin } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      const { accessToken } = data;
      setAccessToken(accessToken);
      setIsLogin(true);
      queryClient.invalidateQueries({ queryKey: ['post'] });
      router.back();
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
